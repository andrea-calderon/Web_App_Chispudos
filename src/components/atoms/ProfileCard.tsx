import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';

type ProfileCardProps = {
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  description,
  image,
  rating,
  reviewCount,
  location,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        padding: 2,
        maxWidth: 400,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            marginRight: 2,
          }}
        />
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
            <Star sx={{ color: 'gold', marginRight: 0.5 }} />
            <Typography variant="body2">
              {rating} ({reviewCount} reseñas)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ color: 'purple', marginRight: 0.5 }} />
            <Typography variant="body2">{location}</Typography>
          </Box>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ marginY: 2 }}>
          {description}
        </Typography>
        <Box sx={{ textAlign: 'left' }}>
          <Button
            variant="text"
            sx={{ color: 'purple', fontWeight: 'bold', textTransform: 'none' }}
          >
            Cotizar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
