//一组由16位值组成的不可变的有序序列
//没有字符型
//采用UTF-16编码的Unicode字符集，不能表示为16位的Unicode字符用两个16位值组成一个序列表示
var p='π';
var e='^';
console.log(p.length);
console.log(e.length);

var str='z\'pf';
console.log(str);
str="a:你是谁？\
b:你有是谁？\
a:你先说！\
b:你先说！！";//多行代码定义单行显示的字符串，只在ECMAScript5 中可用
console.log(str);

//  转义字符(\)
str='You\'re right,i can\'t leave here';
console.log(str);
//      两个通用转义
//          十六进制
console.log('\xA9');//?（版权符号）
//          由4个十六进制数指定的任意Unicode字符
console.log('\u03c0');//π
console.log('zpf\u0009fp\tz');//\t
//  运算
var msg='Hello,'+'world';
console.log(msg+',length:'+msg.length);
console.log(msg.charAt(0));
console.log(msg[0]);
console.log(msg[msg.length-1]);
console.log(msg.charAt(msg.length-1));
console.log(msg.substring(1,4));
console.log(msg.slice(1,4));
console.log(msg.slice(-3));
console.log(msg.indexOf('l'));
console.log(msg.lastIndexOf('l'));
msg.split(',').forEach(function(e) {
    console.log(e);
}, this);
console.log(msg.replace('H','h'));
console.log(msg.toUpperCase());
//上述函数都返回新字符串，原字符串没有变化
console.log(msg);

//正则RegExp
var text='testing:1,2,3';
var pattern=/\d+/g;//包含一个或多个数字
pattern.test(text);//true
var r=text.search(pattern);//8，第一个匹配项的位置
console.log(r);
text.match(pattern).forEach(function(e){
    console.log(e);
});
console.log(text.replace(pattern,'*'));
console.log(text.split(/\D+/));//用非数字字符截取字符串，["", "1", "2", "3"]