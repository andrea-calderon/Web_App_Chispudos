import React, { useContext } from 'react';
import ProfessionalCard from './ServiceCard';
import { Grid, Typography, Box } from '@mui/material';
import { SearchContext } from '../../../../context/SearchContext';

type ProfessionalListProps = {
  professionals: {
    id: string;
    user: object;
    name: string;
    description?: string;
    location?: string;
    averageRating: number;
    reviews: object;
    category?: string; // Asegúrate de que los profesionales tengan esta propiedad
  }[];
};

const ProfessionalList: React.FC<ProfessionalListProps> = ({
  professionals,
}) => {
  const { filters } = useContext(SearchContext);

  // Filtrar los profesionales según los filtros aplicados
  const filteredProfessionals = professionals.filter((professional) => {
    const matchesCategory =
      !filters.categories?.length ||
      filters.categories.includes(professional.category);
    const matchesSearchText =
      !filters.textSearch ||
      professional.name
        .toLowerCase()
        .includes(filters.textSearch.toLowerCase());

    return matchesCategory && matchesSearchText;
  });

  // Si no hay profesionales que coincidan con los filtros
  if (filteredProfessionals.length === 0) {
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
      {filteredProfessionals.map((professional) => (
        <Grid item xs={12} sm={6} md={4} key={professional.id}>
          <ProfessionalCard {...professional} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfessionalList;
