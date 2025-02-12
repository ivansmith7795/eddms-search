import React, { useState } from "react";
import { SearchBar } from "./search-bar";
import { SearchResults } from "./search-results";
import ResultDetails from "./ResultDetails";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  documentType: string;
  snippet: string;
}

const SearchContainer = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      id: "1",
      title: "EDDMS System Documentation",
      content:
        "Comprehensive guide to the EDDMS system architecture and implementation details...",
      date: "2024-03-15",
      author: "Jane Smith",
      documentType: "Technical Documentation",
      snippet: "...guide to the EDDMS system architecture...",
    },
    {
      id: "2",
      title: "User Manual v2.0",
      content: "Step-by-step instructions for using the EDDMS platform...",
      date: "2024-03-10",
      author: "John Doe",
      documentType: "User Guide",
      snippet: "...instructions for using the EDDMS platform...",
    },
  ]);

  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    // Simulated search delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // In a real implementation, this would make an API call
  };

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const handleBack = () => {
    setSelectedResult(null);
  };

  return (
    <div className="min-h-[800px] w-full max-w-[1200px] mx-auto bg-background p-6">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">EDDMS Search</h1>

        {!selectedResult ? (
          <>
            <SearchBar onSearch={handleSearch} />

            <SearchResults
              results={searchResults}
              isLoading={isLoading}
              onResultClick={handleResultClick}
            />
          </>
        ) : (
          <ResultDetails
            result={{
              title: selectedResult.title,
              content: selectedResult.content,
              date: selectedResult.date,
              author: selectedResult.author,
              documentType: selectedResult.documentType,
            }}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
