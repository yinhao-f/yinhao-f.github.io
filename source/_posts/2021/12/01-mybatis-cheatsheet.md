---
title: MyBatis Cheatsheet
date: 2021-12-01 16:21:18
tags: [MySQL, MyBatis, Java]
featured: true
---
# 模糊查询
使用`CONCAT()`连接`"%"`与入参`name`以实现`LIKE`模糊查询
```xml
<select id="selectPerson" parameterType="java.lang.String" resultType="java.util.Map">
  SELECT * FROM table_name WHERE name LIKE CONCAT('%', #{name}, '%')
</select>
```

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

## foreach
如果需要传入一个可迭代的对象，如list，可以用foreach功能转换为MySQL可识别的格式
比如有一个list，含有元素`["red", "yellow", "blue"]`，那么：
```xml
<select id="selectBalloons" resultType="java.util.Map">
  SELECT *
  FROM balloon_table
  WHERE color IN
  <foreach item="item" index="index" collection="list"
    open="(" separator="," close=")">
      #{item}
  </foreach>
</select>
```
其中的`foreach`模块会生成`("red", "yellow", "blue")`

如果list中的元素是对象类型，如：
```java
Map map = new HashMap();
List list = new ArrayList();
map.put("color", "red");
list.add(map);
```
那么foreach需要写成：
```xml
<foreach item="item" index="index" collection="list"
  open="(" separator="," close=")">
    #{item.color}
</foreach>
```

# 参考资料
[MyBatis官网](https://mybatis.net.cn/)
