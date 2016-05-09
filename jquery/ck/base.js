/**
 * Created by kouki on 2015/11/9.
 */

//===================================================//
// 全局变量
//===================================================//
var gConst = {
    //serverUrl: "http://101.201.209.193:8080/community/",
    //serverUrl: "http://192.168.18.45:8080/community/",
    serverUrl: "http://localhost:8080/community/",
    AuthValue: null,
    addressData: null,
    dicData: null
}

//===================================================//
// 全局函数
//===================================================//
// 序列化表单内容为Json对象
$.fn.serializeToJson = function (boolNoSelEmpty) {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (boolNoSelEmpty == true) {
            if (this.value == '') {
                return;
            }
        }
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// 全局函数
var gFun = {
    // 导航器
    navigation: {
        showPageInCenter: function (url, title, isInPanel, iconCls) {
            isInPanel = isInPanel == false ? false : true;

            if (isInPanel) {
                var pnl = "<div class='easyui-panel location' title='" + (typeof(title) != "undefined" ? title : " ") + "' " +
                    "iconCls='icon-fang' fit='true' href='" + url + "' " + "></div>";
                $("#layoutCenter").html(pnl);
                $.parser.parse("#layoutCenter");
            } else {
                $("#layoutCenter").panel({href: url});
            }
        },
        //一般窗口用
        // 打开弹出窗口
        showPopWin: function (url, title, width, height, isModal, iconCls, funLoadCallback, editValue, booledit, funSubmitCallback) {

            isModal = isModal == true ? true : false;
            var id = "_tmpWin_" + Math.floor(Math.random() * 10000 + 1);
            var win = $("<div id='" + id + "'></div>");

            win.addClass("myOpenWindow");
            win.appendTo($("body"));

            $(win).dialog({
                title: title,
                href: url,
                width: width,
                height: height,
                modal: isModal,
                iconCls: iconCls,
                buttons: [{
                    text: '保存',
                    iconCls: 'icon-ok',
                    width: 75,
                    handler: function () {
                        var b = funSubmitCallback();
                        if (b != false) {
                            $(win).dialog("close");
                        }
                    }
                }, {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    width: 75,
                    handler: function () {
                        $(win).dialog("close");
                    }
                }],
                onClose: function () {
                    $(win).dialog("destroy");
                },
                onLoad: function () {
                    funLoadCallback(editValue, booledit);
                    $("#" + id).next().children("a").first().focus();
                    $(win).keydown(function (event) {
                        if (event.keyCode == 13) {
                            var b = funSubmitCallback();
                            if (b != false) {
                                $(win).dialog("close");
                            }
                        }
                    });

                }

            });
            return id;
        },
        // 打开弹出窗口-------带打印模块用
        showPopWindow: function (url, title, width, height, isModal, iconCls, funLoadCallback, editValue, booledit, funSubmitCallback) {

            isModal = isModal == true ? true : false;
            var id = "_tmpWin_" + Math.floor(Math.random() * 10000 + 1);
            var win = $("<div id='" + id + "'></div>");
            win.addClass("myOpenWindow");
            win.appendTo($("body"));
            $(win).dialog({
                title: title,
                href: url,
                width: width,
                height: height,
                modal: isModal,
                iconCls: iconCls,
                buttons: [{
                    text: '打印',
                    iconCls: 'icon-print',
                    width: 75,
                    handler: function () {
                        var b = funSubmitCallback();

                        if (b != false) {
                            var options = {popClose: close};
                            $(".printDiv").printArea(options);
                            $(win).dialog("close");
                        }
                    }
                }, {
                    text: '保存',
                    iconCls: 'icon-ok',
                    width: 75,
                    handler: function () {
                        var b = funSubmitCallback();
                        if (b != false) {
                            $(win).dialog("close");
                        }
                    }
                }, {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    width: 75,
                    handler: function () {
                        $(win).dialog("close");
                    }
                }],
                onClose: function () {
                    $(win).dialog("destroy");
                },
                onLoad: function () {
                    funLoadCallback(editValue, booledit);
                    $("#" + id).next().children("a").first().focus();
                    $(win).keydown(function (event) {
                        if (event.keyCode == 13) {
                            var b = funSubmitCallback();
                            if (b != false) {
                                $(win).dialog("close");
                            }
                        }
                    });

                }

            });
            return id;
        }
    },

    // 常用函数
    isFunction: function (fun) {
        return (fun != null && typeof(fun) == "function");
    },

    // 显示遮罩
    showCover: function (isLogin) {
        var path = '';
        if (isLogin) {
            path = '../resources/images/wait.gif';
        }
        else {
            path = '../../resources/images/wait.gif';
        }
        var cover = $("#_cover");
        if (cover == null || typeof(cover) == "undefined" || cover.length <= 0 || cover[0].tagName.toUpperCase() != "DIV") {
            cover = $("<div id='_cover' style='display: none; padding: 0px;'><img src=" + path + " /></div>");
            cover.appendTo($("body"));
        }
        $("#_cover").window({
            zIndex: 9999,
            noheader: true,
            border: false,
            modal: true,
            width: 46,
            height: 49
        });
        cover.css({display: "block"});
        cover.css({border: "none"});
    },

    // 隐藏遮罩
    hideCover: function () {
        var cover = $("#_cover");
        cover.dialog("close");
        cover.css({display: "none"});
    },

    // 表单函数
    formFun: {
        // 验证控件
        _validateControls: [
            "easyui-validatebox",
            "easyui-textbox",
            "easyui-combobox",
            "easyui-combotree",
            "easyui-combogrid",
            "easyui-numberbox",
            "easyui-datebox",
            "easyui-datetimebox",
            "easyui-datetimespinner",
            "easyui-numberspinner",
            "easyui-timespinner",
            "easyui-filebox"],

        // 检查对象是否为Form
        _getForm: function (formId) {
            if (formId == null || typeof(formId) == "undefined") {
                return null;
            } else {
                var form = $("#" + formId);
                if (form == null || typeof(form) == "undefined" || form.length <= 0
                    || form[0].tagName.toUpperCase() != "FORM") {
                    return null;
                }
                return form;
            }
        },

        // 将Form序列化为JSON对象
        serializeToJson: function (formId) {
            var formObj = gFun.formFun._getForm(formId);
            if (formObj == null) {
                return null;
            }

            var o = {};
            var a = formObj.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },

        // 清除表单中的所有验证
        clearValidations: function (formId) {
            var formObj = gFun.formFun._getForm(formId);
            if (formObj == null) {
                return false;
            }
            var ctrls = gFun.formFun._getFormValidateControls(formId);
            var cls = null;
            $(ctrls).each(function (index, item) {
                for (var j in gFun.formFun._validateControls) {
                    cls = gFun.formFun._validateControls[j];
                    if (item.hasClass(cls)) {
                        switch (cls) {
                            case "easyui-validatebox" :
                                item.validatebox("disableValidation");
                                break;
                            case "easyui-textbox" :
                                item.textbox("disableValidation");
                                break;
                            case "easyui-combobox" :
                                item.combobox("disableValidation");
                                break;
                            case "easyui-combotree" :
                                item.combotree("disableValidation");
                                break;
                            case "easyui-combogrid"  :
                                item.combogrid("disableValidation");
                                break;
                            case "easyui-numberbox" :
                                item.numberbox("disableValidation");
                                break;
                            case "easyui-datebox" :
                                item.datebox("disableValidation");
                                break;
                            case "easyui-datetimebox" :
                                item.datetimebox("disableValidation");
                                break;
                            case "easyui-datetimespinner" :
                                item.datetimespinner("disableValidation");
                                break;
                            case "easyui-numberspinner"  :
                                item.numberspinner("disableValidation");
                                break;
                            case "easyui-timespinner" :
                                item.timespinner("disableValidation");
                                break;
                            case "easyui-filebox" :
                                item.filebox("disableValidation");
                                break;
                            default :
                        }
                        break;
                    }
                }
            });
            return true;
        },

        // 重建表单中的所有验证
        reduceValidations: function (formId) {
            var formObj = gFun.formFun._getForm(formId);
            if (formObj == null) {
                return false;
            }
            var ctrls = gFun.formFun._getFormValidateControls(formId);
            var cls = null;
            $(ctrls).each(function (index, item) {
                for (var j in gFun.formFun._validateControls) {
                    cls = gFun.formFun._validateControls[j];
                    if (item.hasClass(cls)) {
                        switch (cls) {
                            case "easyui-validatebox" :
                                item.validatebox("enableValidation");
                                break;
                            case "easyui-textbox" :
                                item.textbox("enableValidation");
                                break;
                            case "easyui-combobox" :
                                item.combobox("enableValidation");
                                break;
                            case "easyui-combotree" :
                                item.combotree("enableValidation");
                                break;
                            case "easyui-combogrid" :
                                item.combogrid("enableValidation");
                                break;
                            case "easyui-numberbox" :
                                item.numberbox("enableValidation");
                                break;
                            case "easyui-datebox" :
                                item.datebox("enableValidation");
                                break;
                            case "easyui-datetimebox" :
                                item.datetimebox("enableValidation");
                                break;
                            case "easyui-datetimespinner" :
                                item.datetimespinner("enableValidation");
                                break;
                            case "easyui-numberspinner" :
                                item.numberspinner("enableValidation");
                                break;
                            case "easyui-timespinner" :
                                item.timespinner("enableValidation");
                                break;
                            case "easyui-filebox" :
                                item.filebox("enableValidation");
                                break;
                            default :
                        }
                        break;
                    }
                }
            });
            return true;
        },

        // 获得form中的所有验证控件
        _getFormValidateControls: function (formId) {
            var ctrls = [];
            var formObj = gFun.formFun._getForm(formId);
            if (formObj == null) {
                return null;
            }
            var idPre = "#" + formId + " .";
            $(gFun.formFun._validateControls).each(function (index, item) {
                var tmpArr = $(idPre + item);
                if (tmpArr.length > 0) ctrls = ctrls.concat(tmpArr);
            });
            return ctrls;
        },

        // 验证表单
        validate: function (formId) {
            var formObj = gFun.formFun._getForm(formId);
            if (formObj == null) {
                return false;
            }
            gFun.formFun.reduceValidations(formId);
            var rst = formObj.form("validate");
            return rst;
        },

        // 清除表单数据
        clearData: function (formId) {
            var formObj = gFun.formFun._getForm(formId);
            if (formObj == null) {
                return false;
            }
            formObj.form("clear");
            gFun.formFun.clearValidations(formId);
            return true;
        }
    },

    // 服务调用
    clientFun: {
        callServer: function (strSubUrl, type, jsonData, boolAsync, funSuccess, funError, funBeforeSend, objLinkButton, boolShowLoading, islogin) {
            var url = gConst.serverUrl + strSubUrl;
            var login = null;
            if (typeof (islogin) == "undefined") {
                login = false;
            }
            else {
                login = islogin;
            }
            var isButtonExists = (objLinkButton != null && typeof(objLinkButton) != "undefined");
            boolAsync = boolAsync == true ? true : false;
            boolShowLoading = boolShowLoading == false ? false : true;

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(jsonData),
                async: boolAsync,
                timeout: 10000,
                beforeSend: function (XMLHttpRequest) {
                    if (isButtonExists) {
                        objLinkButton.linkbutton("disable");
                    }
                    if (boolShowLoading) {
                        gFun.showCover(login);
                    }
                    if (gFun.isFunction(funBeforeSend)) {
                        funBeforeSend(XMLHttpRequest);
                    }
                },
                success: function (data, textStatus, jqXHR) {
                    var code = data.code;
                    var rst = false;
                    if (code == 0 || code == 2) {
                        rst = code == 0 ? true : false;
                        funSuccess(rst, data, textStatus, jqXHR);
                    }
                    else if (code == 3) {
                        window.location.href = gConst.serverUrl + "views/error/code2.html";
                    }else if(code == 13){
                        $.messager.alert("提示",data.message);
                    }
                    else {
                        window.location.href = gConst.serverUrl + "views/error/code99.html";
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $.messager.alert("错误", "网络连接失败，请检查网络是否连通！", "error");
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (isButtonExists) {
                        objLinkButton.linkbutton("enable");
                    }
                    if (boolShowLoading) {
                        gFun.hideCover();
                    }
                }
            });
        },
        callServerByGet: function (strSubUrl, jsonData, funSuccess, funError, objLinkButton, boolShowLoading, islogin) {
            gFun.clientFun.callServer(strSubUrl, "GET", jsonData, true, funSuccess, funError, null, objLinkButton, boolShowLoading, islogin);
        },
        callServerByPost: function (strSubUrl, jsonData, funSuccess, funError, objLinkButton, boolShowLoading, islogin) {
            gFun.clientFun.callServer(strSubUrl, "POST", jsonData, true, funSuccess, funError, null, objLinkButton, boolShowLoading, islogin);
        }
    },

    // 数据表格相关
    dataGrid: {
        columnFormatter: {
            sexCdToText: function (value, row, index) {
                var rst = "";
                switch (value) {
                    case "m":
                    case "1":
                    case 1:
                        rst = "男";
                        break;
                    case "f":
                    case "0":
                    case 0:
                        rst = "女";
                        break;
                    case "o":
                    case "2":
                    case 2:
                        rst = "未知";
                        break;
                    default :
                        rst = "未知";
                        break;
                }
                return rst;
            },
            dateFormat: function (value, row, index) {

                if (value == null || value == undefined || value == "") {
                    return "";
                }
                else {
                    var dateStr = new Date(value);
                    return dateStr.Format('yyyy-MM-dd');
                }
            },
            dateFormatHH: function (value, row, index) {

                if (value == null || value == undefined || value == "") {
                    return "";
                }
                else {
                    var dateStr = new Date(value);

                    return dateStr.Format('yyyy-MM-dd hh:mm:ss');
                }
            }


        }
    },

    setPageAuth: function (arrayAuth) {
        var datas = gConst.AuthValue;
        var tempArray = arrayAuth.split(":");
        for (var i = 0; i < datas.length; i++) {
            gFun.setLeafAuth(datas[i], tempArray);
        }
    },

    setLeafAuth: function (item, arrayAuth) {
        if (item.subResources == undefined || item.subResources.length <= 0) {
            for (var i in item.permissons) {
                var temp = item.permissons[i].tag;
                var arrayTemp = temp.split(":");
                var a1 = [];
                for (var x = 0; x < arrayTemp.length - 1; x++) {
                    a1.push(arrayTemp[x]);
                }
                if (arrayAuth.sort().toString() == a1.sort().toString()) {
                    $("." + arrayTemp[arrayTemp.length - 1]).css("display", "");
                }
            }
            return;
        }
        for (var i in  item.subResources) {
            gFun.setLeafAuth(item.subResources[i], arrayAuth);
        }
    },

    population: {
        //搜索人口
        doSearchPopulation: function (inputValue, resultCallback) {
            var searchUrl = 'population/getSearchPopulations';
            var searchData = {
                page: 1,
                rows: 100,
                bp_name: inputValue
            };

            gFun.clientFun.callServerByPost(searchUrl, searchData, function (boolResult, data, textStatus, jqXHR) {
                if (boolResult) {
                    var dataValue = data.obj;
                    if (typeof(dataValue) == "undefined" || dataValue == null || dataValue.length <= 0) {
                        gFun.doShowMessage("没有找到结果");
                    }
                    else if (dataValue.length == 1) {
                        resultCallback(data);
                    }
                    else {
                        gFun.navigation.showPopWindow("../common/searchpopulation/populationGrid.html", "搜索人口", 600, 300, true, null,
                            function (data) {
                                $("#popGrid").datagrid({
                                    data: dataValue,
                                    onLoadSuccess: function () {
                                        var grid = $("#popGrid").datagrid('selectRow', 0);
                                        grid.target.focus();
                                    }
                                }).datagrid("keyCtr");
                            }, dataValue, 1,
                            function () {
                                var value = $("#popGrid").datagrid('getSelected');
                                return resultCallback(value);
                            });
                    }
                } else {
                    alert(data.message);
                }
            }, function (XMLHttpRequest, textStatus, errorThrown) {
            }, null, true);

        }
    },

    address: {
        //取得区域名称
        getRegionName: function () {
            gFun.clientFun.callServerByPost("account/getCurrentUserRegion", null, function (boolResult, data, textStatus, jqXHR) {
                if (boolResult) {
                    $("#parentRegionName").text(data.obj[0] == null ? "" : data.obj[0]);
                    $("#regionName").text(data.obj[1] == null ? "" : data.obj[1]);
                }
            }, function (XMLHttpRequest, textStatus, errorThrown) {
            }, null, false);
        }/*,
        //初始化地址数据
        initAddressData: function () {
            gFun.clientFun.callServerByPost("address/getAllAddress", null, function (boolResult, data, textStatus, jqXHR) {
                if (boolResult) {
                    gConst.addressData = data.obj;
                }
            }, null, null, false);
        },

        //获取市的数据
        getCity: function (provinceCode) {
            var city = null;
            for (var i in gConst.addressData) {
                if (gConst.addressData[i].code == provinceCode) {
                    city = gConst.addressData[i].addressResources;
                    break;
                }
            }
            return city;
        },

        //获取区的数据
        getTown: function (cityCode) {
            var town = null;
            for (var i in gConst.addressData) {
                for (var j in gConst.addressData[i].addressResources) {
                    if (gConst.addressData[i].addressResources[j].code == cityCode) {
                        town = gConst.addressData[i].addressResources[j].addressResources;
                        break;
                    }
                }
            }
            return town;
        },

        //设置地址
        setAddress: function (idProvince, provinceCode, idCity, cityCode, idTown, townCode, isedit) {

            $('#' + idProvince).combobox({
                valueField: 'code',
                textField: 'name',
                editable: false,
                data: gConst.addressData,
                onLoadSuccess: function () {
                    var val = $(this).combobox("getData");
                    if (isedit) {
                        var flag = false;
                        for (var item in val) {
                            if (provinceCode == val[item].code) {
                                $(this).combobox("select", provinceCode);
                                flag = true;
                            }
                        }
                        if (!flag) {
                            for (var item in val[0]) {
                                $(this).combobox("select", val[0].code);
                                break;
                            }
                        }
                    }
                    else {
                        for (var item in val[0]) {
                            $(this).combobox("select", val[0].code);
                            break;
                        }
                    }
                },
                onSelect: function () {
                    var provinceCode = $("#" + idProvince).combobox("getValue");
                    var cityData = gFun.address.getCity(provinceCode);
                    $('#' + idCity).combobox({
                        valueField: 'code',
                        textField: 'name',
                        data: cityData,
                        editable: false,
                        onLoadSuccess: function () {
                            var val = $(this).combobox("getData");
                            if (isedit) {
                                var flag = false;
                                for (var item in val) {
                                    if (cityCode == val[item].code) {
                                        $(this).combobox("select", cityCode);
                                        flag = true;
                                    }
                                }
                                if (!flag) {
                                    for (var item in val[0]) {
                                        $(this).combobox("select", val[0].code);
                                        break;
                                    }
                                }
                            }
                            else {
                                for (var item in val[0]) {
                                    $(this).combobox("select", val[0].code);
                                    break;
                                }
                            }
                        },
                        onSelect: function () {
                            var cityCode = $("#" + idCity).combobox("getValue");
                            var townData = gFun.address.getTown(cityCode);
                            $('#' + idTown).combobox({
                                valueField: 'code',
                                textField: 'name',
                                editable: false,
                                data: townData,
                                onLoadSuccess: function () {
                                    var val = $(this).combobox("getData");
                                    if (isedit) {
                                        var flag = false;
                                        for (var item in val) {
                                            if (townCode == val[item].code) {
                                                $(this).combobox("select", townCode);
                                                flag = true;
                                            }
                                        }
                                        if (!flag) {
                                            for (var item in val[0]) {
                                                $(this).combobox("select", val[0].code);
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        for (var item in val[0]) {
                                            $(this).combobox("select", val[0].code);
                                            break;
                                        }
                                    }
                                }

                            });
                        }
                    });
                }
            });
        },*/
    },

    dictionary: {
        //初始化字典数据
        initDatas: function () {
            //gFun.clientFun.callServerByPost("dictionary/getDics", null, function (boolResult, data, textStatus, jqXHR) {
            //    if (boolResult) {
            //        gConst.dicData = data.obj;
            //    }
            //}, null, null, false);
        },

        //根据类型获取字典数据
        getDatasByType: function (tid) {
            //var param={
            //    tid:tid
            //};
            //gFun.clientFun.callServerByPost("dictionary/getDicsByType", param, function (boolResult, data, textStatus, jqXHR) {
            //        if (boolResult) {
            //            var result = data.obj;
            //            for (var i in gConst.dicData) {
            //                if (gConst.dicData[i].tid == tid) {
            //                    var temp = {
            //                        id: gConst.dicData[i].id,
            //                        name: gConst.dicData[i].name
            //                    };
            //                    data.push(temp);
            //                }
            //            }
            //            return data;
            //        }
            //}

        },
        /*
         * dicType 字典类型
         * controlId 控件ID
         * boolReadOnly 是否只读
         * defaultId 默认值
         */
        initCombobox: function (dicType, controlId, boolReadOnly, defaultId) {
            var param = {
                tid: dicType
            };
            gFun.clientFun.callServerByPost("dictionary/getDicsByType", param, function (boolResult, data, textStatus, jqXHR) {
                if (boolResult) {
                    var result = data.obj;
                    $("#" + controlId).combobox({
                        valueField: "id",
                        textField: "name",
                        data: result,
                        onLoadSuccess: function () {
                            if (defaultId == "") {
                                $("#" + controlId).combobox("readonly", boolReadOnly);
                            }
                            else if (null != defaultId && "" != defaultId) {
                                $("#" + controlId).combobox('select', defaultId);
                                $("#" + controlId).combobox("readonly", boolReadOnly);
                            }
                            else {
                                var seldata = $("#" + controlId).combobox('getData');
                                $("#" + controlId).combobox('select', seldata[0].id);
                            }
                        }
                    });
                }
            }, function (XMLHttpRequest, textStatus, errorThrown) {
            }, null, null, true);
        }
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
}

//easyui validate 扩展
$.extend($.fn.validatebox.defaults.rules, {
    CHS: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5]+$/.test(value);
        },
        message: '请输入汉字'
    },
    english: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /\d+\.\d+\.\d+\.\d+/.test(value);
        },
        message: 'IP地址格式不正确'
    },
    ZIP: {
        validator: function (value, param) {
            return /^[0-9]\d{5}$/.test(value);
        },
        message: '邮政编码不存在'
    },
    QQ: {
        validator: function (value, param) {
            return /^[1-9]\d{4,10}$/.test(value);
        },
        message: 'QQ号码不正确'
    },
    mobile: {
        validator: function (value, param) {
            return /^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$/.test(value);
        },
        message: '手机号码不正确'
    },
    tel: {
        validator: function (value, param) {
          //  return /^(\d{3}-|\d{4}-)?(\d{8}|\d{7})?(-\d{1,6})?$/.test(value);
            return /(^([0\+]\d{2,3})\d{3,4}\-\d{3,8}$)|(^([0\+]\d{2,3})\d{3,4}\d{3,8}$)|(^0\d{2,3}\d{3,8}$)|(^0\d{2,3}\-\d{3,8}$|(^\d{7,8}$))/.test(value);
        },
        message: '电话号码不正确'
    },
    mobileAndTel: {
        validator: function (value, param) {
            return /(^([0\+]\d{2,3})\d{3,4}\-\d{3,8}$)|(^([0\+]\d{2,3})\d{3,4}\d{3,8}$)|(^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$)|(^0\d{2,3}\d{3,8}$)|(^0\d{2,3}\-\d{3,8}$)|(^\d{7,8}$)/.test(value);
        },
        message: '请正确输入电话号码'
    },
    number: {
        validator: function (value, param) {
            return /^[0-9]+.?[0-9]*$/.test(value);
        },
        message: '请输入数字'
    },
    money: {
        validator: function (value, param) {
            return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
        },
        message: '请输入正确的金额'

    },
    mone: {
        validator: function (value, param) {
            return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
        },
        message: '请输入整数或小数'

    },
    integer: {
        validator: function (value, param) {
            return /^[+]?[1-9]\d*$/.test(value);
        },
        message: '请输入最小为1的整数'
    },
    integ: {
        validator: function (value, param) {
            return /^[+]?[0-9]\d*$/.test(value);
        },
        message: '请输入整数'
    },
    range: {
        validator: function (value, param) {
            if (/^[1-9]\d*$/.test(value)) {
                return value >= param[0] && value <= param[1]
            } else {
                return false;
            }
        },
        message: '输入的数字在{0}到{1}之间'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0]
        },
        message: '至少输入{0}个字'
    },
    maxLength: {

        validator: function (value, param) {
            return value.length <= param[0]
        },
        message: '最多{0}个字'
    },
    //select即选择框的验证
    selectValid: {
        validator: function (value, param) {
            if (value == param[0]) {
                return false;
            } else {
                return true;
            }
        },
        message: '请选择'
    },
    idCode: {
        validator: function (value, param) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        },
        message: '请输入正确的身份证号'
    },
    loginName: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5\w]+$/.test(value);
        },
        message: '登录名称只允许汉字、英文字母、数字及下划线。'
    },
    equalTo: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '两次输入的字符不一至'
    },
    englishOrNum: {// 只能输入英文和数字
        validator: function (value) {
            return /^[a-zA-Z0-9_ ]{1,}$/.test(value);
        },
        message: '请输入英文、数字、下划线或者空格'
    },
    xiaoshu: {
        validator: function (value) {
            return /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/.test(value);
        },
        message: '最多保留两位小数！'
    },
    ddPrice: {
        validator: function (value, param) {
            if (/^[1-9]\d*$/.test(value)) {
                return value >= param[0] && value <= param[1];
            } else {
                return false;
            }
        },
        message: '请输入1到100之间正整数'
    },
    jretailUpperLimit: {
        validator: function (value, param) {
            if (/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
                return parseFloat(value) > parseFloat(param[0]) && parseFloat(value) <= parseFloat(param[1]);
            } else {
                return false;
            }
        },
        message: '请输入0到100之间的最多俩位小数的数字'
    },
    rateCheck: {
        validator: function (value, param) {
            if (/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
                return parseFloat(value) > parseFloat(param[0]) && parseFloat(value) <= parseFloat(param[1]);
            } else {
                return false;
            }
        },
        message: '请输入0到1000之间的最多俩位小数的数字'
    }
});

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//扩展easyui datagrid 键盘选中行
$.extend($.fn.datagrid.methods, {
    keyCtr: function (jq) {
        return jq.each(function () {
            var grid = $(this);
            grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).bind('keydown', function (e) {
                switch (e.keyCode) {
                    case 38: // up
                        var selected = grid.datagrid('getSelected');
                        if (selected) {
                            var index = grid.datagrid('getRowIndex', selected);
                            grid.datagrid('selectRow', index - 1);
                        } else {
                            var rows = grid.datagrid('getRows');
                            grid.datagrid('selectRow', rows.length - 1);
                        }
                        break;
                    case 40: // down
                        var selected = grid.datagrid('getSelected');
                        if (selected) {
                            var index = grid.datagrid('getRowIndex', selected);
                            grid.datagrid('selectRow', index + 1);
                        } else {
                            grid.datagrid('selectRow', 0);
                        }
                        break;
                }
            });
        });
    }
});
$.extend($.fn.datagrid.methods, {
    /**
     * 开打提示功能（基于1.3.3+版本）
     * @param {} jq
     * @param {} params 提示消息框的样式
     * @return {}
     */
    doCellTip:function (jq, params) {
        function showTip(showParams, td, e, dg) {
            //无文本，不提示。
            if ($(td).text() == "") return;
            params = params || {};
            var options = dg.data('datagrid');
            var styler = 'style="';
            if(showParams.width){
                styler = styler + "width:" + showParams.width + ";";
            }
            if(showParams.maxWidth){
                styler = styler + "max-width:" + showParams.maxWidth + ";";
            }
            if(showParams.minWidth){
                styler = styler + "min-width:" + showParams.minWidth + ";";
            }
            styler = styler + ';word-wrap:break-word;"';
            showParams.content = '<div class="tipcontent"' + styler + '>' + showParams.content + '</div>';
            $(td).tooltip({
                content:showParams.content,
                trackMouse:true,
                position:params.position,
                onHide:function () {
                    $(this).tooltip('destroy');
                },
                onShow:function () {
                    var tip = $(this).tooltip('tip');
                    if(showParams.tipStyler){
                        tip.css(showParams.tipStyler);
                    }
                    if(showParams.contentStyler){
                        tip.find('div.tipcontent').css(showParams.contentStyler);
                    }
                }
            }).tooltip('show');

        };
        return jq.each(function () {
            var grid = $(this);
            var options = $(this).data('datagrid');
            if (!options.tooltip) {
                var panel = grid.datagrid('getPanel').panel('panel');
                panel.find('.datagrid-body').each(function () {
                    var delegateEle = $(this).find('> div.datagrid-body-inner').length ? $(this).find('> div.datagrid-body-inner')[0] : this;
                    $(delegateEle).undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove').delegate('td[field]', {
                        'mouseover':function (e) {
                            //if($(this).attr('field')===undefined) return;
                            var that = this;
                            var setField = null;
                            if(params.specialShowFields && params.specialShowFields.sort){
                                for(var i=0; i<params.specialShowFields.length; i++){
                                    if(params.specialShowFields[i].field == $(this).attr('field')){
                                        setField = params.specialShowFields[i];
                                    }
                                }
                            }
                            if(setField==null){
                                options.factContent = $(this).find('>div').clone().css({'margin-left':'-5000px', 'width':'auto', 'display':'inline', 'position':'absolute'}).appendTo('body');
                                var factContentWidth = options.factContent.width();
                                params.content = $(this).text();
                                if (params.onlyShowInterrupt) {
                                    if (factContentWidth > $(this).width()) {
                                        //debugger;
                                        showTip(params, this, e, grid);
                                    }
                                } else {
                                    showTip(params, this, e, grid);
                                }
                            }else{
                                panel.find('.datagrid-body').each(function(){
                                    var trs = $(this).find('tr[datagrid-row-index="' + $(that).parent().attr('datagrid-row-index') + '"]');
                                    trs.each(function(){
                                        var td = $(this).find('> td[field="' + setField.showField + '"]');
                                        if(td.length){
                                            params.content = td.text();
                                        }
                                    });
                                });
                                showTip(params, this, e, grid);
                            }
                        },
                        'mouseout':function (e) {
                            if (options.factContent) {
                                options.factContent.remove();
                                options.factContent = null;
                            }
                        }
                    });
                });
            }
        });
    },
    /**
     * 关闭消息提示功能（基于1.3.3版本）
     * @param {} jq
     * @return {}
     */
    cancelCellTip:function (jq) {
        return jq.each(function () {
            var data = $(this).data('datagrid');
            if (data.factContent) {
                data.factContent.remove();
                data.factContent = null;
            }
            var panel = $(this).datagrid('getPanel').panel('panel');
            panel.find('.datagrid-body').undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove')
        });
    }
});
