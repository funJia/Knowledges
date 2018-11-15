// 客服消息
// 你发送的消息 你@刘巧叶
// 刘巧叶接收到的消息 李明@了你

class NCSNotice {
  // // 消息文本内容
  // this.content="";
  // // 发送给某客服
  // this.to="";
  // // 来至某客服
  // this.form="";
  // // 消息唯一id
  // this.mid="";
  // this.isPopup=false;
  constructor(title, content, to, form, mid) {
    this.type = 1;
    this.title = title;
    this.content = content;
    this.to = to;
    this.form = form;
    this.mid = mid;
    if (to) {
      this.isPopup = false;
    } else {
      this.isPopup = true;
    }
  }
}

module.exports = NCSNotice;
