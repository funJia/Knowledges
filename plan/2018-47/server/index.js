const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8083 });

const SysNotice = require("./notice/sysNotice");
const AbnormalNotice = require("./notice/abnormalNotice");
const OrderUpdNotice = require("./notice/orderUpdNotice");
const NCSNotice = require("./notice/ncsNotice");

// 监听连接
wss.on("connection", function connection(ws) {
  // 监听客户端发过来的消息
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  const data = new SysNotice("8月1日 15:36", "通知：你有3条未读消息。");
  const data2 = new AbnormalNotice(
    "8月1日 15:36",
    100000,
    60000,
    3330,
    23333310,
    10
  );
  const data3 = new OrderUpdNotice(
    "8月1日 15:36",
    "T1999833100000",
    "https://www.baidu.com",
    "2018-11-19",
    "预定满员"
  );
  const data4 = new NCSNotice(
    "8月1日 15:36",
    "你有一个明天出行的急单还未下单，淘宝账号：hah2，请尽快下单哦。",
    "",
    "伍莹莹",
    "123"
  );

  // 图文消息
  const data5 = new NCSNotice(
    "8月1日 15:36",
    `{
      "blocks": [{
        "key": "ci1qs",
        "text": "通知：培训资料已更新，详情见附件。",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }, {
        "key": "9jotg",
        "text": " ",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 1,
          "key": 0
        }],
        "data": {}
      }, {
        "key": "7827c",
        "text": " ",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 1,
          "key": 1
        }],
        "data": {}
      }, {
        "key": "vpdv",
        "text": " ",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 1,
          "key": 2
        }],
        "data": {}
      }, {
        "key": "ekgbv",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {
        "0": {
          "type": "txt",
          "mutability": "IMMUTABLE",
          "data": {
            "src": "http://t2.hddhhn.com/uploads/tu/201610/198/53qyx0kkory.jpg",
            "title": "客户资料"
          }
        },
        "1": {
          "type": "image",
          "mutability": "IMMUTABLE",
          "data": {
            "src": "http://t2.hddhhn.com/uploads/tu/201610/198/53qyx0kkory.jpg",
            "title": ""
          }
        },
        "2": {
          "type": "url",
          "mutability": "IMMUTABLE",
          "data": {
            "src": "http://localhost:3001/app/orderList",
            "title": ""
          }
        }
      }
    }    
    `,
    "",
    "伍莹莹",
    "123"
  );

  // 发送消息到客户端
  ws.send(JSON.stringify({ data: data }));
  ws.send(JSON.stringify({ data: data2 }));
  ws.send(JSON.stringify({ data: data3 }));
  ws.send(JSON.stringify({ data: data4 }));
  ws.send(JSON.stringify({ data: data5 }));

  const array = [data, data2, data3, data4];

  setInterval(() => {
    // const index = Math.round(Math.random() * 3);
    // ws.send(JSON.stringify(array[index]));
    try {
      ws.send(JSON.stringify({ data: data }));
      ws.send(JSON.stringify({ data: data2 }));
      ws.send(JSON.stringify({ data: data3 }));
      ws.send(JSON.stringify({ data: data4 }));
      ws.send(JSON.stringify({ data: data5 }));
    } catch (error) {}
  }, 30000);
});
