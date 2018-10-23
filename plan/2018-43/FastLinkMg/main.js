const db = require("./dal/db.js");
const template = require("art-template");
const fs = require("fs");

function add() {
  window.open("./form.html");
}

function getList() {
  db.getList(function(docs) {
    const data = fs.readFileSync("./templdate/link.html", "utf-8");
    const html = template.render(data, { data: docs });
    const listContainer = document.getElementById("listContainer");
    listContainer.innerHTML = html;
  });
}

(function() {
  window.onload = function() {
    getList();
  };
})();
