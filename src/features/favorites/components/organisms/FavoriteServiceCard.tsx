import { Card, CardActions, CardContent, CardMedia, Box } from '@mui/material';
import { TextAtom } from '../../../../components/atoms';
import StarIcon from '@mui/icons-material/Star';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';

const FavoriteServiceCard = ({
  id,
  name,
  description,
  location,
  image,
  user,
  averageRating,
  reviews,
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={image || 'https://picsum.photos/345/200?random=1'}
        alt={`${name || 'Servicio desconocido'} image`}
        sx={{
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ px: 3, flexGrow: 1 }}>
        <TextAtom variant="body" size="medium">
          {user?.name
            ? `${user.name} ${user.lastname || ''}`
            : 'Usuario desconocido'}
        </TextAtom>
        <TextAtom
          variant="title"
          size="large"
          color="text.secondary"
          sx={{ fontWeight: 'bold', mt: 1 }}
        >
          {name || 'Servicio sin nombre'}
        </TextAtom>
        <TextAtom
          variant="body"
          size="medium"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {description || 'Descripción no disponible.'}
        </TextAtom>
        <TextAtom
          variant="body"
          size="medium"
          color="text.secondary"
          sx={{ fontWeight: 'bold', mt: 1 }}
        >
          Ubicación: {location || 'No especificada'}
        </TextAtom>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <StarIcon fontSize="medium" sx={{ color: 'gold', mr: 0.5 }} />
          <TextAtom variant="body" size="medium">
            {averageRating || 0} | {reviews.length} reseñas
          </TextAtom>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 3, py: 2 }}>
        <ButtonAtom
          variant="outlined"
          type="button"
          size="medium"
          color="primary"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            console.log('Contactar servicio:', name);
          }}
        >
          Contactar
        </ButtonAtom>
      </CardActions>
    </Card>
  );
};

export default FavoriteServiceCard;
