// 异常订单消息

class AbnormalNotice {
  // // 遗漏订单
  // this.missing=0;
  // // 待审核订单
  // this.noadudit=0;
  // // 满员订单
  // this.full=0;
  // // 异常订单
  // this.abnormal=0;
  // // 占位订单
  // this.placeholder=0;
  constructor(title, missing, noadudit, full, abnormal, placeholder) {
    this.type = 2;
    this.isPopup = true;
    this.title = title;
    this.missing = missing;
    this.noadudit = noadudit;
    this.full = full;
    this.abnormal = abnormal;
    this.placeholder = placeholder;
  }
}

module.exports = AbnormalNotice;
