---
title: "什么是CI/CD"
description: 为什么要有CI/CD
summary: 
date: 2024-10-28T09:20:09+08:00
lastmod:
image: https://mlops-guide.github.io/MLOps/CICDML/ci-cd.png
math: 
license: 
tags:
categories:
hidden: false
comments: "true"
draft: false
---

## reference
- [explainthis:DevOps](https://www.explainthis.io/zh-hans/swe/cicd)
- [万字长文详解DevOps及DevOps工具链](https://cloud.tencent.com/developer/article/2322080)
- [阮一峰的博客](https://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)

## 诞生背景
CI/CD是Continuous Integration（持续集成）和Continuous Delivery/Deployment（持续交付）的缩写。它产生于倡导敏捷开发的大背景下（普遍使用光盘的年代），软件开发不再是一次完成、测试后才上线交付，而是及早交付、开发者收到反馈后根据变动的需求持续改进的过程。

CI/CD是DevOps的重要组成部分：

{{<quote>}}
DevOps工具链的核心组成部分包括：

- 代码编辑和版本控制工具：如 Visual Studio Code，Sublime Text 等，它们允许开发人员编写代码并跟踪更改。
- 自动化构建工具：如 Jenkins，Travis CI 等，它们帮助开发人员自动化构建，测试和部署代码。
- 持续集成和持续部署工具：如 GitHub Actions，Jenkins X，GitLab CI/CD 等，它们帮助开发人员自动触发构建，测试和部署流程。
- 容器编排工具：如 Kubernetes，Docker Swarm 等，它们允许开发人员部署和管理容器化应用程序。
- 持续监控工具：如 Prometheus，Grafana，InfluxDB 等，它们帮助开发人员监控应用程序的运行状态和性能。
- 服务配置管理工具：如 Ansible，Chef，Puppet 等，它们帮助开发人员自动化配置和管理应用程序和服务。

DevOps工具链中的每个工具都旨在帮助开发人员更快地交付高质量的软件。通过这些工具，开发人员可以自动化许多重复性和耗时的任务，从而节省时间并提高生产效率。同时，DevOps工具链也可以帮助开发人员更好地理解应用程序的运行情况，并及时发现和解决问题。
{{</quote>}}

## 定义
### CI
CI指多个开发者能够共同在同个代码库中开发不同的新功能，然后在通过自动化测试后持续地整合到主干上面。

- 一般来说，CI 流程会在代码推到远端分支后开始
- 代码格式化检查：统一代码的格式规范，确保具有符合团队设定的格式风格，例如 JavaScript 的 Prettier。
- 静态检查：确保有符合团队所设立的相关规则，或者有符合程式语言的规则，例如TypeScript 的 TSLint 会帮忙检查代码是否符合 TypeScript 的规则。
- 自动化测试：包含单元测试、功能测试、E2E 测试。
  - 单元测试：针对函数或模块的测试
  - 功能/集成测试：针对整体产品的某个功能的测试
  - 端对端测试：从用户界面直达数据库的全链路测试
- 完成测试后构建：构建（build）指的是将源码转换为可以运行的实际代码，比如安装依赖，配置各种资源（样式表、JS脚本、图片）等等。
  - Jenkins
  - Travis
  - Codeship
  - Strider

在业界，许多软件开发团队还会在 CI 当中加入其他更精细的检测，例如针对安全 (security) 做检测，避免写出有潜在漏洞的代码；或者对性能 (performance) 做检测，来确保代码的性能达到一定的门槛。

### CD
CD指持续交付给评审团队、持续自动化部署。
- 自动化测试：构建完成，就要进行第二轮全面测试。当然也可以只在构建完成后进行全面测试。
  - 所有测试以自动化为主，少数无法自动化的测试用例就要人工跑
  - 新版本的每一个更新点都必须测试到。如果测试的覆盖率不高，进入后面的部署阶段后，很可能会出现严重的问题。
- 部署：通过了前面的测试，当前代码就是一个可以直接部署的版本（artifact）。将这个版本的所有文件打包（ tar filename.tar * ）存档，发到生产服务器。
  - 生产服务器将打包文件，解包成本地的一个目录，再将运行路径的符号链接（symlink）指向这个目录，然后重新启动应用。这方面的部署工具有Ansible，Chef，Puppet等。

CD最理想的状况是当开发者把代码合并后，就会开始整合、测试，最终部署，整个流程不需用有人工介入，一切自动化完成，新的功能就会到最端使用者手上。