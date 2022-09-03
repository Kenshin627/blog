---
title: 图形学的数学基础（十二）：mvp变换
date: 2022-09-03 10:55:40
tags:
- Computer Graphic
- Math
mathjax: true
categories:
- Computer Graphic
- Math
- 计算机图形学的数学基础
---

# 图形学的数学基础（十二）：mvp变换
图形系统的一个重要任务是将三维空间中的模型映射到二维平面上（以像素为单位），这是一个复杂的过程，取决于许多因素，包括但不限于相机的位置，方向，投影的类型（正交/透视），fov，和viewport宽高，对于所有复杂的矩阵变换，最好的做法是将其分解为几个更简单的矩阵乘积。大多数图形系统通过使用四个转换序列来实现m,以openGL为例：

![mvp变换](图形学的数学基础（十一）：mvp变换/1.png)

1. **modelMatrix**：将视图从模型空间转换为世界空间。直白的说就是将模型摆放到世界坐标空间的何处。这一步确立了世界空间中各模型的相对布局，摆放位置。
   
2. **viewMatrix**：将视图从世界空间转换到相机空间。简单来讲就是：我们从何处，在什么角度，朝什么方向观察我们的世界。
   
3. **Projection**：将视图从相机空间映射到$[-１,１]^３$，的单位立方体中，为了下一步viewport变换做准备
   
4. **viewport**: 将视图从单位立方体映射到所需的屏幕空间（screenSpace），取决于输出图像的大小和位置。
   

![mvp变换](图形学的数学基础（十一）：mvp变换/2.png)

## view Transform

现实生活中，如果相机和所有物体一起移动（相对位置关系不变），则拍出来的照片也都是一样的。根据这个原理我们得出：将相机移动到原点，朝向-z方向，构造出一个变换矩阵$\textbf{M}_{view}$，其他物体随着相机一起移动（应用$\textbf{M}_{view}$）。即可完成viewTransform。如何构造$\textbf{M}_{view}$？将视图从世界空间转换到相机空间？首先需要定义相机参数：

- 位置（eye Position）：$\mathbf{e}$
- 观测方向（gaze Direction）：$\vec{g}$
- 向上方向（up Direction）：$\vec{t}$

根据这些信息，我们可以构造一个以$\mathbf{e}$为原点的uvw标准正交基。

- 矢量正交化
- 将$\mathbf{e}$移动到原点
- 旋转$\vec{g}$ 到-z方向
- 旋转$\vec{t}$到y方向
- 旋转$\vec{g}\times \vec{t}$到x方向。
  
因此我们可以将$\textbf{M}_{view}$拆解成平移和旋转两个部分.首先需要对相机参数的矢量进行正交化。

$\textbf{M}_{view}$ = $\textbf{R}_{view}$$\textbf{T}_{view}$

![mvp变换](图形学的数学基础（十一）：mvp变换/3.png)

### 正交化

根据前边章节讲过的矢量叉乘正交化的方法，可以计算出：

$\hat{w} = -\dfrac{\vec{g}}{||g||}$

$\hat{u} = \dfrac{\mathbf{t}\times \mathbf{w}}{||\mathbf{t}\times \mathbf{w}||}$

$\hat{v} = \mathbf{w}\times \mathbf{u}$

### 平移矩阵

$\textbf{T}_{view}$ = $\begin{bmatrix}
    1&0&0&-x_{e}\\ 
    0&1&0&-y_{e}\\ 
    0&0&1&-z_{e}\\ 
    0&0&0&1\\ 
\end{bmatrix}$


### 旋转矩阵

旋转矩阵不好写，但是我们可以反过来思考这个问题，将x（1，0，0），y（0，1，0），z（0，0，1）分别旋转到$\hat{u}$,$\hat{v}$, $-\hat{w}$是很好写的，由于这两个矩阵互为逆矩阵，根据旋转矩阵的性质，旋转矩阵都是正交的，而正交矩阵的逆矩阵等于其转置。所以我们可以先求$\textbf{R}_{view}$的逆矩阵，然后将其转置，即可得到$\textbf{R}_{view}$：

$\textbf{R}_{view}^{-1}$ = $\begin{bmatrix}
    x_u&x_v&x_w&0\\ 
    y_u&y_v&y_w&0\\ 
    z_u&z_v&z_w&0\\ 
    0&0&0&1\\ 
\end{bmatrix}$


$\textbf{R}_{view}$ = $\begin{bmatrix}
    x_u&y_u&z_u&0\\ 
    x_v&y_v&z_v&0\\ 
    x_w&y_w&z_w&0\\ 
    0&0&0&1\\ 
\end{bmatrix}$

### 合到一起

$\textbf{M}_{view} = \textbf{R}_{view}\textbf{T}_{view} = \begin{bmatrix}
    x_u&y_u&z_u&0\\ 
    x_v&y_v&z_v&0\\ 
    x_w&y_w&z_w&0\\ 
    0&0&0&1\\ 
\end{bmatrix}\begin{bmatrix}
    1&0&0&-x_{e}\\ 
    0&1&0&-y_{e}\\ 
    0&0&1&-z_{e}\\ 
    0&0&0&1\\ 
\end{bmatrix}$


## 参考
[《3D数学基础》图形和游戏开发(第二版)](https://item.jd.com/12659881.html)

[GAMES101 -现代计算机图形学入门-闫令琪](https://www.bilibili.com/video/BV1X7411F744?p=2&vd_source=b3b87210888ec87be647603921054a36)

[fundamentals-of-computer-graphics](https://item.jd.com/10037953813770.html)













