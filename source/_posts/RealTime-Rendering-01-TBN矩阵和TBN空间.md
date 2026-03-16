---
title: RealTime Rendering01-TBN矩阵和TBN空间
date: 2025-03-15 17:05:08
tags:
- Computer Graphic
- Math
mathjax: true
categories:
- Computer Graphic
- Math
---

# TBN矩阵和TBN空间

法线贴图采样得到的法线往往在切线空间，也就是顶点的“局部空间”，需要乘以TBN矩阵将法线从切线空间转换到世界空间下才能进行光照计算，而顶点中一般仅提供TBN中的T和N，Bitangent需要经过施密特正交化计算得出：

```c++
void main()
{
  vec3 T = normalize(vec3(model * vec4(aTangent, 0.0)));
  vec3 N = normalize(vec3(model * vec4(aNormal, 0.0)));
  T = normalize(T - dot(T, N) * N);
  vec3 B = cross(N, T);
  mat3 TBN = mat3(T, B, N);
}
```
