# node学习笔记

## 使用node编译js文件
```
// node (js文件的url),需要提前安装好node环境
node xxx.js
```
## node文件读取/写入(fs模块)
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



## path模块的使用
```js
const path = require('path')
const fs = require('fs')

// 注意：  ../ 会抵消前面的路径
// const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
// console.log(pathStr)  // \a\b\d\e

// fs.readFile(__dirname + '/files/1.txt')

// path.join用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, dataStr) {
  if (err) {
    return console.log(err.message)
  }
  console.log(dataStr)
})

// 定义文件的存放路径
const fpath = "/a/b/c/index.html";

// const fullName = path.basename(fpath)
// console.log(fullName)

// path.basename返回路径中的最后一部分
const nameWithoutExt = path.basename(fpath, ".html");
console.log(nameWithoutExt);

// path.extname(p)返回路径中文件的后缀名
const fext = path.extname(fpath)
console.log(fext)
path.resolve([from ...], to)

/* 将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。 */

path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'

```