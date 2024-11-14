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
import { useGetCategoriesQuery } from '../../services/api';

const SearchForm = () => {
  const { t } = useTranslation();
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();

  const departments = [
    'Alta Verapaz',
    'Baja Verapaz',
    'Chimaltenango',
    'Chiquimula',
    'Guatemala',
    'El Progreso',
    'Escuintla',
    'Huehuetenango',
    'Izabal',
    'Jalapa',
    'Jutiapa',
    'Petén',
    'Quetzaltenango',
    'Quiché',
    'Retalhuleu',
    'Sacatepéquez',
    'San Marcos',
    'Santa Rosa',
    'Sololá',
    'Suchitepéquez',
    'Totonicapán',
    'Zacapa',
  ];

  const priceRanges = [
    { label: 'Bajo', value: 'low' },
    { label: 'Medio', value: 'medium' },
    { label: 'Alto', value: 'high' },
  ];

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
                        Array.isArray(categoriesData?.data) &&
                        categoriesData.data.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>
                      {t('landing.searchForm.serviceInput')}
                    </InputLabel>
                    <Select
                      name="service"
                      value={values.service}
                      onChange={handleChange}
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
                        Array.isArray(categoriesData?.data) &&
                        categoriesData.data.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.description}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

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
                      {departments
                        .filter((department) => department)
                        .map((department, index) => (
                          <MenuItem key={index} value={department}>
                            {department}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

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
                      {priceRanges
                        .filter((priceRange) => priceRange)
                        .map((priceRange, index) => (
                          <MenuItem key={index} value={priceRange.value}>
                            {priceRange.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

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
