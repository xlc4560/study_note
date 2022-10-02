# node学习笔记

## 使用node编译js文件
```
// node (js文件的url),需要提前安装好node环境
node xxx.js
```
## node文件读取/写入
```js{0,1}
// 仅列出最基本的文件读取写入操作，有更复杂的需求请参照官网
const fs = require("fs")
// 异步读取
fs.readFile('input.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('input.txt');
console.log("同步读取: " + data.toString());
console.log("程序执行完毕。");

// 文件写入
/* 
*   file - 文件名或文件描述符。
*   data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
*   options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
*   callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
*/
fs.writeFile(file, data[, options], callback)
```