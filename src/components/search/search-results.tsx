import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <div className="space-y-4">
      {paginatedResults.map((result) => (
        <Card
          key={result.id}
          className={`cursor-pointer transition-colors ${selectedResultId === result.id ? "border-primary" : ""}`}
          onClick={() => onResultSelect(result)}
        >
          <CardHeader>
            <CardTitle className="text-lg">{result.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {result.summary}
            </p>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:text-blue-700 underline"
            >
              View Document
            </a>
          </CardContent>
        </Card>
      ))}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
