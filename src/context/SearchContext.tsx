import React, { createContext, useContext, useState } from 'react';

// Crear el contexto para la búsqueda
export const SearchContext = createContext(null);

// Proveedor del contexto de búsqueda
export const SearchProvider = ({ children }) => {
  // Estado inicial para los datos de búsqueda
  const [searchData, setSearchData] = useState({
    textSearch: '', // Texto ingresado por el usuario
    categories: [], // IDs de categorías seleccionadas
    location: [], // IDs de ubicaciones seleccionadas
    price: { min: 0, max: 0 }, // Rango de precios seleccionado
  });

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook para usar el contexto de búsqueda
export const useSearch = () => useContext(SearchContext);
