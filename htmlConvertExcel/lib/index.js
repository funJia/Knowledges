"use strict";

var _betterXlsx = require("better-xlsx");

var _betterXlsx2 = _interopRequireDefault(_betterXlsx);

var _juice = require("juice");

var _juice2 = _interopRequireDefault(_juice);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _lib = require("./lib");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = function(html, callback) {
  var options =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  _juice2.default.juiceResources(html, options.juice || {}, function(
    err,
    text
  ) {
    if (err) return callback(err);

    var file = new _betterXlsx2.default.File();
    var $ = _cheerio2.default.load(text);

    $("table").each(function(ti, table) {
      var name = $(table).attr("name") || `Sheet${ti + 1}`;
      var sheet = file.addSheet(name);
      var maxW = [];
      var offsets = [];
      $("tr", table).each(function(hi, th) {
        if (offsets[hi] === undefined) {
          offsets[hi] = 0;
        }
        var maxH = 20; // pt
        $("th, td", th).each(function(di, td) {
          var $td = $(td);
          var rs = parseInt($td.attr("rowspan"), 10) || 1;
          var cs = parseInt($td.attr("colspan"), 10) || 1;

          for (var r = 0; r < rs; r++) {
            for (var c = 0; c < cs; c++) {
              sheet.cell(hi + r, offsets[hi] + c);
            }
          }

          var css = (0, _lib.css2style)($td.css());
          var fsize = (0, _lib.size2pt)(css.fontSize);
          // Row Height & Col Width
          if (css.height) {
            var pt = (0, _lib.size2pt)(css.height);
            if (pt > maxH) {
              maxH = pt / rs;
            }
          }
          if (css.width) {
            if (!maxW[di]) {
              maxW[di] = 10;
            }
            var tmp = (0, _lib.size2pt)(css.width) / fsize;
            if (maxW[di] < tmp) {
              maxW[di] = tmp / cs;
            }
          }
          var style = new _betterXlsx2.default.Style();
          // Font
          style.font.color = (0, _lib.color2argb)(css.color || "#000");
          style.font.size = fsize;
          style.font.name = css.fontFamily || "Verdana";
          style.font.bold = css.fontWeight === "bold";
          style.font.italic = css.fontStyle === "italic";
          style.font.underline = css.textDecoration === "underline";
          // Fill
          var bgColor = css.backgroundColor;
          if (bgColor) {
            style.fill.patternType = "solid";
            style.fill.fgColor = (0, _lib.color2argb)(bgColor);
          }
          // Border
          var left = (0, _lib.getBorder)(css, "left");
          if (left) {
            style.border.left = left.style;
            style.border.leftColor = left.color;
          }
          var right = (0, _lib.getBorder)(css, "right");
          if (right) {
            style.border.right = right.style;
            style.border.rightColor = right.color;
          }
          var top = (0, _lib.getBorder)(css, "top");
          if (top) {
            style.border.top = top.style;
            style.border.topColor = top.color;
          }
          var bottom = (0, _lib.getBorder)(css, "bottom");
          if (bottom) {
            style.border.bottom = bottom.style;
            style.border.bottomColor = bottom.color;
          }
          // Align
          var hMap = {
            left: "left",
            right: "right",
            center: "center",
            justify: "justify"
          };
          if (css.textAlign && hMap[css.textAlign]) {
            style.align.h = hMap[css.textAlign];
          }
          var vMap = {
            top: "top",
            bottom: "bottom",
            middle: "center"
          };
          if (css.verticalAlign && vMap[css.verticalAlign]) {
            style.align.v = vMap[css.verticalAlign];
          }
          // Cell
          var cell = sheet.cell(hi, offsets[hi]);
          // Set value type
          console.log("$td.text()", $td.text());
          var text = $td.text(); //$td.text().trim();
          var type = $td.attr("type") || $td.attr("data-type") || "";
          switch (type.toLowerCase()) {
            case "number":
              cell.setNumber(text);
              break;
            case "bool":
              cell.setBool(text === "true" || text === "1");
              break;
            case "formula":
              cell.setFormula(text);
              break;
            case "date":
              cell.setDate((0, _moment2.default)(text).toDate());
              break;
            case "datetime":
              cell.setDateTime((0, _moment2.default)(text).toDate());
              break;
            default:
              cell.value = text;
          }
          cell.style = style;

          if (rs > 1) {
            cell.vMerge = rs - 1;
          }
          if (cs > 1) {
            cell.hMerge = cs - 1;
          }

          for (var _r = 0; _r < rs; _r++) {
            if (offsets[hi + _r] === undefined) {
              offsets[hi + _r] = 0;
            }
            offsets[hi + _r] += cs;
          }
        });
        sheet.rows[hi].setHeightCM(maxH * 0.03528);
      });
      // Set col width
      for (var i = 0; i < maxW.length; i++) {
        var w = maxW[i];
        if (w) {
          sheet.col(i).width = w;
        }
      }
    });

    callback(null, file);
  });
};
