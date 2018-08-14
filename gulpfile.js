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
const browserSync = require('browser-sync');
const spa = require("browser-sync-spa");
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
    .pipe(gulp.dest('build/js'));
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
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('compressSass', function(cb) {
  pump(
    [
      gulp.src('src/stylesheets/main.scss'),
      sass({ outputStyle: 'compressed' }),
      autoprefix(),
      gulp.dest('build/css')
    ],
    cb
  );
});

gulp.task('pugCompressed', function(cb) {
  pump([gulp.src('src/templates/*.pug'), pug(), gulp.dest('build')], cb);
});

gulp.task('clean', function(cb) {
  return del(['dist', 'build']);
});

gulp.task(
  'deploy',
  ['clean', 'copy', 'compressSass', 'pugCompressed', 'minifyScripts'],
  function() {
    return gulp
      .src(
        [
          'build/css/main.css',
          'build/*.html',
          'build/js/index.js',
          'build/img/**',
          'build/fonts/**',
          'build/manifest.webmanifest'
        ],
        {
          base: './build'
        }
      )
      .pipe(gulp.dest('dist'));
  }
);

gulp.task('copy', function() {
  return gulp.src([
    'src/fonts/**',
    'src/img/**',
    'src/manifest.webmanifest'
  ],
  {
    base: './src'
  }).pipe(gulp.dest('build'))
})

// Watch tasks
gulp.task('watchJS', ['minifyScripts'], function(done) {
  reload();
  done();
});

gulp.task('watchPug', function() {
  gulp.watch('src/templates/*.pug', ['pug']);
});

gulp.task('serve', ['copy', 'compileSass', 'pug', 'minifyScripts'], function() {
  browserSync.use(spa({
    // Options to pass to connect-history-api-fallback.
    // If your application already provides fallback urls (such as an existing proxy server),
    // this value can be set to false to omit using the connect-history-api-fallback middleware entirely.
    history: {
        index: '/index.html'
    }
  }));

  browserSync({
    open: false,
    server: 'build',
    files: "build/*"
  });
  
  gulp.watch('src/stylesheets/**/*.scss', ['compileSass']);
  gulp.watch('src/index.js', ['watchJS']);
  gulp.watch('src/templates/*.pug', ['pug']);
  gulp.watch('build/*.html').on('change', reload);
});

gulp.task('pug', function(cb) {
  pump(
    [
      gulp.src('./src/templates/*.pug'),

      pug({
        pretty: true
      }),

      gulp.dest('build')
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
