$(function () {
  $("#link_reg").on("click", function () {
    $(".reg-box").show();
    $(".login-box").hide();
  });
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (value !== pwd) {
        return "两次输入不一样";
      }
    },
  });
});
