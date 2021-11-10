---
title: MySQL Cheatsheet
date: 2021-11-10 15:01:38
tags: MySQL
---
# 前言
实用MySQL语句小抄，持久更新

:::tip
本文使用cmd进行操作，使用数据库软件时可根据情况忽略 `mysql>` 以及末尾的分号
:::

# 基础指令
## 连接服务器
```
>mysql -u root -p  #root是连接所使用的用户名
```

## 断开连接
```
mysql> quit
Bye
```

## 查看当前版本
```
mysql> select version();
+-----------+
| version() |
+-----------+
| 8.0.27    |
+-----------+
1 row in set (0.00 sec)
```

# 数据库指令
## 查看所有数据库
```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| world              |
+--------------------+
7 rows in set (0.00 sec)
```

## 创建数据库
```
mysql> create database menagerie;
Query OK, 1 row affected (0.04 sec)
```

## 访问数据库
```
mysql> use menagerie
Database changed
```

## 查看当前选择的数据库
```
mysql> select database();
+------------+
| database() |
+------------+
| menagerie  |
+------------+
1 row in set (0.00 sec)
```

# 表指令
## 查看数据库内所有表
```
mysql> show tables;
Empty set (0.02 sec)
```

## 创建表
```
mysql> create table pet (name varchar(20), owner varchar(20),
    -> species varchar(20), sex char(1), birth date, death date);
Query OK, 0 rows affected (0.11 sec)
```

## 查看表结构
```
mysql> describe pet;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
6 rows in set (0.03 sec)
```

# 记录指令
## 增
```sql
insert into tbl_name
  (col_1, col_2,...)
  values (val_1, val_2,...)
```

## 删

## 改

## 查
```
mysql> select * from pet;
+----------+-------+---------+------+------------+-------+
| name     | owner | species | sex  | birth      | death |
+----------+-------+---------+------+------------+-------+
| Puffball | Diane | hamster | f    | 1999-03-30 | NULL  |
+----------+-------+---------+------+------------+-------+
1 row in set (0.00 sec)
```
