import React from 'react';
import { UserLayout } from '../../../../components/templates/UserLayout';
import Footer from '../../../../components/organisms/Footer';
import { Box, Grid } from '@mui/material';
import { ServiceHeader } from '../organisms/ServiceHeader';
import { ServiceSkills } from '../organisms/ServiceSkills';
import { ServiceProjects } from '../organisms/ServiceProjects';
import { ServiceReviews } from '../organisms/ServiceReviews';

// Datos temporales para simular la información del servicio
const serviceData = {
  title: 'Plomería La Bendición',
  providerName: 'José Pérez',
  rating: 3.5,
  image: 'https://picsum.photos/345/180?random=1',
  skills: `José Pérez es un plomero experimentado y calificado. Tiene amplios conocimientos en la instalación y mantenimiento de sistemas de plomería.`,
  recentProjects: [
    {
      title: 'Restaurante local',
      img: 'https://images.offerup.com/9EDppmaWhmYpM92jEEJJFekPA8o=/768x1020/5ccd/5ccd2ed5a5134c67ab0d696df1e8f244.jpg',
    },
    { title: 'Remodelar baño', img: '/assets/project2.jpg' },
    { title: 'Plomería de una cocina', img: '/assets/project3.jpg' },
    { title: 'Sistema de plomería comercial', img: '/assets/project4.jpg' },
  ],
  reviews: [
    {
      name: 'Elizabeth Del Valle',
      date: 'Hace un día',
      comment: 'Recomiendo a José para cualquier necesidad de plomería.',
      rating: 5,
    },
    {
      name: 'Juan Gonzales',
      date: 'Hace 5 días',
      comment: 'Tiene una gran cantidad de conocimiento y experiencia.',
      rating: 4,
    },
    {
      name: 'Juan Gonzales',
      date: 'Hace 5 días',
      comment: 'Tiene una gran cantidad de conocimiento y experiencia.',
      rating: 1,
    },
  ],
};

export const ServiceDetailPage = () => {
  return (
    <UserLayout>
      <ServiceHeader
        title={serviceData.title}
        providerName={serviceData.providerName}
        rating={serviceData.rating}
        image={serviceData.image}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box>
            <ServiceSkills skills={serviceData.skills} />
            <ServiceProjects projects={serviceData.recentProjects} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <ServiceReviews reviews={serviceData.reviews} />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </UserLayout>
  );
};

export default ServiceDetailPage;
