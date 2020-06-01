/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
;
layui.define(["table", "form"],
    function (e) {
        var t = layui.$,
            i = layui.table;
            
        layui.form;
        i.render({
            elem: "#LAY-user-manage",
            contentType: "application/json",
            method: "post",
            url: layui.setter.baseUrl + "UserAdmin/list",
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
            
        }),
            i.on("tool(LAY-user-manage)",
                function (e) {
                    var data = e.data;
                    if ("view" === e.event) {
                        t(e.tr);
                        layui.admin.req({
                            //请求的媒体类型
                            contentType: "application/json;charset=UTF-8",
                            //请求地址
                            url: layui.setter.baseUrl + "UserAdmin/detail?id=" + data.id,
                            //请求成功
                            done: function (result) {
                                if (result.body != null) {
                                    layer.open({
                                        type: 2,
                                        title: "查看用户",
                                        content: "../../../views/user/user/userform.html",
                                        maxmin: !0,
                                        area: ["520px", "800px"],
                                        success: function (e, t) {
                                            var n = e.find("iframe").contents().find("#layuiadmin-form-useradmin").click();
                                            n.find('input').each(function () {
                                                if (result.body.baseInfo[this.name] != null) {
                                                    this.value = result.body.baseInfo[this.name];
                                                }
                                            });
                                            n.find('img[name="avatarurl"]').attr("src", result.body.baseInfo.avatarurl);
                                        }
                                    })


                                }
                            }
                        });


                    }
                }),
            i.render({
                elem: "#LAY-user-back-manage",
                contentType: "application/json",
                method: "post",
                url: layui.setter.baseUrl + "Admin/list",
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
                    field: "phone",
                    title: "手机"
                },
                {
                    field: "username",
                    title: "用户名"
                },
                {
                    field: "role",
                    title: "角色"
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
                    toolbar: "#table-useradmin-admin"
                }]],
            }),
            i.on("tool(LAY-user-back-manage)",
                function (e) {
                    var data = e.data;
                    if ("del" === e.event) layer.prompt({
                        formType: 1,
                        title: "敏感操作，请验证口令"
                    },
                        function (t, i) {
                            layer.close(i),
                                layer.confirm("确定删除此管理员？",
                                    function (t) {
                                        console.log(e),
                                            e.del(),
                                            layer.close(t)
                                    })
                        });
                    else if ("edit" === e.event) {
                        t(e.tr);
                        layui.admin.req({
                            //请求的媒体类型
                            contentType: "application/json;charset=UTF-8",
                            //请求地址
                            url: layui.setter.baseUrl + "Admin/detail?id=" + data.id,
                            //请求成功
                            done: function (result) {
                                if (result.body != null) {
                                    layer.open({
                                        type: 2,
                                        title: "编辑管理员",
                                        content: "../../../views/user/administrators/adminform.html",
                                        area: ["420px", "420px"],
                                        btn: ["确定", "取消"],
                                        yes: function (index,layero) {
                                            var submit = layero.find('iframe').contents().find("#LAY-user-back-submit");// #subBtn为页面层提交按钮ID
                                            submit.click();// 触发提交监听
                                        },
                                        success: function (e, t) {
                                            var n = e.find("iframe").contents().find("#layuiadmin-form-admin").click();
                                            n.find('input,select').each(function () {
                                                if (result.body[this.name] != null) {
                                                    this.value = result.body[this.name];
                                                }
                                            });
                                        }
                                    })


                                }
                            },
                            //请求失败，包含具体的错误信息
                            error: function (e) {
                                console.log(e.status);
                                console.log(e.responseText);
                            }
                        });


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
                function (e) {
                    e.data;
                    if ("del" === e.event) layer.confirm("确定删除此角色？",
                        function (t) {
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
                            yes: function (e, t) {
                                var l = window["layui-layer-iframe" + e],
                                    r = t.find("iframe").contents().find("#LAY-user-role-submit");
                                l.layui.form.on("submit(LAY-user-role-submit)",
                                    function (t) {
                                        t.field;
                                        i.reload("LAY-user-back-role"),
                                            layer.close(e)
                                    }),
                                    r.trigger("click")
                            },
                            success: function (e, t) { }
                        })
                    }
                }),
            e("useradmin", {})
    });