import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  url: string;
  matchCount: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  resultsPerPage?: number;
  onResultSelect?: (result: SearchResult) => void;
  selectedResultId?: string;
}

export function SearchResults({
  results,
  isLoading,
  currentPage = 1,
  onPageChange = () => {},
  resultsPerPage = 10,
  onResultSelect = () => {},
  selectedResultId,
}: SearchResultsProps) {
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + resultsPerPage,
  );

  if (isLoading) {
    return <div className="text-center">Searching...</div>;
  }

  if (results.length === 0) {
    return (
      <div className="text-center text-muted-foreground">No results found</div>
    );
  }

  return (
    <div className="space-y-2">
      {paginatedResults.map((result) => (
        <Card
          key={result.id}
          className={`cursor-pointer transition-colors hover:bg-muted/50 ${selectedResultId === result.id ? "border-primary" : ""}`}
          onClick={() => onResultSelect(result)}
        >
          <CardHeader className="py-2.5 px-4">
            <CardTitle className="text-sm font-medium">
              {result.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-4 pb-3">
            <p className="text-xs text-muted-foreground">{result.summary}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResultSelect(result);
              }}
              className="text-xs text-primary hover:text-primary/80 underline mt-2 inline-block"
            >
              View Document
            </button>
          </CardContent>
        </Card>
      ))}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
