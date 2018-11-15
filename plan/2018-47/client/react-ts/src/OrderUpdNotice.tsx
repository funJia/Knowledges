import * as React from "react";
import NoticeModel from "./NoticeModel";
import { notification } from "antd";
// 通知模板公共配置
import { icon_fontSize, icon_bgColor, notice_duration } from "./tmpVariable";

// 订单更新，满位订单状态变化
class OrderUpdNotice {
  static show(data: NoticeModel) {
    notification.open({
      message: <span>{data.title}</span>,
      duration: notice_duration,
      description: (
        <div className="orderUpd-notice">
          <div>
            你的订单
            <a href={data.dataUrl}>{data.orderNumer}</a>
            ，出发日期
            <a href="javascript:void(0)">{data.goTime}</a>
            ，供应商更新了订单状态为
            <a href="javascript:void(0)">{data.orderStatus}</a>， 请及时处理。
          </div>
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

export default OrderUpdNotice;
