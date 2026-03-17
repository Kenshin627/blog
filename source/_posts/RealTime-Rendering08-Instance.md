---
title: RealTime-Rendering08-Instance
date: 2025-06-20 9:36:52
tags:
- Computer Graphic
- Realtime Rendering
- Performance
mathjax: true
categories:
- Computer Graphic
- Realtime Rendering
- Performance
---

# Instance
实例化这项技术能够让我们通过依次drawcall来绘制多个物体，来节省每次绘制物体时CPU -> GPU的通信开销，它只需要一次drwacall即可。使用实例化渲染，只需要将glDrawArrays和glDrawElements的渲染调用分别改为glDrawArraysInstanced和glDrawElementsInstanced就可以了。这些渲染函数的实例化版本需要一个额外的参数，即绘制的实例数量(Instance Count)，它能够设置需要渲染的实例个数。这样只需要将必须的数据发送到GPU一次，然后使用一次drawcall用告诉GPU它应该如何绘制这些实例。GPU将会直接渲染这些实例，而不用频繁与CPU进行通信。

## 实例化对象属性传递的两种方式

### UBO or SSBO
在使用实例化渲染调用时，gl_InstanceID会从0开始，在每个实例被渲染时递增1。比如说正在渲染的第43个实例，那么顶点着色器中它的gl_InstanceID将会是42。因为每个实例都有唯一的ID，我们可以建立一个数组，将ID与位置值对应起来，将每个实例放置在世界的不同位置。

```glsl
#version 460 core
layout (location = 0) in vec2 aPos;
layout (location = 1) in vec3 aColor;

out vec3 fColor;

uniform vec2 offsets[100];

void main()
{
    vec2 offset = offsets[gl_InstanceID];
    gl_Position = vec4(aPos + offset, 0.0, 1.0);
    fColor = aColor;
}
```
将实例属性统一写入UBO, 然后shader中通过gl_InstanceID来访问各自实例属性.

### InstancedArray
InstancedArray是将实例属性做为顶点属性基于inputAssembly的方式输入给顶点着色器.
使用顶点属性时，顶点着色器的每次运行都会让GLSL获取新一组适用于当前顶点的属性。而将顶点属性定义为一个InstancedArray时，顶点着色器就只需要对每个实例而不是每个顶点更新顶点属性的内容了。这允许逐顶点的数据使用普通的顶点属性，而对逐实例的数据使用实例化数组。这就要求我们对不同类型的顶点属性区分更新频率.openGL中提供了一个函数glVertexAttribDivisor。这个函数告诉了OpenGL该什么时候更新顶点属性的内容至新一组数据。它的第一个参数是需要的顶点属性，第二个参数是属性除数(Attribute Divisor)。默认情况下，属性除数是0，告诉OpenGL我们需要在顶点着色器的每次迭代时更新顶点属性。将它设置为1时，我们告诉OpenGL我们希望在渲染一个新实例的时候更新顶点属性。而设置为2时，我们希望每2个实例更新一次属性，以此类推。

```c++
glEnableVertexAttribArray(2);
glBindBuffer(GL_ARRAY_BUFFER, instanceVBO);
glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, 2 * sizeof(float), (void*)0);
glBindBuffer(GL_ARRAY_BUFFER, 0);   
glVertexAttribDivisor(2, 1);
```

```glsl
#version 330 core
layout (location = 0) in vec2 aPos;
layout (location = 1) in vec3 aColor;
layout (location = 2) in vec2 aOffset;

out vec3 fColor;

void main()
{
  gl_Position = vec4(aPos + aOffset, 0.0, 1.0);
  fColor = aColor;
}
```

