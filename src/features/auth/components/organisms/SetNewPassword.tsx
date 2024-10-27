import React, { useCallback, useState } from 'react';
import { Box, Container, Grid, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ButtonAtom, InputAtom, TextAtom } from '../../../../components/atoms';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useLoginMutation } from '../../../../services/api';
import { logger } from '../../../../utils/logger';
import { loginSuccess } from '../../../../redux/slices/authSlice';
import { LoginValues } from '../../../../types/api/apiRequests';
import AppLogo from '../../../../components/molecules/AppLogo';

const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('forms.commons.email'))
      .required(t('forms.commons.required')),
    password: Yup.string()
      .min(6, t('forms.commons.min_length', { min: 6 }))
      .required(t('forms.commons.required')),
  });

  const handleLogin = async (values: LoginValues) => {
    try {
      const result = await login(values).unwrap();
      if (result.success) {
        const { token, user } = result.data;
        dispatch(loginSuccess({ user, token }));
        navigate('/home');
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      logger('error', error, 'Login.tsx.handleLogin', 'Web');
      setErrorMsg(t('auth.login.form.error.invalid_acc'));
    }
  };

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>,
  ) => {
    await handleLogin(values);
    setSubmitting(false);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleBackToLogin = () => {
    navigate('/login'); // Reemplaza '/login' con la ruta correcta de tu pantalla de inicio de sesión
  };

  const rightIcon = (
    <IconButton
      onClick={togglePasswordVisibility}
      onMouseDown={(e) => e.preventDefault()}
      edge="end"
    >
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );

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
          }}
        >
          <AppLogo maxWidth="250px" />
        </Box>
        <Box sx={{ height: '100px' }} />
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form style={{ width: '350px' }}>
              <IconButton
                sx={{
                  alignSelf: 'flex-start',
                  marginBottom: '20px',
                  bgcolor: '#f5f5f5',
                }}
                onClick={handleBackToLogin}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Box>
                    <TextAtom
                      variant="title"
                      size="large"
                      sx={{
                        textAlign: 'left',
                        textTransform: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      {t('auth.SetNewPass.title')}
                    </TextAtom>
                  </Box>
                  <Box>
                    <TextAtom
                      variant="body"
                      size="medium"
                      sx={{
                        textAlign: 'left',
                        textTransform: 'none',
                      }}
                    >
                      {t('auth.SetNewPass.body')}
                    </TextAtom>
                  </Box>
                  <InputAtom
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    label={t('auth.SetNewPass.placeholder1')}
                    placeholder={t('auth.SetNewPass.label1')}
                    errorMsg={errors.password || errorMsg}
                    rightIcon={rightIcon}
                    fullWidth
                    sx={{ marginTop: '20px', width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputAtom
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    label={t('auth.SetNewPass.placeholder2')}
                    placeholder={t('auth.SetNewPass.label2')}
                    errorMsg={errors.password || errorMsg}
                    rightIcon={rightIcon}
                    fullWidth
                    sx={{ width: '100%', maxWidth: '328px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ButtonAtom
                    type="submit"
                    variant="filled"
                    onClick={() => navigate('/update-success')}
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      mt: 2,
                      width: '100%',
                      maxWidth: '328px',
                      textTransform: 'none',
                    }}
                  >
                    {t('auth.SetNewPass.update')}
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
                ></Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;
