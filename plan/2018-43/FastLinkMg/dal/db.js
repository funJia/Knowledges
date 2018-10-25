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
  db.find({})
    .sort({ _id: -1 })
    .exec(function(err, docs) {
      callback(docs);
    });
};

// 根据id删除一条记录
const removeById = function(id, callback) {
  db.remove({ _id: id }, {}, function(err, numRemoved) {
    callback(err, numRemoved);
  });
};

// 导出方法
module.exports = {
  add: add,
  getList: getList,
  removeById: removeById
};
