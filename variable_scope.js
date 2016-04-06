//可以使用var语句重复声明变量

//函数体内，局部变量的优先级高于全局变量
var scope='global';
function checkscope(){
    var scope='local';//覆盖全局变量；局部变量的声明需要var显式指定
    return scope;
}
// console.log(checkscope());

a='global';//声明全局变量（可以不用var）
function checkscope2(){
    a='local';//改变了全局变量的值
    b='local';//显式声明全局变量
    return [a,b];
}
// console.log(checkscope2());
// console.log(a);
// console.log(b);

//嵌套作用域
var scope='global scope';//全局变量
function checkscope3(){
    var scope='local scope';//局部变量
    function nested(){
        var scope='nested scope';//嵌套变量
        return scope;
    }
    return nested();
}
// console.log(checkscope3());

//函数作用域和声明提前
function test(){
    if(true){
        var k=2;//k在整个函数体内都是有定义的
        for(var j=0;j<4;j++){
            console.log(j);
        }
        console.log(j);//j已定义，输出4
    }
    console.log(k);//k已定义，输出2
}
// test();

var scope='global';
function f(){
    console.log(scope);//undefined，因为scope被局部变量覆盖
    var scope='local';
    console.log(scope);   
}
// f();

//作为属性的变量
//声明一个js全局变量时，实际上定义了全局对象的一个属性
var a=1;//声明一个不可删除的全局变量
b=2;//创建全局对象的一个可删除的属性
this.c=3;//同上
// console.log(this.a);
// console.log(this.b);
// console.log(this.c);
console.log(delete a);//false变量并没有被删除
console.log(delete b);//true
console.log(delete c);//true
// console.log(this.a);
// console.log(this.b);
// console.log(this.c);

//作用域链
//每一段js代码都有一个与之关联的作用域链，它是一个对象列表或链表，这组对象定义了这段代码的“作用域中”的变量；
//当js需要查找变量x的值的时候，会从链中的第一个对象开始查找，如果该对象有一个名为x的属性，则会直接使用这个属性的值；
//否则，沿着作用域链，继续查找下一个对象

//js的最顶层代码中，作用域链由一个全局对象组成
//不包含嵌套的函数体内，作用域链上有两个对象（第一个定义函数参数和局部变量，第二个是全局对象）；
//在一个嵌套的函数体内，作用域链上至少有三个对象

//定义一个函数时，实际保存一个作用域链
//调用这个函数时，它创建一个新的对象来存储它的局部变量，并将这个对象添加至保存的那个作用域链上，同时创建一个新的更长的表示函数调用作用域的“链”；
//对嵌套函数，每次调用外部函数时，内部函数又会重新定义一遍（因为每次调用外部函数时的作用域链都是不同的）
