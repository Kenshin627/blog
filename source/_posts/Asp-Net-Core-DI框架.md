---
title: Asp.Net Core DI框架
date: 2019-10-19 17:51:45
tags:
- Asp.Net Core
- IOC DI
categories:
- Asp.Net Core
---
# Asp.NET Core DI框架概览
毫不夸张地说,整个ASP.NET Core框架是建立在一个依赖注入框架之上的,它在应用启动时构建请求处理管道的过程中,以及利用该管道处理每个请求过程中使用到的服务对象均来源于DI容器.该DI容器不仅为ASP.NET Core框架提供必要的服务,同时作为了应用的服务提供者,依赖注入已经成为了ASP.NET Core应用基本的编程模式.

## 服务的注册与消费
ASP.NET Core中的依赖注入框架中,我们添加的服务注册被保存到通过 __IServiceCollection__ 接口表示的集合之中,基于这个集合创建的DI容器体现为 __IServiceProvider__.

DI框架提供了生产实例的三种生命周期模式,分别为:
* __Singleton__:整个应用程序生命周期内单例
* __Scoped__:单次服务请求内的单例
* __Transient__:每次获取均会产生新的对象

DI框架注册服务时通常会使用三种方式,分别为:
* 指定注册非服务类型和实现类型.
* 指定一个现有的服务实例.
* 指定一个创建服务实例的委托对象.

当我们在进行服务注册时,可以为同一类型添加一个服务注册,也可以添加多个,实际上添加的所有服务注册都是有效的,在完成服务注册之后，我们调用IServiceCollection接口的扩展方法  **BuildServiceProvider**创建出代表DI容器的IServiceProvider对象,并利用它调用后者的**GetService<T>**方法来提供相应的服务实例,总时会返回一个服务实例,这里采用了"后来居上"的原则,即总是采用最近添加的服务注册来创建服务实例.如果我们调用另一个扩展方法**GetServices<T>**,它将利用返回所有服务注册提供的服务实例.如下所示的代码片段.

![alt](Asp-Net-Core-DI框架/DI1.jpg)


## 生命周期管理
IServiceProvider之间的层次结构造就了三种不同的生命周期模式：由于Singleton服务实例保存在作为根容器的IServiceProvider对象上，所以它能够在多个同根IServiceProvider对象之间提供真正的单例保证。Scoped服务实例被保存在当前IServiceProvider上，所以它只能在当前IServiceProvider对象的“服务范围”保证的单例的。没有实现IDisposable接口的Transient服务则采用“即用即取，用后即弃”的策略。

接下来我们通过简单的实例来演示三种不同生命周期模式的差异。在如下所示的代码片段中我们创建了一个ServiceCollection对象并针对接口IFoo、IBar和IBaz注册了对应的服务，它们采用的生命周期模式分别为Transient、Scoped和Singleton。在利用ServiceCollection创建出代表DI容器的IServiceProvider对象之后，我们调用其CreateScope方法创建了两个所谓的“服务范围”，后者的ServiceProvider属性返回一个新的IServiceProvider对象，它实际上是当前IServiceProvider对象的子容器。我们最后利用作为子容器的IServiceProvider对象来提供相应的服务实例。

    //根节点的ServiceProvider
    var root = new ServiceCollection()
            .AddTransient<IFoo, Foo>()
            .AddScoped<IBar>(_ => new Bar())
            .AddSingleton<IBaz, Baz>()
            .BuildServiceProvider();

    //子节点的ServiceProvider
    var provider1 = root.CreateScope().ServiceProvider;
    var provider2 = root.CreateScope().ServiceProvider;

    void GetServices<TService>(IServiceProvider provider)
    {
        provider.GetService<TService>();
        provider.GetService<TService>();
    }

    GetServices<IFoo>(provider1);
    GetServices<IBar>(provider1);
    GetServices<IBaz>(provider1);
    Console.WriteLine();
    GetServices<IFoo>(provider2);
    GetServices<IBar>(provider2);
    GetServices<IBaz>(provider2);

    输出:Foo Foo Bar Baz
         Foo Foo Bar

