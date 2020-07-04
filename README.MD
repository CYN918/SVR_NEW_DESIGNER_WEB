### 狮圈儿项目介绍
&emsp;&emsp;狮圈儿(Zoocreater), 聚集设计师、摄影师、特效工程师、音乐工作者、短视频等各类创作者的内容创作平台。创意、分发、收益和社区一站式无缝连接，专注创作，轻松获取收益和荣誉！

### RUN
```bash
npm i
npm run serve
```

### BUILD
```bash
npm i
npm run build
```

### 编码规范
Vue代码编写勿必遵循[Vue规范指南](https://cn.vuejs.org/v2/style-guide/)

编写`javascript`、`html`、`css`代码时注意缩减问题

+ Vue组件
    + 编写组件时勿必遵循[Vue规范指南](https://cn.vuejs.org/v2/style-guide/)
    + 组件编写最佳实践可参考[iview](https://github.com/iview/iview)组件库
+ javascript
    + 方法和变量勿必驼峰命名，请勿中英文混合命名
    + 一个方法不宜超过一屏代码
+ html
+ css


### 项目结构
```
├── api
│   ├── apiUrl.js           # api接口地址
│   ├── apiUtil.js          # 将api转为方法
│   └── index.js            # 导出api
├── assets                  # 资源
│   ├── comm.js
│   ├── del.png
│   ├── icon_add_small.png
│   ├── icon_mt_usemt.png
│   ├── icon_view_stop_def_whit.png
│   ├── js
│   ├── ld.png
│   ├── logo.png
│   ├── qd.png
│   ├── sc_icon_delete.png
│   ├── sc_icon_pause.svg
│   ├── state.js
│   └── styles        
│       ├── define.scss     # 应用样式定义
│       ├── global.scss     # 全局样式
│       ├── index.scss      # 导出样式
│       └── reset-element-ui.scss   # 自定义饿了吗样式
├── common
│   ├── app.config.js       # 配置
│   ├── app.directives.js   # 全局指令
│   ├── app.filters.js      # 全局过滤器
│   ├── app.global.js       # 全局变量
│   ├── app.init.js         # 项目初始化
│   └── utils   # 工具方法
├── components
│   ├── ui                  # UI组件
│   └── widget              # 业务组件
├── pages
│   ├── aindex
│   └── index
└── routers                 # 路由

```

### 测试环境
+ [狮圈儿前端](http://dev-web-ndesigner.idatachain.cn/#/index  )
+ [狮圈儿运营后台](http://dev-web-ndesigner-admin.idatachain.cn/#/userManager/userBaseInfo)
