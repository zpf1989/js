//һ����16λֵ��ɵĲ��ɱ����������
//û���ַ���
//����UTF-16�����Unicode�ַ��������ܱ�ʾΪ16λ��Unicode�ַ�������16λֵ���һ�����б�ʾ
var p='��';
var e='^';
console.log(p.length);
console.log(e.length);

var str='z\'pf';
console.log(str);
str="a:����˭��\
b:������˭��\
a:����˵��\
b:����˵����";//���д��붨�嵥����ʾ���ַ�����ֻ��ECMAScript5 �п���
console.log(str);

//  ת���ַ�(\)
str='You\'re right,i can\'t leave here';
console.log(str);
//      ����ͨ��ת��
//          ʮ������
console.log('\xA9');//?����Ȩ���ţ�
//          ��4��ʮ��������ָ��������Unicode�ַ�
console.log('\u03c0');//��
console.log('zpf\u0009fp\tz');//\t
//  ����
var msg='Hello,'+'world';
console.log(msg+',length:'+msg.length);
console.log(msg.charAt(0));
console.log(msg[0]);
console.log(msg[msg.length-1]);
console.log(msg.charAt(msg.length-1));
console.log(msg.substring(1,4));
console.log(msg.slice(1,4));
console.log(msg.slice(-3));
console.log(msg.indexOf('l'));
console.log(msg.lastIndexOf('l'));
msg.split(',').forEach(function(e) {
    console.log(e);
}, this);
console.log(msg.replace('H','h'));
console.log(msg.toUpperCase());
//�����������������ַ�����ԭ�ַ���û�б仯
console.log(msg);

//����RegExp
var text='testing:1,2,3';
var pattern=/\d+/g;//����һ����������
pattern.test(text);//true
var r=text.search(pattern);//8����һ��ƥ�����λ��
console.log(r);
text.match(pattern).forEach(function(e){
    console.log(e);
});
console.log(text.replace(pattern,'*'));
console.log(text.split(/\D+/));//�÷������ַ���ȡ�ַ�����["", "1", "2", "3"]