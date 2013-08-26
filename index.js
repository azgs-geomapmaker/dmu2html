#!/usr/bin/env node

var argv = require('optimist')
    .alias('i', 'inFile')
    .demand('i')
    .alias('o', 'outFile')
    .default('o', 'dmu.html')
    .argv,

    fs = require('fs'),
    csv = require('csv'),
    _ = require('underscore'),
    headings = {},
    context = { dmu: [] };

function delimit(content) {
    var cut = /[^\d]/.exec(content)
        final = [];
    if (cut) {
        content.split(cut[0]).forEach(function (piece) {
            final.push(Number(piece));
        });
        return final;
    } else {
        return [Number(content)];
    }
}

function row2data(row) {
    var out = {};

    for (field in headings) {
        out[field] = row[headings[field]];
    }

    out.color = delimit(out.areafillrgb) || [];
    out.hierarchy = delimit(out.hierarchykey) || [];
    out.isHeading = out.paragraphstyle.toLowerCase().indexOf("heading") !== -1;
    return out;
}

csv()
    .from.path(argv.inFile)

    .on('record', function (row, index) {
        if (index === 0) {
            row.forEach(function (heading, i) {
                headings[heading.toLowerCase()] = i;
            });
            return;
        }
        context.dmu.push(row2data(row));
    })


    .on('end', function () {
        context.dmu = _.sortBy(context.dmu, 'hierarchykey');

        fs.readFile('template.html', function (err, content) {
            fs.writeFile(argv.outFile, _.template(content.toString(), context));
        });
    });