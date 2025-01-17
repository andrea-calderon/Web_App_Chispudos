import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, TextField } from '@mui/material';
import { ChevronLeft, CalendarToday, AccessTime } from '@mui/icons-material';
import { UserLayout } from '../../../../components/templates/UserLayout';
import TextAtom from '../../../../components/atoms/TextAtom';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import { useTranslation } from 'react-i18next';
import Footer from '../../../../components/organisms/Footer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';

export const TaskDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dateTime, serviceTitle } = location.state || {};

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isUpdated, setIsUpdated] = useState(false); // Estado para manejar los cambios
  const [userText, setUserText] = useState(''); // Estado para guardar el texto del usuario

  const styles = {
    marginLeft: isSmallScreen ? 4 : 24,
    marginRight: isSmallScreen ? 4 : 24,
  };

  if (!dateTime || !serviceTitle) {
    navigate(-1);
    return null;
  }

  const formattedDate = format(new Date(dateTime), 'EEEE - MMM dd, yyyy', {
    locale: es,
  });
  const formattedTime = format(new Date(dateTime), 'hh:mm a', { locale: es });

  const handleButtonClick = () => {
    setIsUpdated(true); // Actualiza el estado para mostrar los nuevos datos
  };

  return (
    <UserLayout>
      <Box
        sx={{
          backgroundColor: '#F3ECFF',
          paddingBottom: 5,
          width: '100vw',
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: 5,
              ...styles,
              cursor: 'pointer',
            }}
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
            <TextAtom variant="title" size="medium" sx={{ marginLeft: 1 }}>
              {t('services.serviceDetails.navigationTitle')}
            </TextAtom>
          </Box>
        </Grid>
      </Box>

      <Box sx={{ padding: '2rem', ...styles }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} lg={3}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src="https://picsum.photos/300/200?random=4"
                alt="Servicio"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                }}
              />
              <TextAtom variant="title" size="medium">
                {serviceTitle || 'Servicio'}
              </TextAtom>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <TextAtom
                variant="title"
                size="large"
                sx={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {!isUpdated
                  ? t('services.serviceDetails.title')
                  : t('services.serviceDetails.updatedTitle')}
              </TextAtom>
            </Box>
            <TextAtom variant="body" size="large" gutterBottom>
              {!isUpdated
                ? t('services.serviceDetails.description')
                : userText || t('services.serviceDetails.emptyMessage')}
            </TextAtom>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <TextAtom
                variant="title"
                size="large"
                sx={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {t('services.serviceDetails.time')}
              </TextAtom>
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}
            >
              <CalendarToday
                fontSize="small"
                sx={{ marginRight: 1, color: '#666' }}
              />
              <TextAtom variant="body" size="medium">
                {formattedDate}
              </TextAtom>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTime
                fontSize="small"
                sx={{ marginRight: 1, color: '#666' }}
              />
              <TextAtom variant="body" size="medium">
                {formattedTime}
              </TextAtom>
            </Box>
          </Grid>
        </Grid>

        {!isUpdated && (
          <Box sx={{ marginTop: '2rem', marginBottom: '4rem' }}>
            <TextField
              label={t('services.serviceDetails.textPlaceholder')}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              sx={{ marginY: '1rem' }}
              value={userText}
              onChange={(e) => setUserText(e.target.value)} // Guarda el texto ingresado por el usuario
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonAtom
                variant="filled"
                color="primary"
                onClick={handleButtonClick}
              >
                {t('services.serviceDetails.button')}
              </ButtonAtom>
            </Box>
          </Box>
        )}
      </Box>

      <Footer />
    </UserLayout>
  );
};
