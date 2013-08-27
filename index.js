#!/usr/bin/env node

var argv = require('optimist')
    .alias('i', 'inFile')
    .demand('i')
    .alias('o', 'outFile')
    .default('o', 'dmu.html')
    .alias('t', 'templateFile')
    .default('t', 'http://ncgmp09.github.io/dmu2html/template.jade')
    .argv,

    fs = require('fs'),
    request = require('request'),
    dmu2html = require('./dmu2html'),

    inFile = fs.createReadStream(argv.inFile);

if (fs.existsSync(argv.templateFile)) {
    fs.readFile(argv.templateFile, function (err, content) {
        dmu2html(inFile, content, function (html) {
            fs.writeFile(argv.outFile, html);
        });
    });
} else {
    request(argv.templateFile, function (err, response, content) {
        dmu2html(inFile, content, function (html) {
            fs.writeFile(argv.outFile, html);
        });
    });
}