//任意js的值都可以转换为布尔值
//这些值会得到false：undefined、null、0、-0、NaN、""(空字符串)
var o;
if(o!==null){
    //只有当o不是null时才会执行
}

if(o){
    //o不是false或任何假值（null、undefined等）时才会执行
}

var val=true;
console.log(val.toString());