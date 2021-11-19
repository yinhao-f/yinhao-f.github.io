---
title: MySQL Cheatsheet
date: 2021-11-10 15:01:38
tags: MySQL
---
# 前言
实用MySQL语句小抄，持久更新
SQL，全称Structured Query Language，读作sequel或S-Q-L

# 命令行语句

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

# 数据库指令

## 创建数据库
```sql
create database 数据库名
```

## 使用数据库
```sql
use 数据库名
```

## 查看当前选择的数据库
```sql
select database()
```

## 删除数据库
```sql
drop database 数据库名
```

# 表指令
## 查看数据库内所有表
```sql
show tables
```

## 创建表
```sql
create table table_name
  (column_1 变量类型,
  column_2 变量类型,
  column_3 变量类型...)
```
实例
```sql
create table if not exists test (
  id int unsigned auto_increment,
  name varchar(20) not null,
  date_created date,
  primary key (id)
)default charset = utf8 #编码设为utf8可以支持汉字
```

## 查看表结构
```sql
describe table_name
```

## 删除表
```sql
drop table table_name
```

# 记录指令
## 增
```sql
insert into table_name
  (column_1, column_2,...)
  values (value_1, value_2,...)
```

## 删
```sql
delete from table_name [where 条件语句]
```
:::tip
truncate可以清空整张表，并让自动递增的字段归零(delete不会)
```sql
truncate table_name
```
:::

## 改
```sql
update table_name
  set column_1 = value_1,
  column_2 = value_2
  [where 条件语句]
```

## 查
```sql
select column_1[, column_2, column_3] [as column_alias]
  from table_name
  [where 条件]
  [limit 查询数量上限]
  [order by 需要排序的字段 [desc #降序]]
```

## 清空表


# 多表联查
施工中。。。

# 数据类型
## 数值类
| 类型 | 范围 |
| ---- | ---- |
| tinyint | (0, 255) |
| smallint | (0, 65535) |
| mediumint | (0, 16777215) |
| int | (0, 4294967295) |
| bigint | (0, 2^64-1) |
| decimal | (M, D) M<=65 |
| float | (-3.402823466E+38, -1.175494351E-38), 0, (1.175494351E-38, 3.402823466E+38) |
| double | (-1.7976931348623157E+308, -2.2250738585072014E-308), 0, (2.2250738585072014E-308, 1.7976931348623157E+308) |

## 日期类
| 类型 | 格式 |
| --- | --- |
| date | '0000-00-00' |
| time | '00:00:00' |
| datetime | '0000-00-00 00:00:00' |
| timestamp | '0000-00-00 00:00:00' |
| year | 0000 |

## 字符串类
| 类型 | 格式 |
|---|---|
| char | (0, 255) |
| varchar | (0, 65535) |

# Where 子句

## 在MyBatis中使用if条件判断
在入参给出name的时候用name去匹配，反之查询所有记录
```xml
<select id="getModelList" parameterType="java.util.Map" resultType="java.util.Map">
  SELECT
    id,
    name,
    birthday
  FROM person_table
  WHERE
  <if test="name != null and name !=''">
        name = #{name} AND
  </if>
  1=1
</select>
```

# 参考资料
- [MySQL官方文档](https://dev.mysql.com/doc/refman/8.0/en/)
- [MySQL教程|菜鸟教程](https://www.runoob.com/mysql/mysql-tutorial.html)
- [SQL教程|菜鸟教程](https://www.runoob.com/sql/sql-tutorial.html)
