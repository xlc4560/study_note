# JavaScript

### 1.垃圾回收机制

目的：防止内存泄漏

什么是内存泄漏？ 内存泄漏的含义就是当已经不需要某块内存时这块内存还存在着，垃圾回收机制就是间歇的不定期的寻找到不再使用的变量，并释放掉它们所指向的内存。

##### **变量的生命周期**

当一个变量的生命周期结束之后它所指向的内存就应该被释放。JS有两种变量，全局变量和在函数中产生的局部变量。局部变量的生命周期在函数执行过后就结束了，此时便可将它引用的内存释放（即垃圾回收），但全局变量生命周期会持续到浏览器关闭页面。

##### 垃圾回收方式

JS执行环境中的垃圾回收器怎样才能检测哪块内存可以被回收有两种方式：标记清除（mark and sweep）、引用计数(reference counting)。

标记清除

大部分浏览器以此方式进行垃圾回收，当变量进入执行环境（函数中声明变量）的时候，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”，在离开环境之后还有的变量则是需要被删除的变量。标记方式不定，可以是某个特殊位的反转或维护一个列表等。
 垃圾收集器给内存中的所有变量都加上标记，然后去掉环境中的变量以及被环境中的变量引用的变量的标记。在此之后再被加上的标记的变量即为需要回收的变量，因为环境中的变量已经无法访问到这些变量

引用计数

这种方式常常会引起内存泄漏，低版本的IE使用这种方式。机制就是跟踪一个值的引用次数，当声明一个变量并将一个引用类型赋值给该变量时该值引用次数加1，当这个变量指向其他一个时该值的引用次数便减一。当该值引用次数为0时就会被回收。

### 2.作用域

**作用域指的是有权访问的变量集合。**

#### JavaScript 函数作用域

在 JavaScript 中有两种作用域类型：

- 局部作用域
- 全局作用域

JavaScript 拥有函数作用域：每个函数创建一个新的作用域。

作用域决定了这些变量的可访问性（可见性）。

函数内部定义的变量从函数外部是不可访问的（不可见的）。

### 3.函数闭包

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



### 4.数据精度问题

##### 4.1. toFixed方法

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

##### 4.2 银行家算法*

### 5. null的类型

object ， 存放位置 栈内存

### 6.高阶函数

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



### 7.函数的三种参数

###### 7.1 解构参数

```javascript
function greeFirstPerson([{ name }]) {
  return `Hello, ${name}!`;
}

const persons = [{ name: '王小智' }, { name: '王大治'}];
greeFirstPerson(persons); // => 'Hello, 王小智!'
// {name = 'Unknown'} ={} 默认为空对象。
```

###### 7.2 arguments

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

###### 7.3 剩余参数

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



### 8.call apply bind区别

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



### 9. this指向问题

箭头函数

指向父级作用域的this

普通函数

指向调用者， 回调函数指向window



### 10. 手写Promise

```javascript
// 首先，我们声明它的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 以构造函数的形式实现
class MyPromise {
  constructor(executor) {
    // 利用 try/catch 捕获错误
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  // 定义 Promise 初始状态为 PENDING
  status = PENDING
  // resolve 后返回的数据
  data = undefined
  // reject 后返回的原因
  reason = undefined
  // resolve 的回调函数列表
  successCallback = []
  // reject 的回调函数列表
  failureCallback = []
  // 成功
  resolve = data => {
    // 一旦状态改变，就不能再变
    if (this.status !== PENDING) return
    // 更改状态
    this.status = FULFILLED
    // 保存数据
    this.data = data
    // 依次调用成功回调
    while (this.successCallback.length) {
      this.successCallback.shift()(this.data)
    }
  }
  // 失败
  reject = reason => {
    // 一旦状态改变，就不能再变
    if (this.status !== PENDING) return
    // 更改状态
    this.status = REJECTED
    // 保存原因
    this.reason = reason
    // 依次调用失败回调
    while (this.failureCallback.length) {
      this.failureCallback.shift()(this.reason)
    }
  }
  // then：处理 resolve 和 reject
  then(onResolved = data => data /*设置默认的成功回调 */, onRejected) {
    // 创建一个新的 Promise 并 return，以供链式调用
    let promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 转换为 异步执行，用来获取 新的 promise
        setTimeout(() => {
          try {
            let value = onResolved(this.data)
            // 判断返回值是普通值还是 Promise
            resolvePromise(promise, value, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let value = onRejected(this.reason)
            resolvePromise(promise, value, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        // 将回调函数存入数组
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let value = onResolved(this.data)
              resolvePromise(promise, value, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        // 将回调函数存入数组
        this.failureCallback.push(() => {
          setTimeout(() => {
            try {
              let value = onRejected(this.reason)
              resolvePromise(promise, value, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise
  }
  // .catch()
  catch(onRejected) {
    // 事实上 .catch() 只是没有给 fulfilled 状态预留参数位置的 .then()
    return this.then(undefined, onRejected)
  }
  // .finally()
  finally(callback) {
    return this.then(
      data => {
        return MyPromise.resolve(callback().then(() => data))
      },
      err => {
        return MyPromise.resolve(callback()).then(() => {
          throw err
        })
      }
    )
  }
  // Promise.all()
  static all(iterable) {
    // 记录执行次数
    let times = 0
    // 保存执行结果
    let result = []
    // Promise.all() 会返回一个 Promise
    return new MyPromise((resolve, reject) => {
      // 记录结果
      function addData(key, value) {
        times++
        result[key] = value
        times === iterable.length && resolve(result)
      }
      // 依次执行，然后将结果保存到数组中
      iterable.forEach((element, index) => {
        // 判断元素是否为 Promise 对象
        element instanceof MyPromise
          ? element.then(
              data => addData(index, data),
              err => reject(err) // 任何一个 Promise 对象的 reject 被执行都会立即 reject()
            )
          : addData(index, element) // 非 promise 的元素将被直接放在返回数组中
      })
    })
  }
  // Promise.resolve()
  static resolve(value) {
    // 返回一个以给定值解析后的 Promise 对象
    return value instanceof MyPromise
      ? value
      : new MyPromise(resolve => resolve(value))
  }
  // Promise.reject()
  static reject(error) {
    return new MyPromise((resolve, reject) => {
      reject(error)
    })
  }
}

// 判断 Promise 的返回值类型
function resolvePromise(promise, value, resolve, reject) {
  // 循环调用报错
  if (promise === value) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }
  // 如果是 Promise 对象
  if (value instanceof MyPromise) {
    value.then(resolve, reject)
  } else {
    resolve(value)
  }
}

module.exports = MyPromise
```



# react

### 1. react函数组件与类组件的区别

类组件：具有生命周期， 有‘this’， 

函数组件：

### 2.useEffect

1. 加上[]相当于componentDidMount生命周期, 不传[]监视所有,[]中存放需要监视的数据

2. 监视参数后相当于componentDidUpdate生命周期

3. return相当于componentWillUnMount组件销毁之前生命周期

   ```
   useEffect(()=>{
   	// 开启定时器
   	return {
   		// 清除定时器操作	相当于componentWillUnMount周期
   	}
   },[])
   ```

   

4. 可以用于发送网络请求

# VUE

### 1.vue-router4中的路由拦截中的next参数

### 2.vue3插槽的使用

###### 默认插槽

```
// 子组件
<div>
   <slot>
      <!--默认内容-->
      <button>按钮1</button>
   </slot>
</div>
// 父组件传值，渲染父组件传的节点，否则渲染默认节点
<div>
   <button>按钮1</button>
</div>
// 写法等价于
<div>
   <template v-slot:default>
   	  <button>按钮1</button>
   </template>
</div>
```

###### 具名插槽

```
// 注意：如果一个插槽没有指定name属性，则会使用它的默认值：default
// 子组件
<div>
   <slot name="header">
   </slot>
   <slot name="main">
   </slot>
</div>
// 父组件
<hello-world>
   <template v-slot:header>
      <button>按钮01</button>
   </template>
   <template v-slot:main>
      <button>按钮02</button>
   </template>
</hello-world>
v-slot 有对应的简写方式 #，因此 <template v-slot:header> 可以简写为 <template #header>
// 父组件写法等价于
<hello-world>
   <template #header>
      <button>按钮01</button>
   </template>
   <template #main>
      <button>按钮02</button>
   </template>
</hello-world>
```

###### 作用域插槽

```
// 子组件传值
<div>
   <slot :brand="phone.brand" class="item" :price="phone.price"></slot>
</div>
// 父组件获取
<hello-world v-slot="row">
   <div>{{ row.class }}</div>
   <div>{{ row.price }}</div>
   <div>{{ row.brand }}</div>
</hello-world>
// 与具名插槽结合
<div>
   <slot name="slot1" class="slot1" title="标题1"></slot>
   <slot name="slot2" class="slot2" title="标题2"></slot>
</div>
<hello-world>
   <template v-slot:slot1="row1">
      <div>{{ row1.title }}</div> //标题1
   </template>
   <!-- 简写 -->
   <template #slot2="row2">
      <div>{{ row2.title }}</div> //标题2
   </template>
</hello-world>
```

### 3.自定义指令

```vue
// 此处是简写形式，完全写法参照官网
<template>
	<input v-focus />
</template>
<script setup>
    // 注册一个局部的自定义指令， 需要以小写v开头
	const vFocus = {
        mounted(el) {
            // 获取input， 并调用其focus()方法
            el.querySelector('input').focus()
        }
    }
</script>
```

### 4.使用defineProperty实现数据响应式

```html
// defineProperty代理数据只能一次代理对象中的一个属性，无法监视到新增的属性；
<body>
    <div id="root">
      <button onclick="testName()">更改用户名</button>
      <button onclick="testAge()">更改用户年龄</button>
      <h1></h1>
      <h2></h2>
      <button onclick="addNewProperty()">新增属性测试</button>
    </div>
  </body>
  <script>
    const obj = {
      name: 'layouwen',
      age: 20,
    };
    const root = document.getElementById('root');
    const obj2 = Object.assign({}, obj);
    Object.keys(obj).forEach(key => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        //   writable: true, // 如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常
        get() {
          console.log('触发get');
          return obj2[key];
        },
        set(newValue) {
          console.log('触发set');
          changeUername(key, newValue);
          return newValue;
        },
      });
    });
    function changeUername(key, newValue) {
      if (key === 'name') {
        root.children[2].innerText = newValue;
      } else if (key === 'age') {
        root.children[3].innerText = newValue;
      }
    }
    function testName() {
      obj.name = Math.random().toString(36).slice(-8);
    }
    function testAge(params) {
      obj.age = Math.random().toString(36).slice(-8);
    }
    function addNewProperty(params) {
      // 新增属性
      obj.salary = '3.2k';
      console.log(obj);
    }
  </script>
```



### 5.使用Proxy实现数据响应式

```html
// proxy可以代理一整个对象，能够监视到对象元素的新增
<body>
    <div id="root"></div>
    <button onclick="changeName()">修改名字</button>
    <button onclick="addNew()">新增一个属性</button>
  </body>
  <script>
    const obj = {
      name: '张三',
    };
    const bucket = new Set();

    const newObj = new Proxy(obj, {
      // target就是被代理的对象
      get(target, key) {
        console.log('get调用了');
        bucket.add(effect);
        return target[key];
      },
      set(target, key, newVal) {
        console.log('set调用了');
        target[key] = newVal;
        bucket.forEach(fn => fn());
        return true;
      },
    });
    function effect() {
      document.getElementById('root').innerText = JSON.stringify(newObj);
    }
    // 使用JSON.stringify(newObj)时，会触发到get方法
    console.log(JSON.stringify(newObj));
    function changeName() {
      newObj.name = Math.random().toString().slice(-8);
    }
    function addNew() {
      newObj.age = Math.random().toString().slice(-8);
    }
  </script>
```



# html&CSS

### 1.flex如何实现圣杯布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>flexbox实现圣杯布局</title>
    <style>
        body{
            margin: 0;
        }
        .parent {
            display: flex;
            justify-content: space-between; /* 水平主轴对齐方式 */
            flex-direction: column;  /* 更改排列方式垂直从上往下 */
            background-color: aqua;
            height: 100vh;
        }
        .parent > .child1, .parent > .child3{
            height: 100px;
            /* flex-shrink: 0; */
            background-color: bisque;
        }
        .parent > .child2 {
            flex: 1;
            background-color: brown;
            display: flex;
            justify-content: space-between;
        }
        .parent > .child2 > .child2-1, .parent > .child2 > .child2-3 {
            width: 100px;
            /* flex-shrink: 0; */
            background-color: cadetblue;
        }
        .parent > .child2 > .child2-2 {
            flex: 1;
        }
    </style>
</head>
<body>
    <div class="parent">
        <div class="child1">顶部（高度固定 宽度自适应）</div>
        <div class="child2">
            <div class="child2-1">内容左侧（宽度固定 高度自适应）</div>
            <div clsss="child2-2">（自适应宽高）</div>
            <div class="child2-3">内容右侧（宽度固定 高度自适应）</div>
        </div>
        <div class="child3">底部（高度固定 宽度自适应）</div>
    </div>
</body>
</html>
```



### 2.盒子居中的几种方式

### 3.回流与重绘

### 4.动画与过渡效果

动画

```
animation
```

变形

```
transform
// 缩放
transform: scale(0.5);
// 旋转效果
transform: totate(30deg);
//  移动效果
transform: translate(30px, 30px);
// 倾斜效果
transform: skew(30deg, 10deg);
```

过渡

```
transition
// 设置过渡的时间与效果
```



# tailswindcss笔记

1. 基于vue2安装

   vue2项目初始化

   安装tailwindcss依赖

   ```
   npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
   ```

2. 创建配置文件

   ```
   npx tailwindcss init -p
   // 生成您的 tailwind.config.js 和 postcss.config.js 文件
   // 配置tailwind.config.js文件
   ```

3. 基于普通项目初始化

   ```
   
   ```

4. 新的安装方式

   ```
   vue add tailwind
   // 选择最小化生成
   ```

   

# TypeScript

1. 关于keyof的个人理解

   ```typescript
   type Record<K extends keyof any, T> = {
       [P in K]: T;
   };
   interface A {
       name: any;
       age: any;
   }
   interface B {
       [key in string]: any
   }
   /* 
   *	首先需要理解keyof关键字的含义
   *	对于任意类型，那么他的键值只能是三种类型（string, number, Symbol()）
   * 	keyof关键字用于提取一个的类型中的所有键的类型并合并为一个联合类型，此处应该注意一点
   *   keyof A // 提取出来的字符串不能视为值，应该将其视为类型，其键值只能为'name'或'age'的类型
   *   keyof B // 提取出来的键值联合类型是string，
   */
   
   ```

2. 关于in关键字的理解

   ```
   type Record<K extends keyof any, T> = {
       [P in K]: T;
   };
   // 对于Record中的in关键字， 参照上面的理解，就是对象的键的类型可以是string|number|Symbol()中的一种
   ```

3. 对于typeof关键字的理解

   ```typescript
   // JS中的typeof：在运行时判断类型
   // TS中的typeof：在编译时获取类型
   interface Person {
       name: string,
       age: number,
   }
   let person: Person = { name: 'tao', age: 18 }
   //两者一样
   type p1 = typeof person  
   type p2 = Person
   
   ```

# 常用DNS域名

.com .cn .edu .gov

# 面试笔记（用友汽车）

### 1. vue和react的区别

1.

### 2. 项目介绍

项目背景：将不同外部接口提供的数据按照统一的标准整理成规范的可视化数据，并且此平台可以直接对接口进行测试

我做了什么：完成了项目整体结构搭建（主要是路由的渲染），菜单组件的动态渲染，Axios的封装（拓展），项目一共六个模块（基本上也是增删改查操作），独立完成了三个功能，封装了一个通用组件

难点：表格数据是树形结构时，如何触发单行表单验证

### 3.es6中用到的新特性

1. 数组方法，例如filter， map， reduce， forEach，includes， some， every
2. async/await
3. 模板字符串，箭头函数， const， 展开运算符，  对象和数组解构赋值，

### 4.离线缓存

localstorage, sessionstorage

在进入表单组件时，发一次token刷新请求

### 5.this的指向

四种

### 6.http状态码

400数据错误， 401未登录，403权限不足， 404路径错误

### 7.毕业计划

### 8.梳理复杂的逻辑

### 9.加班的看法