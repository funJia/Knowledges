// 普通消息
class NormalNotice {
  type = 1;
  // 消息文本内容
  this.content="";
  // 消息唯一id
  this.mid="";
  constructor(content,mid){
    this.content=content;
    this.mid=mid;
  }
}

module.exports = NormalNotice;
