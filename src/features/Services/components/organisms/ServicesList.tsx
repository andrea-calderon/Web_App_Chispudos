import React from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import ServiceCard from './ServiceCard';

interface ServicesListProps {
  professionals: any[];
  onServiceClick: (id: string) => void;
}

const ServicesList: React.FC<ServicesListProps> = ({
  professionals,
  onServiceClick,
}) => {
  if (!professionals.length) {
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
      {professionals.map((service) => (
        <Grid item xs={12} sm={6} md={4} key={service.id}>
          <ServiceCard
            id={service.id}
            name={service.name}
            image={service.image}
            pricePerHour={service.pricePerHour}
            rating={service.rating}
            reviewCount={service.reviewCount}
            jobsInQueue={service.jobsInQueue}
            onClick={() => onServiceClick(service.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesList;
