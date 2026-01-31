import React, { CSSProperties } from 'react';

interface CodeBlockProps {
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
declare function CodeBlock({ children, language, theme, showLineNumbers, highlightLines, animateLines, startLineNumber, fontSize, style, className, }: CodeBlockProps): React.ReactElement;

export { CodeBlock, type CodeBlockProps };
