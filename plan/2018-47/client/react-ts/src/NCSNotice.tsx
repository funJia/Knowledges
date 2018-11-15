import * as React from "react";
import NoticeModel from "./NoticeModel";
import { notification } from "antd";
import renderHtml from "./convertDraftToHtml";
// 通知模板公共配置
import { icon_fontSize, icon_bgColor, notice_duration } from "./tmpVariable";

// 客服消息
class NCSNotice {
  static show(data: NoticeModel) {
    const renderContent = content => {
      return renderHtml(content);
    };

    notification.open({
      message: <span>{data.title}</span>,
      duration: notice_duration,
      description: (
        <div className="ncs-notice">
          <a href="javascript:void(0)">{data.form}@了你</a>
          <div className="ncs-content">{renderContent(data.content)}</div>
        </div>
      ),
      icon: (
        <i
          className="action-user action-tubiao15"
          style={{ color: icon_bgColor, fontSize: icon_fontSize }}
        />
      )
    });
  }
}

export default NCSNotice;
