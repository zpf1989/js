//����
//һ������
//���������ʽ����ĺ�����������ѭ���������жϻ�try/catch/finally�Լ�with����У�
//����������ʽ���Գ�����js���������ط�
function printprops(o) {
    for(var p in o){
        console.log(p+": "+o[p]);
    }
    console.log(printprops);//�������ƽ���Ϊ�����ڵľֲ�����
}
var person={
    name:'����',
    age:34,
    tel:'unknown'
};
//��������ֵ������
var funcVar=printprops;
funcVar(person);

//�������ʽ��Ϊ����
var data=[1,2,6,4,7,3,9,0];
console.log(data.sort(function(a,b){
    return a-b;
}));//Array [ 0, 1, 2, 3, 4, 6, 7, 9 ]

//���������ֱ�ӵ���
var rst=(function(x){
    return x*x;
}(10));
console.log(rst);//100

//Ƕ�׺���
function outter(a,b){
    function square(x){return x*x;}
    return Math.sqrt(square(a)+square(b));
}
console.log(outter(3,4));

//��������
//����Ϊ�������ã����ϣ���thisֵ����ȫ�ֶ��󣨷��ϸ�ģʽ������undefined���ϸ�ģʽ����
//����Ϊ�������ã�����js���������ڶ���������У���ע������������ģ�����o��Ϊ���������ģ����������ʹ��this���øö���
var o={name:'zpf'};
o.say=function(txt){
    console.log(this.name+" say "+txt);
};
o.say('hello');//zpf say hello
o["say"]('123');//zpf say 123
//�����������һ���������ص���һ������������󻹿����ٵ������ķ���
//��������Ҫ����ֵʱ�����ֱ�ӷ���this
//�ڲ�������η����ⲿ������thisֵ
var o={
    m:function(){
        var self=this;
        console.log(this===o);//true
        f();
        
        function f(){
            console.log(this===o);//false
            console.log(self===o);//true�������ⲿ������thisֵ����ȷ��ʽ
        }
    }
};
o.m();

//�۹��캯������
//û���βεĹ��캯�����ö�����ʡ��(),new Object
//�ڱ��ʽ new o.m()�У����������Ĳ�����o������
var dd=new o.m();//false,false,fasle

//�ܼ�ӵ��ã��κκ���������Ϊ�κζ���ķ��������ã���ʹ��������ָ������ķ���


//���������βκ�ʵ��
//�ٿ�ѡ�β�
function getPropertyNames(o,/* optional */ arr){//��ѡ�βα���������
    arr=arr||[];//���arr����û���ṩ����ֵΪ[]
    for(var p in o){
        arr.push(p);
    }
    return arr;
}
var obj={name:'��',age:235};
console.log(getPropertyNames(obj));
//�ڿɱ䳤ʵ���б�ʵ�ζ���
//Ĭ������£�ȱ�ٵĲ���Ϊundefined������Ĳ������Զ�ʡ��
function f(a,b){
    if(arguments.length!=2){
        var info="function is called with "+arguments.length+" arguments,but it expects 2 arguments.";
        // throw new Error(info);
        console.log(info);
    }
}
f(1,2,3);
//�������Բ������������Ĳ���������ʵ�κ�����ʵ�θ�������Ϊ�㣩
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
//ʵ�ζ��������飡
function f(x){
    console.log(x);//123
    arguments[0]=null;
    console.log(x);//null,x��arguments[0]ָ��ͬһ��ֵ
}
f(123);

//�۽�������������ʵ��
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
    arraycopy(args.from,args.from_start||0,//Ĭ��0
                args.to,args.to_start||0,
                args.length);
}
var a=[1,2,3,4,5],b=[];
console.log(a);
easycopy({from:a,to:b,length:4});
console.log(b);

//��ʵ�����ͣ�����Ӧ�����ʵ�����ͼ���߼�

//�ġ���Ϊֵ�ĺ���
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











