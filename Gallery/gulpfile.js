const gulp = require('gulp');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const order = require('gulp-order')

const config = {
    html: {
        devScriptsPattern: /(<!--SCRIPTS_START-->)[^!]+(<!--SCRIPTS_END-->)/gim,
        src: ['src/*.html'],
        dist: 'dist/'
    },
    js: {
        bundleName: 'bundle.js',
        src: ['src/**/*.js'],
        dist: 'dist/js'
    }
}

gulp.task('html', () => {
    return gulp.src(config.html.src)
        .pipe(replace(config.html.devScriptsPattern, ''))
        .pipe(replace('app.js', 'js/bundle.min.js'))
        .pipe(gulp.dest(config.html.dist));
})

gulp.task('js', () => {
    return gulp.src(config.js.src)
        .pipe(order(['api/*.js', '**/*.js']))
        .pipe(concat(config.js.bundleName))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.js.dist))
})

gulp.task('default', gulp.series('js', 'html'))
