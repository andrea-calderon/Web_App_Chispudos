import { Box, Grid, useTheme } from '@mui/material';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextAtom from '../../../../components/atoms/TextAtom';
import InputAtom from '../../../../components/atoms/InputAtom';
import constructionWorker from '../../../../assets/images/stepper/step4_constructionWorker.svg';
import { useMediaQuery } from '@mui/material';

const Step4 = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const validationSchema = Yup.object().shape({
    tagsTextField: Yup.string().required(t('forms.commons.required')),
    titleTextField: Yup.string().required(t('forms.commons.required')),
    descriptionTextField: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        tagsTextField: '',
        titleTextField: '',
        descriptionTextField: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Box
            alignItems={{ xs: 'center', md: 'flex-start' }}
            px={{ xs: 4, md: 10, lg: 24 }}
          >
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              textAlign="left"
              mb={{ xs: 2, md: 0 }}
              pt={{ xs: 5, sm: 12, md: 8, lg: 8 }}
              pb="28px"
            >
              <TextAtom
                variant="title"
                size="large"
                fontWeight="bold"
                sx={{ mb: 1 }}
              >
                {t('businessStepper.step4.title')}
              </TextAtom>
              <TextAtom
                variant="display"
                size="medium"
                fontWeight="bold"
                sx={{ mb: 1 }}
                gutterBottom
              >
                {t('businessStepper.step4.heading')}
              </TextAtom>
              <TextAtom variant="body" size="medium" gutterBottom>
                {t('businessStepper.step4.description')}
              </TextAtom>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box mb={4}>
                  <TextAtom variant="title" size="medium" fontWeight="bold">
                    {t('businessStepper.step4.tagsInput')}
                  </TextAtom>
                  <InputAtom
                    name="tagsTextField"
                    variant="standard"
                    label={t('businessStepper.step4.tagsTextField')}
                    fullWidth
                    margin="normal"
                    required
                    error={
                      touched.tagsTextField && Boolean(errors.tagsTextField)
                    }
                    helperText={touched.tagsTextField && errors.tagsTextField}
                  />
                  <TextAtom variant="title" size="medium">
                    {t('businessStepper.step4.tagsExample')}{' '}
                    <Chip label={t('businessStepper.step4.electrician')} />{' '}
                    <Chip label={t('businessStepper.step4.plumber')} />{' '}
                  </TextAtom>
                </Box>

                <TextAtom variant="title" size="medium" fontWeight="bold">
                  {t('businessStepper.step4.titleInput')}
                </TextAtom>
                <InputAtom
                  name="titleTextField"
                  variant="standard"
                  label={t('businessStepper.step4.titleTextField')}
                  fullWidth
                  margin="normal"
                  required
                  error={
                    touched.titleTextField && Boolean(errors.titleTextField)
                  }
                  helperText={touched.titleTextField && errors.titleTextField}
                  onChange={(e) => {
                    setFieldValue('titleTextField', e.target.value);
                    if (e.target.value) {
                      setFieldValue(
                        'descriptionTextField',
                        values.descriptionTextField,
                      );
                    } else {
                      setFieldValue('descriptionTextField', '');
                    }
                  }}
                />

                <TextAtom variant="title" size="medium" fontWeight="bold">
                  {t('businessStepper.step4.descriptionInput')}
                </TextAtom>
                <InputAtom
                  name="descriptionTextField"
                  variant="standard"
                  multiline
                  rows={4}
                  label={t('businessStepper.step4.descriptionTextField')}
                  fullWidth
                  margin="normal"
                  disabled={!values.titleTextField}
                />
              </Grid>

              {isLargeScreen && (
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <img
                      src={constructionWorker}
                      alt="Image of a Construction Worker"
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Step4;
