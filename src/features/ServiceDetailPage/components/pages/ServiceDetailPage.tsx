import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../../services/api';
import { UserLayout } from '../../../../components/templates/UserLayout';
import Footer from '../../../../components/organisms/Footer';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import { ServiceHeader } from '../organisms/ServiceHeader';
import { ServiceSkills } from '../organisms/ServiceSkills';
import { ServiceProjects } from '../organisms/ServiceProjects';
import { ServiceReviews } from '../organisms/ServiceReviews';

export const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID desde la URL
  const { data: service, isLoading, isError } = useGetProductByIdQuery(id!); // Llamar a la API

  if (isLoading) {
    return (
      <UserLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </UserLayout>
    );
  }

  if (isError || !service) {
    return (
      <UserLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography variant="h6" color="error">
            Error loading service details. Please try again.
          </Typography>
        </Box>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <ServiceHeader
        title={service.title}
        providerName={service.providerName}
        rating={service.rating}
        image={service.image}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box>
            <ServiceSkills skills={service.skills} />
            <ServiceProjects projects={service.recentProjects} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <ServiceReviews reviews={service.reviews} />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </UserLayout>
  );
};

export default ServiceDetailPage;
