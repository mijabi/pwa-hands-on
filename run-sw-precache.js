const precache = require('sw-precache');
const home = 'dist';

precache.write(`dev/sw.js`, {
// precache.write(`${home}/sw.js`, {
        cacheId: 'yourCacheId',
    verbose: true,
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
                maxEntries: 50,
                name: 'thumbnail-cache',
                maxAgeSeconds: 60 * 30
            }
        }
    }]
}, () => {});