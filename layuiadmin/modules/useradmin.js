/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
;
layui.define(["table", "form"],
function(e) {
    var t = layui.$,
    i = layui.table;
    layui.form;
    i.render({
        elem: "#LAY-user-manage",
        contentType:"application/json",
        method:"post",
        url: layui.setter.baseUrl + "UserAdmin/list",
        request: {
            pageName: 'pageNo' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
          },
        cols: [[{
            type: "checkbox",
            fixed: "left"
        },
        {
            field: "id",
            width: 100,
            title: "ID",
            sort: !0
        },
        {
            field: "name",
            title: "姓名",
            minWidth: 100
        },
        {
            field: "nickname",
            title: "昵称"
        },
        {
            field: "mobile",
            title: "手机"
        },
        
        {
            field: "gender",
            width: 80,
            title: "性别"
        },
        {
            field: "age",
            width: 80,
            title: "年龄"
        },
        {
            field: "grade",
            title: "等级"
        },
        {
            field: "createdate",
            title: "加入时间",
            sort: !0
        },
        {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-useradmin-webuser"
        }]],
        page: !0,
        limit: 30,
        height: "full-220",
        text: "对不起，加载出现异常！",
        //一定要配置
        response:{
            statusName:'code', //规定返回的状态码字段为code
            statusCode:200 //规定成功的状态码味200
        },
        parseData:function(res){ //res 即为原始返回的数据
            return {
              "code": res.code, //解析接口状态
              "msg": res.message, //解析提示文本
              "count": res.body.count, //解析数据长度
              "data": res.body.rows //解析数据列表
            };
          }
    }),
    i.on("tool(LAY-user-manage)",
    function(e) {
        var data = e.data;
        if ("del" === e.event) layer.prompt({
            formType: 1,
            title: "敏感操作，请验证口令"
        },
        function(t, i) {
            layer.close(i),
            layer.confirm("真的删除行么",
            function(t) {
                e.del(),
                layer.close(t)
            })
        });
        else if ("view" === e.event) {
            t(e.tr);
            layer.open({
                type: 2,
                title: "查看用户",
                content: "../../../views/user/user/userform.html",
                maxmin: !0,
                area: ["520px", "800px"],
                success: function(e, t) {
                    var n = e.find("iframe").contents().find("#layuiadmin-form-useradmin").click();
                    n.find('input').each(function(){
                        debugger;
                        if(data[this.name]!=null){
                            this.value=data[this.name];
                        }
                    });
                    n.find('img[name="avatarurl"]').attr("src", data.avatarurl);
                    
                }
            })
        }
    }),
    i.render({
        elem: "#LAY-user-back-manage",
        url: layui.setter.baseUrl + "Home/Index",
        cols: [[{
            type: "checkbox",
            fixed: "left"
        },
        {
            field: "id",
            width: 80,
            title: "ID",
            sort: !0
        },
        {
            field: "loginname",
            title: "登录名"
        },
        {
            field: "telphone",
            title: "手机"
        },
        {
            field: "email",
            title: "邮箱"
        },
        {
            field: "role",
            title: "角色"
        },
        {
            field: "jointime",
            title: "加入时间",
            sort: !0
        },
        {
            field: "check",
            title: "审核状态",
            templet: "#buttonTpl",
            minWidth: 80,
            align: "center"
        },
        {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-useradmin-admin"
        }]],
        text: "对不起，加载出现异常！"
    }),
    i.on("tool(LAY-user-back-manage)",
    function(e) {
        e.data;
        if ("del" === e.event) layer.prompt({
            formType: 1,
            title: "敏感操作，请验证口令"
        },
        function(t, i) {
            layer.close(i),
            layer.confirm("确定删除此管理员？",
            function(t) {
                console.log(e),
                e.del(),
                layer.close(t)
            })
        });
        else if ("edit" === e.event) {
            t(e.tr);
            layer.open({
                type: 2,
                title: "编辑管理员",
                content: "../../../views/user/administrators/adminform.html",
                area: ["420px", "420px"],
                btn: ["确定", "取消"],
                yes: function(e, t) {
                    var l = window["layui-layer-iframe" + e],
                    r = "LAY-user-back-submit",
                    n = t.find("iframe").contents().find("#" + r);
                    l.layui.form.on("submit(" + r + ")",
                    function(t) {
                        t.field;
                        i.reload("LAY-user-front-submit"),
                        layer.close(e)
                    }),
                    n.trigger("click")
                },
                success: function(e, t) {}
            })
        }
    }),
    i.render({
        elem: "#LAY-user-back-role",
        url: layui.setter.base + "json/useradmin/role.js",
        cols: [[{
            type: "checkbox",
            fixed: "left"
        },
        {
            field: "id",
            width: 80,
            title: "ID",
            sort: !0
        },
        {
            field: "rolename",
            title: "角色名"
        },
        {
            field: "limits",
            title: "拥有权限"
        },
        {
            field: "descr",
            title: "具体描述"
        },
        {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-useradmin-admin"
        }]],
        text: "对不起，加载出现异常！"
    }),
    i.on("tool(LAY-user-back-role)",
    function(e) {
        e.data;
        if ("del" === e.event) layer.confirm("确定删除此角色？",
        function(t) {
            e.del(),
            layer.close(t)
        });
        else if ("edit" === e.event) {
            t(e.tr);
            layer.open({
                type: 2,
                title: "编辑角色",
                content: "../../../views/user/administrators/roleform.html",
                area: ["500px", "480px"],
                btn: ["确定", "取消"],
                yes: function(e, t) {
                    var l = window["layui-layer-iframe" + e],
                    r = t.find("iframe").contents().find("#LAY-user-role-submit");
                    l.layui.form.on("submit(LAY-user-role-submit)",
                    function(t) {
                        t.field;
                        i.reload("LAY-user-back-role"),
                        layer.close(e)
                    }),
                    r.trigger("click")
                },
                success: function(e, t) {}
            })
        }
    }),
    e("useradmin", {})
});