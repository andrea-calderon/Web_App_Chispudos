import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import { ChevronLeft, CalendarToday, AccessTime } from '@mui/icons-material';
import { UserLayout } from '../../../../components/templates/UserLayout';
import TextAtom from '../../../../components/atoms/TextAtom';
import Footer from '../../../../components/organisms/Footer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import TaskDetailInput from '../organisms/TaskDetailInput';
import TaskDetailCompleted from '../organisms/TaskDetailCompleted';

export const TaskDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dateTime, serviceTitle } = location.state || {};

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isFormCompleted, setIsFormCompleted] = useState(false); // Estado para manejar el flujo
  const [userText, setUserText] = useState(''); // Texto ingresado por el usuario

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
              {isFormCompleted
                ? 'Revisar y confirmar'
                : 'Detalles del servicio'}
            </TextAtom>
          </Box>
        </Grid>
      </Box>

      <Box sx={{ padding: '2rem', ...styles }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
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
                {isFormCompleted ? 'Confirmación' : 'Ingresar detalles'}
              </TextAtom>
            </Box>

            {isFormCompleted ? (
              <TaskDetailCompleted userText={userText} />
            ) : (
              <TaskDetailInput
                userText={userText}
                setUserText={setUserText}
                onComplete={() => setIsFormCompleted(true)}
              />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <TextAtom
                variant="title"
                size="large"
                sx={{ fontWeight: 'bold' }}
                gutterBottom
              >
                Fecha y hora
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
      </Box>

      <Footer />
    </UserLayout>
  );
};
