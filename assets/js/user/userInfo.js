$(function () {
  //设置用户昵称表单验证
  layui.form.verify({
    nickname: [/^[\S]{1,6}$/, "用户名必须1到6位，且不能出现空格"],
  });

  //获取用户信息
  getUserInfo();

  //点击提交修改
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg("修改信息失败");
        }
        layer.msg("修改信息成功");
        window.parent.getUserInfo();
      },
    });
  });

  //点击重置按钮
  $(".layui-form").on("reset", function (e) {
    e.preventDefault();
    getUserInfo();
  });
});

//获取用户信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    success(res) {
      //通过layui方法填入数据
      layui.form.val("userInfo", res.data);
    },
  });
}
