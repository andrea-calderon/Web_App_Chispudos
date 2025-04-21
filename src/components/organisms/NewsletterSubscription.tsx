import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import { useSubscribeToNewsletterMutation } from '../../services/mailchimpApi';

const NewsletterSubscription: React.FC = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [subscribeToNewsletter, { isLoading }] =
    useSubscribeToNewsletterMutation();

  const handleSubscribe = async () => {
    if (!email) {
      setError(true);
      return;
    }

    try {
      await subscribeToNewsletter(email).unwrap();
      setSuccess(true);
      setEmail(''); // Limpiar el campo de correo
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F3ECFF',
        paddingBottom: 15,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
    >
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={6} textAlign="center">
          <Typography variant="h6" sx={{ paddingTop: '80px' }}>
            {t('footer.title')}
          </Typography>
          <TextField
            variant="outlined"
            placeholder={t('footer.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mt: 2,
              width: '60%',
              borderColor: 'none',
              backgroundColor: 'white',
              borderRadius: '30px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent !important',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#5D50C6',
                        '& svg': {
                          color: 'white',
                        },
                      },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Snackbar para mensajes de éxito y error */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          {t('footer.successMessage')}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error">
          {t('footer.errorMessage')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsletterSubscription;
