---
title: 从零搭建MySQL数据库
date: 2021-11-08 14:23:59
tags: [MySQL, Java, IntelliJ IDEA]
---
# 前言
安装MySQL，建立连接，并在IntelliJ IDEA中操作使用

# 安装MySQL
从MySQL官网下载[MySQL Installer for Windows](https://dev.mysql.com/downloads/installer/)

:::tip
如果没有安装Visual Basics和Python，安装过程中选择Developer Default会报错，提示未找到这两种语言环境，可以选择Custom然后勾掉不需要的Connector驱动
:::

安装过程中会提示设置密码，之后访问数据库会用到

另外可以选择以Windows服务启动MySQL服务器，这样开机以后服务器就会自动启动并在后台运行

## 将MySQL添加到PATH
设置系统环境变量，以在cmd中直接使用mysql命令
打开我的电脑，右键空白处，属性，高级系统设置，环境变量，在系统环境变量中双击Path，选择新建，输入`C:\Program Files\MySQL\MySQL Server 8.0\bin`，然后点击确定即可

# 使用CMD连接到MySQL本地服务器
打开CMD，输入
```
>mysql -u root -p
```
系统会弹出 `Enter password:`，输入你之前安装时设置的密码
连接成功后会显示
```
>mysql -u root -p
Enter password: ***
Welcome to the MySQL monitor.  Commands end with ; or \g.
...
```
# 使用MySQL

## 创建数据库
创建menagerie数据库，并与之连接
```
mysql> create database menagerie;
Query OK, 1 row affected (0.04 sec)

mysql> use menagerie
Database changed
```

## 创建表
```
mysql> create table pet (name varchar(20), owner varchar(20),
    -> species varchar(20), sex char(1), birth date, death date);
Query OK, 0 rows affected (0.11 sec)

mysql> show tables;
+---------------------+
| Tables_in_menagerie |
+---------------------+
| pet                 |
+---------------------+
1 row in set (0.00 sec)
```

## 添加记录
```
mysql> insert into pet
    -> values ('Puffball','Diane','hamster','f','1999-03-30',NULL);
Query OK, 1 row affected (0.06 sec)

mysql> select * from pet;
+----------+-------+---------+------+------------+-------+
| name     | owner | species | sex  | birth      | death |
+----------+-------+---------+------+------------+-------+
| Puffball | Diane | hamster | f    | 1999-03-30 | NULL  |
+----------+-------+---------+------+------------+-------+
1 row in set (0.02 sec)
```

# 在IntelliJ IDEA中与服务器建立连接
IDEA Ultimate版内嵌了非常好用的数据库管理工具，虽然要付费，但是可以通过插件实现免费试用无限续杯

## 将数据库添加到IDEA中
在IDEA的右边侧栏有一个Database标签，展开后点左上角的加号，Data Source选择MySQL
<div align="center">
<img src=/img/idea_database_1.png width=50% />
</div>

在次级菜单中，输入用户名和密码，以及数据库名称

<div align="center">
<img src=/img/idea_database_2.png width=80% />
</div>

### 选择驱动
IDEA有自带的JDBC驱动，也可以选用安装MySQL时附带的驱动，MySQL附带的驱动版本可能会领先一些

如果要自选驱动，点击Driver: MySQL，选择Go to Driver

<div align="center">
<img src=/img/idea_database_3.png width=80% />
</div>

点击Driver Files下面的+号，选择Custom JARs，选取到MySQL安装目录下的驱动包

<div align="center">
<img src=/img/idea_database_4.png width=80% />
</div>

路径默认在 `C:\Program Files (x86)\MySQL\Connector J 8.0\mysql-connector-java-8.0.27.jar` （版本可能有所区别）

设置好后，点击左上方的左箭头返回数据库配置页面，或者按Ctrl+Alt+左箭头

## 测试连接
点击Test Connection，正常的话会出现以下提示

<div align="center">
<img src=/img/idea_database_5.png width=80% />
</div>

点击ok，右边的Database侧栏会出现导入的数据库，双击pet表，应该就能看到之前添加的数据了

<div align="center">
<img src=/img/idea_database_6.png />
</div>

完成！

# 参考资料
[MySQL 8.0官方文档](https://dev.mysql.com/doc/refman/8.0/en/)
