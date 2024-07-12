import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  children?: ReactNode;
  className?: string;
  inline?: boolean;
}

const CodeBlock = ({ children, className, inline }: Props) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  return <SyntaxHighlighter style={vscDarkPlus} language={lang} children={String(children).replace(/\n$/, "")} />;
};

export default CodeBlock;
