import React from 'react';
import { Box, Button, Typography, CardMedia } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface ServiceHeaderProps {
  title: string;
  providerName: string;
  rating: number;
  image: string;
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  providerName,
  rating,
  image,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="2rem"
      marginBottom="2rem"
      padding={8}
      backgroundColor="#E8DEF8"
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ width: '325px', height: '200px', borderRadius: '16px' }}
      />
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="h6">{providerName}</Typography>
        <Box display="flex" alignItems="center" gap="0.5rem">
          <Typography variant="h5" fontWeight="bold">
            {rating}
          </Typography>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              sx={{ color: i < Math.round(rating) ? '#FFD700' : '#DDD' }}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: '1rem' }}
        >
          Contactar
        </Button>
      </Box>
    </Box>
  );
};
