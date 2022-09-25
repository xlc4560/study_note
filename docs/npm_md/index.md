# 包管理器的使用经验

## nvm(node版本控制器)
nvm：node version manager（node版本管理工具）
[下载地址](https://nvm.uihtm.com/)
具体安装步骤不做赘述
```
// nvm工具使用
// 命令提示符操作
// 1.查看版本及相关命令
nvm
// 2.nvm list 命令 - 显示版本列表
nvm list // 显示已安装的版本（同 nvm list installed）
nvm list installed // 显示已安装的版本
nvm list available // 显示所有可以下载的版本
// 3. nvm install 安装指定版本
nvm install 14.5.0 // 安装14.5.0版本node
nvm install latest // 安装最新版本node
// 4. nvm use 命令 - 使用指定版本node(不知道使用的版本通过nvm list指令查看，且cmd或powershell需要管理员权限)
nvm use 14.5.0 // 使用14.5.0版本node
// 5. nvm uninstall 命令 - 卸载指定版本 node
nvm uninstall 14.5.0 // 卸载14.5.0版本node
// 6. 其他命令(不常用)
nvm arch ：显示node是运行在32位还是64位系统上的

nvm on ：开启nodejs版本管理

nvm off ：关闭nodejs版本管理

nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。

nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。

nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。

nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。

nvm version ：显示nvm版本。version可简化为v。
```

## yarn镜像管理器
yrm是一个yarn的源管理器，可以快速的在yarn的各个源之间切换，方便快捷。
```
npm install -g yrm
// or
yarn global add yrm

// 查看可用的镜像源
yrm ls

  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
  yarn --- https://registry.yarnpkg.com
// 添加源
yrm add baidu https://registry.npm.baidu.com
// 删除源
yrm del baidu
// 切换源
yrm use baidu

  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
  yarn --- https://registry.yarnpkg.com
* baidu --- https://registry.yarnpkg.com
// 测试源的速度
yrm test

  npm ---- 4381ms
* cnpm --- 2050ms
  taobao - 1440ms
  nj ----- Fetch Error
  rednpm - Fetch Error
  npmMirror  13988ms
  edunpm - Fetch Error
  yarn --- Fetch Error

```