let gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    minify_css = require("gulp-minify-css"),
    plumber = require("gulp-plumber"),
    precss = require('precss'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    cssrename = require("gulp-rename"),
    del = require('del'),
    browserSync = require('browser-sync'); 


const paths = {
  root: './build',
  html: {
    src: 'dev/*.html',
    dest: 'build/',
  },
  styles: {
    src: 'dev/styles/*.css',
    dest: 'build/styles/',
  },
  scripts: {
    src: 'dev/js/*.js',
    dest: 'build/js/',
  },
  fonts: {
    src: 'dev/fonts/*.*',
    dest: 'build/fonts/',
  }
}

gulp.task('css', function () {
    const processors = [
      autoprefixer({browsers: ['last 2 version']}),
    ];
    return gulp.src(paths.styles.src)
      .pipe(postcss(processors))
      .pipe(minify_css())
      .pipe(cssrename({suffix: '.min'}))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
});

gulp.task('html', function () {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false
  })
});

gulp.task('watch',['browser-sync', 'css', 'js', 'fonts', 'html'], function(){
  gulp.watch('paths.style.src', browserSync.reload);
  gulp.watch('paths.scripts.src', browserSync.reload);
  gulp.watch('paths.fonts.src', browserSync.reload);
  gulp.watch('paths.html.src', browserSync.reload);
});
