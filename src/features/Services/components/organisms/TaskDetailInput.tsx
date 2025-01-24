import { Box, Grid, TextField } from '@mui/material';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import TextAtom from '../../../../components/atoms/TextAtom';
import { ChevronLeft, CalendarToday, AccessTime } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TaskDetailInput = ({
  date,
  time,
  serviceTitle,
  userText,
  setUserText,
  onComplete,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#F3ECFF',
          paddingBottom: 5,
          width: '100vw',
          px: { xs: 3, sm: 20, md: 20 },
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: 5,
              cursor: 'pointer',
            }}
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
            <TextAtom variant="title" size="medium" sx={{ marginLeft: 1 }}>
              {t('services.serviceDetails.navigationInput')}
            </TextAtom>
          </Box>
        </Grid>
      </Box>

      <Box sx={{ padding: '2rem', px: { xs: 3, sm: 20, md: 20 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src="https://picsum.photos/300/200?random=4"
                alt="Nombre del servicio"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
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
                {t('services.serviceDetails.title')}
              </TextAtom>
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextAtom variant="body" size="large" gutterBottom>
                {t('services.serviceDetails.description')}
              </TextAtom>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextAtom
              variant="title"
              size="large"
              sx={{ fontWeight: 'bold' }}
              gutterBottom
            >
              {t('services.serviceDetails.time')}
            </TextAtom>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarToday sx={{ marginRight: 1 }} />
              <TextAtom variant="body" size="medium">
                {date}
              </TextAtom>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTime sx={{ marginRight: 1 }} />
              <TextAtom variant="body" size="medium">
                {time}
              </TextAtom>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid item xs={12} md={12} sx={{ px: { xs: 3, sm: 20, md: 20 } }}>
        <TextField
          label={t('services.serviceDetails.label')}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{ marginY: '1rem' }}
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
            paddingBottom: 10,
          }}
        >
          <ButtonAtom
            variant="filled"
            color="primary"
            onClick={onComplete}
            disabled={!userText.trim()}
          >
            {t('services.serviceDetails.buttonInput')}
          </ButtonAtom>
        </Box>
      </Grid>
    </Box>
  );
};

export default TaskDetailInput;
