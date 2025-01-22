import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import TextAtom from '../../../../components/atoms/TextAtom';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import { ChevronLeft, CalendarToday, AccessTime } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const TaskDetailCompleted = ({
  date,
  time,
  serviceTitle,
  userText,
  onBack,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
            onClick={onBack}
          >
            <ChevronLeft />
            <TextAtom variant="title" size="medium" sx={{ marginLeft: 1 }}>
              {t('services.serviceDetails.navigationCompleted')}
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
        <Grid item xs={12} md={4}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', mb: 2, paddingTop: 4 }}
          >
            <Avatar
              src="https://lh3.googleusercontent.com/a/ACg8ocIEcCjaPZfcofU7GrGn2o4sSDLCnf6iO6Llr3L-mwXoV4vXWRs=s576-c-no"
              alt="User Profile"
              sx={{ width: 50, height: 50, marginRight: 2 }}
            />
            <Box
              sx={{
                backgroundColor: '#F9F5FF',
                borderRadius: '16px',
                padding: '1rem',
                maxWidth: '100%',
              }}
            >
              <TextAtom variant="body" size="medium" gutterBottom>
                {userText || t('services.serviceDetails.emptyMessage')}
              </TextAtom>
            </Box>
          </Box>
          <Box
            sx={{
              paddingTop: 1,
              paddingBottom: 10,
              paddingLeft: 8,
            }}
          >
            <ButtonAtom
              variant="filled"
              color="primary"
              onClick={handleOpenModal}
            >
              {t('services.serviceDetails.buttonCompleted')}
            </ButtonAtom>
          </Box>
        </Grid>
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            backgroundColor: '#EEE8F4',
            borderRadius: '16px',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
          <Avatar
            src="https://picsum.photos/300/200?random=4"
            alt="Service Profile"
            sx={{ width: 70, height: 70 }}
          />
        </Box>
        <DialogTitle
          sx={{
            display: 'flex',
            textAlign: 'center',
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <TextAtom variant="title" size="large">
            {t('services.serviceDetails.confirmationTitle')}
          </TextAtom>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            textAlign: 'center',
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <TextAtom variant="body" size="medium">
            {t('services.serviceDetails.confirmationMessage')}
          </TextAtom>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 8,
          }}
        >
          <ButtonAtom
            onClick={handleCloseModal}
            variant="filled"
            color="primary"
          >
            {t('services.serviceDetails.continueButton')}
          </ButtonAtom>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDetailCompleted;
