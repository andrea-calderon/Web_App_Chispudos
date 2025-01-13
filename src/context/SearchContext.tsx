import React, { createContext, useContext, useState } from 'react';

// Tipo para definir el estado del contexto de búsqueda
interface SearchData {
  textSearch: string;
  categories: string[];
  location: string;
  service: string[];
  price: { min: number; max: number };
}

// Tipo para el contexto
interface SearchContextType {
  searchData: SearchData;
  updateSearchData: (key: keyof SearchData, value: any) => void;
  resetSearchData: () => void;
}

// Estado inicial
const initialSearchData: SearchData = {
  textSearch: '',
  categories: [],
  location: '',
  service: [],
  price: { min: 0, max: 0 },
};

// Crear el contexto
export const SearchContext = createContext<SearchContextType | null>(null);

// Proveedor del contexto
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchData, setSearchData] = useState<SearchData>(initialSearchData);

  // Función para actualizar datos específicos
  const updateSearchData = (key: keyof SearchData, value: any) => {
    setSearchData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Función para reiniciar el estado
  const resetSearchData = () => {
    setSearchData(initialSearchData);
  };

  return (
    <SearchContext.Provider
      value={{ searchData, updateSearchData, resetSearchData }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Hook para usar el contexto de búsqueda
export const useSearchServicesFormData = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      'useSearchServicesFormData debe usarse dentro de un SearchProvider',
    );
  }
  return context;
};
