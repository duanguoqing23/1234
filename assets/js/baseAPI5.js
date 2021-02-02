$(function () {
  $.ajaxPrefilter(function (option) {
    option.url = "http://ajax.frontend.itheima.net" + option.url;
    if (option.url.includes("/my/")) {
      option.headers = {
        Authorization: localStorage.getItem("token"),
      };
    }
  });
});
