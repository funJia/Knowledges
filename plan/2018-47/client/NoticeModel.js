function NoticeModel() {
  this.type = "";
  this.isPopup = false;
  this.content = "";
  this.missing = 0;
  this.noadudit = 0;
  this.full = 0;
  this.abnormal = 0;
  this.placeholder = 0;
  this.orderNumber = "";
  this.dataUrl = "";
  this.goTime = "";
  this.orderStatus = "";
  this.loading = 0;
  this.file = "";
  this.to = "";
  this.form = "";
  this.attachment = "";
  this.is_read = "";
  this.mid = "";
}

// 浏览器消息模型
function BrowserNoticeModel() {
  this.tag = "";
  this.title = "";
  this.body = "";
  this.icon = "";
  this.handle = "";
}
