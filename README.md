# dsh-mermaid-fence

[中文](README.zh.md) | English

A [DeepSeek Harness](https://github.com/deepseek-ai) plugin that renders **Mermaid code blocks in chat answers as diagrams** — flowcharts, sequence diagrams, class diagrams, and more, drawn inline instead of shown as source code.

## How it works

Chat's Markdown renderer dispatches fenced code blocks by language through the `conversation.chat.markdown.fence` slot — the same pathway the built-in math and diff layers use. This plugin registers a `mermaid` layer:

- While a fence is still streaming, or if the diagram fails to parse, the plain code block stays visible (same strategy as the built-in math layer).
- Once settled, the block is replaced by the rendered SVG.
- Mermaid 11 is bundled into the client module — no CDN or network dependency at render time.
- Follows your system light/dark color scheme.

## Install

From a plugin market index that lists this bundle, or directly with the Plugins page → **Add plugin** pointing at this repository, or:

```sh
dsh plugin install dsh-mermaid-fence
```

Refresh the Web page after installing.

## Build from source

```sh
npm install   # mermaid + esbuild
npm run build # bundles build/entry.js into client.js
```

## License

MIT
