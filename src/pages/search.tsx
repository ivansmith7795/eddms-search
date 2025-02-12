import React from "react";
import SearchContainer from "@/components/search/SearchContainer";

const SearchPage = () => {
  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <SearchContainer />
      </div>
    </div>
  );
};

export default SearchPage;
