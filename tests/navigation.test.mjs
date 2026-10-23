import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRouter, createMemoryHistory } from 'vue-router';
import { routes } from '../src/router/routes.mjs';
import { priceSectionId, serviceDestination } from '../src/lib/navigation.mjs';
const defaults = JSON.parse(readFileSync(new URL('../src/data/content.json', import.meta.url)));
const router = createRouter({ history: createMemoryHistory('/studio/'), routes });

test('service cards resolve to their actual price section anchors', () => {
  const targets = [
    ['section-0', 'Перукаря', '#hairdresser'],
    ['section-2', 'манікюру', '#nails'],
    ['section-1', 'Візажиста', '#makeup'],
  ];
  for (const [id, title, hash] of targets) {
    const section = defaults.sections.find((item) => item.id === id);
    assert.ok(section.name.includes(title));
    assert.equal(`#${priceSectionId(section)}`, hash);
    const resolved = router.resolve(serviceDestination(id));
    assert.equal(resolved.name, 'services');
    assert.equal(resolved.hash, hash);
    assert.equal(resolved.href, `/studio/services${hash}`);
    assert.equal(priceSectionId({ ...section, name: 'Нова назва' }), hash.slice(1));
  }
});

test('all named page links respect the hosting base path', () => {
  for (const route of routes) {
    const resolved = router.resolve({ name: route.name });
    assert.ok(resolved.href.startsWith('/studio/'));
    assert.equal(resolved.matched.length, 1);
  }
  assert.equal(router.resolve({ name: 'offers', hash: '#course' }).href, '/studio/offers#course');
});

test('new price sections also receive stable distinct anchors', () => {
  assert.equal(priceSectionId({ id: 'new-section' }), 'price-new-section');
  assert.equal(serviceDestination('new-section').hash, '#price-new-section');
});
