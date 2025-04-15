import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ServiceCard from './ServiceCard';
import DEFAULT_IMAGE from '../../../../assets/images/DEFAULT_IMAGE.png';

interface ServicesListProps {
  professionals: any[];
  favorites: string[]; // IDs de servicios favoritos
  onServiceClick: (id: string) => void;
  onToggleFavorite: (id: string) => void; // Función para manejar favoritos
}

const getFullImageUrl = (url: string | null) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL; // Usar variable de entorno
  return url?.startsWith('http') ? url : `${baseUrl}${url}`;
};

const ServicesList: React.FC<ServicesListProps> = ({
  professionals,
  favorites,
  onServiceClick,
  onToggleFavorite,
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
            image={
              service.urlImage
                ? getFullImageUrl(service.urlImage)
                : DEFAULT_IMAGE
            }
            user={{
              name: service.user?.name || 'Usuario desconocido',
              lastname: service.user?.lastname || '',
            }}
            name={service.name || 'Servicio sin nombre'}
            description={service.description || 'Descripción no disponible.'}
            location={service.locations?.[0]?.description || 'No especificada'}
            averageRating={service.averageRating || 0}
            reviews={service.reviews || []}
            isFavorite={favorites.includes(service.id)} // Verificar si está en favoritos
            onToggleFavorite={() => onToggleFavorite(service.id)} // Manejar favoritos
            onClick={() => onServiceClick(service.id)} // Navegar al detalle del servicio
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesList;
