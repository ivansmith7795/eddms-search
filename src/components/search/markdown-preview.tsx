import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface MarkdownPreviewProps {
  title: string;
  content: string;
}

export function MarkdownPreview({ title, content }: MarkdownPreviewProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Preview: {title}</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none max-h-[600px] overflow-y-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
