import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ProductService } from '../../../../types/api/modelTypes';
import { TextAtom } from '../../../../components/atoms';
import { ButtonAtom } from '../../../../components/atoms';

const ServiceCard: React.FC<ProductService> = ({
  image,
  user,
  name,
  description,
  location,
  averageRating,
  reviews = [],
}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '32px',
      }}
    >
      {/* Imagen del servicio */}
      <CardMedia
        component="img"
        height="180"
        image={image || 'https://picsum.photos/345/180?random=1'}
        alt={`${name || 'Servicio desconocido'} image`}
      />

      <CardContent>
        {/* Nombre del usuario */}
        <TextAtom variant="body" size="medium">
          {user?.name
            ? `${user.name} ${user.lastname || ''}`
            : 'Usuario desconocido'}
        </TextAtom>
        <br />
        {/* Nombre del servicio */}
        <TextAtom
          variant="title"
          size="large"
          color="text.secondary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {name || 'Servicio sin nombre'}
        </TextAtom>
        <br />
        {/* Descripción del servicio */}
        <TextAtom variant="body" size="medium" color="text.secondary">
          {description || 'Descripción no disponible.'}
        </TextAtom>
        <br />
        {/* Ubicación */}
        <TextAtom
          variant="body"
          size="medium"
          color="text.secondary"
          sx={{ fontWeight: 'bold' }}
        >
          Ubicación: {location || 'No especificada'}
        </TextAtom>
        {/* Calificación promedio */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <StarIcon fontSize="medium" sx={{ color: 'gold', mr: 0.5 }} />
          <TextAtom variant="body" size="medium">
            {averageRating || 0} | {reviews.length} reseñas
          </TextAtom>
        </Box>
      </CardContent>

      {/* Botón de acción */}
      <CardActions>
        <ButtonAtom
          variant="outlined"
          type="button"
          size="medium"
          color="primary"
          fullWidth
        >
          Contactar
        </ButtonAtom>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
