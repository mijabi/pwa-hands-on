# sw-precache on gulp

## default gulpfile.js
```
var gulp = require('gulp');

gulp.task('default', defaultTask);

function defaultTask(done) {
    // place code for your default task here
    done();
}
```
## gulp sass
```
% npm install -D gulp-sass
```
gulpfile.js
```
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});
```
## babel
```
% npm install --D gulp-babel babel-core babel-preset-env
```
gulpfile.js
```
var babel = require('gulp-babel');

gulp.task('js', () =>
gulp.src('./src/js/sw/a.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js/sw/'))
);
```
## html copy
```
% npm insatll -D gulp-copy
```
gulpfile.js
```
var copy = require('gulp-copy');

gulp.task('copy', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});
```
## watch
```
gulp.task('watch', function () {
    gulp.watch('./src/js/sw/a.js', ['js']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/*.html', ['copy']);
});
```

## browser-sync
```
% npm install -D browser-sync
```
```
var browserSync = require('browser-sync').create();

function defaultTask(done) {
    gulp.run(['sass', 'js', 'copy', 'watch']);
    done();
}

gulp.task('browser-sync', function () {
    browserSync.init({
        open: true,
        port: 3004,
        https: true,
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('watch', ['browser-sync'], function () {
```

## ディレクトリと適当な html、sass、js ファイルを作成
```
% mkdir -p src/scss/sw src/js/sw src/img/sw
```
---
## npm install sw-precache
```zsh
% npm install -D sw-precache
```

### staticFileGLobs（プリキャッシュ
gulpfile.js
```
var precache = require('sw-precache');
```
```
gulp.task('generate-service-worker', function (callback) {
    const precache = require('sw-precache');
    const home = 'dist';
    precache.write(`${home}/sw.js`, {
        cacheId: 'yourCacheId',
        verbose: true,
        stripPrefix: `${home}/`,
        staticFileGlobs: [
            `${home}/**/*.html`,
            `${home}/css/sw/*.css`,
            `${home}/img/sw/*.{gif,png,jpg}`,
            `${home}/js/sw/*.js`
        ]
    }, () => {});
    return callback()

});
```
```
gulp.task('precache', ['generate-service-worker']);
```
```
gulp.task('sass', ['precache'], function () {

gulp.task('js', ['precache'], () =>

gulp.task('copy', ['precache'], function () {
```
```
% gulp precache
% gulp
```

### SW JS install

index.html
```
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // 登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // 登録失敗 :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
```

### runtimeCaching（ランタイムキャッシュ

gulpfile.js
```
gulp.task('generate-service-worker', function (callback) {
    const precache = require('sw-precache');
    const home = 'dist';
    precache.write(`${home}/sw.js`, {
        cacheId: 'yourCacheId',
        verbose: true,
        stripPrefix: `${home}/`,
        staticFileGlobs: [
            `${home}/**/*.html`,
            `${home}/css/sw/*.css`,
            `${home}/img/sw/*.{gif,png,jpg}`,
            `${home}/js/sw/*.js`
        ],
        runtimeCaching: [{
            urlPattern: /https:\/\/x\.gnst\.jp\//,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxEntries: 50,
                    name: 'cdn-cache',
                    maxAgeSeconds: 60 * 2
                }
            }
        }]
    }, () => {});
    return callback()
});
```
