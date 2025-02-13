import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileSpreadsheet } from "lucide-react";

interface DocumentPreviewProps {
  title: string;
  url: string;
}

export function DocumentPreview({ title, url }: DocumentPreviewProps) {
  const isExcel =
    url.toLowerCase().endsWith(".xlsx") || url.toLowerCase().endsWith(".xls");

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {isExcel ? (
            <FileSpreadsheet className="h-4 w-4" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-full h-[600px] overflow-auto bg-muted/10">
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              <a
                href={url}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open document in new tab
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {isExcel ? (
            <FileSpreadsheet className="h-4 w-4" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-full h-[600px] overflow-auto bg-muted/10">
          {getPreviewContent()}
        </div>
      </CardContent>
    </Card>
  );
}
