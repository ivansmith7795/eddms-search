import { useState } from "react";
import { SearchBar } from "./search/search-bar";
import { SearchResults } from "./search/search-results";
import { MarkdownPreview } from "./search/markdown-preview";

// Document data
const DOCUMENT_RESULTS = [
  {
    id: "1",
    title: "VOID - Pipe Spec Rj.pdf",
    summary:
      "The document is a piping material specification for a process plant, detailing materials, corrosion allowances, ANSI ratings, service conditions, and specific valve and fitting requirements for jacketed pipe used in urea melt service, with a revision date of November 3, 1981.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Urea Piping Specifications (Pipe Specs)/Obsolete Urea Piping Specs/VOID - Pipe Spec Rj.pdf",
    matchCount: 5,
  },
  {
    id: "2",
    title: "Pipe Spec - Steam Jacketed Piping.pdf",
    summary:
      "The document is a detailed specification for steam jacketed piping used in process plants, covering aspects such as pipe and jacket sizes, materials, installation, valving, insulation, and heat transfer cement requirements, with specific figures and tables for reference.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Urea Piping Specifications (Pipe Specs)/Pipe Spec - Steam Jacketed Piping.pdf",
    matchCount: 7,
  },
  {
    id: "3",
    title: "FNO Piping Specification Binder - Stamped.pdf",
    summary:
      "The FNO Pipe Specification Review (2015) aimed to update ammonia and urea pipe specifications according to ASME B31.1 and B31.3 piping codes, involving code calculations and assessments of pipe wall thickness, fittings, valves, and flanges, resulting in updated specifications and recommendations for changes documented in a log file.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/FNO Piping Specification Binder - Stamped.pdf",
    matchCount: 8,
  },
  {
    id: "4",
    title: "Index - Urea Pipe Specs.xlsx",
    summary:
      "The document provides an index of piping material classes for Fort Saskatchewan Nitrogen Operations, detailing various pipe specifications, flange ratings, and service limits at different temperatures and pressures for the Urea Plant.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Urea Piping Specifications (Pipe Specs)/Index - Urea Pipe Specs.xlsx",
    matchCount: 6,
  },
  {
    id: "5",
    title: "FNO Master Lubrication Database.xlsx",
    summary:
      "The document provides a detailed list of lubricants used for various machines and equipment in different areas of a plant, specifying the current lubricant, other options, machine description, area, function, and location.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Reliability/Asset Care Plans (ACPs)/ACPs - Rotating Equipment/FNO Master Lubrication Database.xlsx",
    matchCount: 4,
  },
  {
    id: "6",
    title: "Pipe Spec RJ.pdf",
    summary:
      "The document is a piping material specification for Fort Saskatchewan Nitrogen Operations, detailing materials, construction, temperature and pressure limits, and specific notes for urea melt jacketed pipes, including corrosion allowances, valve trims, and inspection standards.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Urea Piping Specifications (Pipe Specs)/Pipe Spec RJ.pdf",
    matchCount: 7,
  },
  {
    id: "7",
    title: "Pipe Spec M.pdf",
    summary:
      "The document is a piping material specification for Fort Saskatchewan Nitrogen Operations, detailing line class M for effluent and oily sewers, including material types, temperature and pressure limits, and specific piping notes, with revisions noted from 2016.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Urea Piping Specifications (Pipe Specs)/Pipe Spec M.pdf",
    matchCount: 5,
  },
  {
    id: "8",
    title: "Pipe Spec 9S1U.pdf",
    summary:
      "The document is a detailed piping material specification for Fort Saskatchewan Nitrogen Operations, covering line class 9S1U, with specifications for steam, BFW, and boiler piping, including material, temperature limits, pressure ratings, and various components like pipes, fittings, valves, and flanges, along with specific notes and revisions.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Ammonia & Utilities Piping Specifications (Pipe Specs)/Pipe Spec 9S1U.pdf",
    matchCount: 8,
  },
  {
    id: "9",
    title: "Pipe Spec W2W.pdf",
    summary:
      "The document is a piping material specification for Fort Saskatchewan Nitrogen Operations, detailing the requirements for potable water underground piping using PVC materials, including specifications for temperature and pressure limits, construction standards, and various components like pipes, fittings, valves, flanges, and gaskets, along with revision history and specific piping notes.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Ammonia & Utilities Piping Specifications (Pipe Specs)/Pipe Spec W2W.pdf",
    matchCount: 6,
  },
  {
    id: "10",
    title: "Pipe Spec 9S1D.pdf",
    summary:
      "The document is a detailed piping material specification for Fort Saskatchewan Nitrogen Operations, covering Line Class 9S1D, with specifications on materials, construction, temperature and pressure limits, inspection standards, and various components like pipes, fittings, valves, flanges, gaskets, and bolting, along with specific notes on usage and revisions.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Ammonia & Utilities Piping Specifications (Pipe Specs)/Pipe Spec 9S1D.pdf",
    matchCount: 7,
  },
  {
    id: "11",
    title: "Pipe Spec RX.pdf",
    summary:
      "The document is a piping material specification for Fort Saskatchewan Nitrogen Operations, detailing materials, temperature and pressure limits, corrosion allowance, construction standards, and specific piping notes for Line Class RX, with revisions and approvals noted.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Urea Piping Specifications (Pipe Specs)/Pipe Spec RX.pdf",
    matchCount: 5,
  },
  {
    id: "12",
    title: "Pipe Spec SX.pdf",
    summary:
      "The document is a piping material specification for Fort Saskatchewan Nitrogen Operations, detailing materials, construction, temperature and pressure limits, valve and fitting specifications, and specific piping notes for Urea-Carbamate service, with revisions and clarifications on valve materials and general cleanup.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Urea Piping Specifications (Pipe Specs)/Pipe Spec SX.pdf",
    matchCount: 6,
  },
  {
    id: "13",
    title: "Pipe Spec 3P3.pdf",
    summary:
      "The document is a piping material specification for Fort Saskatchewan Nitrogen Operations, detailing Line Class 3P3 with specifications for materials, construction, temperature limits, pressure ratings, and various components such as pipes, fittings, valves, flanges, gaskets, and bolting, along with revision history and technical standards.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Ammonia & Utilities Piping Specifications (Pipe Specs)/Pipe Spec 3P3.pdf",
    matchCount: 7,
  },
  {
    id: "14",
    title: "Pipe Spec 9S1DU.pdf",
    summary:
      "The document is a detailed piping material specification for Fort Saskatchewan Nitrogen Operations, covering line class 9S1DU, including service, inspection class, corrosion allowance, temperature and pressure limits, material specifications, and various components like pipes, fittings, valves, flanges, gaskets, and bolting, with specific notes on usage and standards.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Technical & Engineering/Mechanical Engineering/Piping Specifications (Pipe Specs)/Ammonia & Utilities Piping Specifications (Pipe Specs)/Pipe Spec 9S1DU.pdf",
    matchCount: 8,
  },
  {
    id: "15",
    title:
      "OPP-001-002-023 Compressor General Operation of all Compressors.doc",
    summary:
      "The document provides a detailed overview of the operation, design, and maintenance of centrifugal compressors used in the Fort Saskatchewan Nitrogen Operations Ammonia Plant, covering topics such as compressor theory, mechanical design, surge control, and vibration monitoring.",
    url: "https://ui.sharepoint.com/sites/fno/FNOCD/Operations/DO NOT USE - 2022 Documentation Cleanup/This content was cut from - FNO Controlled Documents - L&D - Progression - Operations/Ammonia Plant Training Modules/002 Compressors/OPP-001-002-023 Compressor General Operation of all Compressors.doc",
    matchCount: 5,
  },
];

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(DOCUMENT_RESULTS);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResult, setSelectedResult] = useState<
    (typeof DOCUMENT_RESULTS)[0] | null
  >(null);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      const filtered = DOCUMENT_RESULTS.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.summary.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="w-screen min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">EDDMS Search</h1>
        <div className="flex justify-center">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SearchResults
            results={results}
            isLoading={isSearching}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            resultsPerPage={10}
            onResultSelect={setSelectedResult}
            selectedResultId={selectedResult?.id}
          />
          {selectedResult && (
            <div className="sticky top-8">
              <MarkdownPreview
                title={selectedResult.title}
                content={`# ${selectedResult.title}\n\n${selectedResult.summary}\n\n## Document Details\n\n- **Location**: ${selectedResult.url}\n- **Matches**: ${selectedResult.matchCount}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
