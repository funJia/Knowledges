// 加载模块
const nedb = require("nedb");

// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
  filename: "./data/link.db",
  autoload: true
});

const add = function(model) {
  db.insert(model),
    function(err, ret) {
      console.log("err", err);
      console.log("ret", ret);
    };
};

const getList = function(callback) {
  db.find({}, function(err, docs) {
    callback(docs);
  });
};

// 导出方法
module.exports = {
  add: add,
  getList: getList
};
