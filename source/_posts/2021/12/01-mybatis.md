---
title: MyBatis 笔记
date: 2021-12-01 16:21:18
tags:
---
# 动态SQL

## if
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
