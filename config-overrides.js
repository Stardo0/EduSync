// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "buffer": require.resolve("buffer/"),
    "stream": require.resolve("stream-browserify"),
    "process": require.resolve("process/browser.js") // Explicitly specify process/browser.js
  };

  config.resolve.alias = {
    ...config.resolve.alias,
    'process': require.resolve('process/browser.js') // Explicitly specify process/browser.js
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Explicitly specify process/browser.js
    }),
  ]);

  return config;
};