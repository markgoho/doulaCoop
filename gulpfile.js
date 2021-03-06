'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const autoprefix = require('gulp-autoprefixer');
const del = require('del');
const pug = require('gulp-pug');
const wbBuild = require('workbox-build');
const critical = require('critical').stream;
const browserSync = require('browser-sync').create();
const pump = require('pump');

const reload = browserSync.reload;

// gulp.task('concatScripts', function() {
//   return gulp
//     .src(['node_modules/jquery/dist/jquery.js', 'js/main.js'])
//     .pipe(maps.init())
//     .pipe(concat('app.js'))
//     .pipe(maps.write('./'))
//     .pipe(gulp.dest('js'));
// });

// Deploy tasks
gulp.task('minifyScripts', function() {
  return gulp
    .src('src/js/index.js')
    .pipe(uglify())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('critical', function() {
  return gulp
    .src('dist/*.html')
    .pipe(
      critical({
        base: 'dist/',
        minify: true,
        inline: true,
        css: ['dist/css/main.css']
      })
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('compileSass', function() {
  return gulp
    .src('src/stylesheets/main.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('compressSass', function(cb) {
  pump(
    [
      gulp.src('src/stylesheets/main.scss'),
      sass({ outputStyle: 'compressed' }),
      autoprefix(),
      gulp.dest('src/css')
    ],
    cb
  );
});

gulp.task('pugCompressed', function(cb) {
  pump([gulp.src('src/templates/*.pug'), pug(), gulp.dest('src')], cb);
});

gulp.task('clean', function(cb) {
  return del(['dist', 'src/css/main.css*', 'src/js/app*.js*']);
});

gulp.task(
  'deploy',
  ['clean', 'compressSass', 'pugCompressed', 'minifyScripts'],
  function() {
    return gulp
      .src(
        [
          'src/css/main.css',
          'src/*.html',
          'src/js/index.js',
          'src/img/**',
          'src/fonts/**',
          'src/manifest.webmanifest'
        ],
        {
          base: './src'
        }
      )
      .pipe(gulp.dest('dist'));
  }
);

// Watch tasks
gulp.task('watchJS', function(done) {
  reload();
  done();
});

gulp.task('watchPug', function() {
  gulp.watch('src/templates/*.pug', ['pug']);
});

gulp.task('serve', ['compileSass', 'pug'], function() {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
  gulp.watch('stylesheets/**/*.scss', ['compileSass']);
  gulp.watch('js/index.js', ['watchJS']);
  gulp.watch('src/templates/*.pug', ['pug']);
  gulp.watch('*.html').on('change', reload);
});

gulp.task('pug', function(cb) {
  pump(
    [
      gulp.src('./src/templates/*.pug'),

      pug({
        pretty: true
      }),

      gulp.dest('src')
    ],
    cb
  );
});

gulp.task('bundle-sw', () => {
  return wbBuild
    .generateSW({
      globDirectory: './dist/',
      swDest: './dist/sw.js',
      globPatterns: ['**/*.{html,js,css,webp,jpg,png,svg,woff2}'],
      globIgnores: ['admin.html']
    })
    .then(() => {
      console.log('Service worker generated.');
    })
    .catch(err => {
      console.log('[ERROR] This happened: ' + err);
    });
});

gulp.task('default', ['deploy']);
