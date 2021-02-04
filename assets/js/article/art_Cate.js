$(function () {
  var layer = layui.layer;
  var form = layui.form;
  //获取数据并渲染
  getArtCates();
  var addCateIndex;
  //点击添加分类
  $("#addCate").on("click", function () {
    addCateIndex = layer.open({
      type: 1,
      title: "添加文章分类",
      content: $("#popups").html(),
      area: ["500px", "250px"],
    });
  });

  //确认添加分类数据(修改数据并渲染)
  $("body").on("submit", $(".layui-form"), function (e) {
    e.preventDefault();
    setArtCates();
  });

  //获取数据并渲染
  function getArtCates() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        var artCaseHtml = template("tplArtCate", res);
        $("tbody").html(artCaseHtml);
      },
    });
  }

  //修改数据并渲染
  function setArtCates() {
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(".layui-form").serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("添加分类成功");
        getArtCates();
        layer.close(addCateIndex);
      },
    });
  }

  var indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    //弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });

    var id = $(this).attr("data-id");
    //发起请求获取对应分类的数据
    $.ajax({
      method: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        layui.form.val("form-edit", res.data);
      },
    });
  });

  $("tbody").on("click", ".btn-delete", function (e) {
    var id = $(this).siblings()[0].dataset.id;
    $.ajax({
      method: "GET",
      url: "/my/article/deletecate/" + id,
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("删除文章分类成功");
        getArtCates();
      },
    });
  });
});
