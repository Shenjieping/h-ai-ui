'use strict';

const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const aliases = require('gulp-style-aliases')
const path = require('path')

console.log('shenjp==>>ssss', path.resolve(__dirname, '../../node_modules/element-ui'))

function compile() {
  return src('./src/*.scss')
    .pipe(aliases({
      '~element-ui': '../../node_modules'
    }))
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'))
    .pipe(dest('./../../lib/theme-chalk'));
}

function copyfont() {
  // return src('./src/fonts/**')
  //   .pipe(cssmin())
  //   .pipe(dest('./lib/fonts'));
}

exports.build = series(compile);
