$(function () {
  //配置页码参数
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };

  //获取文章列表
  function getArtList() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        //渲染数据到页面
        cateListRender(res);
        renderPageBox(res.total);
      },
    });
  }
  getArtList();

  //渲染获取的数据到页面
  function cateListRender(res) {
    var artListHtml = template("tpl-artList", res);
    $("tbody").html(artListHtml);
  }

  //时间过滤器
  template.defaults.imports.dateFormat = function (value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = (date.getMonth() + 1).toString().padStart(2, "0");
    var d = date.getDay().toString().padStart(2, "0");

    var hh = date.getHours().toString().padStart(2, "0");
    var mm = date.getMinutes().toString().padStart(2, "0");
    var ss = date.getSeconds().toString().padStart(2, "0");

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  };

  //筛选列表
  $.ajax({
    method: "GET",
    url: "/my/article/cates",
    success(res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      var tplfiltrate = template("tpl-filtrate", res);
      $("[name=cate_id]").html(tplfiltrate);
      layui.form.render();
    },
  });

  //点击筛选按钮
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    q.cate_id = $("[name=cate_id]").val();
    q.state = $("[name=state]").val();
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success(res) {
        if (res.status !== 0) {
          layer.msg(res.message);
        }
        //渲染数据到页面
        cateListRender(res);
      },
    });
  });

  //分页盒
  function renderPageBox(total) {
    layui.use("laypage", function () {
      var laypage = layui.laypage;

      //执行一个laypage实例
      laypage.render({
        elem: "pageBox", //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        limit: q.pagesize,
        curr: q.pagenum,
        jump: function (obj, first) {
          q.pagenum = obj.curr;
          q.pagesize = obj.limit;
          if (!first) {
            getArtList();
          }
        },
        layout: ["count", "limit", "prev", "page", "next", "skip"],
        limits: [2, 3, 5, 10],
      });
    });
  }

  //点击文字列表
  $("tbody").on("click", "#editCate", function () {
    window.parent.hrefArtPub();
  });

  //点击删除文章
  $("tbody").on("click", "#deleteBtn", function () {
    var id = $(this)[0].dataset.id;

    var len = $("tbody #deleteBtn").length;
    layui.layer.confirm(
      "确定要删除吗",
      { icon: 3, title: "提示" },
      function (index) {
        $.ajax({
          type: "get",
          url: "/my/article/delete/" + id,
          success(res) {
            if (res.status !== 0) return layui.layer.msg("删除文章失败");
            layui.layer.msg("删除文章成功");

            if (len == 1) {
              q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
              getArtList();
            }

            getArtList();
          },
        });
        layer.close(index);
      }
    );
  });
});
