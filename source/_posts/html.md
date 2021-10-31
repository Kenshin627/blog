---
title: Html学习笔记整理
date: 2017-02-22 14:23:37
tags:
- html
- 前端
- 基础
categories:
- Html
- 前端
---
## 引用标签
引用标签会自动对其中的内容加入双引号，有单行文本和长段文本两种方式：

    <q>引用标签</q> //适用单行文本

    <blockquote>引用标签</blockquote> //长段文本

## 实体字符
在html中输入多个空格是不起作用的，并且换行也会被当做一个空格来看待，如果需要多个空格请使用实体字符，如:`&nbsp;`

## 地址

    <address>地址</address> //显示地址

## 程序代码

    <code>代码</code>  //显示程序代码
    <pre>大段代码</pre> //显示大段代码
## 表格摘要
  摘要的内容是不会在浏览器中显示出来的。它的作用是增加表格的可读性(语义化)，使搜索引擎更好的读懂表格内容，还可以使屏幕阅读器更好的帮助特殊用户读取表格内容。语法表示：
  

    <table summary="表格简介文本"></table>


## 使用mailto在网页中连接Email地址

    <a href="mailto:yy@imooc.com?subject='观了不起的盖茨比有感'&body='你好，对此评论有些想法'">发送邮件给我</a>

## Label
用于绑定input在用户点击label标签的文字后即可聚焦input，有两种绑定方式。
**方式一:**
```
<form action=" " method="post">
     <label for=”account”>账号</label>
     <input type=”text”  id=”account”/>
     <label for=”pwd”>密码</label>
     <input type=”text” id=”pwd”>
 </form>
```

**方式二：**

```
<form action=" " method="post">
	<label>
	  账号:<input type=”text”/>
	</label>
	<label>
	  密码:<input type=”password”/>
	</label>
</form>
```
## HTML5 DTD文档类型声明

    <!DOCTYPE html> //必须位于html文档的第一行
<!--more-->
## img
**width:**设置图片的宽度

**height：**设置图片的高度

*注： 如果img标签没有指定需要显示的图片的宽高，那么系统会按照图片默认的宽高来显示。想要保持img图片原图的宽高比，只需要设置img宽度和高度其中之一，另外一个属性会根据原图的宽高比自动计算得出。*

**title:**当鼠标悬停在图片上时，弹出的描述狂中显示的内容。

**alt(alternate):**当需要显示的图片找不到时，显示的替代的文字内容。

## br
&nbsp;&nbsp;&nbsp;br标签用于换行，多个br标签可以连续使用，使用了多少个br标签就会换多少行，由于html的作用就是给文本添加语义，而br标签的语义是不另起一个段落换行，而在企业开发中一般情况下需要换行都是因为需要另起一个段落，所以在企业开发中很少使用br标签，换行另起段落一般用P标签。

## a标签
### base标签
 base标签专门用来统一指定当前网页中所有的a标签的打开方式,base标签必须写在head标签之间,格式为：
 

    <base target=”_blank”>               //必须位于head之间
*注：如果即在base中指定了target又在a标签中指定了target，那么浏览器会按照a标签中指定方式的来执行。*

### 假链接
为a标签的href属性分配一个#或者JavaScript，以实现特定的操作。

```
<a href=”#”>返回顶部</a>
```

```
<a href=”javascript:”></a>
```

### 锚点
锚点是文档中某行的一个记号，类似于书签，用于链接到文档中的某个位置。当定义了锚点后，我们可以创建直接跳至该锚点（比如页面中某个小节）的链接，这样使用者就无需不停地滚动页面来寻找他们需要的信息了。 创建锚点需要以下几个步骤：
1) 给需要定位的目标标签添加一个ID属性。
2) 告诉a标签你需要转到的目标标签。
3) 格式：

```
<a href=”#target”>跳转到目标</a>
<h1 id=”target”>我是目标</h1>
```
*注：使用这种方式跳转是没有过渡动画的，一下就跳转到了指定位置  a标签除了可以跳转到当前界面的指定位置，还可以直接跳转到其他界面的指定位置。*

## 定义列表 dl(definition list)
常用于网站底部的信息、图文混排等。格式：
```
  <dl>
	  <dt></dt>   //definition title 定义列表中的标题
	  <dd></dd>  //definition description 定义列表标题的描述
	  <dt></dt>
	  <dd></dd>
</dl>
```

## 表格

### 表格摘要
摘要的内容是不会在浏览器中显示出来的。它的作用是增加表格的可读性(语义化)，使搜索引擎更好的读懂表格内容，还可以使屏幕阅读器更好的帮助特殊用户读取表格内容。语法表示：
```
<table summary=”表格简介文本”></table>
```
### 表格标题
表格标题永远处于表格的水平中心位置，语法如下:

```
<table>
	  <caption>
	     <h2>表格标题</h2>
	  </caption>                 //表格标题
	  <thead></thead>            //表格头
	  <tbody></tbody>            //表格内容体
</table>
```

### 细线表格

```
	<style>
	  Table{
		Padding:0.1px;
		Background-Color:steelblue;  //定义边框的颜色
		Width:650px;
		Height:40px;
		Font:16px “微软雅黑”;
		Text-align:center;
	  }
	  Table tr{
	    Background-Color:white;
	  }
	</style>

```

## datalist
给input输入框绑定待选项列表，格式如下：
先定义一个datalist列表项，给它分配一个唯一的ID “cars”

```
<datalist  id=”cars”>
    <option>奔驰</option>
    <option>；路虎</option>
	<option>Jeep</option>
	<option>劳斯莱斯</option>
	<option>宝马</option>
</datalist>
```

然后给输入框添加一个属性list，值填写刚才定义列表的id值”cars”。
请输入你的车型:

```
<input type=”text” list=”cars”/>
```

## select
可以通过给option标签添加一个selected属性来制定列表的默认选中项;可以给option进行分组，使用optgroup label标签的名字显示了分组的名称。

```
	<select>
	 <optgroup label=”北京”>
		 <option>西城区</option>
		 <option selected=”selected”>朝阳区</option>
		 <option>通州区</option>
	 </optgroup>
	 <optgroup label=”广州>
		 <option>天河区</option>
		 <option>越秀区</option>
		 <option>黄浦区</option>
	</optgroup>
	</select>

```
## textArea
Textarea通过css的属性resize:none可以禁止用户自由拉伸textarea

## video
**src:**用于告诉video标签需要播放的视频地址。
**autoplay：**用于告诉video标签是否需要自动播放视频 autoplay = “autoplay”。
**controls:** 用于告诉video标签是否显示控制条 controls = “controls”。
**poster:** 用于设置视频在播放之前，显示的图片。
**loop:** 一般用于广告视频，用于告诉video标签播放完毕后是否需要循环播放。Loop = “loop”。
**preload:** 预加载视频，但是需要注意preload和autoplay相冲。
**muted:** 静音   muted = “muted”。
**width/height：**二者只设置一个，保持视频的宽高比

当前通过video标签的第二种格式虽然能够指定所有浏览器都支持的视频格式，但是显然所有浏览器都通过video标签播放视频有一个前提条件，那就是浏览器必须支持H5，可以通过一个JS框架叫做**html5demia**来实现兼容。

video的第二种格式：

```
<video>
	<source src=”video/1.webm” type=”video/webm”></source>
	<source src=”video/2.mp4” type=”video/mp4”></source>
	<source src=”video/3.ogg” type=”video/ogg”></source>
</video>
```
## marquee
Marquee标签虽然不是w3c标准的标签，，但是各大浏览器对其支持很好。Marquee标签是一个内联块级元素，主要用于实现类似于跑马灯的效果。格式为：

    <marquee>内容</marquee>
**direction(left right up down):** 设置内容滚动的方向
**scrollamount：**设置滚动的速度，值越大越快
**loop：**设置滚动次数，默认为-1，也就是无限滚动
**behavior：**设置滚动类型，slide，滚动到边界即停止，alternate，滚动到边界即弹回。
