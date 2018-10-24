const template = require("art-template");
const fs = require("fs");
const cuid = require("cuid");

function Dialog() {
  this.title = "提示";
  const mainId = cuid();
  this.getuuid = function(params) {
    return mainId;
  };

  let _document = null;
  this.template = "";

  function init(title) {
    const data = fs.readFileSync("./templdate/dialog.html", "utf-8");
    const html = template.render(data, {
      title: title,
      mainId: mainId
    });
    _document = document.createElement("div");
    _document.className = "dialog";
    _document.innerHTML = html;
    document.body.append(_document);
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

  bindEvent = bindEvent.bind(this);

  this.getData = null;
  this.onSubmit = null;

  // 显示
  this.show = function() {
    init(this.title);

    const data = fs.readFileSync(this.template, "utf-8");
    const html = template.render(data, {
      ...this.getData(mainId),
      cancle: "cancle_" + mainId,
      submit: "submit_" + mainId
    });
    const div = document.createElement("div");
    div.className = "main-container";
    div.innerHTML = html;
    document.getElementById(mainId).append(div);

    const cancleTarget = document.getElementById("cancle_" + mainId);
    const submitTarget = document.getElementById("submit_" + mainId);
    let formEvent = function(uuid, e) {
      switch (uuid) {
        case "cancle":
          this.close();
          break;
        case "submit":
          submit();
          break;
        default:
          break;
      }
      e.preventDefault();
    };

    formEvent = formEvent.bind(this);

    // 绑定提交，取消事件
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
      formEvent
    );
  };

  // 关闭
  this.close = function() {
    _document.remove();
  };

  function submit(onSubmit) {
    this.onSubmit && this.onSubmit();
  }
  submit = submit.bind(this);
}

module.exports = Dialog;
