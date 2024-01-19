# 基于React-Blog

```
.
│
├─public                // html 入口,以及一些图标和字体文件
│
└─src                   // 前端项目源码
   ├─assets             // 静态文件
   ├─components         // 公用组件
   ├─store              // redux 目录
   ├─pages              // 视图层
   ├─App.jsx            // 布局组件及路由
   ├─index.js           // 主入口文件
   └─...
└─package.json          // 项目配置 介绍
```

### 实现功能

- [x] 页面：主页 + 分类 + 文章详情页 + 写作页
- [x] 在线使用富文本写作并发表文章
- [x] 模糊搜索文章、修改、删除文章
- [x] 回到顶部、markdown 代码高亮

### 技术栈

前端 （基于 create-react-app 后的配置）

- react18 + redux + react-router
- react-quill.js(富文本)
- moment 日期格式化
- axios
- sass CSS 预处理器

### 后端 （自构建后台项目）

- express + express-Router
- mysql
- jwt
- multer 图片上传

![1](D:\桌面\1.jpg)

![2](D:\桌面\2.jpg)

![3](D:\桌面\3.jpg)

![4](D:\桌面\4.jpg)

