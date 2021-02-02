$(function () {
  $.ajaxPrefilter(function (option) {
    option.url = "http://ajax.frontend.itheima.net" + option.url;

    if (option.url.includes("/my")) {
      option.headers = {
        Authorization: localStorage.getItem("token") || "",
      };
    }

    option.complete = function (res) {
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === "身份认证失败！"
      ) {
        //1.清空token
        localStorage.removeItem("token");
        //2.跳转到login页面
        location.href = "/login.html";
      }
    };
  });
});
