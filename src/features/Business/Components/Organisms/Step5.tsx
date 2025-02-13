import { Box, Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextAtom from '../../../../components/atoms/TextAtom';
import InputAtom from '../../../../components/atoms/InputAtom';
import dollarImage from '../../../../assets/images/stepper/step5_dollarImage.svg';

const Step5 = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    tagsTextField: Yup.number()
      .typeError(t('forms.commons.mustBeNumber'))
      .required(t('forms.commons.required')),
  });

  return (
    <Formik
      initialValues={{
        tagsTextField: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ errors, touched }) => (
        <Form>
          <Box px={{ xs: 4, md: 10, lg: 24 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  textAlign="left"
                  pt={{ xs: 5, sm: 12, md: 8, lg: 16 }}
                >
                  <TextAtom
                    variant="title"
                    size="large"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    {t('businessStepper.step5.title')}
                    <TextAtom variant="title" size="medium" sx={{ mb: 1 }}>
                      {t('businessStepper.step5.subtitle')}
                    </TextAtom>
                  </TextAtom>
                  <TextAtom
                    variant="display"
                    size="medium"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                    gutterBottom
                  >
                    {t('businessStepper.step5.heading')}
                  </TextAtom>
                  <TextAtom variant="body" size="medium" sx={{ pb: 5 }}>
                    {t('businessStepper.step5.description')}
                  </TextAtom>
                  <Box mb={3}>
                    <InputAtom
                      name="tagsTextField"
                      variant="standard"
                      label={t('businessStepper.step5.priceTextField')}
                      fullWidth
                      required
                      error={
                        touched.tagsTextField && Boolean(errors.tagsTextField)
                      }
                      helperText={touched.tagsTextField && errors.tagsTextField}
                      sx={{ mb: 1 }}
                    />
                    <TextAtom variant="title" size="small">
                      {t('businessStepper.step5.note')}
                    </TextAtom>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  Height="100%"
                  mt={{ xs: -4, sm: 0, md: 12, lg: 16 }}
                >
                  <img
                    src={dollarImage}
                    alt="Illustration of a dollar sign with RecoApp colors"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Step5;
