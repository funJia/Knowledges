import { message } from "antd";

export const gio = (uri, onConnect, onDisConnect) => {
  let worker, onError, workerUri: any;
  let events: any = {};

  function guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const portId = guid();

  // function getKeys(obj: any) {
  //   const keys: any = [];

  //   for (const i in obj) {
  //     if (obj.hasOwnProperty(i)) {
  //       keys.push(i);
  //     }
  //   }

  //   return keys;
  // }

  function onMessage(type, message) {
    switch (type) {
      case "_connect":
        if (onConnect) onConnect();
        break;
      case "_disconnect":
        if (onDisConnect) onDisConnect();
        break;
      default:
        if (events[type]) events[type](message);
    }
  }
  function startWorker() {
    try {
      worker = new SharedWorker(workerUri, uri);
      worker.port.addEventListener(
        "message",
        function(event) {
          console.log("sharedworker PostMessage", event.data.type);
          onMessage(event.data.type, event.data.message);
        },
        false
      );

      worker.port.addEventListener(
        "syncCloseNotice",
        function(event) {
          console.log("sharedworker PostMessage", event);
          onMessage(event.data.type, event.data.message);
        },
        false
      );

      worker.onerror = function(evt) {
        if (onError) onError(evt);
      };

      worker.port.start();
      // 给port设置唯一Id
      worker.port.postMessage({
        type: "register",
        // events: getKeys(events),
        id: portId
      });
      // 注册message 事件
      worker.port.postMessage({
        type: "message",
        // events: getKeys(events),
        id: portId
      });
    } catch (error) {
      message.warn("您当前浏览器不支持消息推送功能");
    }
  }

  // function startSocketIo() {
  //     const socket = io(uri);
  //     socket.on('connect', function () {
  //         if (onConnect) onConnect();
  //     });

  //     socket.on('disconnect', function () {
  //         if (onDisConnect) onDisConnect();
  //     });

  //     for (const eventName in events) {
  //         if (events.hasOwnProperty(eventName)) {
  //             socket.on(eventName, socketOnEventHandler(eventName));
  //         }
  //     }
  // }

  // function socketOnEventHandler(eventName) {
  //     return function (e) {
  //         onMessage(eventName, e);
  //     };
  // }

  return {
    registerEvent: function(eventName, callback) {
      events[eventName] = callback;
    },
    // 发送消息
    postMessage: function(msg, type = "syncCloseNotice") {
      if (worker && portId) {
        worker.port.postMessage({
          type: type,
          // events: getKeys(events),
          id: portId,
          content: msg
        });
      }
    },
    start: function() {
      // if (!SharedWorker) {
      //     startSocketIo();
      // } else {
      startWorker();
      //}
    },

    onError: function(cbk) {
      onError = cbk;
    },

    setWorker: function(uri) {
      workerUri = uri;
    }
  };
};
