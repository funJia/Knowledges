class NoticeModel {
  type: string;
  isPopup: boolean;
  title: string;
  content: string;
  missing: number;
  noadudit: number;
  full: number;
  abnormal: number;
  placeholder: number;
  orderNumer: string;
  dataUrl: string;
  goTime: string;
  orderStatus: string;
  loading: number;
  file: string;
  to: string;
  form: string;
  attachment: string;
  is_read: string;
  mid: string;

  constructor(params) {
    this.type = "";
    this.isPopup = false;
    this.title = "";
    this.content = "";
    this.missing = 0;
    this.noadudit = 0;
    this.full = 0;
    this.abnormal = 0;
    this.placeholder = 0;
    this.orderNumer = "";
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
}

export default NoticeModel;
