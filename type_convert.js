//类型转换
console.log(10+'zpf');//10zpf
console.log("10"*"4");//40
console.log(1-'x');//NaN

//显式类型转换
console.log(Number('3'));
console.log(String(false));
console.log(Boolean([]));
console.log(Object(3));// Number {}
console.log(Object(3).toString());//3
console.log(Object(false));// Boolean {}
console.log(Object(false).toString());// false
console.log(Object('false'));// String { 0="f",  1="a",  2="l",  更多...}

//除了null、undefined之外的任何值都可以toString()

var x;
x+"";//相当于：new String(x)
+x;//相当于：new Number(x)
!!x;//相当于：new Boolean(x)

//Number类定义的toString()可以指定基数，转换成指定进制
var n=17;
binary_string=n.toString(2);//二进制10001
console.log(binary_string);
octal_string='0'+n.toString(8);//8进制021
console.log(octal_string);
hex_string='0x'+n.toString(16);//16进制0x11
console.log(hex_string);

//数字转字符串
var n=12345.68979;
console.log(n.toFixed(0));//12346
console.log(n.toFixed(2));//12345.69
console.log(n.toFixed(6));//12345.689790
console.log(n.toExponential(1));//1.2e+4    
console.log(n.toExponential(3));//1.235e+4
console.log(n.toPrecision(4));//1.235e+4
console.log(n.toPrecision(7));//12345.69
console.log(n.toPrecision(11));//12345.689790

//字符串转数字
console.log(parseInt('3 blind mice'));//3
console.log(parseInt(' 3.14 meters'));//3
console.log(parseInt('-1.23'));//-1
console.log(parseInt('0xFF'));//255
console.log(parseInt('0xff'));//255
console.log(parseInt('-0xFF'));//255
console.log(parseFloat('.1'));//0.1
console.log(parseInt('0.1'));//0
console.log(parseInt('.1'));//NaN
console.log(parseFloat('$12.1'));//NaN

//对象转换为原始值
console.log([1,2,3].toString());//1,2,3
console.log((function(){var a=0;}).toString());//function (){var a=0;}
console.log(/\d+/g.toString());///\d+/g
console.log(new Date(1989,10,03).toString());//Fri Nov 03 1989 00:00:00 GMT+0800
//      对象——字符串：优先调用toString、不行再valueOf
//      对象——数字：选valueOf、不行再toString

var now=new Date();
console.log(typeof(now+1));//string
console.log(typeof(now-1));//number
console.log(now==now.toString());//true
console.log(now>(now-1));//true


