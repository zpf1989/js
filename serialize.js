//对象序列化
o={x:1,y:{z:[false,null,'']}};
s=JSON.stringify(o);//{"x":1,"y":{"z":[false,null,""]}}
console.log(s);
p=JSON.parse(s);
console.log(p);//Object { x: 1, y: Object }，p是o的深拷贝
console.log(p.x);//1
console.log(p.y);//Object { z: Array[3] }
//日期序列化
var d=new Date();
var datestr=JSON.stringify(d);//"2016-04-09T08:50:36.600Z"
console.log(datestr);
var dnew=JSON.parse(datestr);//会保留日期的字符串形态，而不是还原为日期对象
console.log(dnew);//2016-04-09T08:51:15.531Z