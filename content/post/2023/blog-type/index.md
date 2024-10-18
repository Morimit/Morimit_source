---
title: "Different Blog Types"
description: Why choose Hugo
date: 2023-03-16T09:33:30+08:00
lastmod: 2023-11-19
image: hugo.png
math: 
license: false
tags: 
    - Blog
notes:
    - Hugo
hidden: false
draft: false
---


## 动态博客
- 可以进入网页后台在线编写文章、管理评论，可以实时更新
- 搭建时需要租用服务器
### halo
不用输代码，直接生成网页，但要配置服务器：
- 一台可访问公网的服务器。可购买云主机，或实体服务器。
  - 服务器的连接与管理：SSH工具（如SecureCRT）、SFTP工具（往服务器上上传文件）。
  - 服务器应用安装与环境部署。（部署手册也可也在这个博主账号下找）。
  - 准备网站源码或安装包（jar包）进行部署。
  - 防火墙开放8090端口，这是网站打开访问的端口 (`xxx.xxx.xxx.xxx:8090`）。
  - 可以下载一些主题包，在控制台页面安装。
  - 在服务器上安装nginx。一般来说我们不会用jar包启动的8090端口的服务去直面用户，而是会在中间加一层代理服务器做转发服务（负载均衡、扛并发）。常用的代理服务器是nginx。nginx默认在80端口启动web服务。
  - 配置nginx，让它代理到jar包启动的地址（xxx.xxx.xxx.xxx:8090），即可不用写8090端口访问。修改配置文件。
- 在GitHub上部署halo，省去购买服务器。
  
### Wordpress
可用docker搭建；基于PHP语言
- 安装docker
- 搭建博客。下载docker-compose.yml文件。接着用一行命令启动博客（之前下载的yml文件里写了从docker官方仓库拉取服务镜像，包括mysql和需要的web服务）。
- 登录（localhost:8000），选择语言、登录账户设置，即可以看到博客后台。
- 可以改换主题

## 静态博客
- 利用github pages、Netlify、vercel等可以做免费托管，相当于发一个写好的package到托管网站上（比如Hugo目录中的publish文件夹），再写好自动配置程序（可以参考别人的配置模板），它就能自动把网站package发布到某个网址上。
- 缺点就是如果要新写文章，就要重新改好package再通过SSH同步上去。

### Hugo
基于GO语言；非常快速；

### Hexo
和Hugo差不多，很多主题修改后Hugo也可以用。
