/**
 * bemtree-to-html
 * =================
 *
 * Собирает *html*-файл с помощью *bemtree* и *bemhtml*.
 *
 * **Опции**
 *
 * * *String* **bemhtmlTarget** — Исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
 * * *String* **bemtreeTarget** — Исходный BEMJSON-файл. По умолчанию — `?.bemtree.js`.
 * * *String* **destTarget** — Результирующий HTML-файл. По умолчанию — `?.html`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb/techs/html-from-bemjson'));
 * ```
 */
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('bemtree-to-html')
    .target('target', '?.html')
    .useSourceFilename('bemtree', '?.bemtree.js')
    .useSourceFilename('bemhtml', '?.bemhtml.js')
    .builder(function(bemtreeFilename, bemhtmlFilename) {
        dropRequireCache(require, bemtreeFilename);
        dropRequireCache(require, bemhtmlFilename);

        var BEMTREE = require(bemtreeFilename).BEMTREE,
            BEMHTML = require(bemhtmlFilename).BEMHTML;

        return BEMHTML.apply(BEMTREE.apply({ block: 'root' }));
    })
    .createTech();
