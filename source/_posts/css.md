---
title: CSS学习笔记整理
date: 2017-02-22 15:19:22
tags:
- CSS
- 基础
- 前端
categories:
- CSS
- 前端
---
## 嵌入方式
css有三种样式嵌入方式，分别为内联，嵌入，外部引用，一般情况下优先级为内联样式表>嵌入样式表>外部样式表，前提是外部引用css文件在嵌入的前边，如果外部引用在嵌入的后边那么外部引用的优先级将高于嵌入的。简而言之，css优先级是以离标签的距离为依据的。

## CSS选择器
### 并集选择器
取所有选择器所选择元素的并集，然后集中设置样式，语法为在每个选择器中间加上逗号，格式如下：

```
Selector1,selector2{
  属性:值;
}
```

### 交集选择器
给所有选择器选中的标签中，相交的那部分标签设置属性。格式：

```
Selector1Selecotr2{
   属性：值;
}
```
*注：Selector1和selector2之间没人任何符号也没有空格。*
<!--more-->

### 相邻兄弟选择器
给指定选择器后面紧跟的那个选择器中的标签设置属性，必须是第一个选择器后边紧跟的第一个元素。

```
Selector1+Selector2{
  属性:值;
}
```

### 通用兄弟选择器
给指定选择器后面的所有选择器选中的所有标签设置属性。

```
Selector1~Selector2{
  属性：值;
} 
```

### 序选择器
selector1:first-child  选中selector1同级别中的第一个元素，如果是selector1对应的元素则选中，否则无法选中任何元素。
selector1:last-child 选中同级别中的最后一个标签，如果该标签是Selector1对应的元素，则选中,否则无法选中任何元素。
selector1:nth-child(n)选中同级别中的第N个元素，如果该元素是选择器1对应标签则选中
selector1:nth-last-child(n)倒数第N个。
selector1:only-child选中父元素中唯一的元素。



selector1:first-of-type 选中同级别中同类型的第一个元素
selector1:last-of-type  选中同级别中同类型的最后一个元素
selector1:nth-of-type(n) 取出同级别同类型的第N个元素，
selector1:nth-last-of-type(n) 同级别同类型倒数第N个元素
selector1:only-of-type 选中父元素中唯一类型的元素


selector1:nth-child(odd) 奇数选择器
selector1:nth-child(even) 偶数选择器
selector1:nth-child(xN+y) 周期选择器 x y的值可以自定义，N表示从0开始一直递增到元素的总数

selector1:nth-of-type(odd) 奇数选择器
selector1:nth-of-type(even) 偶数选择器
selector1:nth-of-type(xN+y) 周期选择器 x y的值可以自定义，N表示从0开始一直递增到元素的总数

###  属性选择器
**[attribute]:** 根据指定的属性名称找到对应的标签
**[attribute=value]:**找到有指定属性，并且属性的取值等于value的标签，常见的应用场景用于区分input属性。例如：Input[type=text]
**[attribute^=value]:**属性值以value开头的元素 CSS3( [attribute|=value] css2)
**[attribute$=value]:**属性值以value结尾的
**[attribute*=value]:**属性值包含value css3([attribute~=value] css2)

## CSS三大特性
### 1.继承性
给父元素设置一些属性，子元素以及后代元素都可以使用，这个我们称之为继承性。并不是所有的属性都可以集成，**只有以color/font-/text-/line开头的属性才可以继承。**
**注意：**CSS继承性中的特殊性：a标签的颜色及样式不可以继承;h标签的字体大小不能继承。
**应用：**一般用于设置网页上的一些共性信息，例如网页的文字颜色，文字大小等内容，一般在body{}中进行统一设置

### 2.层叠性
在样式表现时，有可能会出现两个或更多的样式寻找同一元素，这就可能出现表现层的不确定性和样式冲突，CSS通过“层叠”给每个规则分配一个重要度。

### 3.优先级
**1>**	 是否是直接选中（间接选中就是指继承）,如果是间接选中，那么谁离目标比较近就取谁的值。

**2>** 	如果都是直接选中，并且不是相同类型的选择器，那么就会按照选择器的优先级层叠，具体优先级为:**id>class>标签>通配符(*)>继承>浏览器默认。**

**3>**	 如果都是直接选中，并且都是同类型的选择器，那么谁写的靠后取谁的值。

**4>**	 !important 用于提升某个直接选中标签的选择器中的某个属性的优先级，可以将被指定的属性的优先级提升为最高，!important 只能用于直接选中，不能用于间接选中，!important的格式为：

```
选择器{
  属性:值!important;
}
```

**5>**	 **优先级的权重**:当多个选择器混合在一起使用时，可以通过计算权重来判断谁的优先级最高。权重的计算规则：首先计算选择器中有多少个id，id多的选择器优先级最高；如果id个数一样，那么再看类名的个数，类名多个优先级高；如果类名个数一样，那么标签名个数多的优先级高；如果都一样，那么谁的位置靠后，取谁的值。


## CSS属性值
### 1.文本属性
#### 1.1 中文字间距 字母间距  单词间距
1）Letter-spacing用来设置中文字间距和字母间距。
2）word-spacing 用来设置英文单词的间距。

#### 1.2 text-align
`text-align：center`可以设置块级元素内文本和图片的水平居中
**注：内联元素之间的间距是由于换行导致的。**

#### 1.3 font
##### 1.3.1 font字体大小单位
font属性简写至少要包含 font-family 和font-size属性。如：font：12px “微软雅黑”;
Em值的大小是以当前文档中font-size的大小为参考点的，果font-size为16px，则1em = 16px，如果font-size为20px则1em = 20px。
特殊情况：当给font-size取值以em为单位时，则此时计算的标准是以父元素font-size为基础的。如下：

```
/*css:*/
<style>
  p{font-size:14px}
  span{font-size:0.8em;}
</style>

/*html:*/
  <p>以这个<span>例子</span></p>

```

##### 1.3.2 中文英文单独设置字体
  中文字体里边都包含了英文，英文字体里边没有包含中文，也就是说中文字体可以处理英文，而英文字体不能处理中文，所以如果想要中英文分别单独设置字体，需要采用以下格式：
Font—family:”Times New Roman”,”微软雅黑”,将英文字体写在前边，中文字体写在后边作为备选方案。
常用字体 中文：宋体/黑体/微软雅黑 英文：Times New Roman / Arial

#### 1.4 文本垂直居中
文字在行高中默认是垂直居中的，我们经常将盒子的高度和行高设置一样，那么这样就可以保证单行文字在盒子中是垂直居中的，简而言之：要想单行文字在盒子中垂直居中，那么只需要设置line-height为盒子的height值即可。

##### 1.4.1 单行文本的垂直居中
通过设置父元素的height和line-height高度一致来实现，(height该元素的高度，line-height：顾名思义，行高 指在文本中，行与行基线间的距离)，line-height与font-size的计算值之差，在css中称为行间距，分为两半，分别加到一个文本行内容的顶部和底部。

##### 1.4.2 多行文本及图片的垂直居中
**方法一：**
使用插入 table  (包括tbody、tr、td)标签，同时设置 vertical-align：middle。
css 中有一个用于竖直居中的属性 vertical-align，在父元素设置此样式时，会对inline-block类型的子元素都有用。下面看一下例子：

```
<body>
	<table>
		<tbody>
			<tr>
				<td class="wrap">
					<div>
					    <p>看我是否可以居中。</p>
					</div>
		 	   </td>
			</tr>
		</tbody>
	</table>
</body>
```

方法二：

```
/*Html*/
<div class="container">
        <p>看我是否可以居中。</p>
        <p>看我是否可以居中。</p>
        <p>看我是否可以居中。</p>
</div>
/*css代码*/
<style>
.container{
    height:300px;
    background:#ccc;
    display:table-cell;/*IE8以上及Chrome、Firefox*/
    vertical-align:middle;/*IE8以上及Chrome、Firefox*/
 }
```

#### 1.5 文本在容器中自动换行
`word-break:break-all;` 例如div宽200px，它的内容就会到200px自动换行，如果该行末端有个英文单词很长（congratulation等），它会把单词截断，变成该行末端为conra(congratulation的前端部分)，下一行为tulation（conguatulation）的后端部分了。

 `word-wrap:break-word;` 例子与上面一样，但区别就是它会把congratulation整个单词看成一个整体，如果该行末端宽度不够显示整个单词，它会自动把整个单词放到下一行，而不会把单词截断掉的。

### 2. background
`background-image:url();`设置元素背景图片

`background-repeat`: repeat(默认) repeat-x repeat-y no-repeat

`background-position:`水平方向 垂直方向;有两种取值方式，分别为具体的方位名词和像素如下：
具体的方位名词：水平方向(left center right),垂直方向(top center bottom)
具体的像素:浏览器的XY坐标系，X轴向右为正，Y轴向下为正。

`background-attachment:fixed`(不会随着滚动条滚动)、 scroll(默认取值)

**背景属性缩写的格式:background:background-color  background-image  background-repeat background-attachment  Backgroud-position**

### 3.CSS Reset
在实际项目开发中我们经常需要清空浏览器给元素设置的默认值，常见的比如margin padding等，在百度中查找YUI CSS Reset或者输入网址:
**http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css**
复制其中的内容，粘贴进我们项目的reset.css文件即可。

### 4.盒子模型
#### 4.1 box-sizing
盒子元素的宽度 = border-left+padding-left+content-width+padding-right+border-right
盒子元素的高度 =border-top+padding-top+content-height+padding-bottom+border-bottom
因此假如一个DIV的初始大小为100px*100px，那么加入border或者padding会改变盒子元素自身的大小，从而影响整个网页的布局，如果需要盒子的宽高保持不变，那么需要相应的减少内容的大小，我们可以通过设置属性：
`box-sizing:border-box;`,让其自动适应，保持宽高不变。

#### 4.2 margin
Margin穿透现象：如果两个盒子是嵌套关系，那么设置内部盒子的margin-top值，外部盒子的margin-top值会被改变，这种情况我们称之为margin穿透现象。解决办法有两种：
**1)**  给外边的盒子设置边框。
**2)**	 控制嵌套关系盒子之间的距离，首先应该考虑外边盒子的padding属性，其次考虑内层盒子的margin属性。
**3)**  `overflow:hidden;`

#### 4.3 块级元素水平居中
在嵌套关系的盒子中，我们可以通过设置内层盒子的`margin:0 auto;`让内层盒子在外边的盒子水平居中，margin的auto取值只对水平方向上有效，对垂直方向上是无效的。

### 5.浮动流
**1>** 浮动流不区分 块级元素/行内元素/行内块级元素，无论块级元素/行内元素/行内块级元素都可以水平排版。
**2>** **浮动流中无论块级元素/行内元素/行内块级元素都可以设置宽高。**
**3>** **当元素没有设置宽度值，而设置了浮动属性，元素的宽度随内容的变化而变化。**	
**4>**设置浮动后，盒子的margin属性不会失效。
**5>** 浮动元素贴靠现象
如果父元素的宽度能够显示所有浮动元素, 那么浮动的元素会并排显示; 如果父元素的宽度不能显示所有浮动元素, 那么会从最后一个元开始往前贴靠, 如果贴靠了前面所有浮动元素之后都不能显示, 最终会贴靠到父元素的左边或者右边。
**6>**浮动元素字围现象
浮动元素不会挡住没有浮动元素中的文字, 没有浮动的文字会自动给浮动的元素让位置,这个就是浮动元素字围现象。

### 6.清除浮动
**方式一：**

```
.box1::after{
  Content:""
  Display:block;
  Height:0;
  Visibility:hidden;
  Clear:both;
}
/*这种方式在IE6中显示不正常，需要加入额外的属性*/
.box1{
  *zoom:1;
}

```

**方式二:**

    overflow:hidden;
**注：Overflow:hidden属性的作用有以下几点：**
        **1.**将超出标签范围的内容才减掉。
        **2.**清除浮动。内部盒子浮动后，外部盒子的高度无法被撑起，会缩成一条，这时候对父元素使用clear：both是无法清除浮动的影响的，需要设置overflow：hidden才行。
       **3**.外部盒子设置overflow：hidden；保证了内部盒子在设置了margin-top属性后外部盒子的margin-top不会发生变化。

### 7.定位流
定位流分为：相对定位、绝对定位、固定定位、静态定位四种类型。

#### 7.1 相对定位
相对定位就是相对于自己以前在标准路中的位置作为参考点进行移动，语法如下:
```
           position：relative；
           Top:
           Bottom:
           Left:
           Right:
```
**1>**	相对定位不会脱离标准流，会继续在标准流中占用一份空间。
**2>**在相对定位中同一个方向上的定位属性只能使用一个。
**3>**	由于相对定位是不脱离标准流的，所以相对定位中区分块级 行内 行内块级元素。
**4>**给设置相对定位的元素设置margin属性，是给元素以前的位置设置margin，并不是给定位之后的元素设置margin。

#### 7.2 绝对定位

**1>**绝对定位的元素是脱离标准流的
**2>**绝对定位中是不区分行内 块级 行内块级元素
**3>**参考点：默认情况下所有的绝对定位元素，无论是否有祖先元素，对会以body 作为参考点；
  &nbsp;  &nbsp; &nbsp;      a. 如果一个绝对定位有祖先元素，并且这个祖先元素也是定位流，并且这个定位流只能是：绝对定位、相对定位、固定定位。那么这个绝对定位的元素会以这个祖先元素作为参考点。
   &nbsp;  &nbsp; &nbsp;      b. 如果绝对定位有多个祖先元素，并且多个祖先元素均为定位流，那么这个绝对定位的元素会以离他最近的元素为参考点。
**4>**如果一个绝对定位的元素以body为参考点，其实是以网页首屏宽度为参考点，而不是以整个网页的宽度和高度为参考点。
**5>** 绝对定位的元素会忽略祖先元素的padding值。

#### 7.3 子绝父相
这是通常情况下设置绝对定位元素的方式，将要设置绝对定位元素的父元素设置为相对定位，然后自身设置为绝对定位，那么久会以父元素作为参照点进行偏移，俗称“子绝父相”.
如何让绝对定位的元素在父元素中水平居中，只需要设置绝对定位元素的left：50%，然后再设置绝对定位的元素margin-left，负的元素宽度的一半px; 

#### 7.4 不定宽块级元素水平居中
通过给父元素设置 float，然后给父元素设置 position:relative 和 left:50%，子元素设置 position:relative 和 left: -50% 来实现水平居中。如下：

```
/*Html代码*/
<body>
	<div class="container">
	    <ul>
	        <li><a href="#">1</a></li>
	        <li><a href="#">2</a></li>
	        <li><a href="#">3</a></li>
	    </ul>
	</div>
</body>
/*css代码*/
<style>
	.container{
	    float:left;
	    position:relative;
	    left:50%
	 }
	
	.container ul{
	    list-style:none;
	    margin:0;
	    padding:0;
	    
	    position:relative;
	    left:-50%;
	}
	.container li{float:left;display:inline;margin-right:8px;}
</style>

```

#### 7.3 固定定位
 固定定位：可以让某个盒子不随着网页滚动条而滚动。
固定定位的元素是脱离标准流的，不会占用标准流的空间，固定定位和绝对定位一样不区分行内/块级 /行内块级元素。
**注：IE6不支持position：fixed.**

#### 7.4 z-index
默认情况下，所有设置了position属性的元素都有一个Z-index属性，默认取值为0，z-index属性的作用是专门用于控制定位流元素的覆盖关系的。

1>默认情况下定位流的元素会盖住标准流的元素。
2>定位里的元素后面编写的会盖住前面编写的元素。
3>如果定位流的元素设置了z-index属性，那么谁的z-index属性大，谁就显示在上面。


**从父现象：**
如果两个元素的父元素都没有设置z-index属性，那么谁的z-index属性大就显示在上面

如果两个元素的父元素设置了z-index属性，那么他们自身的z-index属性将失效。

#### 7.5 隐形改变display类型 
当元素设置一下两个句之一：
1.	position:ablsolute
2.	float:left或right
简单来说，只要html代码中出现以上两句之一，元素的display显示类型就自动变为display：inline-block的方式，当然就可以设置元素的width和height了，**且默认宽度不占满父元素**。

### 8 .a标签伪类选择器
:link 修改从未被访问过状态下的样式
:visited 修改被访问过的状态下的样式
:active 修改鼠标长按状态下的样式
:hover 修改鼠标悬停在a标签上的状态

注意点：a标签的伪类选择器一起出现，那么有严格的顺序要求，必须按照这个顺序：
***link  visited  hover  active***


### 9.CSS3圆角
Border-radius是向元素添加圆角边框。使用方式：
`Border-radius:10px;`   /*所有角都使用半径为10px的圆角*/
`Border-radius:5px 4px 3px 2px;`四个半径值分别对应左上、右上、右下、左下

**1.实心上半圆**

```
div{
    height:50px;/*是width的一半*/
    width:100px;
    background:#9da;
    border-radius:50px 50px 0 0;/*半径至少设置为height的值*/
}
```



**2.实心圆**
```
div{
    height:100px;/*与width设置一致*/
    width:100px;
    background:#9da;
    border-radius:50px;/*四个圆角值都设置为宽度或高度值的一半*/
 }
```

### 10.盒子边框阴影
Box-shadow是向盒子添加阴影，支持添加一个或多个，如果需要添加多个阴影只需要用逗号隔开即可。语法：

```
Box-shadow:X轴偏移量 Y轴偏移量 [阴影模糊半径] [阴影扩展半径] [阴影颜色] [投影方式];
```

**X轴偏移量：** 必选参数，值可以正负，正值表示向右偏移，负值向左
**Y轴偏移量：** 必选参数，值可以正负，正值表示向下偏移，负值向上。
**阴影模糊半径：** 可选参数，值只能为正，如果值为0，代表阴影没有模糊效果。
**阴影扩展半径：** 可选参数，值可以为正负，越大阴影面积越大。
**投射方式：** 其中投影方式默认为外阴影方式，可以设置为inset让其显示为内部阴影。


### 11. 实现双列布局一列固定宽度，另外一列自适应的方式。

```
/*HTML*/
<div class="main">
    <div class="right">right</div>
    <div class="left">left</div>
</div>

/*CSS*/
.main{
	width:100%;
	height:300px;
	background:darkred;
	position:relative;
}

.left{
	 width:200px;
	 height:300px;
	 background:blue;
	 position:absolute;
	 left:0px;
	 top:0px;
}

.right{
	margin-left:210px;
	height:300px;
	background:orange;
}

```

















