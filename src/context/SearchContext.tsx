import React, { createContext, useState, ReactNode } from 'react';

type SearchFilters = {
  textSearch?: string;
  categories?: string[];
  location?: string[];
  price?: {
    min: number;
    max: number;
  };
};

type SearchContextType = {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    textSearch: '',
    categories: [],
    location: [],
    price: { min: 0, max: 0 },
  });

  return (
    <SearchContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};
