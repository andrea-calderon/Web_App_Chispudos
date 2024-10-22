import React from 'react';
import { Card, CardContent, CardMedia, Box } from '@mui/material';
import { CheckCircleOutlined, Star } from '@mui/icons-material';
import TextAtom from './TextAtom';

type ServicesCardProps = {
  name: string;
  image: string;
  pricePerHour: string;
  rating: number;
  reviewCount: number;
  jobsInQueue: number;
  [key: string]: unknown;
};

const ServicesCard: React.FC<ServicesCardProps> = ({
  name,
  image,
  pricePerHour,
  rating,
  reviewCount,
  jobsInQueue,
  ...props
}) => {
  return (
    <Card
      sx={{
        maxWidth: 373,
        height: 'auto',
        borderRadius: '24px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: 2,
        marginTop: 2,
        marginBottom: 3,
      }}
      {...props}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: 200,
            height: 150,
            borderRadius: 3,
            objectFit: 'cover',
            marginBottom: 2,
          }}
        />

        <CardContent sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextAtom variant="title" size="medium" sx={{ textAlign: 'left' }}>
              {name}
            </TextAtom>
            <TextAtom
              variant="title"
              size="medium"
              color="text.secondary"
              sx={{ textAlign: 'right' }}
            >
              {pricePerHour}/hr
            </TextAtom>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
            <Star sx={{ color: 'gold', marginRight: 0.5 }} />
            <TextAtom variant="title" size="medium">
              {rating} ({reviewCount} reseñas)
            </TextAtom>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlined sx={{ color: 'purple', marginRight: 0.5 }} />
            <TextAtom variant="title" size="medium">
              {jobsInQueue} trabajos en espera
            </TextAtom>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ServicesCard;
