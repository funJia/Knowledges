const db = require("./dal/db");

// 取消
function cancle() {
  window.close();
}

function submit(data) {
  db.add(data);
  // db.find({}, function(err, docs) {
  //   console.log(docs);
  // });
}

function getValue(id) {
  return document.getElementById(id).value;
}

// 绑定事件
function bindEvent(targets, method, callback) {
  if (targets instanceof Array) {
    targets.forEach(function(item) {
      item.target.addEventListener(method, function(e) {
        callback(item.uuid, e);
      });
    });
  } else {
    targets.addEventListener(method, callback);
  }
}

(function() {
  window.onload = function() {
    const cancleTarget = document.getElementById("cancle");
    const submitTarget = document.getElementById("submit");
    bindEvent(
      [
        {
          target: cancleTarget,
          uuid: "cancle"
        },
        {
          target: submitTarget,
          uuid: "submit"
        }
      ],
      "click",
      function(uuid, e) {
        switch (uuid) {
          case "cancle":
            cancle();
            break;
          case "submit":
            submit({ title: getValue("title"), addr: getValue("addr") });

            alert(JSON.stringify(window.opener.getList));
            window.close();
            break;
          default:
            break;
        }
        e.preventDefault();
      }
    );
  };
})();
