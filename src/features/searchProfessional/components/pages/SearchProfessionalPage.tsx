import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../../../components/templates/UserLayout';
import { Box } from '@mui/material';
import Footer from '../../../../components/organisms/Footer';
import SearchBar from '../../../../components/organisms/SearchBar';
import { useGetProductsQuery } from '../../../../services/api'; // Hook generado por RTK Query
import ProfessionalList from '../organisms/ServicesList';

export const SearchProfessionalPage: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

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

  if (isLoading) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <h2>Cargando profesionales...</h2>
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
        <ProfessionalList professionals={filteredResults || []} />
      </Box>

      <Footer />
    </UserLayout>
  );
};
