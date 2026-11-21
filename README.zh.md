# dsh-mermaid-fence

中文 | [English](README.md)

一个 [DeepSeek Harness](https://github.com/deepseek-ai) 插件：把聊天回答中的 **Mermaid 代码块直接渲染成图形**——流程图、时序图、类图等在对话中原地成图，而不是显示为源代码。

## 工作原理

聊天的 Markdown 渲染器按语言把代码块分发到 `conversation.chat.markdown.fence` 插槽——与内置的数学公式、diff 图层走同一条通路。本插件注册了一个 `mermaid` 图层：

- 代码块仍在流式输出、或图解析失败时，保持显示原始代码块（与内置数学图层同款策略）
- 输出稳定后，代码块替换为渲染出的 SVG
- Mermaid 11 已打包进客户端模块，渲染时无 CDN、无网络依赖
- 自动跟随系统的浅色/深色配色

## 安装

从收录本插件的插件市场索引安装，或在插件页 **Add plugin** 直接指向本仓库。安装后刷新页面。

## 从源码构建

```sh
npm install   # mermaid + esbuild
npm run build # 将 build/entry.js 打包为 client.js
```

## 许可证

MIT
