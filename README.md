# MathViz - 数学可视化学习平台

通过交互式动画，让抽象的数学概念变得直观可见。

## 🚀 已完成的功能

### ✅ 三角函数可视化
- 单位圆动画演示
- 正弦/余弦实时计算
- 角度滑块控制
- 正弦波形图联动
- 自动播放模式

### ✅ 线性函数探索
- y = kx + b 参数调节
- 斜率可视化（斜率三角形）
- 截距实时显示
- 关键点计算

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

```
math-animations/
├── docs/
│   └── PRD.md           # 产品需求文档
├── src/
│   ├── components/
│   │   ├── UnitCircle.tsx       # 三角函数组件
│   │   └── LinearFunction.tsx   # 线性函数组件
│   ├── App.tsx          # 主应用
│   ├── main.tsx         # 入口
│   └── index.css        # 样式
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