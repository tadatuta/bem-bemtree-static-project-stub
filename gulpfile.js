var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    mkdirp = require('mkdirp'),
    enb = require('enb'),
    dropRequireCache = require('enb/lib/fs/drop-require-cache'),

    bundleName = 'index',
    pathToBundle = path.join('desktop.bundles', bundleName),
    bemtreeFilename = path.resolve(pathToBundle, bundleName + '.bemtree.js'),
    bemhtmlFilename = path.resolve(pathToBundle, bundleName + '.bemhtml.js'),
    modelFilename = path.resolve('data', 'data.js'),
    outputFolder = 'output';

gulp.task('make', function() {
    return enb.make();
});

gulp.task('static', function() {
    return gulp
        .src('desktop.bundles/index/*.min.*')
        .pipe(gulp.dest(outputFolder));
});

gulp.task('generate', function(done) {
    dropRequireCache(require, bemtreeFilename);
    dropRequireCache(require, bemhtmlFilename);
    dropRequireCache(require, modelFilename);

    var model = require(modelFilename),
        BEMTREE = require(bemtreeFilename).BEMTREE,
        BEMHTML = require(bemhtmlFilename).BEMHTML;

    model.forEach(function(page) {
        var pageFolder = path.join(outputFolder, page.url);
        mkdirp.sync(pageFolder);
        fs.writeFileSync(path.join(pageFolder, 'index.html'), BEMHTML.apply(BEMTREE.apply({
            block: 'root',
            data: page
        })));
    });

    done();
});

gulp.task('watch', function() {
    gulp.watch('data/*', gulp.series('static', 'generate'));
    gulp.watch('common.blocks/**', gulp.series('default'));
});

gulp.task('clean', function() {
    return del(outputFolder);
})

gulp.task('default', gulp.series('make', 'static', 'generate', 'watch'));
