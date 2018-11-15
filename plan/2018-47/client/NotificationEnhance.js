importScripts("./NoticeModel.js");
// 先检查浏览器是否支持
// if (!("Notification" in window)) {
//   alert("This browser does not support desktop notification");
// }

// 检查用户是否同意接受通知
// if (permission == "granted") {
//   permission = "granted";
//   // If it's okay let's create a notification
//   //new Notification("Hi there!");
//   // permission = "granted";
// }

// // 否则我们需要向用户获取权限
// else if (permission !== "denied") {
//   Notification.requestPermission(function(_permission) {
//     permission = _permission;
//   });
// }

function sendNotice(data) {
  // 系统登录通知
  if (data.type == 1 && data.isPopup && !data.to && !data.form) {
    showMsg(sysNotice(data));
  } else if (data.type == 2) {
    // 异常订单
    showMsg(abnormalNotice(data));
  } else if (data.type == 3) {
    // 满员订单
    showMsg(orderUpdNotice(data));
  } else if (data.type == 1 && data.form) {
    // 客服消息  xxx@你
    showMsg(ncsNotice(data));
  }
}

function showMsg(data) {
  var permission = Notification.permission;
  if (permission == "granted") {
    const notification = new Notification(data.title, {
      body: data.body,
      icon: data.icon
    });

    notification.onclick = data.handle || (() => {});
  }
}

// 系统消息
function sysNotice(data) {
  var bnm = new BrowserNoticeModel();
  bnm.title = data.date;
  bnm.body = data.content;
  bnm.icon = "./img/notice.png";
  bnm.tag = data.mid;
  bnm.handle = function() {
    // alert("haha");
  };
  return bnm;
}

// 格式化字符串
function formatText(len) {
  var array = [];
  for (var i = 0; i < len; i++) {
    array.push("  ");
  }
  return array.join("");
}

function getLen(text) {
  return text.toString().length;
}

function setRow(data1, data1Title, data2, data2Title) {
  return (
    data1Title +
    data1 +
    formatText(8 - getLen(data1) || 0) +
    data2Title +
    data2 +
    "\n"
  );
}

// 异常订单消息
function abnormalNotice(data) {
  var bnm = new BrowserNoticeModel();
  bnm.title = data.date;
  bnm.body =
    "你的订单：\n" +
    setRow(data.missing, "遗漏订单：", data.noadudit, "待审核订单：") +
    setRow(data.full, "满员订单：", data.abnormal, "异常订单：") +
    "占位订单：" +
    data.placeholder;
  bnm.icon = "./img/warning.png";
  bnm.tag = data.mid;
  bnm.handle = function() {
    // alert("haha");
  };
  return bnm;
}

// 订单更新消息 | 满员订单消息
function orderUpdNotice(data) {
  var bnm = new BrowserNoticeModel();
  bnm.title = data.date;
  bnm.body =
    "你的订单" +
    data.orderNumer +
    " 出发日期" +
    "\n" +
    data.goTime +
    "，供应商更新了订单状态为" +
    "\n" +
    data.orderStatus +
    "，请及时处理。";
  bnm.icon = "./img/warning.png";
  bnm.tag = data.mid;
  bnm.handle = function() {
    if (data.dataUrl) {
      location.href = data.dataUrl;
    }
  };
  return bnm;
}

// 客服消息
function ncsNotice(data) {
  var bnm = new BrowserNoticeModel();
  bnm.title = data.date;
  bnm.body = data.form + "@了你" + "\n" + data.content;
  bnm.icon = "./img/msg.png";
  bnm.tag = data.mid;
  return bnm;
}
