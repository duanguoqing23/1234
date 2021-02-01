$(function () {
  //点击去注册账号
  $("#link_reg").on("click", function () {
    $(".reg-box").show();
    $(".login-box").hide();
  });

  //点击去登录
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  //从layui中获取form对象
  var form = layui.form;

  //通过form.verify() 自定义校验规则
  form.verify({
    //自定义pwd规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //检验两次密码是否一致
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (value !== pwd) {
        return "两次输入不一样";
      }
    },
  });

  //3实现注册功能
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data,
      success(res) {
        if (res.status !== 0) {
          return layer.msg("用户名已经被使用,请更换用户名", { icon: 5 });
        }
        layer.msg("注册成功", { icon: 6 });
        $(".reg-box #link_login").click();
      },
    });
  });

  //4.实现登录功能
  $("#form_login").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success(res) {
        console.log(res);
        if (res.status !== 0) layer.msg(res.massage);

        //将返回的token保存在本地储存里面
        localStorage.setItem("token", res.token);

        //登录成功后跳转首页
        location.herf = "/index.html";
      },
    });
  });
});
