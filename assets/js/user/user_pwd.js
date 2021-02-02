$(function () {
  //1.数据合法性
  layui.form.verify({
    pwd: [/^[\S]{1,12}$/, "密码必须6到12位，且不能为空格"],
    samePwd: function (value) {
      if (value === $("[name=oldPwd").val()) {
        return "新旧密码不能一致";
      }
    },
    rePwd: function (value) {
      if (value === $("[name=newPwd").val()) {
        return "两次输入密码不一致";
      }
    },
  });

  //2.提交数据
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layui.layer.msg("更新密码失败");
        layui.layer.msg("更新密码成功");
        $(this).get(0).reset();
      },
    });
  });
});
