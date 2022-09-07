const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/browser.js',
  mode: 'production',
  resolve: {
      fallback: {
          "tronweb": require.resolve('tronweb'),
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify"),
          "assert": require.resolve("assert/")
      }
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'citadel-lib.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ],
};
