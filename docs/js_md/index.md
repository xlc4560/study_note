# JavaScript

## 1.垃圾回收机制

目的：防止内存泄漏

什么是内存泄漏？ 内存泄漏的含义就是当已经不需要某块内存时这块内存还存在着，垃圾回收机制就是间歇的不定期的寻找到不再使用的变量，并释放掉它们所指向的内存。

#### **变量的生命周期**

当一个变量的生命周期结束之后它所指向的内存就应该被释放。JS有两种变量，全局变量和在函数中产生的局部变量。局部变量的生命周期在函数执行过后就结束了，此时便可将它引用的内存释放（即垃圾回收），但全局变量生命周期会持续到浏览器关闭页面。

#### 垃圾回收方式

JS执行环境中的垃圾回收器怎样才能检测哪块内存可以被回收有两种方式：标记清除（mark and sweep）、引用计数(reference counting)。

标记清除

大部分浏览器以此方式进行垃圾回收，当变量进入执行环境（函数中声明变量）的时候，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”，在离开环境之后还有的变量则是需要被删除的变量。标记方式不定，可以是某个特殊位的反转或维护一个列表等。
 垃圾收集器给内存中的所有变量都加上标记，然后去掉环境中的变量以及被环境中的变量引用的变量的标记。在此之后再被加上的标记的变量即为需要回收的变量，因为环境中的变量已经无法访问到这些变量

引用计数

这种方式常常会引起内存泄漏，低版本的IE使用这种方式。机制就是跟踪一个值的引用次数，当声明一个变量并将一个引用类型赋值给该变量时该值引用次数加1，当这个变量指向其他一个时该值的引用次数便减一。当该值引用次数为0时就会被回收。

## 2.作用域

**作用域指的是有权访问的变量集合。**

### JavaScript 函数作用域

在 JavaScript 中有两种作用域类型：

- 局部作用域
- 全局作用域

JavaScript 拥有函数作用域：每个函数创建一个新的作用域。

作用域决定了这些变量的可访问性（可见性）。

函数内部定义的变量从函数外部是不可访问的（不可见的）。

## 3.函数闭包

**闭包**（closure）是一个函数以及其捆绑的周边环境状态（**lexical environment**，**词法环境**）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

```javascript
//
function init() {
  var name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() { // displayName() 是内部函数，一个闭包
      alert(name); // 使用了父函数中声明的变量
  }
  displayName();
}
init();
//
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}
var myFunc = makeFunc();
myFunc();
//
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12

// 柯里化函数
//普通函数
function getArea(w,h){
    return w * h;
}
const area1 = getArea(10,20);
const area2 = getArea(10,30);
const area3 = getArea(10,40);

//柯里化函数
function getArea(w){
    return function(h){
        return w * h;
    }
}
const getTenArea = getArea(10);

const area1 = getTenArea(20);
const area2 = getTenArea(30);
const area3 = getTenArea(40);


```



## 4.数据精度问题

#### 4.1. toFixed方法

四舍六入 五留双 （银行家舍入法）

```javascript
console.log(3.154.toFixed(2))
// 3.15
console.log(3.1550.toFixed(2))
// 3.15
console.log(3.1551.toFixed(2))
// 3.16
console.log(3.156.toFixed(2))
// 3.16
```

#### 4.2 银行家算法*

## 5. null的类型

object ， 存放位置 栈内存

## 6.高阶函数

高阶函数是一个可以接收函数作为参数，甚至返回一个函数的函数。 它就像常规函数一样，只是多了接收和返回其他函数的附加能力，即参数和输出。

```javascript
const strArray = ["JavaScript", "Python", "PHP", "Java", "C"];
    function mapForEach(arr, fn) {
      const newArray = [];
      for (let i = 0; i < arr.length; i++) {
        newArray.push(fn(arr[i]));
      }
      return newArray;
    }
    const lenArray = mapForEach(strArray, function (item) {
      return item.length;
    });
    console.log(lenArray);
// [10，6， 3， 4， 1]
```



## 7.函数的三种参数

#### 7.1 解构参数

```javascript
function greeFirstPerson([{ name }]) {
  return `Hello, ${name}!`;
}

const persons = [{ name: '王小智' }, { name: '王大治'}];
greeFirstPerson(persons); // => 'Hello, 王小智!'
// {name = 'Unknown'} ={} 默认为空对象。
```

#### 7.2 arguments

```javascript
// arguments 
// 箭头函数没有arguments
function sumArgs() {
  console.log(arguments); // { 0: 5, 1: 6, length: 2 }
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
sumArgs(5, 6); // => 11
```

#### 7.3 剩余参数

```javascript
// 剩余参数
function multiplyAndSumArgs(multiplier, ...numbers) {
  console.log(multiplier); // 2
  console.log(numbers);    // [5, 6]
  const sumArgs = numbers.reduce((sum, number) => sum + number);
  return multiplier * sumArgs;
}
multiplyAndSumArgs(2, 5, 6); // => 22
// 区别
/*
剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。
arguments对象还有一些附加的属性 （如callee属性）。
*/
```



## 8.call apply bind区别

call方法：

```javascript
/*
call方法的第一个参数也是this的指向，后面传入的是一个参数列表
跟apply一样，改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
*/
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.call(obj,1,2); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```

apply方法：

```javascript
/* 
apply接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入
改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
*/
var name="martin";
var obj={
 name:"lucy",
 say:function(year,place){
 console.log(this.name+" is "+year+" born from "+place);
 }
};
var say=obj.say;
setTimeout(function(){
 say.apply(obj,["1996","China"])
} ,0); //lucy is 1996 born from China,this改变指向了obj
say("1996"，"China") //martin is 1996 born from China,this指向window，说明apply只是临时改变一次this指向
```

bind方法：

```javascript
/*
bind方法和call很相似，第一参数也是this的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)
改变this指向后不会立即执行，而是返回一个永久改变this指向的函数
*/
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1,2) // this指向obj
fn(1,2) // this指向window
```



## 9. this指向问题

箭头函数

指向父级作用域的this

普通函数

指向调用者， 回调函数指向window