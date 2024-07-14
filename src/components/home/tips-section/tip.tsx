import "./markdown.css";

import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LinkPreview } from "@/components/ui/link-preview";

import CodeBlock from "./code-block";

export interface TipProps {
  title: string;
  codeUrl: string;
  content: string;
  createdAt: string;
}

export default function Tip({ title, codeUrl, content, createdAt }: TipProps) {
  const createdDate = format(createdAt, "yyyy/MM/dd");

  return (
    <div>
      <div className="rounded-t-lg border p-5 lg:p-10">
        <div className="mb-[7px] flex items-center gap-2 text-[13px] text-[#aaa]">
          <time>{createdDate}</time>
          <p>今日のtips</p>
        </div>
        <h3 className="mb-[10px] text-[1.7rem] font-bold">{title}</h3>
        <div className="flex items-center gap-2">
          <LinkPreview
            url={codeUrl}
            className="break-all bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
          >
            {codeUrl}
          </LinkPreview>
        </div>
      </div>
      <Accordion type="single" collapsible className="border-none">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="bg-muted p-5 lg:px-10">詳細を見る</AccordionTrigger>
          <AccordionContent className="rounded-b-lg border border-t-0 p-10">
            <ReactMarkdown
              className="markdown"
              children={content}
              components={{
                code: CodeBlock,
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
