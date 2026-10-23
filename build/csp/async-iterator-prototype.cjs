// Equivalent core-js prototype discovery using native syntax instead of Function().
const root = require('core-js/internals/global-this');
const shared = require('core-js/internals/shared-store');
const isCallable = require('core-js/internals/is-callable');
const create = require('core-js/internals/object-create');
const getPrototypeOf = require('core-js/internals/object-get-prototype-of');
const defineBuiltIn = require('core-js/internals/define-built-in');
const wellKnownSymbol = require('core-js/internals/well-known-symbol');
const isPure = require('core-js/internals/is-pure');
const asyncIterator = wellKnownSymbol('asyncIterator');
let prototype = shared.AsyncIteratorPrototype;
if (!prototype && isCallable(root.AsyncIterator)) prototype = root.AsyncIterator.prototype;
if (!prototype && (shared.USE_FUNCTION_CONSTRUCTOR || root.USE_FUNCTION_CONSTRUCTOR)) {
  const generator = (async function* () {})();
  const candidate = getPrototypeOf(getPrototypeOf(getPrototypeOf(generator)));
  if (getPrototypeOf(candidate) === Object.prototype) prototype = candidate;
}
if (!prototype) prototype = {};
else if (isPure) prototype = create(prototype);
if (!isCallable(prototype[asyncIterator])) {
  defineBuiltIn(prototype, asyncIterator, function () { return this; });
}
module.exports = prototype;
