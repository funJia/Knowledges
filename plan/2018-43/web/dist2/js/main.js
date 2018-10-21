var inter = null,
    isLogin = false;

// 倒计时
function countDown() {
  var countDown = document.getElementById("countDown");
  var codeLink = document.getElementById("codeLink");
  countDown.setAttribute("class", "code-link count-down show");
  codeLink.setAttribute("class", "code-link hide");

  // 显示提示
  var desc = document.querySelector(".desc");
  desc.setAttribute("class", "desc");

  // 倒计时时长
  var num = 60;
  countDown.textContent = num + " 秒后可重发";
  inter = setInterval(function () {
    num--;
    if (num <= 0) {
      clearInterval(inter);
      inter = null;
      countDown.setAttribute("class", "code-link count-down hide");
      codeLink.setAttribute("class", "code-link show");
    }
    countDown.textContent = num + " 秒后可重发";
  }, 1000);
}

// 登录
function login() {
  // 验证数据是否有值
  var phone = validateField("phone"),
      code = validateField("code");
  if (phone && code) {
    var phone = document.getElementById("account").value,
        code = document.getElementById("code").value;
    if (phone && code) {
      // 登录代码
    }
  }

  isLogin = false;
}

// 给验证字符绑定事件
function bindTip() {
  var phoneTip = document.querySelector("[data-type='phone'] .error-tip"),
      codeTip = document.querySelector("[data-type='code'] .error-tip");

  phoneTip.addEventListener("click", function () {
    document.getElementById("account").focus();
    phoneTip.setAttribute("class", "error-tip hide");
    validateField("code");
  });

  codeTip.addEventListener("click", function () {
    document.getElementById("code").focus();
    codeTip.setAttribute("class", "error-tip hide");
    validateField("phone");
  });
}

// 验证数据
function validateField(field) {
  var phone = document.getElementById("account").value,
      code = document.getElementById("code").value;
  var phoneTip = document.querySelector("[data-type='phone'] .error-tip"),
      codeTip = document.querySelector("[data-type='code'] .error-tip");
  switch (field) {
    case "phone":
      if (!phone) {
        phoneTip.setAttribute("class", "error-tip show");
        return false;
      } else return true;
    case "code":
      if (!code) {
        codeTip.setAttribute("class", "error-tip show");
        return false;
      } else return true;
    default:
      return false;
  }
}

window.load = function () {
  (function () {
    var codeLink = document.getElementById("codeLink");
    var unableLogin = document.getElementById("unableLogin");
    var submit = document.getElementById("submit");
    // 无法登录事件 ，切换到手机号，登录页面
    unableLogin.addEventListener("click", function () {
      var formLogin = document.getElementById("form-login");
      formLogin.setAttribute("class", "form-login show");
      unableLogin.setAttribute("class", "hide");
      var account = document.getElementById("account");
      account.focus();

      // 发送验证码 事件
      codeLink.addEventListener("click", function () {
        if (!inter && validateField("phone")) countDown();
      });

      // 登录事件
      submit.addEventListener("click", function () {
        if (!isLogin) {
          isLogin = true;
          login();
        } else isLogin = false;
      });

      bindTip();
    });
  })();
};