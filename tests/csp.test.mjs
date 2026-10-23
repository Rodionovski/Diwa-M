import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { findDynamicCode } = require('../scripts/check-csp.cjs');

test('CSP checker catches executable dynamic code, including minified global fallback', () => {
  for (const source of [
    'eval("1 + 1")', 'new Function("return this")()', 'Function("return 1")()',
    '(0, eval)("1")', 'globalThis["eval"]("1")',
    'setTimeout("run()", 10)', 'window.setInterval(`run()`, 10)',
  ]) assert.equal(findDynamicCode(source).length, 1, source);
});

test('CSP checker permits callbacks and ignores strings and comments', () => {
  const source = `
    // eval("not executable")
    const text = 'new Function("not executable")';
    setTimeout(() => console.log(text), 10);
    setInterval(function () {}, 1000);
    const root = globalThis;
  `;
  assert.deepEqual(findDynamicCode(source), []);
});

test('browser global and Node-module adapters do not evaluate code', () => {
  assert.equal(require('../build/csp/global-this.cjs'), globalThis);
  const getNodeModule = require('../build/csp/get-built-in-node-module.cjs');
  assert.equal(getNodeModule('fs'), undefined);
});

test('async iterator discovery works with string evaluation disabled', async () => {
  const { readFileSync } = await import('node:fs');
  const { Script, createContext } = await import('node:vm');
  const source = readFileSync(new URL('../build/csp/async-iterator-prototype.cjs', import.meta.url), 'utf8');
  const sandbox = {
    module: { exports: {} },
    require(name) {
      if (name === 'core-js/internals/global-this') return {};
      if (name === 'core-js/internals/shared-store') return { USE_FUNCTION_CONSTRUCTOR: true };
      return require(name);
    },
  };
  const context = createContext(sandbox, { codeGeneration: { strings: false, wasm: false } });
  new Script(source).runInContext(context);
  const prototype = sandbox.module.exports;
  assert.equal(typeof prototype[Symbol.asyncIterator], 'function');
  assert.equal(prototype[Symbol.asyncIterator](), prototype);
  assert.equal(prototype, new Script('Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf((async function* () {})())))').runInContext(context));
});
