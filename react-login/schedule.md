| 功能           |   方法名称    | 说明                                                                  |                                     类型 |
| -------------- | :-----------: | --------------------------------------------------------------------- | ---------------------------------------: |
| 提交           |    submit     | window.submit 调用该方法会返回表单数据                                | Object {userName:"",password:"",code:""} |
| 刷新验证码     |  refreshCode  | 需要你提供一个刷新验证码的方法并赋值给 window.refreshCode             |                               Function() |
| 更新验证码图片 | updateCodeImg | 获得验证码后需要调用该方法 window.updateCodeImg(imgSrc)刷新验证码图片 |                         Function(imgSrc) |
| 消息提示       |      msg      | window.msg("Hello") 消息提醒                                          |                            Function(msg) |
| 二维码图片地址 |     setQR     | window.setQR(url) 设置二维码图片                                      |                            Function(url) |
