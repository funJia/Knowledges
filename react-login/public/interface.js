window.loginMg=(function(){
    return {        
        // 提交
        submit:function (formInfo,enableSubmit){
            console.log(formInfo);
            setTimeout(function(){
                //window.loginMg.successMsg("成功");
                window.loginMg.errorMsg("失败");
                enableSubmit();
            },1000);
        },
        // 刷新验证码
        refreshCode:function (cb){
            console.log("刷新验证码");
            // 更新验证码图片
            cb("http://admin.cattrip.net/user/validateCode?timestam="+Date.now());
        },
        // 更新验证码
        setCode:null,
        // 更新二维码图片
        setQR:null,
        // 消息提示
        successMsg:null,
        errorMsg:null,
        tabQr:null,
        tabAccount:null
    }
})();