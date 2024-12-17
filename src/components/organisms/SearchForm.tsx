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
import TextAtom from '../atoms/TextAtom';
import ButtonAtom from '../atoms/ButtonAtom';
import SampleImage from '../../../src/assets/images/intro_sliders/intro_1.png';
import { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useGetProductsQuery } from '../../services/api';

const SearchForm = () => {
  const { t } = useTranslation();
  const { setSearchData } = useSearch();

  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);

  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  const services = Array.from(
    new Set(
      products.flatMap(
        (product) => product.categories?.map((category) => category.name) || [],
      ),
    ),
  );

  const locations = Array.from(
    new Set(products.map((product) => product.location)),
  );

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const validationSchema = Yup.object().shape({
    textSearch: Yup.string(),
    service: Yup.array().of(Yup.string()),
    location: Yup.array().of(Yup.string()).min(1, t('forms.commons.required')),
  });

  return (
    <Container sx={{ py: 4 }}>
      <Formik
        initialValues={{
          textSearch: '',
          service: [],
          location: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const searchObject = {
            textSearch: values.textSearch,
            service: values.service,
            location: values.location,
            priceRange: { min: priceRange[0], max: priceRange[1] },
          };

          setSearchData(searchObject); // Update context with search data
          console.log('Search Object:', searchObject);
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
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={!!errors.location && touched.location}
                  >
                    <InputLabel>{t('landing.searchForm.location')}</InputLabel>
                    <Select
                      name="location"
                      multiple
                      value={values.location}
                      onChange={(e) =>
                        setFieldValue('location', e.target.value)
                      }
                      renderValue={(selected) => selected.join(', ')}
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
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000}
                      step={100}
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
