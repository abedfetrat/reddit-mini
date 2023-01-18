import { createContext, useContext, useEffect, useState } from "react";

const SearchTermContext = createContext(null);
const PreviousSearchTermContext = createContext(null);

function SearchTermProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");

  useEffect(() => {
    setPrevSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <SearchTermContext.Provider value={[searchTerm, setSearchTerm]}>
      <PreviousSearchTermContext.Provider value={prevSearchTerm}>
        {children}
      </PreviousSearchTermContext.Provider>
    </SearchTermContext.Provider>
  );
}

function useSearchTerm() {
  return useContext(SearchTermContext);
}

function usePreviousSearchTerm() {
  return useContext(PreviousSearchTermContext);
}

export { SearchTermProvider as default, useSearchTerm, usePreviousSearchTerm };
