const path = require('path');
const loaders = require('../loaders');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const ENV = require('../lib/env');

const DEV = ENV !== 'production';

const commonConfig = (options = {}) => {
  const { productionSourcemaps = true, env = ENV } = options;
  let config = {
    context: options.context,

    mode: env,

    entry: path.resolve(options.context, 'src/main.js'),

    output: {
      filename: '[name].js',
      path: path.resolve(options.context, 'dist')
    },

    module: {
      rules: [loaders.babel.default, loaders.files.default]
    },

    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.scss', '.css', '.json'],
      modules: ['node_modules', 'node_modules/@codecademy']
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${ENV}"`,
        __DEV__: DEV
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    ]
  };

  if (config.mode === 'production') {
    config = merge.smart(config, {
      devtool: productionSourcemaps ? 'source-map' : false,
      optimization: {
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({cssProcessorOptions: { reduceIdents: false }})
        ]
      }
    });
  } else {
    config = merge.smart(config, {
      devtool: 'cheap-module-eval-source-map',
      output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
      }
    });
  }

  return config;
};

module.exports = commonConfig;
