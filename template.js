function jadeTemplate(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var __indent = [];
var oneUnit_mixin = function(unit){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('\n');
buf.push.apply(buf, __indent);
buf.push('<li class="description-container">');
if ( !unit.isHeading)
{
buf.push('\n  ');
buf.push.apply(buf, __indent);
buf.push('<svg>\n    ');
buf.push.apply(buf, __indent);
buf.push('<rect');
buf.push(attrs({ 'id':(unit.label + "-rect"), 'width':("60"), 'height':("60"), 'x':("5"), 'y':("5"), 'fill':("rgb(" + unit.color.join(",") + ")"), 'stroke':("#000"), 'stroke-width':("2px") }, {"id":false,"width":true,"height":true,"x":true,"y":true,"fill":false,"stroke":true,"stroke-width":true}));
buf.push('></rect>\n  ');
buf.push.apply(buf, __indent);
buf.push('</svg>\n  ');
buf.push.apply(buf, __indent);
buf.push('<div');
buf.push(attrs({ 'id':(unit.label + "-label"), "class": ('unit-label') }, {"id":false}));
buf.push('>');
var __val__ = unit.label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>\n  ');
buf.push.apply(buf, __indent);
buf.push('<div class="description">\n    ');
buf.push.apply(buf, __indent);
buf.push('<h3 class="description-title">');
var __val__ = unit.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h3><span>');
var __val__ = unit.description
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>\n  ');
buf.push.apply(buf, __indent);
buf.push('</div>');
}
else
{
buf.push('\n  ');
buf.push.apply(buf, __indent);
buf.push('<div class="heading">\n    ');
buf.push.apply(buf, __indent);
buf.push('<h2 class="heading-title">');
var __val__ = unit.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h2>\n  ');
buf.push.apply(buf, __indent);
buf.push('</div>');
}
buf.push('\n  ');
buf.push.apply(buf, __indent);
buf.push('<div class="clear-float"></div>\n  ');
buf.push.apply(buf, __indent);
buf.push('<ul>');
// iterate unit.children
;(function(){
  if ('number' == typeof unit.children.length) {

    for (var key = 0, $$l = unit.children.length; key < $$l; key++) {
      var sub = unit.children[key];

__indent.push('    ');
oneUnit_mixin(sub);
__indent.pop();
    }

  } else {
    var $$l = 0;
    for (var key in unit.children) {
      $$l++;      var sub = unit.children[key];

__indent.push('    ');
oneUnit_mixin(sub);
__indent.pop();
    }

  }
}).call(this);

buf.push('\n  ');
buf.push.apply(buf, __indent);
buf.push('</ul>\n');
buf.push.apply(buf, __indent);
buf.push('</li>');
};
buf.push('<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Geologic Map Units</title>\n    <style type="text/css">\n      @font-face {\n          font-family: "FGDCGeoAge";\n          src: url(\'http://ncgmp09.github.io/dmu2html/fgdcgeo.ttf\');\n      }\n      \n      * {\n          margin: 0px;\n          padding: 0px;\n      }\n      \n      li {\n          list-style-type: none;\n      }\n      \n      svg {\n          width: 72px;\n          height: 72px;\n          position: relative;\n          float: left;\n      }\n      \n      .unit-label {\n          font-family: "FGDCGeoAge";\n          position: absolute;\n          width: 60px;\n          height: 60px;\n          line-height: 60px;\n          text-align: center;\n          margin-top: 5px;\n          margin-left: 5px;\n      }\n      \n      .description {\n          margin-left: 88px;\n      }\n      \n      .description-container {\n          margin-top: 25px;\n          padding: 0px 25px;\n      }\n      \n      .description-title {\n          position: relative;\n          top: 5px;\n          margin-bottom: 10px;\n      }\n      \n      .clear-float { clear: both; }\n    </style>\n  </head>\n  <body>\n    <ul>');
// iterate structured
;(function(){
  if ('number' == typeof structured.length) {

    for (var key = 0, $$l = structured.length; key < $$l; key++) {
      var unit = structured[key];

__indent.push('      ');
oneUnit_mixin(unit);
__indent.pop();
    }

  } else {
    var $$l = 0;
    for (var key in structured) {
      $$l++;      var unit = structured[key];

__indent.push('      ');
oneUnit_mixin(unit);
__indent.pop();
    }

  }
}).call(this);

buf.push('\n    </ul>\n  </body>\n</html>');
}
return buf.join("");
}