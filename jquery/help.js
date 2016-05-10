var helpinit = {
    salesorder: function(grid) {
        if (!grid) {
            return;
        }
        grid.datagrid({
            url: 'datagrid_salesorder.json',
            title: '销售订单帮助',
            singleSelect: true,
            pagination: true,
            pageSize: 10,
            fit: true,
            columns: [[
                { field: 'itemid', title: '主键', width: 50, align: 'center' },
                { field: 'listprice', title: '价格', width: 100, align: 'center' },
                { field: 'status', title: '状态', width: 60, align: 'center' },
            ]]
        });
    },
    org: function(grid) {
        if (!grid) {
            return;
        }
        grid.datagrid({
            url: 'datagrid_org.json',
            title: '部门帮助',
            singleSelect: true,
            pagination: true,
            pageSize: 10,
            fit: true,
            columns: [[
                { field: 'id', title: '主键', width: 50, align: 'center' },
                { field: 'code', title: '价格', width: 100, align: 'center' },
                { field: 'name', title: '状态', width: 60, align: 'center' },
            ]]
        });
    }
};

// 打开弹出窗口
function showPopWindow(url, width, height, isModal, funLoadCallback, funSubmitCallback) {

    isModal = isModal == true ? true : false;
    var id = "_tmpWin_" + Math.floor(Math.random() * 10000 + 1);
    var win = $("<div id='" + id + "'></div>");

    win.addClass("myOpenWindow");
    win.appendTo($("body"));
    $(win).dialog({
        title: "",
        href: url,
        width: width,
        height: height,
        modal: isModal,
        iconCls: null,
        buttons: [{
            text: '确定',
            iconCls: 'icon-ok',
            width: 75,
            handler: function() {
                var selData = null;
                var row = $('#grid').datagrid('getSelected');
                if (funSubmitCallback) {
                    funSubmitCallback(row);
                }
                $(win).dialog("close");
            }
        }, {
                text: '取消',
                iconCls: 'icon-cancel',
                width: 75,
                handler: function() {
                    $(win).dialog("close");
                }
            }],
        onClose: function() {
            $(win).dialog("destroy");
        },
        onLoad: function() {
            funLoadCallback($('#grid'));
            $("#" + id).next().children("a").first().focus();
            $(win).keydown(function(event) {
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