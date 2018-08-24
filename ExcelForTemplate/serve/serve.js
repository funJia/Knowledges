//express_demo.js 文件
var express = require("express");
const exportExcel = require("../index.js");
var bodyParser = require("body-parser");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(express.bodyParser());
// app.use(express.static(path.join(__dirname, "result")));

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.use(express.static("result"));

app.post("/exportExcel", function(req, res) {
  exportExcel(JSON.parse(req.body.data), data => {
    res.set("Content-Type", "application/json");
    res.json({ data });
  });
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
