import React, { useContext } from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import ServiceCard from './ServiceCard'; // Cambié el nombre a "ServiceCard" para consistencia
import { useSearch } from '../../../../context/SearchContext';
import { useGetProductsQuery } from '../../../../services/api';

interface ServicesListProps {
  onServiceClick: (id: string) => void; // Nueva prop para manejar clics
}

const ServicesList: React.FC<ServicesListProps> = ({ onServiceClick }) => {
  const { searchData } = useSearch();

  // Fetch data with dynamic filters from the SearchContext
  const {
    data: services = [],
    isLoading,
    error,
  } = useGetProductsQuery({
    textSearch: searchData.textSearch,
    categories: searchData.categories,
    location: searchData.location,
    price: searchData.price,
  });

  if (isLoading) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Cargando servicios...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Ocurrió un error al cargar los servicios.
        </Typography>
      </Box>
    );
  }

  if (services.length === 0) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No se encontraron servicios relacionados con los filtros aplicados.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {services.map((service: any) => (
        <Grid item xs={12} sm={6} md={4} key={service.id}>
          <ServiceCard
            {...service}
            onClick={() => onServiceClick(service.id)}
          />{' '}
          {/* Maneja el clic */}
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesList;
