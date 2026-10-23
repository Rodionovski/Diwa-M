const { parseSync } = require('@babel/core');
const { readdirSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

function calleeName(node) {
  if (node?.type === 'Identifier') return node.name;
  if (node?.type === 'SequenceExpression') return calleeName(node.expressions.at(-1));
  if (node?.type === 'MemberExpression' || node?.type === 'OptionalMemberExpression') {
    return node.computed ? node.property.value : node.property.name;
  }
  return null;
}

function findDynamicCode(source) {
  const ast = parseSync(source, { configFile: false, babelrc: false, sourceType: 'unambiguous' });
  const pending = [ast];
  const violations = [];
  while (pending.length) {
    const node = pending.pop();
    if (!node || typeof node !== 'object') continue;
    if (['CallExpression', 'OptionalCallExpression', 'NewExpression'].includes(node.type)) {
      const name = calleeName(node.callee);
      const argument = node.arguments[0];
      if (['eval', 'Function'].includes(name) ||
        (['setTimeout', 'setInterval'].includes(name) && ['StringLiteral', 'TemplateLiteral'].includes(argument?.type))) {
        violations.push({ name, line: node.loc.start.line, column: node.loc.start.column });
      }
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) pending.push(...value);
      else if (value && typeof value === 'object' && value.type) pending.push(value);
    }
  }
  return violations;
}

if (require.main === module) {
  const directory = process.argv[2] || join(__dirname, '..', 'dist', 'js');
  const files = readdirSync(directory).filter((file) => file.endsWith('.js'));
  if (!files.length) throw new Error('No compiled JavaScript to check.');
  let count = 0;
  for (const file of files) {
    for (const violation of findDynamicCode(readFileSync(join(directory, file), 'utf8'))) {
      console.error(`${file}:${violation.line}:${violation.column}: CSP-incompatible ${violation.name}`);
      count++;
    }
  }
  if (count) process.exitCode = 1;
  else console.log(`CSP check passed: ${files.length} JavaScript bundles contain no eval, Function constructors or string timers.`);
}

module.exports = { findDynamicCode };
