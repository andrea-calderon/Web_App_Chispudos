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

const initialValues = {
  businessName: '',
  businessDescription: '',
};

export default function Step1() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const validationSchema = Yup.object({
    businessName: Yup.string().required(t('forms.commons.required')),
    businessDescription: Yup.string().required(t('forms.commons.required')),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log('Form submitted:', values)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
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
              width={{ xs: '100%', md: 'auto' }}
              textAlign={{ xs: 'left', md: 'left' }}
              mb={{ xs: 2, md: 0 }}
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
                pb={{ xs: 4, md: 6, lg: 6 }}
              >
                <Box position="relative" display="inline-block">
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'grey.300',
                    }}
                  />
                  <IconButton
                    aria-label={t('businessStepper.step1.editAvatar')}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: -8,
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: `scale(${isMobile ? 0.8 : 1})`,
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                  >
                    <EditIcon fontSize={isMobile ? 'small' : 'small'} />
                  </IconButton>
                </Box>

                <TextAtom
                  variant="body"
                  size="medium"
                  textAlign="Left"
                  color="text.secondary"
                  mr={16}
                >
                  {t('businessStepper.step1.uploadPrompt')}
                </TextAtom>
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
                  size="extraSmall"
                />

                <Tooltip
                  title={t('businessStepper.step1.businessDescriptionTooltip')}
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
                      rows="6"
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
      )}
    </Formik>
  );
}
