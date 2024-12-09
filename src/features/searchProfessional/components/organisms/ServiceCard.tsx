import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ProductService } from '../../../../types/api/modelTypes';
import { TextAtom } from '../../../../components/atoms';
import { ButtonAtom } from '../../../../components/atoms';

const ProfessionalCard: React.FC<ProductService> = ({ ...props }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '32px',
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={props?.image || 'https://picsum.photos/180/100?random=1'}
        alt={`${'businessName'} service`}
      />

      <CardContent>
        <TextAtom variant="body" size="medium">
          {props.user.name + ' ' + props.user.lastname}
        </TextAtom>{' '}
        <br />
        <TextAtom
          variant="title"
          size="large"
          color="text.secondary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {props.name}
        </TextAtom>
        <br />
        <TextAtom variant="body" size="medium" color="text.secondary">
          {props.description}
        </TextAtom>
        <br />
        <TextAtom
          variant="body"
          size="medium"
          color="text.secondary"
          sx={{ fontWeight: 'bold' }}
        >
          Ubicación: {props.location}
        </TextAtom>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <StarIcon fontSize="medium" sx={{ color: 'gold', mr: 0.5 }} />
          <TextAtom variant="body" size="medium">
            {props.averageRating} | {props.reviews.length} reseñas
          </TextAtom>
        </Box>
      </CardContent>

      <CardActions>
        <ButtonAtom
          variant="text"
          type="button"
          size="small"
          color="primary"
          fullWidth
          // onClick={'onQuoteRequest'}
        >
          Contactar
        </ButtonAtom>
      </CardActions>
    </Card>
  );
};

export default ProfessionalCard;
