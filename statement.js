//���
//if else
var num=1001;
if(num<=100){
    
}else if(num<=500){
    
}else if(num<=1000){
    
}else{
    
}

//switch
function convert(x){
    switch (typeof x) {
        case 'number':
            return '0x'+x.toString(16);//ת����16����
        case 'string':
            return '"'+x+'"';    
        default:
            return String(x);
    }
}

console.log(convert(123));
console.log(convert('123'));
console.log(convert(new Date()));

//while
 var n=1;
while(n<5){
    console.log(n);
    n++;
}

//do while
function printArray(a){
    var len=a.length,i=0;
    if(len==0){
        console.log('Empty Array');
    }else{
        do{
            console.log(a[i]);
        }while(++i<len);
    }
}

printArray([123,3,4]);

//for
var arr=[1,2,3];
for(var idx=0;idx<arr.length;idx++){
    console.log(arr[idx]);
}

var person={
    name:'zpf',
    age:'123',
    email:'abc'
};
for(var p in person){
    console.log(p);//��������
    console.log(person[p]);//����ֵ
}

//throw
function  factorial(x){
    if(x<0) {
        throw new Error('x����Ϊ����');
    }
    for(var f=1;x>1;f*=x,x--);
    return f;
}
console.log(factorial(5));
try{
    console.log(factorial(-19));
}catch(e){
    console.log(e);
}
finally{
    
}

//debugger��
function f(o){
    if(o===undefined){
        debugger;//������һ���ϵ�
    }
}
var abc;
f(abc);