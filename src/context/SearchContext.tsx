import React, { createContext, useContext, useState } from 'react';

// Crear el contexto para la búsqueda
export const SearchContext = createContext(null);

// Proveedor del contexto de búsqueda
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado inicial para los datos de búsqueda
  const [searchData, setSearchData] = useState({
    textSearch: '', // Texto ingresado por el usuario
    categories: [], // IDs de categorías seleccionadas
    location: '', // Ubicación seleccionada (puede ser una string como "Ciudad" o "Zona")
    service: [], // Servicios seleccionados por el usuario
    price: { min: 0, max: 0 }, // Rango de precios seleccionado
  });

  const updateSearchData = (key: string, value: any) => {
    setSearchData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <SearchContext.Provider
      value={{ searchData, setSearchData, updateSearchData }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Hook para usar el contexto de búsqueda
export const useSearch = () => useContext(SearchContext);
