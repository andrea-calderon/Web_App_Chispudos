import { Box, Grid, MenuItem, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextAtom from '../../../../components/atoms/TextAtom';
import InputAtom from '../../../../components/atoms/InputAtom';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import { GUATEMALA_DEPARTMENTS } from '../../../../types/guatemalaTypes';
import CustomStepper from './Stepper';
import { useUpdateProductMutation } from '../../../../services/productApi';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectStepper, setServiceState } from '../../../../redux/slices/serviceStepperSlice';

const Step3 = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [updateProduct, { isLoading: isUpdating}] = useUpdateProductMutation();
    const dispatch = useAppDispatch();
    //dispatch(clearStepper());
    const { service } = useAppSelector(selectStepper);
      console.error('debugStepper', {service});

  const getMunicipalities = (departmentName: string) => {
    return (
      GUATEMALA_DEPARTMENTS.find((dept) => dept.name === departmentName)
        ?.municipalities || []
    );
  };

  const handleSubmitLocations = async (values) => {
    console.log(values);
    const responseUpdateProduct = await updateProduct({
          productId: service?.id,
          productData: {
            type: 1,
          },
        }).unwrap();
        console.error('responseUpdateProduct', responseUpdateProduct);
        if (responseUpdateProduct.success) {
          // dispatch(
          //   setServiceState(responseUpdateProduct?.productService),
          // );
        }
  };

  // Validación Yup
  const validationSchema = Yup.object().shape({
    mainAddress: Yup.string().required(t('forms.commons.required')),
    department: Yup.string().required(t('forms.commons.required')),
    city: Yup.string()
      .required(t('forms.commons.required'))
      .test(
        'valid-city',
        t('businessStepper.step3.invalidCity'),
        function (value) {
          return getMunicipalities(this.parent.department).includes(value);
        },
      ),
    coverageAreas: Yup.array().of(
      Yup.object().shape({
        department: Yup.string(),
        city: Yup.string()
          .required(t('forms.commons.required'))
          .test(
            'valid-coverage-city',
            t('businessStepper.step3.invalidCity'),
            function (value) {
              return getMunicipalities(this.parent.department).includes(value);
            },
          ),
      }),
    ),
  });

  return (
    <Formik
      initialValues={{
        mainAddress: '',
        department: '',
        city: '',
        coverageAreas: [{ department: '', city: '' }],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmitLocations}
    >
      {({ values, errors, touched, isValid, handleSubmit, setFieldValue }) => (
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
              pt={{ xs: 5, sm: 12, md: 12, lg: 18 }}
              pb="28px"
            >
              <TextAtom
                variant="title"
                size="large"
                fontWeight="bold"
                sx={{ mb: 1 }}
              >
                {t('businessStepper.step3.title')}
              </TextAtom>
              <TextAtom
                variant="display"
                size="medium"
                fontWeight="bold"
                sx={{ mb: 1 }}
                gutterBottom
              >
                {t('businessStepper.step3.heading')}
              </TextAtom>
              <TextAtom variant="body" size="medium" gutterBottom>
                {t('businessStepper.step3.description')}
              </TextAtom>
            </Box>

            <Grid container spacing={4}>
              {/* Dirección Principal */}
              <Grid item xs={12} md={6}>
                <TextAtom variant="title" size="medium" fontWeight="bold">
                  {t('businessStepper.step3.mainDirectionTitle')}
                </TextAtom>
                <InputAtom
                  name="mainAddress"
                  variant="standard"
                  label={t('businessStepper.step3.textField')}
                  fullWidth
                  margin="normal"
                  error={!!errors.mainAddress && touched.mainAddress}
                  helperText={touched.mainAddress && errors.mainAddress}
                />
                <InputAtom
                  name="department"
                  variant="standard"
                  label={t('businessStepper.step3.inputDeparment')}
                  fullWidth
                  select
                  margin="normal"
                  error={!!errors.department && touched.department}
                  helperText={touched.department && errors.department}
                  onChange={(e) => {
                    setFieldValue('department', e.target.value);
                    setFieldValue('city', '');
                  }}
                >
                  <MenuItem value="">
                    {t('businessStepper.step3.selectDepartment')}
                  </MenuItem>
                  {GUATEMALA_DEPARTMENTS.map((dept) => (
                    <MenuItem key={dept.name} value={dept.name}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </InputAtom>
                <InputAtom
                  name="city"
                  variant="standard"
                  label={t('businessStepper.step3.inputCity')}
                  fullWidth
                  select
                  margin="normal"
                  error={!!errors.city && touched.city}
                  helperText={touched.city && errors.city}
                  disabled={!values.department}
                >
                  <MenuItem value="">
                    {t('businessStepper.step3.selectCity')}
                  </MenuItem>
                  {getMunicipalities(values.department).map((municipality) => (
                    <MenuItem key={municipality} value={municipality}>
                      {municipality}
                    </MenuItem>
                  ))}
                </InputAtom>
              </Grid>

              {/* Áreas de Cobertura */}
              <Grid item xs={12} md={6}>
                <TextAtom variant="title" size="medium" fontWeight="bold">
                  {t('businessStepper.step3.secondDirectionTitle')}
                </TextAtom>
                <TextAtom variant="body" size="medium" gutterBottom>
                  {t('businessStepper.step3.secondDirectionDescription')}
                </TextAtom>
                {values.coverageAreas.map((_, index) => (
                  <Box key={index} mb={4}>
                    <Tooltip
                      title={t('businessStepper.step3.departmentTooltip')}
                    >
                      <InputAtom
                        name={`coverageAreas.${index}.department`}
                        variant="standard"
                        label={t('businessStepper.step3.inputDeparment')}
                        fullWidth
                        select
                        margin="normal"
                        error={
                          !!errors.coverageAreas?.[index]?.department &&
                          touched.coverageAreas?.[index]?.department
                        }
                        helperText={
                          touched.coverageAreas?.[index]?.department &&
                          errors.coverageAreas?.[index]?.department
                        }
                        onChange={(e) => {
                          setFieldValue(
                            `coverageAreas.${index}.department`,
                            e.target.value,
                          );
                          setFieldValue(`coverageAreas.${index}.city`, '');
                        }}
                      >
                        <MenuItem value="">
                          {t('businessStepper.step3.selectAnotherDepartment')}
                        </MenuItem>
                        {GUATEMALA_DEPARTMENTS.map((dept) => (
                          <MenuItem key={dept.name} value={dept.name}>
                            {dept.name}
                          </MenuItem>
                        ))}
                      </InputAtom>
                    </Tooltip>
                    <InputAtom
                      name={`coverageAreas.${index}.city`}
                      variant="standard"
                      label={t('businessStepper.step3.inputCity')}
                      fullWidth
                      select
                      margin="normal"
                      error={
                        !!errors.coverageAreas?.[index]?.city &&
                        touched.coverageAreas?.[index]?.city
                      }
                      helperText={
                        touched.coverageAreas?.[index]?.city &&
                        errors.coverageAreas?.[index]?.city
                      }
                      disabled={!values.coverageAreas[index].department}
                    >
                      <MenuItem value="">
                        {t('businessStepper.step3.selectAnotherCity')}
                      </MenuItem>
                      {getMunicipalities(
                        values.coverageAreas[index].department,
                      ).map((municipality) => (
                        <MenuItem key={municipality} value={municipality}>
                          {municipality}
                        </MenuItem>
                      ))}
                    </InputAtom>
                    {index > 0 && (
                      <ButtonAtom
                        variant="text"
                        color="error"
                        onClick={() =>
                          setFieldValue(
                            'coverageAreas',
                            values.coverageAreas.filter((_, i) => i !== index),
                          )
                        }
                        sx={{ mt: 1 }}
                        startIcon={<RemoveCircleOutlineIcon />}
                      >
                        {t('forms.commons.remove')}
                      </ButtonAtom>
                    )}
                  </Box>
                ))}
                <ButtonAtom
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    setFieldValue('coverageAreas', [
                      ...values.coverageAreas,
                      { department: '', city: '' },
                    ])
                  }
                  sx={{ mt: 2 }}
                  disabled={
                    !values.coverageAreas[values.coverageAreas.length - 1]
                      .department ||
                    !values.coverageAreas[values.coverageAreas.length - 1].city
                  }
                  startIcon={<AddIcon />}
                >
                  {t('forms.commons.addAnother')}
                </ButtonAtom>
              </Grid>
            </Grid>
          </Box>
          <CustomStepper
            onHandleNext={() => console.log('function here')}
            isNextEnabled={isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Step3;
