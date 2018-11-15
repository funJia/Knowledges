// 系统消息

class SysNotice {
  constructor(title, content) {
    this.type = 1;
    this.title = title;
    this.isPopup = true;
    this.content = content;
  }
}

module.exports = SysNotice;
