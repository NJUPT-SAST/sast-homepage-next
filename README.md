# SAST Homepage Next

南京邮电大学大学生科学技术协会（SAST）官网重构项目，基于 Next.js App Router 实现。  

## 项目概览

当前站点已包含以下页面：

- `/` 首页
- `/about` 关于页
- `/activities` 活动页
- `/departments` 部门页
- `app/not-found.tsx` 自定义 404 页面

待完成内容：

- `/members` 友链展示页（计划中）

站点内容主要围绕：

- SAST 社团介绍
- 日常公开活动与照片墙
- 部门结构与招新流程
- 招新群与联系信息

## 技术栈

- Next.js 16.2.6
- React 19
- TypeScript
- App Router
- CSS Modules
- ESLint 9

补充说明：

- 项目启用了 `resolveJsonModule`，因此页面文案可以直接从 `content/*.json` 导入。
- 路径别名 `@/*` 指向仓库根目录。
- PostCSS 已配置，但当前样式实现以 CSS Modules 为主。

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

运行 ESLint：

```bash
npm run lint
```

默认本地访问地址：

- `http://localhost:3000`
- `http://127.0.0.1:3000`

开发环境额外允许的来源见 [next.config.ts](./next.config.ts)：

- `localhost`
- `127.0.0.1`
- `192.168.101.*`

## 目录结构

```text
sast-homepage-next/
|
├───app/
|   ├───page.tsx                 首页
|   ├───about/page.tsx           关于页
|   ├───activities/page.tsx      活动页
|   ├───departments/page.tsx     部门页
|   └───not-found.tsx            404 页入口
|
├───components/
|   ├───home/                    首页相关组件
|   ├───about/                   关于页相关组件
|   ├───activities/              活动页相关组件
|   ├───departments/             部门页相关组件
|   ├───not-found/               404 页面内容组件
|   ├───layout/                  Dock、页脚等全站骨架
|   └───shared/                  跨页面复用背景与通用展示组件
|
├───content/
|   ├───home.json
|   ├───about.json
|   ├───activities.json
|   └───departments.json
|
└───public/
    ├───home/                    首页插画、图标、标题素材
    ├───pictures/                活动照片墙图片
    └───share/                   跨页面复用素材（logo、背景、二维码等）
```

## 页面结构

### 首页 `/`

由以下部分组成：

- `HeroSection`
- `IntroduceSection`
- `DataSection`

相关文件：

- [app/page.tsx](./app/page.tsx)
- [components/home](./components/home)

### 关于页 `/about`

由以下部分组成：

- `AboutHeroSection`
- `AboutActivitiesSection`
- `AboutStructureSection`

相关文件：

- [app/about/page.tsx](./app/about/page.tsx)
- [components/about](./components/about)

### 活动页 `/activities`

由以下部分组成：

- `ActivitiesRecentSection`
- `ActivitiesGallerySection`

相关文件：

- [app/activities/page.tsx](./app/activities/page.tsx)
- [components/activities](./components/activities)

### 部门页 `/departments`

由以下部分组成：

- `DepartmentsHeroSection`
- `DepartmentsDetailSection`
- `DepartmentsRecruitmentSection`
- `DepartmentsContactSection`
- 共用背景 `Backgroud2`

其中招新流程采用单独的可视化时间轴组件：

- [components/departments/recruitment-timeline.tsx](./components/departments/recruitment-timeline.tsx)

### 404 页面

由以下部分组成：

- 全站 `Dock`
- `NotFoundSection`
- 全站 `SiteFooter`

相关文件：

- [app/not-found.tsx](./app/not-found.tsx)
- [components/not-found](./components/not-found)

## 内容组织方式

项目采用“文案与展示配置分离”的方式维护内容。

### 1. 文案内容放在 `content/*.json`

这些文件承载页面正文、标题、卡片文案、链接地址等高频改动内容：

- [content/home.json](./content/home.json)
- [content/about.json](./content/about.json)
- [content/activities.json](./content/activities.json)
- [content/departments.json](./content/departments.json)

适合放进去的内容：

- 标题、副标题、说明文字
- 卡片内容
- 按钮文字与跳转地址
- 招新流程、部门说明、活动信息

### 2. 展示元数据保留在组件附近

不是所有内容都适合进 `content`。  
像图片地址、图标颜色、轮播尺寸、视觉 tone 这类更偏展示层的配置，仍然会放在组件附近维护。

例如：

- [components/home/data/homepage-data.ts](./components/home/data/homepage-data.ts)

这个文件负责把：

- `content/home.json` 中的文案
- 轮播图片、颜色、图标等展示元数据

组合成组件最终需要的数据结构。

这样做的原因是：

- 文案编辑更集中
- 视觉配置不必硬塞进 JSON
- 组件消费的数据结构更稳定

## 样式约定

- 组件样式优先使用 CSS Modules
- 全站通用规则只放在 [app/globals.css](./app/globals.css)
- 当前整体风格以 `rem` 为主，保留少量基于背景场景的局部缩放变量
- 页面背景和装饰图形尽量复用 `components/shared/backgroud`

当前已存在的共享背景：

- `Backgroud1`：首页首屏 / 404 页等蓝绿色矩形背景
- `Backgroud2`：部门页招新与联系区背景

注意：

- 目录名是 `backgroud`，这是当前仓库既有命名，暂不改名

## 组件骨架

### Dock

全站顶部导航位于：

- [components/layout/dock/index.tsx](./components/layout/dock/index.tsx)

当前约定：

- 站内跳转使用 Next `Link`
- 移动端与桌面端共用同一组导航项

### SiteFooter

全站页脚位于：

- [components/layout/site-footer/index.tsx](./components/layout/site-footer/index.tsx)

页脚包含：

- 社团 logo
- 邮箱与地址
- QQ 二维码
- 版权信息

## 素材维护

如果只是替换视觉素材，通常只需要改 `public/` 下的文件，不必动组件逻辑。

常见素材位置：

- `public/share/logos`：logo
- `public/share/backgrounds`：共享背景图形
- `public/home`：首页专属素材
- `public/pictures`：活动照片墙图片
- `public/share/qr`：二维码

## 维护建议

如果你准备继续扩展这个项目，建议优先遵循以下原则：

- 先改 `content/*.json`，再考虑改组件
- 样式修改尽量保持在对应模块内，不做跨文件散改
- 站内跳转优先使用 `Link`
- 不要把纯展示配置和大段文案强行混在同一个地方
- 复用现有背景组件，避免每个页面各自重新造背景

如果要继续维护，最值得优先熟悉的文件是：

- [app/page.tsx](./app/page.tsx)
- [components/layout/dock/index.tsx](./components/layout/dock/index.tsx)
- [components/layout/site-footer/index.tsx](./components/layout/site-footer/index.tsx)
- [content/home.json](./content/home.json)
- [content/about.json](./content/about.json)
- [content/activities.json](./content/activities.json)
- [content/departments.json](./content/departments.json)

## 计划更新

- [ ] 新增成员展示页 `/members`，计划对接 SAST Link 用于展示个人名片
- [ ] 页面切换时动画效果
- [x] Dock栏高亮显示当前页面