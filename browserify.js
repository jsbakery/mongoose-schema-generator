var fs = require('fs'),
    browserify = require('browserify');

var builder = browserify({
    entries: ['./src/mongoose-schema-generator.es6'],
    debug: true
}).transform("babelify", {presets: ["es2015"], sourceMaps: false});

builder.bundle(function (err, buff) {
    if(err){
        console.log(err);
    } else {
        fs.writeFile('./dist/mongoose-schema-generator.js', buff.toString(), function () {
            console.log("BUILD COMPLETE");
        });
    }
});