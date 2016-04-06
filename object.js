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

//原型
//Object.prototype（new Object()）,Array.prototype（new Array()）,Date.prototype（Date.prototype）
console.log(Object.prototype);
console.log(Array.prototype);
console.log(Date.prototype);