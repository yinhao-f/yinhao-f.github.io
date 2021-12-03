---
title: MyBatis 笔记
date: 2021-12-01 16:21:18
tags:
---
# 动态SQL
- if
- choose (when, otherwise)
- trim (where, set)
- foreach

## if
如果传入了name，则匹配name字段，否则返回所有记录
```xml
<select id="getModelList" parameterType="java.util.Map" resultType="java.util.Map">
  SELECT
    id,
    name,
    birthday
  FROM person_table
  WHERE 1=1
  <if test="name != null and name !=''">
    AND name = #{name}
  </if>
</select>
```

## where
之前的if实例中使用了1=1来解决没有传入name入参，导致WHERE子句为空的情况。这种情况也可以使用where
```xml
<select id="getModelList" parameterType="java.util.Map" resultType="java.util.Map">
  SELECT
    id,
    name,
    birthday
  FROM person_table
  <where>
    <if test="name != null and name !=''">
      name = #{name}
    </if>
  </where>
</select>
```
如果有多个字段，要将AND写在条件句首， MyBatis会根据需要自动截去AND
```xml
<select id="getModelList" parameterType="java.util.Map" resultType="java.util.Map">
  SELECT
    id,
    name,
    birthday
  FROM person_table
  <where>
    <if test="name != null and name !=''">
      name = #{name}
    </if>
    <if test="id != null and id != ''">
      AND id = #{id}
    </if>
  </where>
</select>
```

# 参考资料
[MyBatis官网](https://mybatis.net.cn/)
