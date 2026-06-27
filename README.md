# LinguaFlow - 多语种在线学习平台

一款支持多语种学习的在线教育平台，涵盖英语、日语、韩语等主流语言，打造沉浸式语言学习体验。

## ✨ 功能特性

### 📚 分级课程体系
- 支持英语、日语、韩语三种语言
- 每种语言 6 个级别（A1 - C2）
- 每级别包含多个学习单元，循序渐进

### 🎯 互动式学习模块
- **单词记忆** - 闪卡翻转学习，智能发音，例句展示
- **语法练习** - 选择题和填空题，即时反馈和解析
- **口语跟读** - 录音对比，智能评分系统
- **听力训练** - 音频播放，逐句听写练习

### 📊 学习进度追踪
- 个人仪表盘显示学习统计
- 连续学习天数追踪
- XP 积分系统和等级成长

### 👤 用户系统
- 邮箱注册和登录
- 演示账号快速体验
- 个人资料管理

### 🧠 个性化学习
- 根据能力推荐课程
- 智能学习路径规划
- 进度自适应调整

### 🏆 社区与成就
- 学习社区发帖互动
- 成就徽章系统
- 排行榜激励

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **状态管理**: Zustand
- **路由**: React Router v7
- **图标**: Lucide React

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📦 部署到 GitHub Pages

### 方式一：GitHub Actions 自动部署（推荐）

1. 在 GitHub 创建仓库
2. 推送代码到 `main` 分支
3. 在仓库设置中启用 GitHub Pages，选择 "GitHub Actions" 作为来源
4. 每次推送到 `main` 分支会自动触发部署

### 方式二：手动部署

```bash
npm run build
npm run deploy
```

## 📁 项目结构

```
src/
├── components/          # 组件
│   ├── common/         # 通用组件
│   ├── layout/         # 布局组件
│   └── learning/       # 学习模块组件
├── data/               # 数据和模拟数据
├── hooks/              # 自定义 Hooks
├── pages/              # 页面组件
├── store/              # 状态管理
├── App.tsx             # 应用入口组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
