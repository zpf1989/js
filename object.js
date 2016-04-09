//对象
var book={
    'title':'javascript',
    'for':'all audiences',
    author:{
        firstname:'david',//这里的属性没有引号
        surname:'flanagan'
    }  
};
console.log(book);

//避免属性访问错误
var len=book&&book.subtitle&&book.subtitle.length;//获取book对象subtitle属性（不存在）的长度
console.log(len);
len=book&&book.title&&book.title.length;
console.log(len);

//原型
//Object.prototype（new Object()）,Array.prototype（new Array()）,Date.prototype（Date.prototype）
console.log(Object.prototype);
console.log(Array.prototype);
console.log(Date.prototype);

//属性
var author=book.author;
console.log(author);
console.log(book["title"]);
book.for='zpf';
book['title']='C#';
console.log(book);

//js对象都是关联数组（又名散列、映射或字典）
var person={
    addr0:'济南',
    addr1:'菏泽',
    addr2:'济宁'
};
for(var i=0;i<3;i++){
    console.log(person['addr'+i]);
}

//继承
// inherit() returns a newly created object that inherits properties from the
// prototype object p.  It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create)                // If Object.create() is defined...
        return Object.create(p);      //    then just use it.
    var t = typeof p;                 // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {};                  // Define a dummy constructor function.
    f.prototype = p;                  // Set its prototype property to p.
    return new f();                   // Use f() to create an "heir" of p.
}
//父对象后期动态添加的属性，在子对象中依然继承；子对象的属性赋值操作不会影响原型链
var o={x:1};//初始属性x
o.a=9;//动态添加的属性a
var p=inherit(o);
p.y=2;
o.b=90;//p继承o之后，o又添加的属性，p依然可以访问
console.log('p:'+p);
console.log('p:x,'+p.x+';a,'+p.a+';b,'+p.b);
p.b=9;//覆盖属性b，o的b属性并没有改变
console.log('b的值，p:'+p.b+',o:'+o.b);
delete p.b;//删除了p的b属性，访问p.b时将从原型链中查找（即o.b）
console.log('b的值，p:'+p.b+',o:'+o.b);

//删除属性
//delete运算符只能删除自有属性，不能删除继承属性（要删除的继承属性必须从定义这个属性的原型对象上删除它，而这将影响所有继承自这个原型的对象）
delete o.x;
console.log(p.x);//undefined
//delete只能断开属性和宿主对象的联系，而不会操作属性的属性；
//这有可能造成内存泄漏，所以销毁对象时，要遍历属性的属性，依次删除
var author=book.author;
delete book.author;
console.log(author);

//检测属性
var o={x:120};
console.log('x' in o);//true
console.log('toString' in o);//true(toString属性继承自Object)
//检测是否是对象的自有属性
console.log(o.hasOwnProperty('x'));//true
console.log(o.hasOwnProperty('toString'));//false

//枚举属性
var o={x:1,y:89,z:8909};
for(p in o){
    console.log(p);//打印属性名称
}

//存取器getter、setter（可以继承）
var p={
    x:1.0,
    y:2.0,
    //r是可读写的存取器属性（同时有getter和setter）
    get r() {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    },
    set r(newval) {
        var oldval=this.r;
        var ratio=newval/oldval;
        this.x*=ratio;
        this.y*=ratio;
    },
    //theta是只读存取器属性（只有getter）
    get theta(){return Math.atan2(this.y,this.x);}
};
console.log('x:'+p.x+',y:'+p.y+',r:'+p.r);
p.r=p.r*10;
console.log('x:'+p.x+',y:'+p.y+',r:'+p.r);

//对象的三个属性
//  原型属性prototype
//通过对象直接量创建的对象，prototype=Object.prototype；
//通过new创建的对象，prototype=构造函数的prototype
//通过Object.create()创建的对象，prototype=第一个参数
var p={x:1};
var o=Object.create(p);
console.log(p.isPrototypeOf(o));//true
console.log(Object.prototype.isPrototypeOf(o));

//  类属性
function classof(o){
    if(o==null){
        return 'Null';
    }
    if(o==undefined){
        return undefined;
    }
    //Object的toString方法返回如下格式字符串：[object Class]
    return Object.prototype.toString.call(o).slice(8,-1);
}
console.log(classof(null));//Null
console.log(classof(123));//Number
console.log(classof(''));//String
console.log(classof(false));//Boolean
console.log(classof({}));//Object
console.log(classof([]));//Array
console.log(classof(/./));//RegExp
console.log(classof(new Date()));//Date
console.log(classof(window));//Window
function t(){};
console.log(classof(t));//Function
console.log(new t());//Object

//  可扩展性（是否可以给对象添加新属性）
var o={x:1};
console.log(Object.isExtensible(o));
Object.preventExtensions(o);
console.log(Object.isExtensible(o));
o.y=123;//不报错，但不会添加属性y
console.log(o.y);//undefined
//  封闭
console.log(Object.isSealed(o));//检测对象是否封闭（封闭，意味着不能增删自有属性）
Object.seal(o);//设置为封闭对象
delete o.x;//不会删除x属性
console.log(o.x);//1
console.log(Object.isSealed(o));//true
//  冻结
console.log(Object.isFrozen(o));//fasle
Object.freeze(o);
o.x=100;//不会生效
console.log(o.x);//1
console.log(Object.isFrozen(o));//true

//对象方法
//toString，默认输出:[object Object]
console.log({x:1,y:89}.toString());
//valueOf，获取原始值
console.log(new Date().valueOf());//1460192235664
