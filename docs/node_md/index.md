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
## node编译文件时，对路径的处理
```js
// 当使用文件读取模块读取某个文件时，传入的是相对路径
const fs = require("fs")
// 相对路径是相对与使用node编译此文件时所处的目录
// 终端就是cmd或者powershell，在不同的目录下打开，对应的路径就不同
// 例如 在E: /node/js/static目录下打开终端使用node编译xxx.js时,
// E:\node\js\static>  node xxx.js
// 相对路径./input.txt会找到E:\node\js\static\input.txt文件
// 但在以下情况编译时，会报找不到文件错误
// E:\node\js>  node .\static\xxx.js  
// 因为此时根据相对路径./input.txt，找到的是E:\node\js\input.txt, 所以会报错
// 所以需要使用绝对路径，或者node中的path模块，或者__dirname,
fs.readFile('./input.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});
```