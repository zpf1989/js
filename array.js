//数组
//元素类型任意，同一数组不同元素类型可不同；
//数组元素索引可以不连续（即稀疏数组），此时length属性大于任何元素索引值
//数组是对象的特殊形式

//一、创建
//1、直接量
var empty=[];
var primes=[2,3,4,5,6];
var misc=[1,true,'asdf',];//最后一个,后的内容被忽略
console.log(misc+',len:'+misc.length);//3

var base=1024;
var table=[base,base+1,base+2];// [1024, 1025, 1026]
console.log(table);

var b=[[1,{x:1,y:2}],[2,{x:3,y:4}]];
console.log(b);// [[1, Object { x=1,  y=2}], [2, Object { x=3,  y=4}]]

var b=[1,,3];
console.log(b);// [1, undefined, 3]

//2、构造函数
var a=new Array();
console.log(a);
a=new Array(5);//长度5
console.log(a);// [undefined, undefined, undefined, undefined, undefined]
console.log(a[0]);// undefined
a=new Array(5,4,'test');
console.log(a);

//二、读写
a[-1.23]=true;//将给对象a添加属性-1.23，值为true（数组是对象）
console.log(a);
console.log(a["1"]);//数组a的第2个元素值
console.log(a[1.0000]);//a[1.0000]==a[1]

//三、稀疏数组
a=[];
a[1000]=1;//添加一个元素，但同时设置length属性为1001
console.log(a.length);//1001

//四、数组长度
//设置length属性为一个小于当前长度的非负整数n时，当前数组中那些索引值大于或等于n的元素将从中删除
a=[1,2,3,4,5,56];
console.log(a);// [1, 2, 3, 4, 5, 56]
a.length=2;
console.log(a);// [1, 2]

//五、数组元素的添加和删除
a=[];
a[0]='zero';
a.push('one','two');
a.unshift('negative two','negative one');//在数组头插入元素
console.log(a);// ["negative two", "negative one", "zero", "one", "two"]

delete a[1];//delete不会修改数组length属性，不会修改元素索引值
console.log(a);// ["negative two", undefined, "zero", "one", "two"]
a.pop();//删除最后一个元素，会修改数组长度，["negative two", undefined, "zero", "one"]
a.shift();//删除第一个元素，会修改数组长度和元素值的索引
console.log(a);//  [undefined, "zero", "one"]

//六、遍历
a=[1,2,3,4];
a.name='zpf';
a.say=function(){
    console.log('hello');
}
//Object.keys，返回对象的可枚举属性和方法名
console.log(Object.keys(a));// ["0", "1", "2", "3", "name", "say"]
//考虑稀疏数组
var str='';
delete a[2];
for(var idx=a.length-1;idx>=0;idx--){
    if(!a[idx]){//排除null、undefined和不存在的元素
    // if(a[idx]===undefined){//排除undefined元素
    // if(!(idx in a)){//排除不存在的元素
        continue;
    }
    str+=idx+':'+a[idx]+',';
}
console.log(str);//3:4,1:2,0:1,
//访问对象属性的方法
str='';
for(var idx in a){
    str+=idx+':'+a[idx]+',';
}
console.log(str);//0:1,1:2,3:4,name:zpf,say:function (){console.log('hello');},

//ECMAScript5，forEach
var num=0;
a.forEach(function(x) {
    num+=x*x;
});
console.log(num);

//七、数组方法
//join
var a=[1,2,3,4];
console.log(a.join());//1,2,3,4
console.log(a.join(''));//1234
console.log(a.join(' '));//1 2 3 4
var b=new Array(10);
console.log(b.join('-'));//---------

//reverse：颠倒顺序
var a=[4,2,3,1];
console.log(a.reverse().join());//1,3,2,4

//sort
var a=[33,4,1111,222];
console.log(a.sort());// 按字母表顺序排序：[1111, 222, 33, 4]
var b=a.sort(function(a,b){//数值顺序
    return a-b;//根据顺序，返回负数、0、正数
});
console.log(b);// [4, 33, 222, 1111]

var a=['ant','Bug','cat','Dog'];
console.log(a.sort());//区分大小写的排序 ["Bug", "Dog", "ant", "cat"]
Array.prototype.sortIgnoreCase=function(){//不区分大小写的排序 ["ant", "Bug", "cat", "Dog"]
    return this.sort(function(x,y){
        var a=x.toLowerCase();
    var b=y.toLowerCase();
    if(a<b) {
        return -1;
    }
    if(a>b){
        return 1;
    }
    return 0;
    });
}
console.log(a.sortIgnoreCase());

//concat，连接的是数组的元素，而不是数组本身
var a=[1,2,3];
console.log(a.concat(4,5));// [1, 2, 3, 4, 5]
console.log(a.concat([4,5],[6,7]));// [1, 2, 3, 4, 5, 6, 7]（去重）
console.log(a.concat(4,[5,[6,7]]));// [1, 2, 3, 4, 5, [6, 7]]

//slice
var a=[1,2,3,4,5];
console.log(a.slice(0,3));// [1, 2, 3]
console.log(a.slice(3));// [4, 5]
console.log(a.slice(1,-1));// [2, 3, 4]
console.log(a.slice(-3,-2));// [3]

//splice，插入或删除数组元素的通用方法，会修改数组
var a=[1,2,3,4,5,6,7,8];
console.log(a.splice(4));//删除的元素 [5, 6, 7, 8]
console.log(a);// 修改后的a数组[1, 2, 3, 4]
console.log(a.splice(1,2));// [2, 3]
console.log(a);// [1, 4]
console.log(a.splice(1,1));//[4]
console.log(a);//[1]

//ECMAScript5，这里的方法都不会修改它们调用的原始数组；传递给这些方法的函数可以修改这些数组  
//forEach
var a=[1,2,3,4];
a.forEach(function(v,i,a) {
    a[i]=v+1;
});
console.log(a);// [2, 3, 4, 5]
//map
b=a.map(function(x){
    return x*x;
});
console.log(b);// [4, 9, 16, 25]
//filter
c=b.filter(function(x) {
    return x<20;
});
console.log(c);// [4, 9, 16]
c=b.filter(function(x,i){
    return i%2==0;
});
console.log(c);// [4, 16]
//压缩稀疏数组
var a=[3,4,,,5];
console.log(a);// [3, 4, undefined, undefined, 5]
console.log(a.filter(function(){return true;}));// [3, 4, 5]
console.log(a.filter(function(x){return x!==undefined&&x!==null;}));// [3, 4, 5]

//every、some
console.log(a.every(function(x) {
    return x<100;
}));//true
console.log(a.some(function(x) {
    return x>4;
}));

//reduce、reduceRight
var a=[1,2,3,4,5];
console.log(a.reduce(function(x,y) {
    return x+y;
},100));//100是初始值；上次调用reduce的返回值，将作为本次调用reduce的初始值

var a=[2,3,4];
var big=a.reduceRight(function(accumulator,value) {
    return Math.pow(value,accumulator);
});
console.log(big);// 2.4178516392292583e+24

//indexOf、lastIndexOf
a=[0,1,2,1,0];
console.log(a.indexOf(1));//1
console.log(a.indexOf(5));//-1
console.log(a.lastIndexOf(1));//3

//数组类型
var isArray=Function.isArray||function(o){
    return typeof o ==='object'&&
    Object.prototype.toString.call(o)==='[object Array]';
};
var d=[1];
console.log(isArray(d));//true
console.log(isArray({}));

//作为数组的字符串
var s='text';
console.log(s.charAt(0));//t
console.log(isArray(s));//false
console.log(s[2]);//x