import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  IconButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ProductService } from '../../../../types/api/modelTypes';
import { TextAtom } from '../../../../components/atoms';
import { ButtonAtom } from '../../../../components/atoms';
import { getApiImageUrl } from '../../../../utils/baseEnvironment';

interface ServiceCardProps {
  onClick?: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  productService: ProductService;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  onClick,
  isFavorite,
  productService,
  onToggleFavorite,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '24px',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
      onClick={onClick}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 2,
          backgroundColor: isFavorite ? 'error.main' : 'rgba(0, 0, 0, 0.6)', // Fondo rojo si está en favoritos, gris oscuro si no
          color: 'white', 
          border: '2px solid white',
          '&:hover': {
            backgroundColor: isFavorite ? 'error.dark' : 'rgba(0, 0, 0, 0.8)', // Cambiar el fondo al pasar el mouse
          },
        }}
        onClick={(e) => {
          e.stopPropagation(); // Evita que el clic afecte la navegación
          onToggleFavorite(productService.id.toString()); // Llama a la función para marcar/desmarcar favoritos
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CardMedia
          component="img"
          height="180"
          image={getApiImageUrl(productService?.urlImage)}
          alt={`${productService.name || 'Servicio desconocido'} image`}
          sx={{
            width: 400,
            height: 200,
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent sx={{ px: 5, flexGrow: 1 }}>
        <TextAtom variant="body" size="medium">
          {productService.user?.name
            ? `${productService.user.name} ${productService.user.lastname }`
            : 'Usuario desconocido'}
        </TextAtom>
        <br />
        <TextAtom
          variant="title"
          size="large"
          color="text.secondary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {productService.name || 'Servicio sin nombre'}
        </TextAtom>
        <br />
        <TextAtom variant="body" size="medium" color="text.secondary">
          {productService.description || 'Descripción no disponible.'}
        </TextAtom>
        <br />
        <TextAtom
          variant="body"
          size="medium"
          color="text.secondary"
          sx={{ fontWeight: 'bold' }}
        >
          Ubicación: {productService.locations?.[0]?.description  || 'No especificada'}
        </TextAtom>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <StarIcon fontSize="medium" sx={{ color: 'gold', mr: 0.5 }} />
          <TextAtom variant="body" size="medium">
            {productService.averageRating || 0} | {productService.reviews.length} reseñas
          </TextAtom>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 4, py: 2 }}>
        <ButtonAtom
          variant="outlined"
          type="button"
          size="medium"
          color="primary"
          fullWidth
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el clic en el botón propague al resto de la tarjeta
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
