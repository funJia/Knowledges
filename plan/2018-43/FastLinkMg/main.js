const db = require("./dal/db.js");
const template = require("art-template");
const fs = require("fs");
const path = require("path");
const Dialog = require("./widget/dialog.js");

function getValue(id) {
  return document.getElementById(id).value;
}

function add() {
  // window.open("./form.html");
  const dialog = new Dialog();
  dialog.template = "./templdate/form.html";
  dialog.getData = function() {
    const uuid = dialog.getuuid();
    return {
      title: "title_" + uuid,
      addr: "addr_" + uuid
    };
  };
  dialog.onSubmit = function(params) {
    const uuid = dialog.getuuid();
    const form = {};
    form.title = getValue("title_" + uuid);
    form.addr = getValue("addr_" + uuid);
    db.add(form);
    getList();
    dialog.close();
  };
  dialog.show();
}

function down() {
  db.getList(function(docs) {
    const data = fs.readFileSync("./templdate/linkPage.html", "utf-8");
    const html = template.render(data, { data: docs });
    fileDownload(html, "index.html", "text/html");
  });
}

function fileDownload(data, filename, mime) {
  var blob = new Blob([data], { type: mime || "application/octet-stream" });
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var blobURL = window.URL.createObjectURL(blob);
    var tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
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

function getList() {
  db.getList(function(docs) {
    const data = fs.readFileSync("./templdate/link.html", "utf-8");
    const html = template.render(data, { data: docs, id: "linkDelete" });
    const listContainer = document.getElementById("listContainer");
    listContainer.innerHTML = html;

    const targets = [];
    document.querySelectorAll(".linkDelete").forEach(function(target) {
      targets.push({ target: target });
    });

    bindEvent(targets, "click", function(uuid, e) {
      const id = e.target.getAttribute("data-id");
      db.removeById(id, function(err, numRemoved) {
        // 删除成功， 刷新列表
        if (numRemoved > 0) {
          getList();
        }
      });
    });
  });
}

(function() {
  window.onload = function() {
    getList();
  };
})();
