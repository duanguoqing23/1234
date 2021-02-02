$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  //点击上传按钮
  $("#upload").on("click", function () {
    $("#file").click();
  });

  //获取上传列表
  $("#file").on("change", function (e) {
    var fileList = e.target.files;
    if (fileList.length <= 0) {
      return layer.msg("请上传一张图片");
    }
    layer.msg("上传图片成功");

    var file = fileList[0];
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //确定上传
  $("#confirm").on("click", function () {
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        window.parent.getUserInfo();
        layer.msg("上传图片成功");
      },
    });
  });
});
