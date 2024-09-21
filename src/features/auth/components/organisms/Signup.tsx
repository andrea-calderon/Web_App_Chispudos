import { Box, Container, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TextAtom, ButtonAtom, InputAtom } from '../../../../components/atoms';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores',
      )
      .required('Username is required'),

    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

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
          <TextAtom
            onClick={() => navigate('/')}
            variant="display"
            size="large"
            sx={{
              color: '#6750A4',
              fontWeight: 'bold',
            }}
          >
            Workoo
          </TextAtom>
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
              if (values.email === '' && values.password === '') {
                navigate('/login');
              } else {
                setFieldError('email', t('auth.register.invalidCredentials'));
                setFieldError(
                  'password',
                  t('auth.register.invalidCredentials'),
                );
              }
            } catch {
              setFieldError('email', t('auth.register.errorOccurred'));
              setFieldError('password', t('auth.register.errorOccurred'));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form style={{ width: '350px' }}>
              <Grid
                container
                spacing={1.5}
                direction="column"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Field
                    as={InputAtom}
                    name="username"
                    variant="underlined"
                    label={t('auth.register.usernameLabel')}
                    placeholder={t('auth.register.usernamePlaceholder')}
                    error={touched.username && !!errors.username}
                    helperText={
                      touched.username && errors.username ? errors.username : ''
                    }
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={InputAtom}
                    name="email"
                    variant="underlined"
                    label={t('auth.register.emailLabel')}
                    placeholder={t('auth.register.emailPlaceholder')}
                    error={touched.email && !!errors.email}
                    helperText={
                      touched.email && errors.email ? errors.email : ''
                    }
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={InputAtom}
                    name="password"
                    type="password"
                    variant="underlined"
                    label={t('auth.register.passwordLabel')}
                    placeholder={t('auth.register.passwordPlaceholder')}
                    error={touched.password && !!errors.password}
                    helperText={
                      touched.password && errors.password ? errors.password : ''
                    }
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={InputAtom}
                    name="confirmPassword"
                    type="password"
                    variant="underlined"
                    label={t('auth.register.confirmPasswordLabel')}
                    placeholder={t('auth.register.confirmPasswordPlaceholder')}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ''
                    }
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
                    onClick={() => console.log('Button clicked!')}
                    sx={{
                      mt: 2,
                      width: '100%',
                      maxWidth: '328px',
                      textTransform: 'none',
                    }}
                  >
                    {t('auth.register.signup_title_button')}
                  </ButtonAtom>
                </Grid>
                <Box sx={{ height: '50px' }} />
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <TextAtom
                    variant="body"
                    size="small"
                    sx={{ fontSize: 'inherit' }}
                  >
                    {t('auth.register.agree_terms')}
                    <ButtonAtom
                      type="button"
                      variant="text"
                      onClick={() => console.log('Button clicked!')}
                      sx={{
                        display: 'inline',
                        padding: 0,
                        margin: '0 5px',
                        fontSize: 'inherit',
                        textTransform: 'none',
                      }}
                    >
                      {t('auth.register.terms_of_service')}
                    </ButtonAtom>
                    {t('auth.register.and')}
                    <ButtonAtom
                      type="button"
                      variant="text"
                      onClick={() => console.log('Button clicked!')}
                      sx={{
                        display: 'inline',
                        textTransform: 'none',
                        fontSize: 'inherit',
                        padding: 0,
                        margin: '0 5px',
                      }}
                    >
                      {t('auth.register.privacy_policy')}
                    </ButtonAtom>
                  </TextAtom>
                </Grid>
                <Box sx={{ height: '50px' }} />
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
                    sx={{ textAlign: 'center', fontSize: 'inherit' }}
                  >
                    {t('auth.register.have_an_account')}
                    <ButtonAtom
                      type="button"
                      variant="text"
                      onClick={() => navigate('/login')}
                      sx={{ ml: 1, textTransform: 'none', fontSize: 'inherit' }}
                    >
                      {t('auth.register.login_title_button')}
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
