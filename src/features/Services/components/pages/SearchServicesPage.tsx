import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLayout } from '../../../../components/templates/UserLayout';
import { Box, Typography } from '@mui/material';
import Footer from '../../../../components/organisms/Footer';
import { useSearchServicesFormData } from '../../../../context/SearchContext';
import ServicesList from '../organisms/ServicesList';
import { useGetProductsQuery } from '../../../../services/api';
import SearchBar from '../../../../components/organisms/SearchBar';

export const SearchServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { searchData } = useSearchServicesFormData();
  const [filteredResults, setFilteredResults] = useState([]);

  const { data: allServices = [], isLoading, isError } = useGetProductsQuery();

  useEffect(() => {
    if (!allServices.length) return;

    let results = allServices;

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
  }, [searchData, allServices]);

  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  if (isLoading) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h6">Cargando servicios...</Typography>
        </Box>
      </UserLayout>
    );
  }

  if (isError) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h6" color="error">
            Ocurrió un error al cargar los servicios.
          </Typography>
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
            onServiceClick={handleServiceClick}
          />
        ) : (
          <Typography variant="h6" color="textSecondary">
            No se encontraron resultados para tu búsqueda.
          </Typography>
        )}
      </Box>
      <Footer />
    </UserLayout>
  );
};

export default SearchServicesPage;
