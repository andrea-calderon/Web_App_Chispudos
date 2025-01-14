import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Slider,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMemo } from 'react';
import TextAtom from '../atoms/TextAtom';
import ButtonAtom from '../atoms/ButtonAtom';
import SampleImage from '../../../src/assets/images/intro_sliders/intro_1.png';
import { useNavigate } from 'react-router-dom';
import { useSearchServicesFormData } from '../../context/SearchContext';
import { useGetProductsQuery } from '../../services/api';

const SearchForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { searchData, updateSearchData } = useSearchServicesFormData();

  const { data: products = [] } = useGetProductsQuery();

  const services = useMemo(() => {
    return Array.from(
      new Set(
        products.flatMap(
          (product) => product.categories?.map((cat) => cat.name) || [],
        ),
      ),
    );
  }, [products]);

  const locations = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.location)));
  }, [products]);

  const validationSchema = Yup.object().shape({
    textSearch: Yup.string().max(50, t('validation.maxLength')),
    service: Yup.array().of(Yup.string()).min(1, t('validation.required')),
    location: Yup.array().of(Yup.string()).min(1, t('validation.required')),
  });

  return (
    <Container sx={{ py: 4 }}>
      <Formik
        initialValues={{
          textSearch: searchData.textSearch || '',
          service: searchData.categories || [],
          location: searchData.location || [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateSearchData('textSearch', values.textSearch);
          updateSearchData('categories', values.service);
          updateSearchData('location', values.location);
          navigate('/search-services');
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
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
                    <TextField
                      name="textSearch"
                      value={values.textSearch}
                      onChange={handleChange}
                      placeholder={t('landing.searchForm.textPlaceholder')}
                      aria-label={t('landing.searchForm.textPlaceholder')}
                      error={touched.textSearch && Boolean(errors.textSearch)}
                      helperText={touched.textSearch && errors.textSearch}
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>
                      {t('landing.searchForm.serviceInput')}
                    </InputLabel>
                    <Select
                      name="service"
                      multiple
                      value={values.service}
                      onChange={(e) => setFieldValue('service', e.target.value)}
                      renderValue={(selected) => selected.join(', ')}
                      aria-label={t('landing.searchForm.serviceInput')}
                    >
                      {services.map((service) => (
                        <MenuItem key={service} value={service}>
                          <Checkbox
                            checked={values.service.includes(service)}
                          />
                          <ListItemText primary={service} />
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.service && errors.service && (
                      <Box sx={{ color: 'red', fontSize: '0.8em', mt: 1 }}>
                        {errors.service}
                      </Box>
                    )}
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>{t('landing.searchForm.location')}</InputLabel>
                    <Select
                      name="location"
                      multiple
                      value={values.location}
                      onChange={(e) =>
                        setFieldValue('location', e.target.value)
                      }
                      renderValue={(selected) => selected.join(', ')}
                      aria-label={t('landing.searchForm.location')}
                    >
                      {locations.map((location) => (
                        <MenuItem key={location} value={location}>
                          <Checkbox
                            checked={values.location.includes(location)}
                          />
                          <ListItemText primary={location} />
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.location && errors.location && (
                      <Box sx={{ color: 'red', fontSize: '0.8em', mt: 1 }}>
                        {errors.location}
                      </Box>
                    )}
                  </FormControl>

                  <Box>
                    <TextAtom variant="body" size="large">
                      {t('landing.searchForm.priceRange')}
                    </TextAtom>
                    <Slider
                      value={[searchData.price.min, searchData.price.max]}
                      onChange={(_, newValue) => {
                        const [min, max] = newValue as number[];
                        updateSearchData('price', { min, max });
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000}
                      step={100}
                      aria-label={t('landing.searchForm.priceRange')}
                    />
                  </Box>

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
                    style={{ width: '100%', maxWidth: '400px' }}
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
