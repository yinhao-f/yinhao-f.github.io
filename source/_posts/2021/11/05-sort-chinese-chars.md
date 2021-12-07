---
title: Java汉字排序
date: 2021-11-05 14:52:02
tags: Java
---
# 前言
设计一个通讯录列表，在查询的时候将联系人按照姓名拼音排序。

# 如何实现
使用Comparator和Collator类，对队列内的字符串排序

## 对字符串List排序的场景

```java
import java.text.Collator;
import java.util.*;

public class PersonList {
    public static void main(String[] args) {
        // 创建序列
        List<String> personList = Arrays.asList("张三","李四","王五");

        // 初始化比较器
        Comparator<Object> comparator = Collator.getInstance(Locale.CHINA);

        // 排序并输出结果
        personList.sort(comparator);
        for (String name :
                personList) {
            System.out.println(name);
        }
    }
}
```

程序输出:
```
李四
王五
张三
```

如果队列中的元素为对象（如自定义实体类）要怎么排序呢

## 对List元素为对象排序的场景
首先写一个实体类
```java
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Person {
    private String name;

    private String number;
}
```
自定义Comparator的排序方法
```java
import java.text.Collator;
import java.util.*;

public class PersonList {
    public static void main(String[] args) {
        // 创建联系人
        Person person1 = new Person("张三", "13011112222");
        Person person2 = new Person("李四", "13111112222");
        Person person3 = new Person("王五", "13311112222");

        List<Person> contacts = new ArrayList<>();
        contacts.add(person1);
        contacts.add(person2);
        contacts.add(person3);

        Comparator<Person> comparator = (o1, o2) -> {
            Collator collator = Collator.getInstance(Locale.CHINA);
            return collator.getCollationKey(o1.getName()).compareTo(
                    collator.getCollationKey(o2.getName()));
        };

        contacts.sort(comparator);

        for (Person person :
                contacts) {
            System.out.println(person);
        }
    }
}
```

输出结果：
```
Person(name=李四, number=13111112222)
Person(name=王五, number=13311112222)
Person(name=张三, number=13011112222)
```
