//包装对象
var s="test";
s.len=4;//设置属性：这时会创建一个临时字符串对象（new String()），设置属性len=4，随即销毁该对象
var t=s.len;//通过原始的字符串创建一个临时字符串对象，尝试访问len属性（没有），会得到undefined
console.log(t);
//总结：修改只是发生在了临时对象上，而这个临时对象并未保存下来

//在存取字符串、数字、或布尔值的属性创建的临时对象被称为——包装对象
//可以使用String()、Number()或Boolean()显式创建包装对象
var str=new String('zpf');
str.len=str.length;
console.log(str.len);

console.log(typeof(str));
console.log(typeof('zpf'));

console.log(str=='zpf');//true
console.log(str==='zpf');//false

//原始值（字符串、数字、或布尔值）有别于对象，原始值不可更改
//原始值的比较是值的比较

//对象是可变的
//对象的比较并非值的比较，即使包含同样的属性和相同的值，也不相等；各索引元素完全相等的数组也不相等

//对象通常称为引用类型
var a=[];
var b=a;
b[0]=1;
console.log(a);
console.log(b);
console.log(a==b);
console.log(a===b);//true，因为a、b引用同一个数组对象
