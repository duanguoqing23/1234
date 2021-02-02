$(function () {
  getUserInfo();
});

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    success(res) {
      if (res.status !== 0) {
        // localStorage.removeItem("token");
        // location.assign("/login.html");
        return layer.msg("获取数据失败");
      }

      renderUserInfo(res.data);
    },
  });
}

function renderUserInfo(user) {
  var name = user.nickname || user.username;
  $(".welcome").html("欢迎&nbsp;" + name);

  if (user.user_pic !== null) {
    $(".layui-nav-img").prop("src", user.user_pic).show();
    $(".fontAvatar").hide();
  } else {
    $(".layui-nav-img").hide();
    $(".fontAvatar").html(name[0].toUpperCase()).show();
  }
}

getUserInfo();

//2.退出功能
$("#logout").on("click", function () {
  layui.layer.confirm(
    "确定是否退出",
    { icon: 3, title: "提示" },
    function (index) {
      localStorage.removeItem("token");
      location.assign("/login.html");

      layui.layer.close(index);
    }
  );
});
