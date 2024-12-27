import React from 'react';
import { Box, Typography, Avatar, Divider } from '@mui/material';
import { Rating } from '@mui/material';

interface Review {
  name: string;
  date: string;
  comment: string;
  rating: number; // Agregar propiedad rating
}

interface ServiceReviewsProps {
  reviews: Review[];
}

export const ServiceReviews: React.FC<ServiceReviewsProps> = ({ reviews }) => {
  return (
    <Box bgcolor="#FFFBFE" padding="2rem" borderRadius="8px">
      <Typography variant="h5" fontWeight="bold" marginBottom="1rem">
        Reseñas
      </Typography>
      <Box>
        {reviews.map((review, index) => (
          <Box key={index}>
            <Box
              display="flex"
              alignItems="flex-start"
              gap="1rem"
              marginBottom="1.5rem"
            >
              <Avatar alt={review.name} />
              <Box>
                <Typography fontWeight="bold">{review.name}</Typography>
                <Typography fontSize="0.9rem" color="gray">
                  {review.date}
                </Typography>
                <Rating value={review.rating} readOnly size="small" />
                <Typography>{review.comment}</Typography>
              </Box>
            </Box>
            {index < reviews.length - 1 && (
              <Divider sx={{ marginTop: '1rem', marginBottom: '2rem' }} />
            )}{' '}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
