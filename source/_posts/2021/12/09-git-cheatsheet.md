---
title: Git Cheatsheet
date: 2021-12-09 16:02:51
tags: git
---

# Getting Started
## 配置文件
```shell
git config --global user.name "your_name"
git config --global user.email "email@address.com"
```

不同层级的配置文件

`--global` 全局配置文件
`--system` 系统配置文件
`--local` 仓库配置文件
`--worktree` worktree配置文件

## 初始化仓库
首先cd到仓库目录内，然后在命令行输入
```shell
git init
```

## 本地推到远程
```shell
git remote add origin [url]
```

# 基本操作
## 查看仓库状态
```shell
git status
```

## 查看变更
```shell
git diff [file_name]
```

## 提交修改
```shell
git add .
git commit -m "commit message"
```

## 查看提交历史
```shell
git log
```
单行显示提交备注：`--pretty=oneline`

## 查看命令历史
```shell
git reflog
```

### 版本回退
```shell
git reset --hard [commit_id]
```
`commit_id`可以写成`HEAD^`代表上一次提交，`HEAD^^`代表上上次，`HEAD~100`代表上100次
