$(function () {
  //获取文章类别
  function getArtCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        var artCateHtml = template("tpl-artCate", res);
        $("[name=cate_id]").html(artCateHtml);
        layui.form.render();
      },
    });
  }
  getArtCate();
  //富文本
  initEditor();

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  //点击选择封面
  $("#chooseCover").on("click", function () {
    $("#coverFile").click();
  });

  $("#coverFile").on("change", function (e) {
    var files = e.target.files;
    if (files.length <= 0) {
      return layer.msg("请选择图片");
    }
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //文章发布
  var state = "已发布";

  $("#btnSave").on("click", function (e) {
    e.preventDefault();
    state = "草稿";
    $(".layui-form").submit();
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    var fd = new FormData($(".layui-form")[0]);
    fd.append("state", state);
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append("cover_img", blob);
        pubArticle(fd);
      });
  });

  function pubArticle(fd) {
    $.ajax({
      method: "POST",
      url: "/my/article/add",
      contentType: false,
      processData: false,
      data: fd,
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.status);
        }
        layer.msg("操作成功");
        location.href = "/article/artList.html";
      },
    });
  }
});
