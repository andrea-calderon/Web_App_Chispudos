import React from 'react';
import {
  Box,
  Button,
  Typography,
  CardMedia,
  useMediaQuery,
  useTheme,
  Grid2 as Grid,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface ServiceHeaderProps {
  title: string;
  providerName: string;
  rating: number;
  image: string;
  onOpenModal: () => void;
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  providerName,
  rating,
  image,
  onOpenModal,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box padding={isMobile ? 2 : 8} backgroundColor="#E8DEF8">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              maxWidth: '300px',
              height: 'auto',
              borderRadius: '16px',
              mt: isMobile ? 4 : 0,
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box textAlign={isMobile ? 'center' : 'left'}>
            <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold">
              {title || 'Servicio no disponible'}
            </Typography>
            <Typography variant={isMobile ? 'subtitle1' : 'h6'}>
              {providerName || 'Proveedor desconocido'}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={isMobile ? 'center' : 'flex-start'}
              gap="0.5rem"
            >
              <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">
                {rating ? rating.toFixed(1) : 'Aún no tiene reseñas.'}
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
              color="primary"
              onClick={onOpenModal}
              sx={{ mt: 2, mb: 4 }}
            >
              Reservar Servicio
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
