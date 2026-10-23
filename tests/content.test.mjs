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
