//函数
//一、定义
//语句声明形式定义的函数，不能在循环、条件判断或try/catch/finally以及with语句中；
//函数定义表达式可以出现在js代码的任意地方
function printprops(o) {
    for(var p in o){
        console.log(p+": "+o[p]);
    }
    console.log(printprops);//函数名称将作为函数内的局部变量
}
var person={
    name:'张三',
    age:34,
    tel:'unknown'
};
//将函数赋值给变量
var funcVar=printprops;
funcVar(person);

//函数表达式作为参数
var data=[1,2,6,4,7,3,9,0];
console.log(data.sort(function(a,b){
    return a-b;
}));//Array [ 0, 1, 2, 3, 4, 6, 7, 9 ]

//函数定义后直接调用
var rst=(function(x){
    return x*x;
}(10));
console.log(rst);//100

//嵌套函数
function outter(a,b){
    function square(x){return x*x;}
    return Math.sqrt(square(a)+square(b));
}
console.log(outter(3,4));

//二、调用
//①作为函数调用：如上（其this值不是全局对象（非严格模式）就是undefined（严格模式））
//②作为方法调用（即将js函数保存在对象的属性中）；注意其调用上下文（对象o成为调用上下文，函数体可以使用this引用该对象）
var o={name:'zpf'};
o.say=function(txt){
    console.log(this.name+" say "+txt);
};
o.say('hello');//zpf say hello
o["say"]('123');//zpf say 123
//方法链：如果一个方法返回的是一个对象，这个对象还可以再调用它的方法
//方法不需要返回值时，最好直接返回this
//内部函数如何访问外部函数的this值
var o={
    m:function(){
        var self=this;
        console.log(this===o);//true
        f();
        
        function f(){
            console.log(this===o);//false
            console.log(self===o);//true，访问外部函数的this值的正确方式
        }
    }
};
o.m();

//③构造函数调用
//没有形参的构造函数调用都可以省略(),new Object
//在表达式 new o.m()中，调用上下文并不是o！！！
var dd=new o.m();//false,false,fasle

//④间接调用：任何函数可以作为任何对象的方法来调用，即使函数不是指定对象的方法


//三、函数形参和实参
//①可选形参
function getPropertyNames(o,/* optional */ arr){//可选形参必须放在最后
    arr=arr||[];//如果arr参数没有提供，则赋值为[]
    for(var p in o){
        arr.push(p);
    }
    return arr;
}
var obj={name:'张',age:235};
console.log(getPropertyNames(obj));
//②可变长实参列表：实参对象
//默认情况下，缺少的参数为undefined，多余的参数会自动省略
function f(a,b){
    if(arguments.length!=2){
        var info="function is called with "+arguments.length+" arguments,but it expects 2 arguments.";
        // throw new Error(info);
        console.log(info);
    }
}
f(1,2,3);
//函数可以操作任意数量的参数（不定实参函数，实参个数不能为零）
function max(/* ... */){
    var max=Number.NEGATIVE_INFINITY;
    for(var i=0;i<arguments.length;i++){
        if(arguments[i]>max){
            max=arguments[i];
        }
    }
    return max;
}
console.log(max(1,2,6));
console.log(max(1,2,6,56,890,234234));
//实参对象不是数组！
function f(x){
    console.log(x);//123
    arguments[0]=null;
    console.log(x);//null,x和arguments[0]指代同一个值
}
f(123);

//③将对象属性用作实参
function arraycopy(from,from_start,to,to_start,length) {
    //
    var max=from.length;
    if((from_start+length)<max){
        max=from_start+length;
    }
    console.log(max);
    for(var i=from_start,j=to_start;i<max;i++,j++){
        to[j]=from[i];
    }
}

function easycopy(args){
    arraycopy(args.from,args.from_start||0,//默认0
                args.to,args.to_start||0,
                args.length);
}
var a=[1,2,3,4,5],b=[];
console.log(a);
easycopy({from:a,to:b,length:4});
console.log(b);

//④实参类型：函数应该添加实参类型检查逻辑

//四、作为值的函数
var a=[function(x){return x*x;},20];
console.log(a[0](a[1]));

var operators={
    add:function (x,y) {return x+y;},
    subtract:function (x,y) {return x-y;},
    multiply:function (x,y) {return x*y;},
    divide:function (x,y) {return x/y;},
};

function operator(operation,operand1,operand2) {
    if(typeof operators[operation]==="function"){
        return operators[operation](operand1,operand2);
    }
    else{
        console.log("unknown operation");
    }
}
console.log(operator("add","hello",operator("add"," ","world")));
console.log(operator("multiply",123,321));











