// 订单状态更新消息

class OrderUpdNotice {
  // type = 3;
  // isPopup = true;
  // // 订单号
  // this.orderNumer="";
  // // 订单链接
  // this.dataUrl="";
  // // 出发日期
  // this.goTime="";
  // // 订单状态
  // this.orderStatus="";
  constructor(title, orderNumer, dataUrl, goTime, orderStatus) {
    this.type = 3;
    this.isPopup = true;
    this.title = title;
    this.orderNumer = orderNumer;
    this.dataUrl = dataUrl;
    this.goTime = goTime;
    this.orderStatus = orderStatus;
  }
}

module.exports = OrderUpdNotice;
