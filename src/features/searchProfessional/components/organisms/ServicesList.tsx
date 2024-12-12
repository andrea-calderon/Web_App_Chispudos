import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useGetProductsQuery } from '../../../../services/api';
import ProfessionalCard from './ServiceCard';
import { SearchContext } from '../../../../context/SearchContext';

const ProfessionalList: React.FC = () => {
  const { filters } = useContext(SearchContext);

  // Usar filtros dinámicos para obtener los datos desde la API
  const {
    data: professionals = [],
    isLoading,
    error,
  } = useGetProductsQuery({
    textSearch: filters?.textSearch || '',
    categories: filters?.categories || [],
    location: filters?.location || '',
    price: filters?.price || { min: 0, max: 99999 },
  });

  if (isLoading) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="text.secondary" textAlign="center">
          Cargando servicios...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error" textAlign="center">
          Ocurrió un error al cargar los servicios.
        </Typography>
      </Box>
    );
  }

  // Si no hay profesionales que coincidan con los filtros
  if (professionals.length === 0) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="text.secondary" textAlign="center">
          No se encontraron servicios relacionados.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={6}>
      {professionals.map((professional) => (
        <Grid item xs={12} sm={6} md={4} key={professional.id}>
          <ProfessionalCard {...professional} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfessionalList;
