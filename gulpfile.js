var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var copy = require('gulp-copy');

var path = {
    js: './src/js/sw/a.js',
    html: './src/*.html',
    css:'./src/scss/**/*.scss',

}
gulp.task('default', defaultTask);

gulp.task('sass', function () {
    return gulp.src(path.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('js', () =>
    gulp.src(path.js)
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js/sw/'))
);

gulp.task('copy', function () {
    return gulp.src(path.html)
        .pipe(gulp.dest('./dist/'));
});

function defaultTask(done) {
    // place code for your default task here
    done();
}

gulp.task('watch', function () {
    gulp.watch(path.js, ['js']);
    gulp.watch(path.css, ['sass']);
    gulp.watch(path.html, ['copy']);
});
