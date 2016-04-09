//����
var book={
    'title':'javascript',
    'for':'all audiences',
    author:{
        firstname:'david',//���������û������
        surname:'flanagan'
    }  
};
console.log(book);

//�������Է��ʴ���
var len=book&&book.subtitle&&book.subtitle.length;//��ȡbook����subtitle���ԣ������ڣ��ĳ���
console.log(len);
len=book&&book.title&&book.title.length;
console.log(len);

//ԭ��
//Object.prototype��new Object()��,Array.prototype��new Array()��,Date.prototype��Date.prototype��
console.log(Object.prototype);
console.log(Array.prototype);
console.log(Date.prototype);

//����
var author=book.author;
console.log(author);
console.log(book["title"]);
book.for='zpf';
book['title']='C#';
console.log(book);

//js�����ǹ������飨����ɢ�С�ӳ����ֵ䣩
var person={
    addr0:'����',
    addr1:'����',
    addr2:'����'
};
for(var i=0;i<3;i++){
    console.log(person['addr'+i]);
}

//�̳�
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
//��������ڶ�̬��ӵ����ԣ����Ӷ�������Ȼ�̳У��Ӷ�������Ը�ֵ��������Ӱ��ԭ����
var o={x:1};//��ʼ����x
o.a=9;//��̬��ӵ�����a
var p=inherit(o);
p.y=2;
o.b=90;//p�̳�o֮��o����ӵ����ԣ�p��Ȼ���Է���
console.log('p:'+p);
console.log('p:x,'+p.x+';a,'+p.a+';b,'+p.b);
p.b=9;//��������b��o��b���Բ�û�иı�
console.log('b��ֵ��p:'+p.b+',o:'+o.b);
delete p.b;//ɾ����p��b���ԣ�����p.bʱ����ԭ�����в��ң���o.b��
console.log('b��ֵ��p:'+p.b+',o:'+o.b);

//ɾ������
//delete�����ֻ��ɾ���������ԣ�����ɾ���̳����ԣ�Ҫɾ���ļ̳����Ա���Ӷ���������Ե�ԭ�Ͷ�����ɾ���������⽫Ӱ�����м̳������ԭ�͵Ķ���
delete o.x;
console.log(p.x);//undefined
//deleteֻ�ܶϿ����Ժ������������ϵ��������������Ե����ԣ�
//���п�������ڴ�й©���������ٶ���ʱ��Ҫ�������Ե����ԣ�����ɾ��
var author=book.author;
delete book.author;
console.log(author);

//�������
var o={x:120};
console.log('x' in o);//true
console.log('toString' in o);//true(toString���Լ̳���Object)
//����Ƿ��Ƕ������������
console.log(o.hasOwnProperty('x'));//true
console.log(o.hasOwnProperty('toString'));//false

//ö������
var o={x:1,y:89,z:8909};
for(p in o){
    console.log(p);//��ӡ��������
}

//��ȡ��getter��setter�����Լ̳У�
var p={
    x:1.0,
    y:2.0,
    //r�ǿɶ�д�Ĵ�ȡ�����ԣ�ͬʱ��getter��setter��
    get r() {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    },
    set r(newval) {
        var oldval=this.r;
        var ratio=newval/oldval;
        this.x*=ratio;
        this.y*=ratio;
    },
    //theta��ֻ����ȡ�����ԣ�ֻ��getter��
    get theta(){return Math.atan2(this.y,this.x);}
};
console.log('x:'+p.x+',y:'+p.y+',r:'+p.r);
p.r=p.r*10;
console.log('x:'+p.x+',y:'+p.y+',r:'+p.r);

//�������������
//  ԭ������prototype
//ͨ������ֱ���������Ķ���prototype=Object.prototype��
//ͨ��new�����Ķ���prototype=���캯����prototype
//ͨ��Object.create()�����Ķ���prototype=��һ������
var p={x:1};
var o=Object.create(p);
console.log(p.isPrototypeOf(o));//true
console.log(Object.prototype.isPrototypeOf(o));

//  ������
function classof(o){
    if(o==null){
        return 'Null';
    }
    if(o==undefined){
        return undefined;
    }
    //Object��toString�����������¸�ʽ�ַ�����[object Class]
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

//  ����չ�ԣ��Ƿ���Ը�������������ԣ�
var o={x:1};
console.log(Object.isExtensible(o));
Object.preventExtensions(o);
console.log(Object.isExtensible(o));
o.y=123;//�������������������y
console.log(o.y);//undefined
//  ���
console.log(Object.isSealed(o));//�������Ƿ��գ���գ���ζ�Ų�����ɾ�������ԣ�
Object.seal(o);//����Ϊ��ն���
delete o.x;//����ɾ��x����
console.log(o.x);//1
console.log(Object.isSealed(o));//true
//  ����
console.log(Object.isFrozen(o));//fasle
Object.freeze(o);
o.x=100;//������Ч
console.log(o.x);//1
console.log(Object.isFrozen(o));//true

//���󷽷�
//toString��Ĭ�����:[object Object]
console.log({x:1,y:89}.toString());
//valueOf����ȡԭʼֵ
console.log(new Date().valueOf());//1460192235664
