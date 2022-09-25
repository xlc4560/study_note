# react

## 1. react函数组件与类组件的区别

类组件：具有生命周期， 有‘this’， 能够被继承（面向对象编程思想）

函数式组件：函数组件会更加的纯粹，简单，更利于测试，这就是它们本质上的区别

函数组件：

## 2.useEffect

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