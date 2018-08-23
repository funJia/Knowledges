const fs = require("fs");
//const htmlTo = require("html2xlsx");
const htmlTo = require("./lib");
const template = require("./template");

var data = fs.readFileSync("./style.css", "utf-8");
var tableTemplate = fs.readFileSync("./style.css", "utf-8");

const temp = {
  company: "   长沙驰速计算机有限公司"
};

htmlTo(
  `
  <style type="text/css">
  ${data}
  </style>
  ${template(temp)}
`,
  (err, file) => {
    if (err) return console.error(err);

    file
      .saveAs()
      .pipe(fs.createWriteStream(Date.now() + ".xlsx"))
      .on("finish", () => console.log("Done."));
  }
);
