var csv = require('csv'),
    _ = require('underscore'),
    jade = require('jade'),
    headings = {},
    context = { dmu: [], structured: {} };

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

    out.color = delimit(out.areafillrgb);
    out.hierarchy = delimit(out.hierarchykey);
    out.isHeading = out.paragraphstyle.toLowerCase().indexOf("heading") !== -1;
    out.children = {};

    return out;
}

function populateStructured(index) {
    var these = _.filter(context.dmu, function (unit) {
        return unit.hierarchy.length === index + 1;
    });

    these.forEach(function (unit) {
        var appendTo = context.structured;
        for (var j = 0; j < unit.hierarchy.length - 1; j++) {
            appendTo = appendTo[unit.hierarchy[j]].children;
        }
        appendTo[unit.hierarchy[unit.hierarchy.length - 1]] = unit;
    });

    return these.length;
}

module.exports = function (csvString, jadeStr, callback) {
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

            var i = 0,
                leftovers = context.dmu.length;

            while (leftovers > 0) {
                leftovers = populateStructured(i);
                i++;
            }

            jade.render(jadeStr, _.extend({pretty: true}, context), function (err, html) { callback(html); });
        });
};