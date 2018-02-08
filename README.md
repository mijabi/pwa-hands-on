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

## sw-offline-service-worker

```
% npm install -D sw-offline-google-analytycs
```

以下を sw.js の冒頭に concat（service worker fetch イベントの前）
```
importScripts('js/sw-offline-google-analytics.js');
goog.offlineGoogleAnalytics.initialize();
```

sw-offline-google-analytics.js は、  
node_modules/sw-offline-google-analytics/build/importScripts/sw-offline-google-analytics.prod.*.js  
から取得し、適宜 deploy する  
```
% npm run build
```