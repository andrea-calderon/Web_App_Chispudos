import { Box, Container, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ButtonAtom, InputAtom, TextAtom } from '../../../../components/atoms';

interface SignupProps {
  onSignup: (values: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#FFF',
        position: 'relative',
        padding: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          maxWidth: '483px',
          padding: 0,
          bgcolor: '#fff',
          boxShadow: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            width: '181.47px',
            height: '36.9px',
          }}
        >
          <AppLogo maxWidth="250px" />
        </Box>
        <Box sx={{ height: '75px' }} />
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              await onSignup(values); // Usamos la función onSignup que recibimos como prop
            } catch {
              setFieldError('username', t('signupScreen.errorOccurred'));
              setFieldError('email', t('signupScreen.errorOccurred'));
              setFieldError('password', t('signupScreen.errorOccurred'));
              setFieldError('confirmPassword', t('signupScreen.errorOccurred'));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form style={{ width: '350px' }}>
              <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <InputAtom
                    name="username"
                    type="text"
                    variant="underlined"
                    label={t('auth.signup.username')}
                    placeholder={t('auth.signup.username')}
                    error={touched.username && !!errors.username}
                    helperText={errors.username}
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputAtom
                    name="email"
                    type="email"
                    autoComplete="email"
                    variant="underlined"
                    label={t('auth.signup.email')}
                    placeholder={t('auth.signup.email')}
                    error={touched.email && !!errors.email}
                    helperText={errors.email}
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputAtom
                    name="password"
                    type="password"
                    variant="underlined"
                    label={t('auth.signup.password')}
                    placeholder={t('auth.signup.password')}
                    error={touched.password && !!errors.password}
                    helperText={errors.password}
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputAtom
                    name="confirmPassword"
                    type="password"
                    variant="underlined"
                    label={t('auth.signup.confirm_password')}
                    placeholder={t('auth.signup.confirm_password')}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ButtonAtom
                    type="submit"
                    variant="filled"
                    fullWidth
                    disabled={isSubmitting}
                    onClick={() => {}}
                    sx={{
                      mt: 2,
                      width: '100%',
                      maxWidth: '328px',
                      textTransform: 'none',
                    }}
                  >
                    {t('auth.signup.title')}
                  </ButtonAtom>
                </Grid>
                <Box sx={{ height: '191px' }} />
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <TextAtom
                    variant="body"
                    size="small"
                    sx={{
                      textAlign: 'center',
                      textTransform: 'none',
                      fontSize: 'inherit',
                    }}
                  >
                    {t('auth.signup.have_account')}
                    <ButtonAtom
                      type="button"
                      variant="text"
                      onClick={() => navigate('/login')}
                      sx={{ ml: 1, textTransform: 'none', fontSize: 'inherit' }}
                    >
                      {t('auth.signup.login')}
                    </ButtonAtom>
                  </TextAtom>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Signup;
