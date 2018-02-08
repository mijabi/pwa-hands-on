# pwa-hands-on npm ver

ファイル更新した後、sw-precache 実行で、更新ファイルの cacheID のみ更新されるのを確認する用。


```
% npm init
% npm install -D node-sass sw-precache
```

Service Worker JS の生成。  
run-sw-precache.js
```
const precache = require('sw-precache');
const home = 'dist';

precache.write(`${home}/sw.js`, {
    cacheId: 'yourCacheId', // CacheStorage 保存時の名称の一部に使われる。staticFileGlobs 用プロパティ
    verbose: true, // build 時にログを表示。staticFileGlobs 用プロパティ
    stripPrefix: `${home}/`,
    staticFileGlobs: [
        // `${home}/**/*.html`,
        `${home}/css/**/*.css`
        // `${home}/img/sw/*.{gif,png,jpg}`,
        // `${home}/js/**/*.js`
    ],
    runtimeCaching: [{
        urlPattern: /https:\/\/x\.gnst\.jp\//,
        handler: 'cacheFirst',
        options: {
            cache: {
                maxEntries: 50, // 最大ファイル数
                name: 'thumbnail-cache', // runtimeCaching でCacheStorageにキャッシュする際の名称の一部に使われる
                maxAgeSeconds: 60 * 30 // キャッシュする期間（秒
            }
        }
    }]
}, () => {});
```
staticFileGlobs でプリキャッシュ  
runtimeCaching でリクエストをキャッチしてキャッシュ  
キャッシュ後に再度アクセスが発生した際は、Service Worker 経由でキャッシュファイルが配信される。  
```
% node run-sw-precache
or
% npm run build
```
