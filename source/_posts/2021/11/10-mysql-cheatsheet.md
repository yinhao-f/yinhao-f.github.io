---
title: MySQL Cheatsheet
date: 2021-11-10 15:01:38
tags: MySQL
featured: true
---
# MySQL笔记
SQL，全称Structured Query Language，读作"sequel"或"S-Q-L"

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
mysql> SELECT version();
+-----------+
| version() |
+-----------+
| 8.0.27    |
+-----------+
1 row in set (0.00 sec)
```

## 查看所有数据库
```
mysql> SHOW databases;
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
CREATE DATABASE 数据库名
```

## 使用数据库
```sql
USE 数据库名
```

## 查看当前选择的数据库
```sql
SELECT DATABASE()
```

## 删除数据库
```sql
DROP DATABASE 数据库名
```

# 表指令
## 查看数据库内所有表
```sql
SHOW TABLES
```

## 创建表
```sql
CREATE TABLE table_name
  (column_1 变量类型,
  column_2 变量类型,
  column_3 变量类型...)
```
实例
```sql
CREATE TABLE IF NOT EXISTS test (
  id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  date_created DATE,
  PRIMARY KEY (id)
)DEFAULT CHARSET = utf8 #编码设为utf8可以支持汉字
```

## 查看表结构
```sql
DESCRIBE table_name
```

## 删除表
```sql
DROP TABLE table_name
```

# 记录指令
## 增
```sql
INSERT INTO table_name
  (column_1, column_2,...)
  VALUES (value_1, value_2,...)
```

## 删
```sql
DELETE FROM table_name [WHERE 条件语句]
```
:::tip
truncate可以清空整张表，并让自动递增的字段归零(delete不会)
```sql
TRUNCATE table_name
```
:::

## 改
```sql
UPDATE table_name
  SET column_1 = value_1,
  column_2 = value_2
  [WHERE 条件语句]
```

## 查
```sql
SELECT column_1[, column_2, column_3] [AS column_alias]
  FROM table_name
  [WHERE 条件]
  [LIMIT 查询数量上限]
  [ORDER BY 需要排序的字段 [DESC #降序]]
```

### Like模糊匹配
```sql
SELECT column_1[, column_2,...] FROM table_name
WHERE column_1 LIKE 条件1
```
like后可以接字符串，`"[%]要匹配的字段[%]"`
`%`在前表示匹配字符串尾，`%`在后表示匹配字符串头，首尾都有匹配任意位置，不写`%`的话like等效等号`=`

### Union集合
用来连接多个`SELECT`语句，将检索结果放入集合，重复的记录默认会被删除
```sql
SELECT * FROM table_name [WHERE 条件]
UNION [ALL]
SELECT * FROM table_name [WHERE 条件]
```
:::tip
`UNION`后加上`ALL`可以保留重复记录
:::

### Group By
放在句尾，可以按给定字段分组
```SQL
SELECT * FROM table_name GROUP BY column_1
```

### IFNULL函数
可以将值为null的结果替换成指定内容
```sql
SELECT IFNULL(name, "无名氏") FROM table_name
```
（如果name为null，则返回“无名氏”）

### 大小写区分
`WHERE`默认对字符串不区分大小写，如果需要区分大小写，需要加入`BINARY`，如：
```sql
SELECT * FROM table_name
WHERE BINARY name = "aBcD"
```

# 多表联查
## INNER JOIN
获取两个表中字段匹配的记录，`INNER`可省略
```sql
SELECT a.column_1, b.column_1 FROM table_name a
[INNER] JOIN table_name b ON a.column_1 = b.column_1
```
与一下语句查询结果相同
```sql
SELECT a.column_1, b.column_1 FROM table_name a, table_name b
WHERE a.column_1 = b.column_1
```

## LEFT JOIN
返回左表中所有记录，即使右表无对应记录

## RIGHT JOIN
返回右表中所有记录，即使左表无对应记录

## OUTER JOIN
MySQL不支持OUTER JOIN，可以用UNION ALL来代替
```sql
SELECT * FROM table_a a
    LEFT JOIN table_b b ON a.column = b.column
UNION ALL
SELECT * FROM table_a a
    RIGHT JOIN table_b b ON a.column = b.column
```

# ALTER 表和数据库修改
## 删除字段
```sql
ALTER TABLE table_name DROP column_name
```

## 添加字段
```sql
ALTER TABLE table_name ADD column_name data_type
```


# 数据类型
## 数值类
| 类型 | 范围 |
| ---- | ---- |
| TINYINT | (0, 255) |
| SMALLINT | (0, 65535) |
| MEDIUMINT | (0, 16777215) |
| INT | (0, 4294967295) |
| BIGINT | (0, 2^64-1) |
| DECIMAL | (M, D) M<=65 |
| FLOAT | (-3.402823466E+38, -1.175494351E-38), 0, (1.175494351E-38, 3.402823466E+38) |
| DOUBLE | (-1.7976931348623157E+308, -2.2250738585072014E-308), 0, (2.2250738585072014E-308, 1.7976931348623157E+308) |

## 日期类
| 类型 | 格式 |
| --- | --- |
| DATE | 0000-00-00 |
| TIME | 00:00:00 |
| DATETIME | 0000-00-00 00:00:00 |
| TIMESTAMP | 0000-00-00 00:00:00 |
| YEAR | 0000 |

## 字符串类
| 类型 | 格式 |
|---|---|
| CHAR | (0, 255) |
| VARCHAR | (0, 65535) |

# 其他
## 查询重复条目
```sql
SELECT *, COUNT(column_name)
FROM table_name
GROUP BY column_name
HAVING COUNT(column_name) > 1
```

# 参考资料
- [MySQL官方文档](https://dev.mysql.com/doc/refman/8.0/en/)
- [MySQL教程|菜鸟教程](https://www.runoob.com/mysql/mysql-tutorial.html)
- [SQL教程|菜鸟教程](https://www.runoob.com/sql/sql-tutorial.html)
