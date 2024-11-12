import React from 'react';
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTranslation } from 'react-i18next';
import TextAtom from '../../../../components/atoms/TextAtom';
import PlumberIcon from '../../../../assets/images/landing/plomeroIcono.png';
import GardenerIcon from '../../../../assets/images/landing/jardineroIcono.png';
import MechanicIcon from '../../../../assets/images/landing/mecanicoIcono.png';

// Categorías hardcodeadas que deben venir de una API
const categories = [
  {
    title: 'Plomero',
    description: 'Soluciona fugas y averías en tuberías. ¡Contacta ahora!',
    image: PlumberIcon,
  },
  {
    title: 'Jardinero',
    description: 'Transforma tus espacios verdes. ¡Solicita tu presupuesto!',
    image: GardenerIcon,
  },
  {
    title: 'Mecánico',
    description: 'Soluciona fugas y averías en tuberías. ¡Contacta ahora!',
    image: MechanicIcon,
  },
  {
    title: 'Plomero',
    description: 'Soluciona fugas y averías en tuberías. ¡Contacta ahora!',
    image: PlumberIcon,
  },
  {
    title: 'Jardinero',
    description: 'Transforma tus espacios verdes. ¡Solicita tu presupuesto!',
    image: GardenerIcon,
  },
  {
    title: 'Mecánico',
    description: 'Soluciona fugas y averías en tuberías. ¡Contacta ahora!',
    image: MechanicIcon,
  },
];

const CategoriesSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container sx={{ py: 3 }}>
      <Grid
        container
        spacing={2}
        justifyContent={isSmallScreen ? 'center' : 'flex-start'}
        textAlign={isSmallScreen ? 'center' : 'left'}
      >
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              marginTop: '80px',
              width: '100%',
            }}
          >
            <TextAtom
              variant="body"
              size="large"
              sx={{
                color: '#019FE9',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {t('landing.categories.category')}
            </TextAtom>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextAtom
              variant="headline"
              size="large"
              sx={{ fontWeight: 'bold' }}
            >
              {t('landing.categories.title')}
            </TextAtom>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Swiper spaceBetween={16} slidesPerView={isSmallScreen ? 1.5 : 2.5}>
            {categories.map((category, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: '350px',
                  height: '400px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 6,
                    borderRadius: '24px',
                    boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.1)',
                    bgcolor: '#fff',
                    margin: '20px',
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    style={{ height: '80px', marginBottom: '16px' }}
                  />
                  <TextAtom
                    variant="body"
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {t(
                      `landing.categories.${category.title.toUpperCase()}.category`,
                      {
                        defaultValue: category.title,
                      },
                    )}
                  </TextAtom>
                  <TextAtom
                    variant="body"
                    size="small"
                    sx={{ color: 'text.secondary', mt: 1 }}
                  >
                    {t(
                      `categories.${category.title.toLowerCase()}.description`,
                      { defaultValue: category.description },
                    )}
                  </TextAtom>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoriesSection;
