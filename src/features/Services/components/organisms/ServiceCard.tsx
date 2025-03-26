import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ProductService } from '../../../../types/api/modelTypes';
import { TextAtom } from '../../../../components/atoms';
import { ButtonAtom } from '../../../../components/atoms';

interface ServiceCardProps extends ProductService {
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  user,
  name,
  description,
  location,
  averageRating,
  reviews = [],
  onClick,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: '16px auto',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '24px',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          //pt: 2,
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={image || 'https://picsum.photos/345/180?random=1'}
          alt={`${name || 'Servicio desconocido'} image`}
          sx={{
            width: 400,
            height: 200,
            //borderRadius: '0%', // Imagen circular
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent
        sx={{
          px: 5,
        }}
      >
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
      <CardActions sx={{ px: 4, py: 2 }}>
        <ButtonAtom
          variant="outlined"
          type="button"
          size="medium"
          color="primary"
          fullWidth
          onClick={(e) => {
            e.stopPropagation(); // Evitamos que el evento de clic en el botón propague al resto de la tarjeta
            if (onClick) onClick();
          }}
        >
          Contactar
        </ButtonAtom>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
