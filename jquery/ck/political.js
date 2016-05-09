/**
 * ----------------------政审材料信息---------------------------
 */
var political = {

    /**
     * ---------------------声明---------------------------
     */

    //查询条件
    formSearch: $("#queryForm"),
    btnSearch: $("#btnSearch"),
    cardFormSearch: $("#queryCardForm"),
    btnCardSearch: $("#btnCardSearch"),
    //表格
    grid: $("#datas"),
    /**
     * ---------------------初始化--------------------------
     */

    //界面初始化
    init: function () {
        political.initControls();
        political.bindingEvents();
    },
    //初始化控件
    initControls: function () {
        political.initGrid();
    },

    //初始化表格
    initGrid: function () {
        //初始化表格的toolbar
        political.initGridToolbar();
        //初始化表格
        political.grid.datagrid({
            url: gConst.serverUrl + "easyui/political/getPoliticals",
            method: "post",
            singleSelect: false,
            fitColumns: false,
            remoteSort: false,
            rownumbers: true,
            pagination: true,
            pageSize: 10,
            fit: true,
            toolbar: "#toolbar",
            frozenColumns:[[
                {field: 'ck', title: '', width: 100, align: 'center', checkbox: true},
                {
                    field: 'opt',
                    title: '操作',
                    width: 180,
                    align: 'center',
                    halign: 'center',
                    formatter: political.setGridColFormatter.opt
                },
                {field: 'name', title: '姓名', width: 100, align: 'center'},
                {field: 'idcard', title: '身份证号', width: 130, align: 'center'}
            ]],
            columns: [[
                {field: 'sex', title: '性别',width: 50,align: 'center'},
                {field: 'birthday', title: '出生年月', width: 100, align: 'center'},
                {field: 'nation', title: '民族', width: 60, align: 'center'},
                {field: 'education', title: '学历', width: 140, align: 'center'},
                {field: 'workdate', title: '参加工作日期', width: 100, align: 'center'},
                {field: 'politics', title: '政治面貌', width: 100, align: 'center'},
                {field: 'company', title: '现工作单位', width: 140, align: 'center'},
                {field: 'duty', title: '职务', width: 80, align: 'center'},
                //{
                //    field: 'createtime',
                //    title: '申请日期',
                //    width: 100,
                //    align: 'center',
                //    formatter: gFun.dataGrid.columnFormatter.dateFormat
                //}
            ]],

            //设置单元格内按钮
            onLoadSuccess: function (data) {
                $('.delete-one').linkbutton({plain: true, iconCls: 'icon-cdelete'});
                $('.view').linkbutton({plain: true, iconCls: 'icon-cview'});
                $('.update').linkbutton({plain: true, iconCls: 'icon-cedit'});
                political.grid.datagrid('doCellTip',{
                    onlyShowInterrupt:true,
                    position : 'bottom',
                    maxWidth : '300px',
                    tipStyler : {
                        //'backgroundColor' : '#fff000',
                        borderColor : '#000',
                        boxShadow : '1px 1px 3px #000'
                    }
                });

            },
            rowStyler: function (index, row) {
                if (index % 2 != 0) {
                    return 'background-color:#F6F6F6;';
                }
            }
        });
        //设置分页
        var pager = political.grid.datagrid('getPager');
        $(pager).pagination({
            showRefresh: false
        });
    },

    //初始化toolbar
    initGridToolbar: function () {
        var b = '<table style="position: relative;"><tr>' +
            '<td style="width: 65px;" ><a href="#"  onclick="political.doAdd();" class="easyui-linkbutton add" iconCls="icon-add" style="width:65px; ">添加</a></td>' +
            '<td style="width: 100px;"><a href="#" onclick="political.doDeleteBatch();" class="easyui-linkbutton delete" iconCls="icon-remove" style="width:80px; margin-left: 10px;">批量删除</a></td>' +
            '</tr></table>';
        var to = $('<div id="toolbar" style="height: 40px; line-height: 40px; padding:0 30px; text-align: left; position: relative;"></div>')
            .html(b);
        to.appendTo($("body"));
    },

    //设置表格内单元格格式化
    setGridColFormatter: {
        //操作列
        opt: function (value, row, index) {
            var strRow = encodeURI(JSON.stringify(row));
            var btn = '<a href="#" class="view" style="height: 22px;" onclick="political.doLookDetail(\'' + strRow + '\')">查看</a>'
                + '<a href="#" class="update" style="height: 22px;" onclick="political.doEdit(\'' + strRow + '\')">编辑</a>'
                + '<a href="#" class="delete-one delete" style="height: 22px;" onclick="political.doDelete(\'' + strRow + '\')">删除</a>';
            return btn;
        }
    },

    //绑定（注册）事件
    bindingEvents: function () {
        political.btnSearch.click(political.doSearch);
    },
    initCardControls:function(){
        political.bindingCardEvents();
        political.initCardComboboxDate();
    },
    //弹出框控件事件绑定
    bindingCardEvents: function () {
        political.btnCardSearch.click(political.doCardSearch);
    },
    //弹出框控件初始化（如下拉框）
    initCardComboboxSex:function(isReadOnly,defaultVal){
        gFun.dictionary.initCombobox("1","add_sex",isReadOnly, defaultVal);//3，男
    },
    initCardComboboxNation:function(isReadOnly,defaultVal){
        gFun.dictionary.initCombobox("per_nation","add_nation",isReadOnly, defaultVal);//1391，汉族
    },
    initCardComboboxEducation:function(isReadOnly,defaultVal){
        gFun.dictionary.initCombobox("per_edu","add_education",isReadOnly, defaultVal);//2599，高中
    },
    initCardComboboxPolitics:function(isReadOnly,defaultVal){
        gFun.dictionary.initCombobox("per_zzmm","add_politics",isReadOnly, defaultVal);//2079，群众
    },
    initCardComboboxDate:function(){
        //出生年份下拉框
        var yearNow=new Date().getFullYear();
        var dateData=[];
        for(var i=0;i<100;i++ ){
            dateData[i]={id:yearNow-i,name:yearNow-i};
        }
        political.initCardCombobox('add_birth_year',true,null,dateData);
        //工作年份下拉框
        dateData=[];
        for(var i=0;i<50;i++ ){
            dateData[i]={id:yearNow-i,name:yearNow-i};
        }
        political.initCardCombobox('add_work_year',true,null,dateData);
        //出生月份、工作月份下拉框
        dateData=[];
        for(var i=0;i<12;i++ ){
            dateData[i]={id:i+1,name:i+1};
        }
        political.initCardCombobox('add_birth_month',true,null,dateData);
        political.initCardCombobox('add_work_month',true,null,dateData);
    },
    //初始化下拉框
    initCardCombobox:function(controlId,boolReadOnly,defaultId,data){
        $("#" + controlId).combobox({
            valueField: "id",
            textField: "name",
            data: data,
            onLoadSuccess: function () {
                if (null != defaultId && "" != defaultId) {
                    $("#" + controlId).combobox('select', defaultId);
                    $("#" + controlId).combobox("readonly", boolReadOnly);
                }
                else {
                    var seldata = $("#" + controlId).combobox('getData');
                    $("#" + controlId).combobox('select', seldata[0].id);
                }
            }
        });
    },

    /**
     * ----------------------事件操作------------------------
     */

    //条件查询
    doSearch: function () {
        //收集查询条件
        var queryParams = political.formSearch.serializeToJson(true);
        //重新查询
        political.grid.datagrid("reload", queryParams);
    },

    //弹出界面身份证查询
    doCardSearch:function(){
        var query = political.cardFormSearch.serializeToJson(true);
        political.doCardSearchSubmit("person/getPersonByIdcardAndRegion","查询身份信息",query);
    },
    //确定
    doCardSearchSubmit: function (url, msg, obj) {
        //验证数据
        var valRst = gFun.formFun.validate("queryCardForm");
        if (!valRst) {
            return false;
        }
        //收集数据
        var formData = gFun.formFun.serializeToJson("queryCardForm");
        if (obj != null) {
            formData.id = obj.id;
        }
        var idcard=formData['idcard'];
        if(!idcard||idcard==undefined){
            political.doShowMessage("请输入身份证号");
            return;
        }
        //发送数据
        gFun.clientFun.callServerByPost(url, formData, function (boolResult, data, textStatus, jqXHR) {
            if (boolResult&&data.obj!=null) {
                political.doShowMessage(msg + "成功");
                $("#add_idcard").textbox("setValue", data.obj.idcard);
                $("#add_name").textbox("setValue", data.obj.name);
                $("#add_sex").combobox("setValue", data.obj.sex);
                var birthday=new Date(parseInt(data.obj.birthday));
                $("#add_birth_year").combobox("setValue", birthday.Format('yyyy'));
                $("#add_birth_month").combobox("setValue", birthday.Format('MM'));
                $("#add_nation").combobox("setValue", data.obj.nation);
                $("#add_education").combobox("setValue", data.obj.education);
                $("#add_politics").combobox("setValue", data.obj.political);
                $("#add_company").textbox("setValue", data.obj.companyWork);

            } else {
                political.doShowMessage("无此人记录，请手动输入");
            }
        }, function (XMLHttpRequest, textStatus, errorThrown) {
            political.doShowMessage("无此人记录，请手动输入");
        }, null, true);
    },

    //添加信息
    doAdd: function () {
        gFun.navigation.showPopWindow("../sub/djgl/political/politicalAdd.html", "新建政审材料", 750, 460, true, null,
            political.doSetPopPanel, null, 0,
            function () {
                return political.doPopSubmit("political/addPolitical", "新建政审材料", null);
            }
        );
    },

    //删除信息
    doDelete: function (row) {
        var obj = JSON.parse(decodeURI(row));
        $.messager.confirm('提示', '您确认要删除[' + obj.name + ']吗？', function (r) {
            if (r) {
                var data = {
                    'id': obj.id
                };
                gFun.clientFun.callServerByPost("political/deletePolitical", data, function (boolResult, data, textStatus, jqXHR) {
                    if (boolResult) {
                        political.doShowMessage("删除成功");
                        political.grid.datagrid("reload");
                    } else {
                        political.doShowMessage("删除失败"+ ":" + data.message);
                    }
                }, function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus);
                }, null, true);
            }
        });
    },

    //批量删除
    doDeleteBatch: function () {
        var sels = political.grid.datagrid("getSelections");
        if (sels == undefined || sels.length <= 0) {
            $.messager.alert('提示', '请选择删除数据');
            return false;
        }
        $.messager.confirm('提示', '您确认要批量删除数据吗？', function (r) {
            if (r) {
                var ids = [];
                sels.forEach(function (e) {
                    ids.push(e.id);
                });
                var data = {
                    id: ids
                };
                gFun.clientFun.callServerByPost("political/deleteBatchPolitical", data, function (boolResult, data, textStatus, jqXHR) {
                    if (boolResult) {
                        political.doShowMessage("批量删除成功");
                        political.grid.datagrid("reload");
                    } else {
                        political.doShowMessage("批量删除失败"+ ":" + data.message);
                    }
                }, function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus);
                }, null, true);
            }
        });
    },

    //详细信息
    doLookDetail: function (row) {
        var obj = JSON.parse(decodeURI(row));
        gFun.navigation.showPopWindow("../sub/djgl/political/politicalAdd.html", "查看政审材料", 750, 460, true, null,
            political.doSetPopPanel, obj, 2, function () {
                return;
            });
    },

    //编辑信息
    doEdit: function (row) {
        var obj = JSON.parse(decodeURI(row));
        gFun.navigation.showPopWindow("../sub/djgl/political/politicalAdd.html", "编辑政审材料", 750, 460, true, null,
            political.doSetPopPanel, obj, 1,
            function () {
                return political.doPopSubmit("political/updatePolitical", "编辑政审材料", obj);
            }
        );
    },

    //设置弹出对话框
    doSetPopPanel: function (obj, state) {
        gFun.formFun.clearValidations("editForm");
        //设置审批日期（用于打印）
        var dateNow=new Date();
        $("#print_year").text(dateNow.getFullYear());
        $("#print_month").text(dateNow.getMonth()+1);//月份0~11
        $("#print_day").text(dateNow.getDate());
        switch (state) {
            case 0: //添加
                political.initCardComboboxSex(false,"3");
                political.initCardComboboxNation(false,"1391");
                political.initCardComboboxEducation(false,"2599");
                political.initCardComboboxPolitics(false,"2079");
                break;
            case 1: //修改
            case 2://查看
                var boolReadOnly = state == 2 ? true : false;
                political.initCardComboboxSex(boolReadOnly,obj.sex);
                political.initCardComboboxNation(boolReadOnly,obj.nation);
                political.initCardComboboxEducation(boolReadOnly,obj.education);
                political.initCardComboboxPolitics(boolReadOnly,obj.politics);

                $("#add_name").textbox("setValue", obj.name);
                $("#add_idcard").textbox("setValue", obj.idcard);
                try {
                    $("#add_birth_year").combobox("setValue", obj.birthday.split('-')[0]);
                    $("#add_birth_month").combobox("setValue", obj.birthday.split('-')[1]);
                }catch(ex){}

                try {
                    $("#add_work_year").combobox("setValue", obj.workdate.split('-')[0]);
                    $("#add_work_month").combobox("setValue", obj.workdate.split('-')[1]);
                }catch(ex){}

                $("#add_company").textbox("setValue", obj.company);
                $("#add_duty").textbox("setValue", obj.duty);
                $("#add_party").textbox("setValue", obj.party);

                $("#card").textbox("readonly", boolReadOnly);
                $("#add_name").textbox("readonly", boolReadOnly);

                $("#add_birth_year").combobox("readonly", boolReadOnly);
                $("#add_birth_month").combobox("readonly", boolReadOnly);


                $("#add_work_year").combobox("readonly", boolReadOnly);
                $("#add_work_month").combobox("readonly", boolReadOnly);
                $("#add_company").textbox("readonly", boolReadOnly);

                $("#add_duty").textbox("readonly", boolReadOnly);
                break;
        }
    },

    //弹出对话框提交（确定）
    doPopSubmit: function (url, msg, obj) {
        //验证数据
        var valRst = gFun.formFun.validate("editForm");
        if (!valRst) {
            return false;
        }
        //收集数据
        var formData = gFun.formFun.serializeToJson("editForm");
        //数据处理

        formData['sex']=($("#add_sex").combobox('getText'));
        formData['nation']=($("#add_nation").combobox('getText'));
        formData['education']=($("#add_education").combobox('getText'));
        formData['politics']=($("#add_politics").combobox('getText'));

        if (obj != null) {
            formData.id = obj.id;
        }
        //发送数据
        gFun.clientFun.callServerByPost(url, formData, function (boolResult, data, textStatus, jqXHR) {
            if (boolResult) {
                political.doShowMessage(msg + "成功");
                political.grid.datagrid("reload");
            } else {
                political.doShowMessage(msg + "失败");
            }
        }, function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }, null, true);
    },

    //显示提示消息
    doShowMessage: function (msg) {
        $.messager.show({
            title: '提示',
            msg: msg,
            timeout: 3000,
            showType: 'slide'
        });
    }
};