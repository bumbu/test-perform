// Sort alphabetically
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const webpackStream = require('webpack-stream')

const PATHS = {
  SRC: 'src',
  JS: {
    SRC: 'src/js/',
    DIST: 'public/js/',
  },
}

/**
 * Scripts
 */

gulp.task('dev:scripts', function() {
  return gulp.src(PATHS.JS.SRC + 'index.js')
    .pipe(webpackStream({
      devtool: 'inline-source-map',
      output: {
        filename: 'index.js',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
              presets: ["react", "es2015", "stage-2"],
            }
          }
        ]
      }
    }))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest(PATHS.JS.DIST))
})

gulp.task('build:scripts', function() {
  return gulp.src(PATHS.JS.SRC + 'index.js')
    .pipe(webpackStream({
      output: {
        filename: 'index.js',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
              presets: ["react", "es2015", "stage-2"],
            }
          }
        ]
      },
      plugins: [
        new webpackStream.webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
        })
      ]
    }))
    .pipe(gulp.dest(PATHS.JS.DIST))
})

/**
 * Server
 */

gulp.task('dev:server', function() {
  const server = require('./server/index')
})

/**
 * Watch
 */

gulp.task('dev:watch', function() {
  gulp.watch([PATHS.JS.SRC + '**/*.js'], ['dev:scripts']);
})

gulp.task('default', ['dev:scripts', 'dev:server', 'dev:watch'])
gulp.task('build', ['build:scripts'])
