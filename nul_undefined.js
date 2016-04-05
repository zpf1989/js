var test1;
console.log(typeof(test1));//undefined（未初始化）
var test2=null;
console.log(typeof(test2));//object（null可以理解为特殊的对象值）

console.log(test1==test2);//true
console.log(test1===test2);//false
//若作为初始值赋值给变量或属性，或作为参数传递，最好使用null，而不是undefined
