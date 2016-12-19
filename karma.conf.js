var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: ['Chrome'],

    singleRun: true,

    frameworks: [ 'mocha' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots' ],

    webpack: {
      devtool: 'inline-source-map',
      module  : {
        loaders : [
          {
            test: /\.js$/,
            loader: 'babel'
          }
        ]
      },
      // Enzyme fix, see:
      // https://github.com/airbnb/enzyme/issues/47
      externals : {
        'react/addons'                   : true,
        'react/lib/ExecutionEnvironment' : true,
        'react/lib/ReactContext'         : true,
        'cheerio': 'window',
      },
    },

    webpackServer: {
      noInfo: true
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }

  });
};
