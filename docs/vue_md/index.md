# VUE

## 1.vue-router4中的路由拦截中的next参数

## 2.vue3插槽的使用

#### 默认插槽

```vue
// 子组件
<template>
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
</template>
```

#### 具名插槽

```js
// 注意：如果一个插槽没有指定name属性，则会使用它的默认值：default
// 子组件
<template>
  <div>
    <slot name="header">
    </slot>
    <slot name="main">
    </slot>
  </div>
</template>
// 父组件
<template>
  <hello-world>
    <template v-slot:header>
        <button>按钮01</button>
    </template>
    <template v-slot:main>
        <button>按钮02</button>
    </template>
  </hello-world>
</template>
```
```
// v-slot 有对应的简写方式 #，因此 <template v-slot:header> 可以简写为 <template #header>
// 父组件写法等价于
<template>
  <hello-world>
    <template #header>
        <button>按钮01</button>
    </template>
    <template #main>
        <button>按钮02</button>
    </template>
  </hello-world>
</template>
```

#### 作用域插槽

```vue
// 子组件传值
<template>
<div>
   <slot :brand="phone.brand" class="item" :price="phone.price"></slot>
</div>
</template>
// 父组件获取
<template>
  <hello-world v-slot="row">
    <div>{{ row.class }}</div>
    <div>{{ row.price }}</div>
    <div>{{ row.brand }}</div>
  </hello-world>
</template>
// 与具名插槽结合
<template>
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
</template>
```

## 3.自定义指令

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

## 4.使用defineProperty实现数据响应式

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

## 5.使用Proxy实现数据响应式

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

## 6.总结使用proxy与defineProperty实现响应式的区别

1.defineProperty代理数据只能一次代理对象中的一个属性，
  因此vue在实现响应式时，需要去遍历定义好的数据，性能不好

2.当defineProperty对数据进行遍历后，直接向源对象中添加新的属性，
  会丢失响应式（没有对应的get/set），在vue2中通过$set实现

3.使用proxy可以代理一整个对象，因此对对象的操作都可以被监视到（增删数据），
  不需要重复的遍历属性实现响应式，性能更好

4. ....暂时只想到这些



## 7.关于组件封装，以及状态（数据）提升的理解

1. 什么时候使用Vuex或Pinia
```js{1-7}
// 1. 对于不同模块来说有多个数据需要互相使用，
//    为避免复杂的组件间通信逻辑可以使用状态管理工具

// 2. 对于在一个功能下（一个文件夹下），需要的数据只需要在父子组件中传递，
//    可以用常规的方法（prop，emit，provide/inject，获取组件实例对象）

// 3. 对于eventbus和消息订阅发布，没有实战过因此不了解具体的机制，不做评价
2. 组件封装

(1). 对于一个高复用性的组件，一定是将****实现的逻辑与接收的数据以及返回出的数据完整的****封装到组件内部从而实现复用

1. hooks的使用理解（个人理解，仅作参考）

(1). hooks就是将一个组件中复杂的逻辑与数据抽离出来，而抽离出的数据与逻辑也可以实现局部的数据与逻辑共享功能，类似于局部的“Pinia或VueX”
```

## 8.封装组件高级使用技巧
查看官网的解释
点击此处跳转(https://cn.vuejs.org/guide/components/attrs.html#attribute-inheritance)