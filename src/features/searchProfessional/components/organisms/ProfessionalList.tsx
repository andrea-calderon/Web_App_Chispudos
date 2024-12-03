import React from 'react';
import ProfessionalCard from './ProfessionalCard';
import { Grid, Typography, Box } from '@mui/material';

type ProfessionalListProps = {
  professionals: {
    id: string;
    user: object;
    name: string;
    description?: string;
    location?: string;
    averageRating: number;
    reviews: object;
  }[];
};

const ProfessionalList: React.FC<ProfessionalListProps> = ({
  professionals,
}) => {
  console.log('professionals', professionals);
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
