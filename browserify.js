var fs = require('fs'),
    browserify = require('browserify'),
    watchify = require('watchify');

var builder = browserify({
        entries: ['./src/mongoose-schema-generator.es6'],
        debug: true,
        cache: {},
        packageCache: {},
        plugin: [watchify]
    }).transform("babelify", {presets: ["es2015"], sourceMaps: false}),
    bundle = function () {
        builder.bundle().pipe(fs.createWriteStream('./dist/mongoose-schema-generator.js'));
        console.log("BUILD COMPLETE");
    };

builder.on('update', bundle);
bundle();