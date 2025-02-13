import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";

// Import worker from CDN
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFPreviewProps {
  title?: string;
  url?: string;
}

export function PDFPreview({
  title = "Document Preview",
  url = "",
}: PDFPreviewProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-full overflow-auto bg-muted/10 rounded-lg">
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex justify-center p-4"
              loading={<div className="p-4">Loading PDF...</div>}
              error={
                <div className="p-4">Error loading PDF. Please try again.</div>
              }
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="max-w-full"
                loading={<div>Loading page...</div>}
              />
            </Document>
          </div>
          {numPages > 1 && (
            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {pageNumber} of {numPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setPageNumber((prev) => Math.min(numPages, prev + 1))
                }
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
