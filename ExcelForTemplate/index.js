const ejsexcel = require("ejsExcel");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

(async function() {
  //获得Excel模板的buffer对象
  const exlBuf = await readFileAsync("./temp1.xlsx");
  //数据源
  // const data = [
  //   [{ dpt_des: "开发部", doc_dt: "2013-09-09", doc: "a001" }],
  //   [
  //     { pt: "pt1", des: "des1", due_dt: "2013-08-07", des2: "2013-12-07" },
  //     { pt: "pt1", des: "des1", due_dt: "2013-09-14", des2: "des21" }
  //   ]
  // ];
  const data = {
    dpt_des: "      测试"
  };
  //用数据源(对象)data渲染Excel模板
  const exlBuf2 = await ejsexcel.renderExcel(exlBuf, data);
  await writeFileAsync(Date.now() + ".xlsx", exlBuf2);
  console.log("生成test2.xlsx");
})();
