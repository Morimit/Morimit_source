---
title: "Blog Workflow"
description: The building steps and workflow of this site
date: 2023-01-11T20:59:31+08:00
lastmod: 2023-01-11
image: Journey2.png
math: 
tags:
    - Blog
license: false
hidden: false
draft: false
---

首先Hugo能够生成可以发布的网站文件，其次使用git进行版本控制，每次修改后可以把源码传到GitHub，最后GitHub对Hugo建站有完整的支持组件（GitHub action、GitHub pages service），所以才能顺利完成一系列自动部署。

## 防踩坑注意事项

- 如果一台电脑的git要连接两个GitHub账号，使用SSH连接方式，需要本地gitbash生成**两组SSH密钥对**，分别将公钥内容存入对应的GitHub账号，而在本地 `~/.ssh` 文件夹下创建一个 `config` 文件，填写私钥的对应信息。当设置git远程仓库的时候，需要参考 `config` 文件中的内容。 具体参考：[[Connect git to GitHub]]
- GitHub Action 可以将GitHub中放置源码的仓库（**source repo**），通过GitHub内置的Hugo二进制文件来将源码打包生成 `public` 文件夹，并根据自行（在GitHub上）写入的Action脚本，（脚本中写入通过接收本地的git push来触发），通过**新的SSH连接（本地生成一个新的SSH密钥对）**，公钥填入publish repo的 `settings/Deploy` ，私钥填入source repo 的`settings/private key` 并将此**private key的名称填入Action脚本的特定位置**，从而让本地的git软件将这个 `public` 文件夹push 到GitHub上特定的、能触发GitHub pages发布的仓库（**publish repo**）。具体参考：[[2.7 Build Hugo With GitHub Action]]
- GitHub Action的脚本中写的推送到publish repo的branch，要和此仓库设定的GitHub pages发布branch相一致。

## 搭建步骤

- 先在本地下载Hugo二进制文件，一番折腾后通过 `hugo server` 命令查看网站效果。
- 本地生成SSH密钥对，GitHub上创建源码仓库和发布仓库，发布仓库的命名必须是 `xxxxx.github.io `，此命名和网站域名一致。参照 [[2.7 Build Hugo With GitHub Action]]配置好 GitHub Action 的脚本和两个仓库。
- 将本地项目文件夹通过 `git push` 命令推送到source repo，可以在 `https://xxxxx.github.io` 处查看网站。
## 最后形成的Workflow
- 本地修改内容，用`hugo server` 命令查看修改效果。
- `git push` 到GitHub的源码仓库中，在`https://xxxxx.github.io` 处查看发布好的网站。