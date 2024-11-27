import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Formik, Form } from 'formik';
import TextAtom from '../atoms/TextAtom';
import ButtonAtom from '../atoms/ButtonAtom';
import SampleImage from '../../../src/assets/images/intro_sliders/intro_1.png';
import { useGetProductsQuery } from '../../services/api';
import { useState } from 'react';

const SearchForm = () => {
  const { t } = useTranslation();
  const { data: productsData, isLoading, error } = useGetProductsQuery();

  const services = productsData?.map((product) => ({
    id: product.id,
    name: product.name,
  }));
  const categories = productsData?.flatMap((product) => product.categories);
  const locations = Array.from(
    new Set(productsData?.map((product) => product.location)),
  );

  let priceRanges: { label: string; value: string }[] = [];
  if (productsData && productsData.length > 0) {
    const prices = productsData
      .map((product) => product.price)
      .filter((price) => price !== null);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const midPrice = (minPrice + maxPrice) / 2;

    priceRanges = [
      {
        label: `Bajo (${minPrice.toFixed(2)} - ${(midPrice * 0.75).toFixed(2)})`,
        value: 'low',
      },
      {
        label: `Medio (${(midPrice * 0.75).toFixed(2)} - ${(midPrice * 1.25).toFixed(2)})`,
        value: 'medium',
      },
      {
        label: `Alto (${(midPrice * 1.25).toFixed(2)} - ${maxPrice.toFixed(2)})`,
        value: 'high',
      },
    ];
  }

  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setSelectedService(event.target.value as string);
  };

  const filteredCategories = categories?.filter((category) =>
    productsData.some(
      (product) =>
        product.id === selectedService &&
        product.categories.some((cat) => cat.id === category.id),
    ),
  );

  return (
    <Container sx={{ py: 4 }}>
      <Formik
        initialValues={{
          category: '',
          service: '',
          location: '',
          price: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextAtom
                    variant="display"
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {t('landing.searchForm.title')}
                  </TextAtom>
                  <TextAtom variant="body" size="large">
                    {t('landing.searchForm.body')}
                  </TextAtom>

                  {/* Servicios */}
                  <FormControl fullWidth>
                    <InputLabel>
                      {t('landing.searchForm.serviceInput')}
                    </InputLabel>
                    <Select
                      name="service"
                      value={values.service}
                      onChange={(e) => {
                        handleServiceChange(e);
                        handleChange(e);
                      }}
                      label={t('landing.searchForm.serviceInput')}
                    >
                      <MenuItem value="">
                        <em>{t('landing.searchForm.selectService')}</em>
                      </MenuItem>
                      {isLoading ? (
                        <MenuItem disabled>{t('loading')}</MenuItem>
                      ) : error ? (
                        <MenuItem disabled>
                          {t('error_loading_services')}
                        </MenuItem>
                      ) : (
                        services?.map((service) => (
                          <MenuItem key={service.id} value={service.id}>
                            {service.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                  {/* Categorías */}
                  <FormControl fullWidth>
                    <InputLabel>
                      {t('landing.searchForm.categoryInput')}
                    </InputLabel>
                    <Select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      label={t('landing.searchForm.categoryInput')}
                    >
                      <MenuItem value="">
                        <em>{t('landing.searchForm.selectCategory')}</em>
                      </MenuItem>
                      {isLoading ? (
                        <MenuItem disabled>{t('loading')}</MenuItem>
                      ) : error ? (
                        <MenuItem disabled>
                          {t('error_loading_categories')}
                        </MenuItem>
                      ) : (
                        filteredCategories?.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                  {/* Ubicaciones */}
                  <FormControl fullWidth>
                    <InputLabel>{t('landing.searchForm.location')}</InputLabel>
                    <Select
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      label={t('landing.searchForm.location')}
                    >
                      <MenuItem value="">
                        <em>{t('landing.searchForm.addLocation')}</em>
                      </MenuItem>
                      {locations?.map((location, index) => (
                        <MenuItem key={index} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Rangos de Precios */}
                  <FormControl fullWidth>
                    <InputLabel>
                      {t('landing.searchForm.priceRange')}
                    </InputLabel>
                    <Select
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      label={t('landing.searchForm.priceRange')}
                    >
                      <MenuItem value="">
                        <em>{t('landing.searchForm.selectPriceRange')}</em>
                      </MenuItem>
                      {priceRanges?.map((priceRange, index) => (
                        <MenuItem key={index} value={priceRange.value}>
                          {t('landing.searchForm.priceLabel', {
                            price: priceRange.label,
                          })}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Botón de Búsqueda */}
                  <ButtonAtom
                    variant="filled"
                    type="submit"
                    fullWidth
                    sx={{ width: '300px' }}
                  >
                    {t('landing.searchForm.searchProfessional')}
                  </ButtonAtom>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={SampleImage}
                    alt={t('professional_image')}
                    style={{
                      width: '100%',
                      maxWidth: '400px',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SearchForm;
