import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserLayout } from '../../../../components/templates/UserLayout';
import { Box, Typography } from '@mui/material';
import { useSearchServicesFormData } from '../../../../context/SearchContext';
import ServicesList from '../organisms/ServicesList';
import SearchBar from '../../../../components/organisms/SearchBar';
import { useGetProductsQuery } from '../../../../services/productApi';

export const SearchServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchData } = useSearchServicesFormData();
  const [filteredResults, setFilteredResults] = useState([]);
  const { data: allServices, isLoading, isError } = useGetProductsQuery();

  // Obtener el parámetro de la categoría desde la URL
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    if (!allServices?.data?.items?.length) return;

    let results = allServices?.data?.items;

    // Filtrar por la categoría seleccionada desde la URL
    if (selectedCategory) {
      results = results.filter((service) =>
        service.categories?.some((cat) => cat.name === selectedCategory),
      );
    }

    // Filtrar por el contexto de búsqueda (búsqueda de texto, ubicación, precio)
    if (searchData?.service?.length) {
      results = results.filter((service) =>
        searchData.service.includes(service.categories?.[0]?.name),
      );
    }

    if (searchData?.location?.length) {
      results = results.filter((service) =>
        searchData.location.includes(service.location),
      );
    }

    if (searchData?.priceRange) {
      const { min, max } = searchData.priceRange;
      results = results.filter(
        (service) => service.pricePerHour >= min && service.pricePerHour <= max,
      );
    }

    setFilteredResults(results);
  }, [searchData, allServices, selectedCategory]);

  if (isLoading) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h6">Cargando servicios...</Typography>
        </Box>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <SearchBar />
      <Box sx={{ padding: 4 }}>
        {filteredResults.length > 0 ? (
          <ServicesList
            professionals={filteredResults}
            onServiceClick={(id) => navigate(`/services/${id}`)}
          />
        ) : (
          <Typography variant="h6" color="textSecondary">
            No se encontraron resultados.
          </Typography>
        )}
      </Box>
    </UserLayout>
  );
};

export default SearchServicesPage;
