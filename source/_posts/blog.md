---
title: Hexo+GitHub搭建个人博客
date: 2017-02-09 09:06:50
tags:
- Hexo
- Blog
- GitHub
categories:
- Blog建站
---
# 概述
![](http://i1.piimg.com/567571/f63d2030ab646842.png)
[Hexo](hexo.io)是一个快捷、简单、功能强大的个人博客框架，使用Node.js下载与安装，上百个文件仅需几秒就可以安装完毕;Hexo的页面使用Markdown语法，简洁高效;通过简单的命令即可发布到网站，支持发布到GitHub Pages Heroku和其他站点;同时Hexo拥有丰富强大的插件系统，可以根据个人需要进行安装。本文主要针对技术开发人员如何快速的搭建Hexo博客做一个详尽的教程，也是对自己在搭建博客的过程中遇到的问题进行总结，避免以后的小伙伴踩坑。本文从五个方面进行讲解，分别为：

- 环境部署
- HEXO安装与常用命令
- 个性化设置
- HEXO部署Github
- 定制化个性域名
<!--more-->
# 环境部署
## 1.Node.js
首先我们需要安装Node.js，点击进入[node.js官网](https://nodejs.org/en/)，按照通用的安装方式下载安装即可。Node.js主要用于生成静态界面。
## 2.Git
这里说的git实则是为了使用git指令，我们的git使用一般有两种方式，一种是图形化界面（GUI），另一种是通过命令行，我们这里要使用的是后者，点击[这里](http://git-scm.com/downloads)进入git的下载网站下载git的安装包。作用：把本地的hexo内容提交到github上去.
## 3.GitHub配置
### 申请账号
如果你没有GitHub账号，请到[这里](https://github.com/)进行注册申请，详细注册过程略。
### 建立仓库
点击右上角的"+"选择New respository 建立新仓库，如图：
![](http://p1.bqimg.com/567571/b85d00d61646ce19.png)
接下来需要配置仓库信息，如图：
![](http://p1.bpimg.com/567571/8ddca7070ac1d6d3.png)
这里我们需要填写Repository name，注意这里的命名规范，如果我们要把这个仓库作为我们的个人博客，必须遵照以下规范命名：**github用户名.github.io**,点击Create repository即可。
### 生成添加秘钥
本机生成秘钥是为了方便以后更新博客不用每次都输入用户名密码，这个根据个人需要，不是必须操作。
在终端输入：

    $ ssh-keygen -t rsa -C "Github的注册邮箱地址"
待秘钥生成完毕，会得到两个文件id_rsa和id_rsa.pub，这两个文件位于：
![](http://p1.bpimg.com/567571/ab706a277d27e1cd.png)
这个目录下，用文本编辑器(notepad++ 、Sublime Text)打开id_rsa.pub这个文件,全选复制里边的内容，然后打开[网址](https://github.com/settings/ssh),如图:
![](http://i1.piimg.com/567571/15b94723da693034.png)

点击 New SSH key:
![](http://i1.piimg.com/567571/efd23501f3d72f7b.png)
Title随便起个名字，将刚才复制的内容粘贴进Key中，然后点击Add SSH Key，这样生成的秘钥就添加完毕了，在今后更新博客，不必每次都输入用户名密码验证登录。
### 为Hexo安装Git插件
安装 hexo-deployer-git，否则会报 ERROR Deployer not found: git 的错误。

    $ npm install hexo-deployer-git --save

至此，环境全部配置完毕，接下来我们讲Hexo的安装，目录结构与常用命令。

# Hexo安装与常用命令
## Hexo安装
Node和Git都安装好后,首先创建一个文件夹,如blog,用户存放hexo的配置文件,然后进入blog里安装Hexo。执行如下命令安装Hexo：
定位blog安装位置：

    $ cd 文件夹路径
    
    $ npm install hexo-cli -g
安装好hexo以后，在终端输入：

    $ hexo
若出现下图，说明Hexo安装成功：
![](http://i1.piimg.com/567571/fe00cc2a41c9c40b.png)
## 初始化博客

    $ hexo init //初始化博客
    $ npm install //node.js的命令，根据博客的dependencies配置安装所有的依赖包
完成后我们可以看到Blog文件夹下的文件结构是这样的：
![](http://p1.bqimg.com/567571/cf1c9ba7e9372f95.png)
### 主目录结构：

    主目录
    1  ├── .deploy       #需要部署的文件
    2  ├── node_modules  #Hexo插件
    3  ├── public        #生成的静态网页文件
    4  ├── scaffolds     #模板
    5  ├── source        #博客正文和其他源文件，CNAME也放这里
    6  | ├── _drafts     #草稿
    7  | ├── _posts      #文章
    8  ├── themes        #主题
    9  ├── _config.yml   #全局配置文件
    10 └── package.json
我们经常需要操作的目录为source > _post(文章目录),themes(主题目录),config.yml(全局配置文件)。
### 主题目录结构：

    主目录
    1  ├── languages          #国际化
    2  |   ├── default.yml    #默认
    3  |   └── zh-CN.yml      #中文
    4  ├── layout             #布局
    5  |   ├── _partial       #局部的布局
    6  |   └── _widget        #小挂件的布局
    7  ├── script             #js脚本
    8  ├── source             #源代码文件
    9  |   ├── css            #CSS
    10 |   |   ├── _base      #基础CSS
    11 |   |   ├── _partial   #局部CSS
    12 |   |   ├── fonts      #字体
    13 |   |   ├── images     #图片
    14 |   |   └── style.styl #style.css
    15 |   ├── fancybox       #fancybox
    16 |   └── js             #js
    17 ├── _config.yml        #主题配置文件
    18 └── README.md          #主题介绍
## Hexo常用命令

    $ npm install hexo-cli -g           //安装Hexo
    $ hexo init                         //初始化博客
    $ npm install                       //安装依赖包
    $ hexo server                       //本地启动
    $ npm update hexo -g                //升级 
    $ hexo new "文件名"                  //新建文章
    $ hexo p                            //发布
    $ hexo generate                     //生成静态文件
    $ hexo generate -watch              //监视文件变动
    $ hexo deploy                       //部署
    $ hexo d -g                         //同上
    $ hexo g -d                         //同上
    $ hexo new page "pageName"          //新建页面
    
# 个性化设置
## 配置博客信息
博客初始化完毕后，我们需要对博客做一些详细的配置信息，以及个性化设置，主要设置的内容有：博客信息，语言、时区、主题样式、博客目录结构、部署设置(deploy)、插件等。
### 全局配置文件_config.yml
使用sublime Text打开根目录下的config.yml文件，首先我们要对站点信息进行设置:

#### 网站信息：

    # Site        //站点信息
    title :       //博客名称
    subtilte:     //副标题
    description:  //站点描述信息
    ahthor:       //作者
    language:     //语言(zh-CN) *重要
    timezone:     //时区(Asia/Shanghai) *重要
**注意：填写每一项内容时,:后边都要留一个空格再填写内容。**

#### 分页设置：

    # Pagination
    ## Set per_page to 0 to disable pagination
    per_page:5     //每页显示文章数
    pagination_dir: page

#### 主题设置：

    #  Extensions
    ## Plugins:https://hexo.io/plugins/
    ## Themes: https://hexo.io/themes/
    theme: next        //主题名称

#### 部署设置：

    deploy:
    type: git          //类型
    repo:              //Github仓库地址
    branch: master     //项目分支，默认使用主分支即master


## 设置个性化主题
### 下载主题
首先找到我们喜欢的[主题](https://hexo.io/themes/)，本篇文章以Next主题为例，将终端定位到Blog根目录，将Next主题从github clone到本地。

    $ cd:d/Blog 
    $ git clone https://github.com/iissnan/hexo-theme-next themes/next   
稍等片刻，Next主题会自动下载到Blog >themes文件夹下。
### 启用主题
修改config.yml全局配置文件，找到theme字节，修改值为：next

    theme: next
    
### 修改主题配置文件
#### 配置菜单
打开theme > next >_config.yml，定位到menu,hexo博客框架默认有/home 、/archives、/tags三个一级页面。如果我们要增加其他的页面需要对这里的配置文件进行修改。

    menu：
      home: /                          //主页(默认打开)
      #categories: /categories         //分类
      #about: /about                   //关于
      archives: /archives              //文章(默认打开)
      tags: /tags                      //标签(默认打开)
      #sitemap: /sitemap.xml           //站点地图
      #commonweal: /404.html           //公益404
我们需要增加哪个页面只需要把前边的#注释去掉即可。然后在终端中新建刚才添加的页面

    hexo new page "categories"          //这里用categories举例

编辑站点的source/categories/index.md，添加

    ---
    title: categories
    date: 2017-02-09 17:52:11
    type: "categories"             //添加类型
    comments: false                //禁用评论
    ---
保存后`hexo s`,打开http://localhost:4000/查看效果。

#### 设置语言
打开themes >next >languages 找到zh-Hans.yml，重命名为zh-CN.yml,或者将全局配置文件_config.yml的languages设置为zh-Hans也可以。

#### 修改图标
定位到menu_icons,这里储存了页面使用的图标信息，Next主题采用了FontAwesome的图标，直接使用FontAwesome的图标名称即可调用对应的图标文件,关于FontAwesome的详细信息点击[这里](http://fontawesome.io/icons/)，选择自己喜欢的图标复制名称粘贴即可。

    menu_icons:                    //目录图标配置
    enable: true                   //是否启用
     #KeyMapsToMenuItemKey: NameOfTheIconFromFontAwesome
     home: home                    //主页
     about: user                   //关于
     categories: th                //分类
     schedule: calendar            //进度
     tags: tags                    //标签
     archives: archive             //文章
     sitemap: sitemap              //站点地图
     commonweal: heartbeat
#### Scheme设置

    # Scheme Setting
    # ---------------------------------------------------------------
    # Schemes
    #scheme: Muse
     scheme: Mist
    #scheme: Pisces
Next主题提供了三种样式，分别为Muse Mist Pisces，将样式前的#注释去掉即可启用该主题，同时只能启用一个。

#### 社交链接
定位到social_icons，修改配置信息。
#### 侧边栏配置
定位倒sidebar，可以设置侧边栏的显示位置(左右),显示方式等。
#### 头像设置
首先将我们的头像图片copy到themses > next > source >images文件夹下，然后打开next主题下的_config.yml文件，定位到avatar。

    avatar: /images/头像文件名
# Hexo部署GitHub







 











    

