import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { UserLayout } from '../../../../components/templates/UserLayout';
import { Box } from '@mui/material';
import Footer from '../../../../components/organisms/Footer';
import SearchBar from '../../../../components/organisms/SearchBar';
import { useGetProductsQuery } from '../../../../services/api';
import ServicesList from '../organisms/ServicesList';

export const SearchServicesPage: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const navigate = useNavigate(); // Hook para navegar

  const [searchFilters, setSearchFilters] = useState({});
  const [filteredResults, setFilteredResults] = useState(products || []);

  useEffect(() => {
    if (!products) return;

    let results = products;

    if (searchFilters.textSearch) {
      results = results.filter((product: any) =>
        product.name
          .toLowerCase()
          .includes(searchFilters.textSearch.toLowerCase()),
      );
    }

    setFilteredResults(results);
  }, [searchFilters, products]);

  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`); // Redirige a la página de detalles
  };

  if (isLoading) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <h2>Cargando servicios...</h2>
        </Box>
      </UserLayout>
    );
  }

  if (isError) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <h2 style={{ color: 'red' }}>
            Error al cargar los datos. Intenta de nuevo.
          </h2>
        </Box>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <SearchBar
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
      />

      <Box sx={{ padding: 4 }}>
        <ServicesList
          professionals={filteredResults || []}
          onServiceClick={handleServiceClick} // Pasa la función a la lista
        />
      </Box>

      <Footer />
    </UserLayout>
  );
};
