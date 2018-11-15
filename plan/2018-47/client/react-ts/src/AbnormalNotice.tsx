import * as React from "react";
import NoticeModel from "./NoticeModel";
import { notification } from "antd";
// 通知模板公共配置
import { icon_fontSize, icon_bgColor, notice_duration } from "./tmpVariable";

// 异常消息
class AbnormalNotice {
  static show(data: NoticeModel) {
    const stData = [
      { title: "遗漏订单", num: data.missing },
      { title: "待审核订单", num: data.noadudit },
      { title: "满员订单", num: data.full },
      { title: "异常订单", num: data.abnormal },
      { title: "占位订单", num: data.placeholder }
    ];

    const row: any = [];
    let itemTemp: any = [];
    stData.forEach((element, index) => {
      itemTemp.push(
        <span className="item__data" key={index}>
          {element.title}：<a href="javascript:void(0)">{element.num}</a>
        </span>
      );
      if (index != 0 && (index + 1) % 2 === 0) {
        row.push(
          <div className="detail-item" key={row.length + 1}>
            {itemTemp}
          </div>
        );
        itemTemp = [];
      }
    });

    if (itemTemp.length != 0) {
      row.push(
        <div className="detail-item" key={row.length + 1}>
          {itemTemp}
        </div>
      );
    }
    notification.open({
      message: <span>{data.title}</span>,
      duration: notice_duration,
      description: (
        <div className="abnormal-notice">
          <div>你的订单：</div>
          <div className="order-detail">{row}</div>
        </div>
      ),
      icon: (
        <i
          className="action-user action-jinggao"
          style={{ color: icon_bgColor, fontSize: icon_fontSize }}
        />
      )
    });
  }
}

export default AbnormalNotice;
