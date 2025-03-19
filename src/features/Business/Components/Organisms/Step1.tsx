import {
  Box,
  Avatar,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextAtom from '../../../../components/atoms/TextAtom';
import InputAtom from '../../../../components/atoms/InputAtom';
import EditIcon from '@mui/icons-material/Edit';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../../../services/productApi';
import { useState } from 'react';
import CustomStepper from './Stepper';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import {
  selectStepper,
  setServiceState,
} from '../../../../redux/slices/serviceStepperSlice';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { selectAuth } from '../../../../redux/slices/authSlice';

export default function Step1() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [productId, setProductId] = useState(null);
  const debugStepper = useAppSelector(selectStepper);
  const debugAuth = useAppSelector(selectAuth);
  console.error('debugAuthID.', debugAuth?.user?.id);

  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    businessName: Yup.string().required(t('forms.commons.required')),
    businessDescription: Yup.string().required(t('forms.commons.required')),
  });

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payloadServiceObject = {
        name: values.businessName,
        description: values.businessDescription,
        type: 1,
        price: 0,
        userId: debugAuth?.user?.id,
      };

      console.log('Enviando payload:', payloadServiceObject);
      const productResponse =
        await createProduct(payloadServiceObject).unwrap();

      console.log('productResponse', productResponse?.productService);
      dispatch(setServiceState(productResponse?.productService));

      if (!productResponse?.productService?.id) {
        throw new Error('El backend no devolvió un ID válido');
      }

      setProductId(productResponse.productService.id);

      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);

        console.log('Enviando FormData:', formData.entries());

        await uploadProductImage({
          productId: productResponse.productService.id,
          formData,
        }).unwrap();
      }
    } catch (err) {
      console.error('Error al procesar:', err);
      if (err.data) {
        console.error('Detalles del error:', err.data);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ businessName: '', businessDescription: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, handleSubmit }) => (
        <>
          <Form>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              gap={{ xs: 2, md: 4 }}
              width="100%"
              px={{ xs: 4, md: 10, lg: 24 }}
              py={{ xs: 4, md: 10, lg: 16 }}
            >
              <Box
                flex={1}
                textAlign={{ xs: 'left', md: 'left' }}
                display="flex"
                flexDirection="column"
                pt={{ xs: 12, sm: 12, md: 12, lg: 18 }}
                mr={{ md: 5, lg: 5 }}
              >
                <TextAtom
                  variant="title"
                  size="large"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  {t('businessStepper.step1.title')}
                </TextAtom>
                <TextAtom
                  variant="display"
                  size="medium"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  {t('businessStepper.step1.heading')}
                </TextAtom>
                <TextAtom
                  variant="body"
                  size="medium"
                  sx={{ color: 'text.secondary', mb: 1 }}
                >
                  {t('businessStepper.step1.description')}
                </TextAtom>
              </Box>
              <Stack
                flex={1}
                spacing={2}
                width="100%"
                alignItems={{ xs: 'center', md: 'flex-start' }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={3}
                  width="100%"
                  pb={{ xs: 4, md: 6 }}
                >
                  <Box position="relative" display="inline-block">
                    <Avatar
                      src={previewUrl || ''}
                      sx={{ width: 80, height: 80, bgcolor: 'grey.300' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="upload-button"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="upload-button">
                      <IconButton
                        component="label"
                        htmlFor="upload-button"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: -8,
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': { bgcolor: 'primary.dark' },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </label>
                  </Box>
                </Box>
                <Box width="100%">
                  <Field
                    name="businessName"
                    as={InputAtom}
                    variant="standard"
                    label={t('businessStepper.step1.businessNameLabel')}
                    placeholder={t(
                      'businessStepper.step1.businessNamePlaceholder',
                    )}
                    fullWidth
                    size={isMobile ? 'small' : 'medium'}
                  />
                  <ErrorMessage
                    name="businessName"
                    component="div"
                    style={{ color: 'red' }}
                  />
                  <Tooltip
                    title={t(
                      'businessStepper.step1.businessDescriptionTooltip',
                    )}
                  >
                    <Box>
                      <Field
                        name="businessDescription"
                        as={InputAtom}
                        label={t(
                          'businessStepper.step1.businessDescriptionLabel',
                        )}
                        placeholder={t(
                          'businessStepper.step1.businessDescriptionPlaceholder',
                        )}
                        fullWidth
                        multiline
                        rows={6}
                        variant="standard"
                        size={isMobile ? 'small' : 'medium'}
                        sx={{ mt: 2 }}
                      />
                    </Box>
                  </Tooltip>
                  <ErrorMessage
                    name="businessDescription"
                    component="div"
                    style={{ color: 'red' }}
                  />
                </Box>
              </Stack>
            </Box>
          </Form>
          <CustomStepper
            onHandleNext={handleSubmit}
            isNextEnabled={isValid && !isSubmitting}
          />
        </>
      )}
    </Formik>
  );
}
