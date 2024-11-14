import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTranslation } from 'react-i18next';
import TextAtom from '../../../../components/atoms/TextAtom';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
}

const CategoriesSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/v1/categoriesPublic',
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container sx={{ py: 3 }}>
      <Grid
        container
        spacing={2}
        justifyContent={isSmallScreen ? 'center' : 'flex-start'}
        textAlign={isSmallScreen ? 'center' : 'left'}
      >
        <Grid item xs={12} md={3}>
          <Box sx={{ marginTop: '80px', width: '100%' }}>
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
            {categories.map((category) => (
              <SwiperSlide
                key={category.id}
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
                    src={category.icon}
                    alt={category.name}
                    style={{ height: '80px', marginBottom: '16px' }}
                  />
                  <TextAtom
                    variant="body"
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {t(
                      `landing.categories.${category.name.toUpperCase()}.category`,
                      { defaultValue: category.name },
                    )}
                  </TextAtom>
                  <TextAtom
                    variant="body"
                    size="small"
                    sx={{ color: 'text.secondary', mt: 1 }}
                  >
                    {t(
                      `categories.${category.name.toLowerCase()}.description`,
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
