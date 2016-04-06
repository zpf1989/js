//表达式
//数组初始化表达式[]
[]
// console.log([1+2,3+4]);
//表达式嵌套
var matrix=[[1,2],[3,4],[2,1]];
// console.log(matrix);
// console.log([1,,,,3]);// [1, undefined, undefined, undefined, 3]
// console.log([1,3,]);// [1, 3]，最后一个','之后的将被忽略
// console.log([1,3,,,]);// [1, 3, undefined, undefined]

//对象初始化表达式{}
var p={x:2.3,y:-1.2};
var q={};
p.x=3.2;
q.y=-10;
// console.log(p);
// console.log(q);
//对象嵌套
var rect={
    topleft:{x:2,y:2},
    bottomright:{x:4,y:5},
    dist:function(){
        var a=this.bottomright.x-this.topleft.x;
        var b=this.bottomright.y-this.topleft.y;
        return Math.sqrt(a*a+b*b);
    }
};
// console.log(rect.dist());

//函数定义表达式
var square=function(x){return x*x;}
// console.log(square(10));

//属性访问表达式
// console.log(rect.topleft.x);
// console.log(rect['topleft']);

//调用表达式
// console.log(Math.max(10,34,-80));
// console.log(matrix.sort());
// console.log(matrix.sort((a,b)=>a[1]>b[1]));

//对象创建表达式
console.log(new Object('abc'));
function Point(x,y){
    this.x=x;
    this.y=y;
};
Point.prototype.toString=function(){
    return "x:"+this.x+",y:"+this.y;
};
console.log(new Point(2,3).toString());