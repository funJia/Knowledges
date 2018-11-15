import * as React from "react";
import NoticeModel from "./NoticeModel";
import { notification } from "antd";
// 通知模板公共配置
import { icon_fontSize, icon_bgColor, notice_duration } from "./tmpVariable";

// 系统消息
class SysNotice {
  static show(data: NoticeModel) {
    notification.open({
      message: <span>{data.title}</span>,
      duration: notice_duration,
      description: data.content,
      icon: (
        <i
          className="action-user action-tongzhi"
          style={{ color: icon_bgColor, fontSize: icon_fontSize }}
        />
      )
    });
  }
}

export default SysNotice;
