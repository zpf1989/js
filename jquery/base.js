// // 打开弹出窗口
// function showPopWin(url, title, width, height, isModal, iconCls, funLoadCallback, editValue, booledit, funSubmitCallback) {

//     isModal = isModal == true ? true : false;
//     var id = "_tmpWin_" + Math.floor(Math.random() * 10000 + 1);
//     var win = $("<div id='" + id + "'></div>");

//     win.addClass("myOpenWindow");
//     win.appendTo($("body"));

//     $(win).dialog({
//         title: title,
//         href: url,
//         width: width,
//         height: height,
//         modal: isModal,
//         iconCls: iconCls,
//         buttons: [{
//             text: '确定',
//             iconCls: 'icon-ok',
//             width: 75,
//             handler: function() {
//                 var b = funSubmitCallback();
//                 if (b != false) {
//                     $(win).dialog("close");
//                 }
//             }
//         }, {
//                 text: '取消',
//                 iconCls: 'icon-cancel',
//                 width: 75,
//                 handler: function() {
//                     $(win).dialog("close");
//                 }
//             }],
//         onClose: function() {
//             $(win).dialog("destroy");
//         },
//         onLoad: function() {
//             funLoadCallback(editValue, booledit);
//             $("#" + id).next().children("a").first().focus();
//             $(win).keydown(function(event) {
//                 if (event.keyCode == 13) {
//                     var b = funSubmitCallback();
//                     if (b != false) {
//                         $(win).dialog("close");
//                     }
//                 }
//             });

//         }

//     });
//     return id;
// }

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