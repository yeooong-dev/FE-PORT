import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchResult {
  todos: Todo[];
  familyEvents: FamilyEvent[];
  calendar: CalendarEvent[];
}

interface Todo {
  todo_id: number;
  user_id: number;
  text: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface FamilyEvent {
  event_id: number;
  name: string;
  date: string;
  description: string;
  target: string;
  type: string;
  amount: string;
}

interface CalendarEvent {
  event_id: number;
  title: string;
  start_date: string;
  end_date: string;
}

interface SearchResultsContextType {
  searchResults: SearchResult | null;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult | null>>;
  lastSearchTerm: string;
  setLastSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResultsContext = createContext<SearchResultsContextType | null>(
  null
);

export const useSearchResults = () =>
  useContext(SearchResultsContext) as SearchResultsContextType;

export const SearchResultsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  return (
    <SearchResultsContext.Provider
      value={{
        searchResults,
        setSearchResults,
        lastSearchTerm,
        setLastSearchTerm,
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
};
