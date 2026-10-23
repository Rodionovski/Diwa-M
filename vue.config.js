const { defineConfig } = require('@vue/cli-service');
const { NormalModuleReplacementPlugin } = require('webpack');
const { resolve } = require('node:path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: ['global-this', 'get-built-in-node-module', 'async-iterator-prototype'].map((name) =>
      new NormalModuleReplacementPlugin(
        new RegExp(`[\\/]core-js[\\/]internals[\\/]${name}\\.js$`),
        resolve(__dirname, 'build/csp', `${name}.cjs`),
      )),
  },
  chainWebpack(config) {
    // External source maps work without eval-based development wrappers.
    config.devtool('source-map');
    // Modern browsers expose globalThis. Avoid Webpack's legacy global lookup,
    // which generates a new Function('return this') fallback.
    config.plugin('define').tap((definitions) => {
      definitions[0].global = 'globalThis';
      return definitions;
    });
  },
});
