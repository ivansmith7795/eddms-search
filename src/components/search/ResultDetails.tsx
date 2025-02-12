import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileText, Calendar, User } from "lucide-react";

interface ResultDetailsProps {
  result?: {
    title: string;
    content: string;
    date: string;
    author: string;
    documentType: string;
  };
  onBack?: () => void;
}

const ResultDetails = ({
  result = {
    title: "Sample Document Title",
    content:
      "This is a sample document content. It contains detailed information about the selected search result. The content can be quite lengthy and may include various sections and paragraphs.",
    date: "2024-03-20",
    author: "John Doe",
    documentType: "Technical Documentation",
  },
  onBack = () => {},
}: ResultDetailsProps) => {
  return (
    <div className="min-h-[600px] w-full bg-background p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">{result.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{result.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{result.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{result.documentType}</span>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="prose max-w-none">
            <p>{result.content}</p>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default ResultDetails;
