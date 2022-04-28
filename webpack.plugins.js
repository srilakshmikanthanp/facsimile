/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebPackPlugin({
    patterns: [
      {
        to: path.resolve(__dirname, '.webpack/renderer', 'assets'),
        from: path.resolve(__dirname, 'src', 'assets')
      }
    ]
  })
];
