//运算符
function Person(name,age){
    this.name=name;
    this.age=age;
    this.say=function(){
        return "hei,"+this.name+",you\'re "+this.age+" years old !";
    };
};
var p = new Person('zpf',27);
console.log(p.say());
console.log('age' in p);//true：age是p的属性
delete p.age;//删除对象属性
console.log(p);
console.log(typeof(p));
console.log(p instanceof Person);//true：p是Person的实例
console.log('name' in p);//true：name是p的属性
console.log('age' in p);//false：age不是p的属性

//
console.log(1+2+' zpf');//"3 zpf"
console.log(1+(2+' zpf'));//"12 zpf"

//相等、不相等
var a='2';
var b=2;
console.log(a==b);//true,相等（==会允许类型转换）
console.log(a===b);//false，严格相等（===会严格判断类型是否相等）
var p=new Person('a',23);
var q=p;
console.log(p==q);//true
console.log(p===q);//true（引用相等）

var a,b;
console.log(a==b);//true
console.log(a===b);//false

//比较运算符倾向于数字，只有两个操作数都是字符串时，才会进行字符串比较
console.log(11<3);
console.log('11'<'3');//true
console.log('11'<3);//true
console.log('one'<3);//one->数字,得NaN；与NaN比较，返回false

//in运算符
var point={x:10,y:89};
console.log('x' in point);//true
console.log('z' in point);//false
console.log('tostring' in point);//false，区分大小写
console.log('toString' in point);//true

//instanceof运算符
//对象中存在一个隐藏的成员，指向其父类的原型;
//如果父类的实例是另外一个类的实例的话，则这个原型对象中也存在一个隐藏成员指向另外一个类的原型；
//这种链条将许多对象或类串联起来——原型链
var d=new Date();//当前时间
console.log(d);
console.log(d instanceof Date);//true
console.log(d instanceof Object);//true，所有的对象都是Object的实例
console.log(d instanceof Number);//false
var a=[1,2,3,4];
console.log(a instanceof Array);//true
console.log(a instanceof Object);//true
console.log(a instanceof RegExp);//false

//表达式计算eval()，解释运行由js源代码组成的【字符串】，并产生一个值
console.log(eval('3*2'));//6
console.log(789);//789,不是字符串，直接返回
console.log([1,2,3]);// [1, 2, 3]
console.log({x:100,y:90});// Object { x=100,  y=90}
//关键问题：eval使用了调用它的变量作用域环境
var a=100;
console.log(eval('a'));//能够识别变量a
eval('a=98;');//改变了a的值
console.log(a);
eval('b=123;');//声明了局部变量b
console.log(b);

var geval=eval;
var x='global',y='global';
function f(){
    var x='local';
    eval('x+=" changed";');//直接调用eval，总是在调用它的上下文作用域中执行
    return x;
}

function g(){
    var y='local';
    geval('y+=" changed";');//间接调用eval，则使用全局对象作为其上下文作用域，并无法读、写、定义局部变量喝函数
    return y;
}

console.log(f(),"x:"+x);//local changed x:global
console.log(g(),"y:"+y);//local y:global changed

//条件运算符?:
var x=-10;
console.log(x>0?x:-x);
var usr;//='zpf';
console.log('hello '+(usr?usr:'there'));

//typeof
console.log(typeof undefined);//undefined
console.log(typeof null);//object
console.log(typeof [1,2,]);//object
console.log(typeof true);//boolean
console.log(typeof Infinity);//number
console.log(typeof NaN);//number
console.log(typeof 23);//number
console.log(typeof '23');//string
console.log(typeof function(){});//function

//delete
var a=[1,2,3];
delete a[2];//删除最后一个元素
console.log(a);
console.log(2 in a);//false
console.log(a.length);//数组长度没变