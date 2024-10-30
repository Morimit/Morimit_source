---
title: "JavaScript"
layout: note
---

## JavaScript简介

JavaScript诞生于网页脚本，它的语言规范是ECMAScript。大家常说的ES6/ES7是ECMAScript的新特性，主要是用来提升开发效率的语法糖。

作为脚本语言，和一般编程语言（C、C++、Java等）较大的区别在于：
- JavaScript不需要compiler，只需要interpreter
- JavaScript是动态语言，可以实时修改代码，无需停止代码运行后进行编译、链接、再运行
- JavaScript的语法规则性较弱，语法较为散漫
- JavaScript是单线程语言，因为有大量和用户交互的需求，如果是多线程，页面更新和用户交互线程间的同步会变得很复杂。
- 一般的脚本语言的通用性较差，不过随着这些年的发展，JavaScript可以在任意搭载了JavaScript引擎（JavaScript虚拟机）的设备中运行，包括但不限于浏览器、服务端。除此之外，JavaScript可以与HTML/CSS网页完全集成在一起，被所有主流浏览器支持且默认开启

不同浏览器中嵌入的JavaScript引擎不同：
- V8：Chrome、Opera、Edge
- SpiderMonkey：Firefox
- 以及一些代号，像 “Chakra” 用于 IE，“JavaScriptCore”、“Nitro” 和 “SquirrelFish” 用于 Safari

引擎的基本原理可简化为：
- 引擎读取/解析脚本
- 引擎将脚本编译为机器语言代码
- 执行机器代码
引擎会对整个流程中的每个阶段进行优化，比如监控编译过程，分析流经该脚本的数据，并进一步优化机器代码。

## 浏览器中的JavaScript

JavaScript不提供对内存或CPU硬件的访问，所以它是一门相对“安全”的语言，除此之外它的能力取决于运行环境，例如Node.js支持JavaScript运行在后端服务器中进行读写文件和请求网络等操作。

浏览器中的JavaScript可以做与网页操作、用户交互和web服务器相关的事情，如：
- 修改网页样式和内容
- 相应用户的鼠标/键盘行为
- 向远程服务器发送HTTP网络请求，下载和上传文件（AJAX/COMET）
- 获取/设置cookie
- 使用localStorage存储客户端数据

而为了用户的信息安全，浏览器中的JavaScript是受限的，包括：
- 不能直接读、写、复制和执行硬盘上的任意文件（不能直接访问操作系统），当且仅当用户做出特定行为、获得用户明确的认可（如开启相机/麦克风权限）。
- 不同tab页和窗口之间通常不互通。根据“同源策略”，两个tab页打开的如果不是同一个网站（域名、协议或端口有一个不同），它们就不能互相通信。
  - 解决“同源策略”带来的问题，两个tab页都必须加上一些额外的代码并允许数据交换。

## 不只是JavaScript

为了满足不同项目的需求，JavaScript语法扩展出了一些新语言，这些语言会**在浏览器执行之前**被转化成JavaScript，如：
- CoffeeScript：JavaScript的一种语法糖。它引入了更加简短的语法，受Ruby开发者的欢迎。
- 微软开发的TypeScript：添加了严格的数据类型来更好地支持复杂系统的开发。
- Brython：Python到JavaScript的转译器
- 谷歌开发的Dart：是一门独立的语言。它拥有自己的引擎，该引擎可以在非浏览器环境中运行（例如手机应用），它也可以被编译成 JavaScript。