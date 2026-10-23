import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readPublished, savePublished, validateContent } from '../src/lib/contentRepository.mjs';
const defaults = JSON.parse(readFileSync(new URL('../src/data/content.json', import.meta.url)));

// Small database stand-in that enforces the same conditional revision update.
function database(initial) {
  let row = structuredClone(initial);
  const client = { from(table) {
    assert.equal(table, 'site_content');
    let payload;
    const filters = {};
    const query = {
      select() { return query; },
      update(next) { payload = next; return query; },
      eq(key, value) { filters[key] = value; return query; },
      async single() { return { data: structuredClone(row), error: null }; },
      async maybeSingle() {
        assert.equal(filters.id, 1);
        if (filters.revision !== row.revision) return { data: null, error: null };
        row = structuredClone(payload);
        return { data: structuredClone(row), error: null };
      },
    };
    return query;
  } };
  return client;
}

test('all original prices and gallery entries are valid and present', () => {
  assert.ok(validateContent(defaults));
  assert.equal(defaults.sections.length, 4);
  assert.equal(defaults.sections.flatMap((s) => s.groups.flatMap((g) => g.items)).length, 59);
  assert.equal(defaults.photos.length, 6);
});

test('published prices and photos can be read by a separate visitor', async () => {
  const client = database({ data: defaults, revision: 1 });
  const changed = structuredClone(defaults);
  changed.sections[0].groups[0].items[0].price = '999 грн';
  changed.photos.unshift({ id: 'new-photo', title: 'Новий манікюр', path: 'admin/photo.webp' });
  await savePublished(client, changed, 1);
  const visitor = await readPublished(client);
  assert.equal(visitor.revision, 2);
  assert.equal(visitor.data.sections[0].groups[0].items[0].price, '999 грн');
  assert.equal(visitor.data.photos[0].path, 'admin/photo.webp');
});

test('a stale editor cannot overwrite another administrator', async () => {
  const client = database({ data: defaults, revision: 7 });
  await savePublished(client, defaults, 7);
  const stale = structuredClone(defaults);
  stale.photos = [];
  await assert.rejects(savePublished(client, stale, 7), /Інший адміністратор/);
  assert.equal((await readPublished(client)).data.photos.length, 6);
});

test('empty titles, excessive files, duplicate IDs and incomplete photos are rejected', () => {
  const invalid = structuredClone(defaults);
  invalid.sections[0].groups[0].items[0].name = '  ';
  assert.equal(validateContent(invalid), false);
  const duplicates = structuredClone(defaults);
  duplicates.photos.push(duplicates.photos[0]);
  assert.equal(validateContent(duplicates), false);
  const incomplete = structuredClone(defaults);
  delete incomplete.photos[0].asset;
  assert.equal(validateContent(incomplete), false);
  assert.equal(validateContent({ sections: [], photos: Array(301).fill(defaults.photos[0]) }), false);
});

test('missing revision and invalid edits never reach the database', async () => {
  const client = { from() { assert.fail('must not write invalid data'); } };
  await assert.rejects(savePublished(client, defaults, null), /завантажте/);
  await assert.rejects(savePublished(client, { sections: [], photos: [{}] }, 1), /формату/);
});

test('database failures are surfaced instead of reporting success', async () => {
  const error = new Error('permission denied');
  const query = { select() { return this; }, update() { return this; }, eq() { return this; }, async single() { return { error }; }, async maybeSingle() { return { error }; } };
  const client = { from() { return query; } };
  await assert.rejects(readPublished(client), /permission denied/);
  await assert.rejects(savePublished(client, defaults, 1), /permission denied/);
});

test('legacy published content gets optional sections without losing prices', async () => {
  const result = await readPublished(database({ data: defaults, revision: 3 }));
  assert.deepEqual(result.data.reviews, []);
  assert.equal(result.data.faqs.length, 4);
  assert.deepEqual(result.data.sections, defaults.sections);
  assert.equal(result.revision, 3);
});

test('reviews and FAQ edits persist for public visitors, including intentionally empty lists', async () => {
  const client = database({ data: defaults, revision: 1 });
  const { data } = await readPublished(client);
  data.reviews.push({ id: 'test-only', name: 'Тест', service: 'Тестова послуга', text: 'Тестовий відгук, лише в тесті.', rating: 4, source: 'https://example.com/review' });
  data.faqs = [{ id: 'test-faq', question: 'Тестове запитання?', answer: 'Тестова відповідь.' }];
  await savePublished(client, data, 1);
  const saved = await readPublished(client);
  assert.deepEqual(saved.data.reviews, data.reviews);
  assert.deepEqual(saved.data.faqs, data.faqs);
  await savePublished(client, { ...saved.data, reviews: [], faqs: [] }, 2);
  const cleared = await readPublished(client);
  assert.deepEqual(cleared.data.reviews, []);
  assert.deepEqual(cleared.data.faqs, []);
});

test('invalid reviews and unsafe source URLs cannot be published', async () => {
  const review = { id: 'test', name: 'Тест', service: '', text: 'Тестовий текст.', rating: 5, source: '' };
  for (const patch of [{ name: '' }, { text: '' }, { rating: 6 }, { rating: 0 }, { rating: 2.5 }, { source: 'javascript:alert(1)' }, { source: 'http://example.com' }, { source: 'https://user:password@example.com' }, { text: 'x'.repeat(1501) }]) {
    const data = { ...defaults, reviews: [{ ...review, ...patch }] };
    assert.equal(validateContent(data), false, JSON.stringify(patch));
    await assert.rejects(savePublished({ from() { assert.fail('invalid input must not reach DB'); } }, data, 1));
  }
  assert.equal(validateContent({ ...defaults, reviews: [review, review] }), false);
  assert.equal(validateContent({ ...defaults, reviews: null }), false);
  assert.equal(validateContent({ ...defaults, faqs: [{ id: 'a', question: ' ', answer: 'text' }] }), false);
});

test('review edits keep concurrency protection and do not mutate initial FAQ defaults', async () => {
  const client = database({ data: defaults, revision: 1 });
  const first = await readPublished(client);
  const second = await readPublished(client);
  first.data.faqs[0].answer = 'Змінено лише в першому редакторі.';
  assert.notEqual(second.data.faqs[0].answer, first.data.faqs[0].answer);
  await savePublished(client, first.data, 1);
  await assert.rejects(savePublished(client, second.data, 1), /Інший адміністратор/);
});

test('legacy content receives independent editable offers without a database migration', async () => {
  const client = database({ data: defaults, revision: 4 });
  const first = await readPublished(client);
  const second = await readPublished(client);
  assert.ok(validateContent(first.data));
  assert.equal(first.data.offers.certificate.isExample, true);
  assert.equal(first.data.offers.course.duration, '90 хвилин');
  first.data.offers.course.benefits[0] = 'Тестова зміна';
  assert.notEqual(first.data.offers.course.benefits[0], second.data.offers.course.benefits[0]);
  assert.deepEqual(first.data.photos, defaults.photos);
});

test('offer text, prices, visibility, links and uploaded photos persist together', async () => {
  const client = database({ data: defaults, revision: 1 });
  const { data } = await readPublished(client);
  data.offers.certificate.title = 'Тестовий сертифікат';
  data.offers.certificate.price = '2 000 грн';
  data.offers.certificate.isExample = false;
  data.offers.certificate.image = { id: 'uploaded-certificate', path: 'admin/certificate.webp', title: 'Власний сертифікат' };
  data.offers.certificate.buttonUrl = 'tel:+380674247498';
  data.offers.course.visible = false;
  data.offers.course.duration = '2 години';
  await savePublished(client, data, 1);
  const saved = await readPublished(client);
  assert.deepEqual(saved.data.offers, data.offers);
  assert.equal(saved.revision, 2);
});

test('offers reject unsafe links, empty content and missing image references', async () => {
  const { data } = await readPublished(database({ data: defaults, revision: 1 }));
  for (const patch of [{ buttonUrl: 'javascript:alert(1)' }, { buttonUrl: 'http://example.com' }, { buttonUrl: 'tel:hello' }, { buttonUrl: 'https://user:pass@example.com' }, { title: '' }, { isExample: 'false' }, { image: { id: 'a', title: 'Фото' } }, { benefits: [''] }]) {
    const invalid = structuredClone(data);
    Object.assign(invalid.offers.certificate, patch);
    assert.equal(validateContent(invalid), false, JSON.stringify(patch));
    await assert.rejects(savePublished({ from() { assert.fail('invalid input must not write'); } }, invalid, 1));
  }
  const noDuration = structuredClone(data);
  noDuration.offers.course.duration = '';
  assert.equal(validateContent(noDuration), false);
});

test('all new images participate in the shared upload pipeline', async () => {
  const { contentImages } = await import('../src/lib/offerDefaults.mjs');
  const { data } = await readPublished(database({ data: defaults, revision: 1 }));
  const images = contentImages(data);
  assert.equal(images.length, defaults.photos.length + 2);
  images.find((image) => image.id === 'certificate-image').path = 'admin/new-certificate.png';
  assert.equal(data.offers.certificate.image.path, 'admin/new-certificate.png');
});
