//变量
var x;
x=0;
x=1;
x=0.01;
x='hello world';
x="javascript";
x=true;
x=false;
x=null;
x=undefined;

//对象
var book={
    topic:"javascript",
    fat:true
};

//alert(book.topic);
//alert(book["fat"]);
book.author="abc";//动态添加新属性
book.contents={};//添加属性（赋值为空对象）

//数组
var primes=[2,3,4,5];
//alert(primes[0]);
//alert(primes.length);
primes[4]=9;//通过赋值添加新元素
var emptyArr=[];//空数组
//alert(emptyArr.length);//0

var points=[//具有两个元素的数组，每个元素都是对象
    {x:0,y:1},
    {x:2,y:4}
];

var data={
    data1:[[1,2],[3,4]],//每个属性都是数组，数组的元素也是数组
    data2:[[3,6],[0,9]]
};

//运算符
var tmp=3+2;
tmp=3-2;
tmp=3*2;
tmp=3/2;//1.5
tmp=points[1].x-points[0].x;
tmp="2"+"4";//"24"

var count=0;
count++;
count--;
count+=2;
count*=3;

//关系运算
var x=2,y=3;
x==y;//false
x!=y;//true
x<y;//true
x<=y;//true
x>y;//false
x>=y;//false
"two"=="three";//false
"two" > "three";//true(tw、th)
false==(x>y);//true(false和false相等)

//逻辑运算
(x==2)&&(y==3);//true
(x>3)||(y<3);//false
!(x==y);//true

//函数
function plus1(x){
    return x+1;
}
plus1(y);//4

var square=function(x){
    return x*x;
}
square(plus1(y));//16

//方法：作为对象属性的函数
var a=[];
a.push(1,2,3);
a.reverse();

points.distance=function(){
    var p1=this[0];//通过this获取对当前数组的引用
    var p2=this[1];
    var a=p2.x-p1.x;
    var b=p2.y-p1.y;
    return Math.sqrt(a*a,b*b);
};
var dist=points.distance();//计算两点间距离
console.log(dist);

//控制语句
function abs(x){
    if(x>=0){
        return x;
    }
    else{
        return -x;
    }
}

function factorial(n){
    var product=1;
    while(n>1){
        product*=n;
        n--;
    }
    return product;
}

console.log(factorial(4));

//定义一个构造函数以初始化一个新的Point对象
function Point(x,y){
    this.x=x;
    this.y=y;
}

var p=new Point(1,1);
Point.prototype.r=function () {
    return Math.sqrt(this.x*this.x+this.y*this.y);
}
console.log(p.r());
console.log('done');