import {
  Box,
  Grid,
} from '@mui/material';
import TextAtom from '../../../../components/atoms/TextAtom';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import { ChevronLeft, CalendarToday, AccessTime } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useCreateOrderMutation } from '../../../../services/ordersApi';
import { ModalComponent } from '../../../../components/molecules';

const TaskDetailCompleted = ({ date, dateTime, time, service, userText, onBack }) => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = async () => {
    const body = {
      userId: 1,
      totalAmount: service.price,
      status: 1, //active /complted/ //cancel
      comment: 'This is a test order',
      startDate: dateTime,
      endDate: '2025-02-20T00:00:00.000Z',
      details: [
        {
          productServiceId: service.id,
          quantity: 1,
          price: service.price,
          discount: 0,
          charge: 0,
          comment: userText,
        },
      ],
    };
    await createOrder(body);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate('/businessProfile');
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
                {service?.name || 'Servicio'}
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
              onClick={handleConfirm}
            >
              {t('services.serviceDetails.buttonCompleted')}
            </ButtonAtom>
          </Box>
        </Grid>
      </Box>
      <ModalComponent
        open={openModal}
        onConfirm={handleCloseModal}
        onClose={handleCloseModal}
        hideCancelbutton
        title={t('services.serviceDetails.confirmationTitle')}
        confirmButtonText={t('services.serviceDetails.continueButton')}

      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            src="https://picsum.photos/300/200?random=4"
            alt="Service Profile"
            sx={{ width: 70, height: 70 }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            px: 5,
            pt: 5,
          }}
        >
          <TextAtom variant="body" size="medium">
            {t('services.serviceDetails.confirmationMessage')}
          </TextAtom>
        </Box>
       </ModalComponent>
    </Box>
  );
};

export default TaskDetailCompleted;
