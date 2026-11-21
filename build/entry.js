/**
 * Client half of the Mermaid fence bundle.
 *
 * Registers a `mermaid` language layer into Chat's language-keyed Markdown
 * fence slot (`conversation.chat.markdown.fence`). While a fence streams or
 * fails to parse, the inner plain code block (children) stays visible — the
 * same strategy as the shipped math fence layer.
 */
import mermaid from 'mermaid'

window.__ModuleLoader__.load({
  id: '@local/dsh-mermaid-fence',
  factory(require) {
    const React = require('react')
    const { useState, useEffect, useRef, createElement: h } = React

    let seq = 0

    function pickTheme() {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
      } catch {
        return 'default'
      }
    }

    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: pickTheme() })

    /** Render a `mermaid` fence as an SVG diagram in place of the code block. */
    function MermaidFenceLayer({ lang, code, streaming, children }) {
      const [svg, setSvg] = useState(null)
      const [failed, setFailed] = useState(false)
      const alive = useRef(true)

      useEffect(() => {
        alive.current = true
        if (lang !== 'mermaid' || streaming) return undefined
        const id = `dsh-mermaid-${++seq}`
        mermaid
          .render(id, code)
          .then(result => { if (alive.current) setSvg(result.svg) })
          .catch(() => { if (alive.current) setFailed(true) })
        return () => { alive.current = false }
      }, [lang, code, streaming])

      if (lang !== 'mermaid' || streaming || failed || svg == null) return children
      return h(
        'div',
        {
          className: 'dsh-mermaid-fence',
          style: {
            padding: '12px',
            margin: '8px 0',
            borderRadius: '8px',
            overflowX: 'auto',
            textAlign: 'center',
          },
        },
        h('div', { dangerouslySetInnerHTML: { __html: svg } }),
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('conversation.chat.markdown.fence', () => ctx.slots.register({
          name: 'conversation.chat.markdown.fence',
          key: 'mermaid',
          id: '@local/dsh-mermaid-fence/fence/mermaid',
        }, MermaidFenceLayer))
      },
    }
  },
})
