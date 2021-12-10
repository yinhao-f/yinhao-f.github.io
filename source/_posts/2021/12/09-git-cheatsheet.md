---
title: Git Cheatsheet
date: 2021-12-09 16:02:51
tags: git
---

# Getting Started
## 配置文件
```shell
git config --list #查看配置文件
git config -e #编辑配置文件
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

## 本地仓库部署到远程
```shell
git remote add origin [url]
git push -u origin master
```

## 从远程仓库clone到本地
```shell
git clone [url]
```

## 删除与远程仓库的连接
```shell
git remote rm origin
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

## 推送到远程仓库
```shell
git push origin [branch_name]
```

## 查看提交历史
```shell
git log
```
单行显示提交备注：`--pretty=oneline`
显示分支图：`--graph`
缩略版本号：`--abbrev-commit`

### 查看文件变更历史
```shell
git log --follow [file_path]
```

## 查看提交详情
```shell
git show [commit_id]
```

## 查看命令历史
```shell
git reflog
```

## 版本回退
```shell
git reset --hard [commit_id]
```
`commit_id`可以写成`HEAD^`代表上一次提交，`HEAD^^`代表上上次，`HEAD~100`代表上100次

```shell
git checkout -- [file_name]
```
放弃尚未add的修改

还原已add的修改：
```shell
git reset HEAD [file_name]
```

## 文件删除
```shell
git rm [file_name]
```

# 分支
## 查看分支
```shell
git branch
```

## 切换分支
```shell
git switch [branch_name]
```
加上`-c`可以用来创建并切换分支

## 合并分支
先切换到要主分支上，然后`branch_name`填要合并过来的子分支
```shell
git merge [branch_name]
```

## 删除分支
```shell
git branch -d [branch_name]
```

## 创建新远程分支并拉取到本地
```shell
git checkout -b [local_branch_name] origin/[remote_branch_name]
```

## 本地分支与远程分支关联
```shell
git branch --set-upstream-to=origin/[remote_branch_name] [local_branch_name]
```

## Rebase
把提交历史变成一条直线
```shell
git rebase
```
已经提交到远程库的版本，最好不要对其进行rebase，否则容易造成混乱

# 其他功能
## Stash
把当前的改动暂存但不提交，以便在切换分支后再取出
```shell
git stash
```
查看暂存内容
```shell
git stash list
```
取出并删除stash
```shell
git stash apply [stash@{0}]
git stash drop
# 上面两条指令等同于
git stash pop
```

## Cherry-pick
把某次提交所做的改动应用到当前分支，而不是合并整个分支
```shell
git cherry-pick [commit_id]
```
