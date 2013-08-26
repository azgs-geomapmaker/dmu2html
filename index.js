#!/usr/bin/env node

var argv = require('optimist')
    .alias('i', 'inFile')
    .demand('i')
    .alias('o', 'outFile')
    .default('o', 'dmu.html')
    .argv,

    fs = require('fs'),

    dmu2html = require('./dmu2html');

dmu2html(fs.createReadStream(argv.inFile), 'http://ncgmp09.github.io/dmu2html/template.txt', function (content) {
    fs.writeFile(argv.outFile, content);
});