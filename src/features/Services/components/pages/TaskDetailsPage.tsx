import { useLocation } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { UserLayout } from '../../../../components/templates/UserLayout';
import Footer from '../../../../components/organisms/Footer';

export const TaskDetailsPage = () => {
  const location = useLocation();
  const { dateTime, serviceTitle } = location.state || {};

  return (
    <UserLayout>
      <Box
        sx={{
          backgroundColor: '#F3ECFF',
          paddingBottom: 5,
          width: '100vw',
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: 5,
              marginLeft: 5,
            }}
          >
            <ChevronLeft />
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
              Detalles de la tarea
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h5" gutterBottom>
          {serviceTitle || 'Servicio'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          ¡Estás casi listo! Comparte algunos detalles para preparar a tu
          Especialista para el trabajo.
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Hora y fecha:</strong>{' '}
          {dateTime ? dateTime.toString() : 'No seleccionada'}
        </Typography>
        <TextField
          label="Escribe algo..."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{ marginY: '1rem' }}
        />
        <Button variant="contained" color="primary">
          Completar solicitud
        </Button>
      </Box>
      <Footer />
    </UserLayout>
  );
};
