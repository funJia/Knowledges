const ejsexcel = require("ejsExcel");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = async function(data, cb) {
  //获得Excel模板的buffer对象
  const exlBuf = await readFileAsync("./template/01.xlsx");
  //数据源
  // const data = [
  //   [{ dpt_des: "开发部", doc_dt: "2013-09-09", doc: "a001" }],
  //   [
  //     { pt: "pt1", des: "des1", due_dt: "2013-08-07", des2: "2013-12-07" },
  //     { pt: "pt1", des: "des1", due_dt: "2013-09-14", des2: "des21" }
  //   ]
  // ];

  const _data = {
    date: moment().format("YYYY年MM月DD日"),
    goods_01: {
      title: "打印、音响",
      data: [
        {
          name: "惠普激光一体打印机M1139",
          brand: "HP",
          num: 1,
          price: 1400,
          total: "1,400"
        },
        {
          name: "惠普彩色激光一体打印机 M176n",
          brand: "HP",
          num: 1,
          price: 3000,
          total: "3,000"
        },
        {
          name: "联想迷你多媒体音箱",
          brand: "联想",
          num: 8,
          price: 40,
          total: "320"
        }
      ]
    }
  };
  _data.goods_01.data = data;
  //用数据源(对象)data渲染Excel模板
  const exlBuf2 = await ejsexcel.renderExcel(exlBuf, _data);
  const file = Date.now() + ".xlsx";
  await writeFileAsync("./result/" + file, exlBuf2);

  cb && cb(file);
};
