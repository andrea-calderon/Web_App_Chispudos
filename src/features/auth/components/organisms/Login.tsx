import { Box, Container, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ButtonAtom, InputAtom, TextAtom } from '../../../../components/atoms';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useLoginMutation } from '../../../../services/api';
import { loginSuccess } from '../../../../redux/slices/authSlice';
import { LoginValues } from '../../../../types/api/apiResponses';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginValues) => {
    try {
      const result = await login({
        username: values.username,
        password: values.password,
      }).unwrap();
      if (result.success) {
        const token = result.data.token;
        dispatch(
          loginSuccess({ user: result.data.user, token: token as string }),
        );
        navigate('/home');
      } else {
        console.error('Login failed:', result.message);
      }
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

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
            mb: '30px',
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
        <Box sx={{ height: '100px' }} />
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (
            { username, password },
            { setSubmitting, setFieldError },
          ) => {
            try {
              handleLogin({ username, password });
              navigate('/home');
            } catch {
              setFieldError('username', t('loginScreen.errorOccurred'));
              setFieldError('password', t('loginScreen.errorOccurred'));
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
                    type="email"
                    autoComplete="email"
                    variant="underlined"
                    label={t('auth.login.email')}
                    placeholder={t('auth.login.email')}
                    error={touched.username && !!errors.username}
                    helperText={errors.username}
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputAtom
                    name="password"
                    type="password"
                    variant="underlined"
                    label={t('auth.login.password')}
                    placeholder={t('auth.login.password')}
                    error={touched.password && !!errors.password}
                    helperText={errors.password}
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
                    sx={{
                      mt: 2,
                      width: '100%',
                      maxWidth: '328px',
                      textTransform: 'none',
                    }}
                  >
                    {t('auth.login.title')}
                  </ButtonAtom>
                </Grid>
                <Grid item xs={12}>
                  <ButtonAtom
                    type="button"
                    variant="text"
                    fullWidth
                    onClick={() => console.log('Button clicked!')}
                    sx={{
                      width: '100%',
                      maxWidth: '328px',
                      textTransform: 'none',
                    }}
                  >
                    {t('auth.login.forgot_password')}
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
                    {t('auth.login.dont_have_account')}
                    <ButtonAtom
                      type="button"
                      variant="text"
                      disabled={isSubmitting || isLoading}
                      onClick={() => navigate('/register')}
                      sx={{ ml: 1, textTransform: 'none', fontSize: 'inherit' }}
                    >
                      {t('auth.login.register')}
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

export default Login;
