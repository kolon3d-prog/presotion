import React, { useEffect, useState, useMemo, CSSProperties } from 'react';
import { useFragment } from '@presotion/core';

export interface CodeBlockProps {
  /** The code to display */
  children: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Color theme. Default: 'github-dark' */
  theme?: string;
  /** Whether to show line numbers. Default: false */
  showLineNumbers?: boolean;
  /** Lines to highlight (1-indexed). Can be array or function of fragment */
  highlightLines?: number[] | ((fragment: number) => number[] | 'all');
  /** Lines to reveal sequentially per fragment */
  animateLines?: number[];
  /** Starting line number. Default: 1 */
  startLineNumber?: number;
  /** Font size in pixels. Default: 16 */
  fontSize?: number;
  /** Additional styles for the container */
  style?: CSSProperties;
  /** Additional class name */
  className?: string;
}

interface HighlightedCode {
  html: string;
  lines: string[];
}

/**
 * Code block component with syntax highlighting.
 * 
 * Uses Shiki for accurate, VS Code-quality syntax highlighting.
 * 
 * @example
 * ```tsx
 * <CodeBlock language="typescript" showLineNumbers>
 * {`const greeting = 'Hello';
 * console.log(greeting);`}
 * </CodeBlock>
 * ```
 * 
 * @example
 * ```tsx
 * // Highlight specific lines
 * <CodeBlock language="typescript" highlightLines={[2, 3]}>
 * {`const a = 1;
 * const b = 2;
 * const c = a + b;`}
 * </CodeBlock>
 * ```
 * 
 * @example
 * ```tsx
 * // Fragment-based highlighting
 * <CodeBlock
 *   language="typescript"
 *   highlightLines={(fragment) => {
 *     if (fragment === 0) return [];
 *     if (fragment === 1) return [1, 2];
 *     return 'all';
 *   }}
 * >
 * {`const a = 1;
 * const b = 2;`}
 * </CodeBlock>
 * ```
 */
export function CodeBlock({
  children,
  language = 'text',
  theme = 'github-dark',
  showLineNumbers = false,
  highlightLines,
  animateLines,
  startLineNumber = 1,
  fontSize = 16,
  style,
  className,
}: CodeBlockProps): React.ReactElement {
  const fragment = useFragment();
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const code = children.trim();
  const lines = useMemo(() => code.split('\n'), [code]);

  // Load Shiki and highlight code
  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      try {
        // Dynamic import for Shiki
        const shiki = await import('shiki');
        const highlighter = await shiki.createHighlighter({
          themes: [theme],
          langs: [language],
        });

        if (cancelled) return;

        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme: theme,
        });

        // Parse HTML to extract individual lines
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const codeElement = tempDiv.querySelector('code');
        const lineElements = codeElement?.querySelectorAll('.line') || [];
        const lineHtml = Array.from(lineElements).map((el) => el.outerHTML);

        setHighlighted({
          html,
          lines: lineHtml.length > 0 ? lineHtml : lines.map((l) => `<span class="line">${escapeHtml(l)}</span>`),
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        // Fallback to plain text
        setHighlighted({
          html: `<pre><code>${escapeHtml(code)}</code></pre>`,
          lines: lines.map((l) => `<span class="line">${escapeHtml(l)}</span>`),
        });
        setIsLoading(false);
      }
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [code, language, theme, lines]);

  // Calculate which lines to highlight
  const activeHighlightLines = useMemo(() => {
    if (!highlightLines) return new Set<number>();

    if (typeof highlightLines === 'function') {
      const result = highlightLines(fragment);
      if (result === 'all') {
        return new Set(lines.map((_, i) => i + 1));
      }
      return new Set(result);
    }

    return new Set(highlightLines);
  }, [highlightLines, fragment, lines]);

  // Calculate which lines are visible (for animateLines)
  const visibleLines = useMemo(() => {
    if (!animateLines) {
      return new Set(lines.map((_, i) => i + 1));
    }

    const visible = new Set<number>();
    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const animateIndex = animateLines.indexOf(lineNum);
      
      if (animateIndex === -1 || animateIndex <= fragment) {
        visible.add(lineNum);
      }
    }
    return visible;
  }, [animateLines, fragment, lines]);

  const containerStyle: CSSProperties = {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize,
    lineHeight: 1.5,
    backgroundColor: '#0d1117',
    borderRadius: 8,
    overflow: 'auto',
    ...style,
  };

  if (isLoading || !highlighted) {
    return (
      <div className={className} style={containerStyle}>
        <pre style={{ margin: 0, padding: 16 }}>
          <code style={{ color: '#c9d1d9' }}>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <div style={{ display: 'table', width: '100%', padding: '16px 0' }}>
        {highlighted.lines.map((lineHtml, i) => {
          const lineNum = i + startLineNumber;
          const isHighlighted = activeHighlightLines.has(lineNum);
          const isVisible = visibleLines.has(lineNum);

          return (
            <div
              key={i}
              style={{
                display: 'table-row',
                opacity: isVisible ? 1 : 0,
                backgroundColor: isHighlighted ? 'rgba(56, 139, 253, 0.15)' : 'transparent',
                transition: 'opacity 0.2s, background-color 0.2s',
              }}
            >
              {showLineNumbers && (
                <span
                  style={{
                    display: 'table-cell',
                    textAlign: 'right',
                    paddingRight: 16,
                    paddingLeft: 16,
                    userSelect: 'none',
                    color: '#484f58',
                    width: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {lineNum}
                </span>
              )}
              <span
                style={{
                  display: 'table-cell',
                  paddingRight: 16,
                  paddingLeft: showLineNumbers ? 0 : 16,
                }}
                dangerouslySetInnerHTML={{ __html: lineHtml }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
