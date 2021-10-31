---
title: Asp.Net Core 文件系统
date: 2019-11-05 16:43:00
tags:
- Asp.Net Core
- 文件系统
categories:
- Asp.Net Core
---

# Asp.Net Core 文件系统
ASP.NET Core 具有很多针对文件读取的应用。比如我们倾向于采用JSON文件来定义配置，所以应用就会涉及针对配置文件读取。如果用户发送一个针对物理文件的HTTP请求，应用会根据指定的路径读取目标文件的内容并对请求予以响应。在一个ASP.NET Core MVC应用中，针对View的动态编译会涉及到根据预定义的路径映射关系来读取目标View文件。这些不同应用场景都会出现一个IFileProvider对象的身影，以此对象为核心的文件系统提供了统一的API来读取文件的内容并监控内容的改变。

## 物理文件系统

### IChangeToken

由于IFileProvider提供了针对文件系统变换的监控功能，在.NET Core的世界里类似的功能大都利用一个IChangeToken对象来实现.从字面上理解的IChangeToken对象就是一个与某组监控数据关联的“令牌（Token）”，它能够在检测到数据改变的时候及时地对外发出一个通知。IChangeToken接口具有如下所示的三个成员。

![alt](ASP-NET-Core-文件系统/IFileProvider1.jpg)

* **HasChanged**:如果关联的数据发生改变，HasChanged属性将变成True.

* **ActiveChangeCallbacks**:它表示当数据发生变化时是否需要主动执行注册的回调操作.

* **RegisterChangeCallback**:注册一个在数据发生改变时可以自动执行的回调，该方法会以一个IDisposable对象的形式返回注册对象，所以我们应该在适当的时机调用其Dispose方法解除注册的回调.

### IFileProvider

IFileProvider的接口定义如下图:

![alt](ASP-NET-Core-文件系统/IFileProvider2.jpg)

![alt](ASP-NET-Core-文件系统/IFileProvider3.jpg)

![alt](ASP-NET-Core-文件系统/IFileProvider4.jpg)

* **GetDirectoryContents**:通过给定的路径遍历目录,返回一个由IFileInfo组成的集合.该接口有一个属性Exists,判断指定路径目录是否存在.

* **IsDirectory**:由GetDirectoryContents得到的集合中无论是目录还是文件,都会用IFileInfo来表示.判断是文件还是目录用属性IsDirectory来区分.

* **GetFileInfo**:获取指定路径下的文件.如果是目录或者不存在,则Exists属性返回false.
* **Watch**:监控指定文件的变化,如果产生变化,则调用注册的回调函数.如下图所示.

![alt](ASP-NET-Core-文件系统/IFileProvider5.jpg)

文件系统涉及的接口以及相互关系图.

![alt](ASP-NET-Core-文件系统/IFileProvider6.jpg)

### 物理文件系统

物理文件系统涉及的接口以及相互关系图

![alt](ASP-NET-Core-文件系统/IFileProvider7.jpg)

