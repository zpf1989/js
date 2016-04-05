//原始类型（数字、字符串、布尔值）、对象类型
//2个特殊的原始类型：null（空）、undefined（未定义），只有他们无法拥有方法
//特殊的对象：数组、函数、Date（日期）、正则(RegExp)、Error

//数字
//不区分整数、浮点数，所有数字均为浮点数（范围，64位；实际的操作则基于32位整数）
//  整型
//      十六进制
console.log(0xff);//15*16+15=255(十进制)
console.log(0X0cafe911);
//      八进制（有些js解释器不支持，故最好不用）
console.log(0377);//3*64+7*8+7=255（十进制）
//  浮点型
3.14
console.log(.33333333);
console.log(6.02e23);
console.log(1.235646E-32);
console.log(Math.E);

//  算数运算
//      溢出(overflow)
Infinity;//或-Infinity
//      下溢(underflow)：负零
//      被零整除
Infinity;//或-Infinity;例外：0/0=NaN（非数字值）;
var x=NaN;
console.log(x!=x);//true
console.log(isNaN(x));
console.log(isFinite(NaN));
console.log(isFinite(Infinity));
console.log(isFinite(1565415));
//  二进制浮点数和四舍五入错误
var x=.3-.2;//0.09999999999999998
var y=.2-.1;//0.1
console.log(x);
console.log(y);
console.log(x==y);//false
    