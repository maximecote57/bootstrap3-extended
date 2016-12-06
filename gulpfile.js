'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');
var sassGlob = require('gulp-sass-glob');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "https://myevent.com"
    })
});

gulp.task('sass:page-compile', function () {

    return gulp.src('./css//master.scss')
        // log errors but don't crash watch when called by watch
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // convert foldername/* to all file name in the folder
        .pipe(sassGlob())
        // process scss files
        .pipe(sass())
        // minify the CSS
        .pipe(cleanCSS({
            processImport: false,
            rebase: false
        }))
        // add .min prefix
        .pipe(rename({suffix : '.min'}))
        // save the file
        .pipe(gulp.dest('./css'));

});


gulp.task('watch:page', function () {
    gulp.watch('./css/*.scss', ['sass:page-compile']);
});