const pinyin = require("pinyin");

const Items = [
  {
    id: 1,
    name: "异常"
  },
  {
    id: 2,
    name: "加急"
  },
  {
    id: 3,
    name: "占位"
  },
  {
    id: 4,
    name: "售后"
  },
  {
    id: 5,
    name: "退款"
  },
  {
    id: 6,
    name: "测试"
  },
  {
    id: 7,
    name: "关闭"
  },
  {
    id: 8,
    name: "财务"
  },
  {
    id: 9,
    name: "打包"
  },
  {
    id: 14,
    name: "退差"
  },
  {
    id: 16,
    name: "群"
  }
];

// 生成枚举
const buildEnum = () => {
  const data = [...Items],
    enumItems = [];
  let tempName = "";
  for (const item of data) {
    tempName = pinyin(item.name, {
      style: pinyin.STYLE_NORMAL, // 设置拼音风格
      heteronym: false
      // segment: true
    }).join("");

    enumItems.push(`
    //${item.name}
    ${tempName}=${item.id}`);
  }

  const enumInfo = `enum E{
    ${enumItems.join()}
  }`;

  console.log(enumInfo);
};

buildEnum();
