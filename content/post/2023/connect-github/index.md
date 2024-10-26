---
title: "Connect Git to Github"
description: 用SSH方式配置一台电脑连接多个GitHub账号
date: 2023-01-10T16:22:12+08:00
lastmod: 2023-01-19
image: SSH.PNG
math: 
license: 
tags:
    - Git
hidden: false
draft: false
---
## 场景
需要用一台（Windows）电脑同时连接多个GitHub账号。

## 建立SSH连接
### 创建两个SSH key
在终端输入以下命令：
```shell
ssh-keygen -t rsa -f ~/.ssh/id_rsa_m -C "firstmail@gmail.com" #绑定一个GitHub账号所用的邮箱
ssh-keygen -t rsa -f ~/.ssh/id_rsa -C "secondmail@gmail.com" #绑定另一个GitHub账号的邮箱
```

### 添加SSH公钥到对应GitHub账号中
两个SSH key分别配置在对应GitHub账号中：
![sshkey](sshkey.png)

### 本地添加新SSH密钥到SSH agent中
在终端中输入命令：
```bash
ssh-add -D #清空本地的SSH缓存
ssh-add ~/.ssh/id_rsa
ssh-add ~/.ssh/id_rsa_m
ssh-add -l
```
若提示 `Could not open a connection to your authentication agent.` 则先执行命令 `ssh-agent bash` 即可。

### 修改本地配置文件 
要在本地配置文件中设置不同账号和SSH key的对应关系，就需要在 `~/.ssh/config` 文件（没有就新建一个）中设置不同仓库指向不同的密钥文件：
```shell
#第一个账号
Host github.com # 这里域名随意写，标识账号1
HostName github.com #这里域名就是我们要访问的远程服务器域名github.com
User git #可以随意填写
IdentityFile ~/.ssh/id_rsa #私钥位置

# 第二个账号 
Host second.github.com  #标识账号2
HostName github.com 
User git 
PreferredAuthentications publickey 
IdentityFile ~/.ssh/id_rsa_m
```

### 测试SSH连接
在终端中执行命令
```bash
ssh -T git@github.com
ssh -T git@second.github.com
```
提示 `Hi Morimit! You've successfully authenticated, but GitHub does not provide shell access` 则为成功。


## 配置git

### 配置项目文件夹信息
在项目文件夹中打开终端并执行以下命令：
```bash
# 取消全局 用户名/邮箱 配置
$ git config --global --unset user.name
$ git config --global --unset user.email
# 进入项目文件夹，单独设置每个repo 用户名/邮箱
$ git config user.email "xxxx@xx.com"
$ git config user.name "xxxx"
$ git config --list
```

### 配置远程仓库信息
注意设置远程仓库的时候，需要与 `config` 文件中的Host名称对应。
```bash
$ git remote rm origin
# 远程仓库地址，注意Host名称
$ git remote add origin git@second.github.com:githubUserName/repName.git
$ git remote -v # 查看远程

```


### 将本地仓库上传到远程仓库
push测试：
```bash
git add .
git commit -m "自行添加注释"
git push origin main #推送到远端main分支
```



### 流程总结
1. 确保SSH连接成功
2. 新建本地仓库，在项目文件夹目录下打开git bash终端。
3. 将本地仓库git初始化 `git init`
4. 在本地添加远程仓库的SSH地址 `git remote add origin git@second.github.com:Morimit/Morimit_source.git` (注意这里的账号名 `git@second.github.com` 是和 `~/.ssh/config` 文件中配置一致的)
5. 配置git账号: `git config user.name "Morimit" ` 和 `git config user.email "firstmail@gmail.com"` 。
6. 添加到暂存区和提交到当前分支： `git add .` 、 `git commit -m "comments"`
7. 推送到远程仓库： `git push origin main`
8. 如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream <branch-name> origin/<branch-name>`。



## 参考
- [github-手把手教程-本地如何连接多个github仓库_Vivi_static的博客-CSDN博客](https://blog.csdn.net/Vivi_static/article/details/107859874)
- [Git之同一台电脑连接多个远程仓库 - zhengyan_web - 博客园 (cnblogs.com)](https://www.cnblogs.com/zhengyan/p/10728527.html)
- [本地Git仓库关联多个远程仓库的两种方法 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/82388563)
