import React, { useCallback, useState } from 'react';
import { Box, Container, Grid, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik, useFormik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ButtonAtom, InputAtom, TextAtom } from '../../../../components/atoms';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useLoginMutation } from '../../../../services/api';
import { logger } from '../../../../utils/logger';
import { loginSuccess } from '../../../../redux/slices/authSlice';
import AppLogo from '../../../../components/molecules/AppLogo';

const OTPVerification: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(
        Yup.string()
          .matches(/^[0-9]$/, t('otp_error'))
          .required(t('otp_required')),
      )
      .min(5, t('otp_complete'))
      .required(),
  });

  const handleLogin = async (values: { email: string; password: string }) => {
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

  // Configuración de Formik y Yup
  const formik = useFormik({
    initialValues: {
      otp: ['', '', '', '', ''],
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(
          Yup.string()
            .matches(/^[0-9]$/, t('auth.OTPVerification.otp_error'))
            .required(t('auth.OTPVerification.otp_required')),
        )
        .required()
        .min(5, t('auth.OTPVerification.otp_complete')),
    }),
    onSubmit: (values) => {
      // Aquí manejas la verificación del código
      console.log('OTP ingresado:', values.otp.join(''));
    },
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
                      {t('auth.OTPVerification.title')}
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
                      {t('auth.OTPVerification.body')}
                    </TextAtom>
                  </Box>

                  {/* Input de OTP */}
                  <form onSubmit={formik.handleSubmit}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center',
                        marginTop: '20px',
                      }}
                    >
                      {formik.values.otp.map((_, index) => (
                        <InputAtom
                          key={index}
                          type="text"
                          name={`otp[${index}]`}
                          variant="outlined"
                          maxLength="1"
                          value={formik.values.otp[index]}
                          onChange={formik.handleChange}
                          onFocus={(e) => e.target.select()}
                          style={{ width: '40px', textAlign: 'center' }}
                        />
                      ))}
                    </div>

                    {formik.errors.otp && (
                      <TextAtom variant="caption" color="error">
                        {formik.errors.otp}
                      </TextAtom>
                    )}
                  </form>
                </Grid>
                <Grid item xs={12}>
                  <ButtonAtom
                    type="submit"
                    variant="filled"
                    onClick={() => navigate('/password-reset-success')}
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      mt: 2,
                      width: '100%',
                      maxWidth: '328px',
                      Height: '328px',
                      textTransform: 'none',
                    }}
                  >
                    {t('auth.OTPVerification.verify_code')}
                  </ButtonAtom>
                </Grid>
                {/* Opción de reenviar */}
                <TextAtom
                  variant="body"
                  size="medium"
                  sx={{
                    textAlign: 'center',
                    textTransform: 'none',
                    marginTop: '20px',
                  }}
                >
                  {t('auth.OTPVerification.did_not_receive')}{' '}
                  <span style={{ color: 'blue', cursor: 'pointer' }}>
                    {t('auth.OTPVerification.resend')}
                  </span>
                </TextAtom>

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

export default OTPVerification;
