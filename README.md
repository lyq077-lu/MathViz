# MathViz - 数学可视化学习平台

通过交互式动画，让抽象的数学概念变得直观可见。

## 🚀 已完成的功能

### M1: 代数与函数 (Algebra & Functions)

#### ✅ 三角函数
- 单位圆动画演示
- 正弦/余弦实时计算
- 角度滑块控制
- 正弦波形图联动
- 自动播放模式

#### ✅ 线性函数
- y = kx + b 参数调节
- 斜率可视化（斜率三角形）
- 截距实时显示
- 关键点计算

#### ✅ 二次函数
- y = ax² + bx + c 参数调节
- 抛物线实时绘制
- 顶点、对称轴、零点显示
- 顶点式自动转换

#### ✅ 复数
- 复平面可视化
- 实部/虚部调节
- 模长和幅角显示
- 直角坐标与极坐标转换

### M2: 几何探索 (Geometry Explorer)

#### ✅ 勾股定理
- 拼图动画证明
- 常用勾股数预设
- 面积计算展示

#### ✅ 圆的方程
- 标准方程 (x-h)² + (y-k)² = r²
- 圆心、半径实时控制
- 点与圆位置关系判断

#### ✅ 分形几何
- 谢尔宾斯基三角形
- 递归生成动画
- 自相似性展示

### M3: 微积分入门 (Calculus Intro)

#### ✅ 极限概念
- ε-δ 定义可视化
- 函数趋近过程演示
- 邻域区间展示

#### ✅ 导数几何
- 切线与割线对比
- 差商逼近动画
- 导数定义演示

#### ✅ 黎曼和
- 矩形堆积逼近积分
- 动态分区演示
- 误差收敛可视化

#### ✅ 微分方程
- 向量场可视化
- 轨迹追踪动画
- 解曲线绘制

#### ⏳ 更多微积分内容 - 待开发

### M4: 概率统计 (Probability & Statistics)

#### ✅ 大数定律
- 掷硬币模拟实验
- 频率稳定性演示
- 趋近于理论概率

#### ✅ 正态分布
- 钟形曲线生成过程
- Box-Muller变换采样
- 中心极限定理演示

#### ✅ 贝叶斯定理
- 先验概率可视化
- 似然与假阳性调节
- 后验概率圆环图
- 实时概率更新

#### ⏳ 更多概率内容 - 待开发

## 🛠️ 技术栈

| 技术 | 用途 | 许可证 |
|------|------|--------|
| React 19 | 前端框架 | MIT |
| TypeScript | 类型安全 | Apache 2.0 |
| Vite | 构建工具 | MIT |
| Tailwind CSS | 样式 | MIT |
| Framer Motion | 动画 | MIT |
| Lucide React | 图标 | ISC |

## 📁 项目结构

按照[产品需求文档(PRD)](./docs/PRD.md)的四大模块分类组织，采用一二级目录结构：

```
math-animations/
├── docs/
│   └── PRD.md                    # 产品需求文档
├── src/
│   ├── modules/                  # 功能模块目录
│   │   ├── functions/            # M1: 函数可视化
│   │   │   ├── trigonometry/     # 三角函数
│   │   │   │   ├── UnitCircle.tsx
│   │   │   │   └── index.ts
│   │   │   ├── linear/           # 线性函数
│   │   │   │   ├── LinearFunction.tsx
│   │   │   │   └── index.ts
│   │   │   ├── quadratic/        # 二次函数
│   │   │   │   ├── QuadraticFunction.tsx
│   │   │   │   └── index.ts
│   │   │   ├── exponential/      # 指数对数 (预留)
│   │   │   └── parametric/       # 参数方程 (预留)
│   │   ├── geometry/             # M2: 几何探索
│   │   │   ├── triangles/        # 三角形
│   │   │   │   ├── PythagoreanTheorem.tsx
│   │   │   │   └── index.ts
│   │   │   ├── circles/          # 圆
│   │   │   │   ├── CircleEquation.tsx
│   │   │   │   └── index.ts
│   │   │   ├── 3d/               # 立体几何 (预留)
│   │   │   └── fractals/         # 分形几何 (预留)
│   │   ├── calculus/             # M3: 微积分入门 (预留)
│   │   │   ├── limits/           # 极限概念
│   │   │   ├── derivatives/      # 导数几何
│   │   │   ├── integrals/        # 积分概念
│   │   │   └── diff-equations/   # 微分方程
│   │   └── probability/          # M4: 概率统计 (预留)
│   │       ├── laws/             # 大数定律
│   │       ├── distributions/    # 概率分布
│   │       └── bayesian/         # 贝叶斯定理
│   ├── contexts/
│   │   └── AnimationContext.tsx  # 动画状态管理
│   ├── App.tsx                   # 主应用
│   ├── main.tsx                  # 入口
│   └── index.css                 # 样式
├── package.json
└── README.md
```

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 📄 开源许可

本项目采用 MIT 许可证，所有依赖均为开源免费。

---

**MathViz** © 2026 - 让数学看得见