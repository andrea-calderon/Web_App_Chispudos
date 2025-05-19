import React, { useRef } from 'react';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ServicesCard from '../../../../components/atoms/ServicesCard';
import { useGetProductsQuery } from '../../../../services/productApi';
import DEFAULT_IMAGE from '../../../../assets/images/DEFAULT_IMAGE.png';
import { TextAtom } from '../../../../components/atoms';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getApiImageUrl } from '../../../../utils/baseEnvironment';

const RecommendedServices: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetProductsQuery();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();

  const topRatedServices = data?.data?.items
    ?.slice() // Crear una copia del array para evitar modificar el original
    ?.sort((a: any, b: any) => (b.averageRating || 0) - (a.averageRating || 0))
    ?.slice(0, 5);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/services/${id}`); // Redirigir a la página de detalles con el ID
  };

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
      <Divider sx={{ mt: 5, mb: 10 }}></Divider>
      <Box
        sx={{
          px: { xs: 0, sm: 1, md: 2, lg: 15, xl: 15 },
          pb: '100px',
        }}
      >
        <Box sx={{ position: 'relative', mb: 3, pl: 2 }}>
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
            // Carrusel para pantallas pequeñas y medianas con flechas
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => handleScroll('left')}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                }}
              >
                <ArrowBackIos />
              </IconButton>

              <Box
                ref={scrollRef}
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
                      width: isSmallScreen ? '65%' : '40%',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCardClick(service.id)}
                  >
                    <ServicesCard
                      name={service.name || 'Servicio sin nombre'}
                      image={
                        service.urlImage
                          ? getApiImageUrl(service?.urlImage)
                          : DEFAULT_IMAGE
                      }
                      price={`Q${service.price} por día`}
                      rating={service.averageRating || 0}
                      reviewCount={service.reviews?.length || 0}
                    />
                  </Box>
                ))}
              </Box>

              <IconButton
                onClick={() => handleScroll('right')}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
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
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  key={service.id}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleCardClick(service.id)}
                >
                  <ServicesCard
                    name={service.name || 'Servicio sin nombre'}
                    image={
                      service.urlImage
                        ? getApiImageUrl(service?.urlImage)
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
