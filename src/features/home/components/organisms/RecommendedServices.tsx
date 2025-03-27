import React from 'react';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ServicesCard from '../../../../components/atoms/ServicesCard';
import { useGetProductsQuery } from '../../../../services/productApi';
import DEFAULT_IMAGE from '../../../../assets/images/DEFAULT_IMAGE.png';
import { TextAtom } from '../../../../components/atoms';
import { useTranslation } from 'react-i18next';

const RecommendedServices: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetProductsQuery();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const topRatedServices = data?.data?.items
    ?.slice() // Crear una copia del array para evitar modificar el original
    ?.sort((a: any, b: any) => (b.averageRating || 0) - (a.averageRating || 0)) // Ordenar por calificación descendente
    ?.slice(0, 5); // Tomar los 5 primeros

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !topRatedServices?.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {t('recommendedServices.noServices')}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ px: 12, mt: 2, pb: '100px' }}>
        <Divider sx={{ mt: 5, mb: 10 }}></Divider>
        <Box sx={{ position: 'relative', mb: 4 }}>
          <TextAtom
            variant="title"
            size="large"
            fontWeight="bold"
            color="text.primary"
          >
            {t('recommendedServices.title')}
          </TextAtom>
        </Box>
        <Box>
          {isSmallScreen || isMediumScreen ? (
            // Carrusel para pantallas pequeñas y medianas
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                gap: 2,
                padding: 1,
              }}
            >
              {topRatedServices.map((service: any) => (
                <Box
                  key={service.id}
                  sx={{
                    flex: '0 0 auto',
                    width: isSmallScreen ? '80%' : '40%', // Ajustar el ancho según el tamaño de pantalla
                  }}
                >
                  <ServicesCard
                    name={service.name || 'Servicio sin nombre'}
                    image={
                      service.urlImage
                        ? `http://localhost:8000/api/v1${service.urlImage}`
                        : DEFAULT_IMAGE
                    }
                    price={`Q${service.price} por día`}
                    rating={service.averageRating || 0}
                    reviewCount={service.reviews?.length || 0}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            // Cuadrícula para pantallas grandes
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                gap: 3,
                padding: 1,
              }}
            >
              {topRatedServices.map((service: any) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={service.id}>
                  <ServicesCard
                    name={service.name || 'Servicio sin nombre'}
                    image={
                      service.urlImage
                        ? `http://localhost:8000/api/v1${service.urlImage}`
                        : DEFAULT_IMAGE
                    }
                    price={`Q${service.price} por día`}
                    rating={service.averageRating || 0}
                    reviewCount={service.reviews?.length || 0}
                  />
                </Grid>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RecommendedServices;
