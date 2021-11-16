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

## 查看表结构
```sql
describe table_name
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

## 改
```sql
update table_name
  set column_1 = value_1,
  column_2 = value_2
  [where 条件语句 [and/or 条件语句2]]
```

## 查
```sql
select column_1[, column_2, column_3] [as column_alias]
  from table_name
  [where 条件]
```

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

# Where 字句
可以使用if条件判断是否传入入参
```xml
<select id="getModelList" parameterType="java.util.Map" resultType="java.util.Map">
  SELECT
    b.module_id brand,
    a.goods_id model_id,
    a.op_type,
    a.goods_name model_name,
    a.goods_pic,
    a.function_details,
    a.goods_real_price,
    a.goods_price
  FROM t_p_goods_view a, t_b_module_goodsview b
  WHERE
  <if test="brand != null and brand !=''">
        b.module_id = #{brand} AND
  </if>
  <if test="modelName != null and modelName != ''">
    a.goods_name LIKE CONCAT('%',#{modelName},'%') AND
  </if>
  <if test="flag != null and flag != ''">
    a.op_type = #{flag} AND
  </if>
  a.goods_id = b.goods_id
</select>
```

# 参考资料
- [MySQL官方文档](https://dev.mysql.com/doc/refman/8.0/en/)
- [MySQL教程|菜鸟教程](https://www.runoob.com/mysql/mysql-tutorial.html)
- [SQL教程|菜鸟教程](https://www.runoob.com/sql/sql-tutorial.html)
