---
title: 在Java里使用AES加密
date: 2021-11-05 10:43:32
tags: [Java, Coding]
---
# 在Java里使用AES加密

## 前言
写一个模拟登录界面的时候需要把前端传来的用户密码做解密，于是写一个AES加密解密工具

## 具体实现
Java有内置的AES工具，只需调用即可

### 导入
导入所需的包，也可以让IDE自动完成

```java
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
```

### 定义常量
定义一个默认密钥`SECRET_KEY`，方便调试使用
定义默认算法`ALG`，使用AES、ECB电子密码本模式，PKCS5Padding
导入base64转码器

```java
public static final String SECRET_KEY = "ECB/PKCS5Padding";

public static final String AES = "AES";

private static final String ALG = "AES/ECB/PKCS5Padding";

private static Base64.Encoder base64Encoder = Base64.getEncoder();

private static Base64.Decoder base64Decoder = Base64.getDecoder();
```

### 加密模块
虽然本次暂时用不到加密模块，但既然写了解密，加密也差不多

```java
public static String encode(String content, String key) {
    try {
        SecretKey secretKey = new SecretKeySpec(key.getBytes(), AES);
        Cipher cipher = Cipher.getInstance(ALG);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);

        byte[] byteEncode = content.getBytes(StandardCharsets.UTF_8);
        byte[] byteAES = cipher.doFinal(byteEncode);
        return base64Encoder.encodeToString(byteAES);
    } catch (Exception e) {
        e.printStackTrace();
    }

    return null;
}
```
加密后使用base64转码，记得转为UTF_8，否则中文会出错

### 解密模块
和加密模块大同小异，只需要将cipher的模式改成DECRYPT_MODE，并将密码先做base64转换为字节数组
解码后同样需要使用UTF_8编码

```java
public static String decode(String content, String key) {
    try {
        SecretKey secretKey = new SecretKeySpec(key.getBytes(), AES);
        Cipher cipher = Cipher.getInstance(ALG);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);

        byte[] byteContent = base64Decoder.decode(content);
        byte[] byteDecode = cipher.doFinal(byteContent);
        return new String(byteDecode, StandardCharsets.UTF_8);
    } catch (Exception e) {
        e.printStackTrace();
    }

    return null;
}
```

### 调试
```java
public static void main(String[] args) {
    String content = "就是不告诉你";
    String encrypted = encode(content, SECRET_KEY);
    String decrypted = decode(encrypted, SECRET_KEY);

    System.out.println("原文: " + content);
    System.out.println("密文: " + encrypted);
    System.out.println("解密: " + decrypted);
    }
```

结果如下：
```
原文: 就是不告诉你
密文: 0LKe217dJZkpaBaLhXCdKtydSp8Zig31ptI/UkAkxDo=
解密: 就是不告诉你
```
