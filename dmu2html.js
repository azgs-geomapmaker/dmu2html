var csv = require('csv'),
    _ = require('underscore'),
    request = require('request'),
    headings = {},
    context = { dmu: [] };

function delimit(content) {
    var cut = /[^\d]/.exec(content),
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

module.exports = function (csvString, templateUrl, callback) {
    csv()
        .from(csvString)

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

            request(templateUrl, function (err, response, content) {
                callback(_.template(content, context));
            });
        });
};