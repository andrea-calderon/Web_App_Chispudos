import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetProductByIdQuery } from '../../../../services/api';
import { useNavigate } from 'react-router-dom';
import { UserLayout } from '../../../../components/templates/UserLayout';
import Footer from '../../../../components/organisms/Footer';
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Modal,
  TextField,
} from '@mui/material';
import { ServiceHeader } from '../organisms/ServiceDetailHeader';
import { ServiceSkills } from '../organisms/ServiceDetailSkills';
import { ServiceProjects } from '../organisms/ServiceDetailProjects';
import { ServiceReviews } from '../organisms/ServiceDetailReviews';
import { ServiceOtherSkills } from '../organisms/ServiceDetailOtherSkills';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ButtonAtom, TextAtom } from '../../../../components/atoms';
import { useTranslation } from 'react-i18next';

export const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, isError } = useGetProductByIdQuery(id!);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleConfirm = () => {
    if (selectedDateTime) {
      navigate('/service-details', {
        state: {
          dateTime: selectedDateTime.toISOString(),
          serviceTitle: service.name,
        },
      });
    } else {
      alert('Please select a date and time.');
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (isLoading) {
    return (
      <UserLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </UserLayout>
    );
  }

  if (isError || !service) {
    return (
      <UserLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography variant="h6" color="error">
            Error loading service details. Please try again.
          </Typography>
        </Box>
      </UserLayout>
    );
  }

  const title = service.name || 'Service not available';
  const providerName = `${service.user?.name || 'Unknown'} ${service.user?.lastname || ''}`;
  const rating = service.averageRating || 0;
  const image = service.image || 'https://picsum.photos/300/200?random=4';

  return (
    <UserLayout>
      <ServiceHeader
        title={title}
        providerName={providerName}
        rating={rating}
        image={image}
        onOpenModal={handleOpenModal}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box>
            <ServiceSkills skills={service.details || []} />
            <ServiceProjects projects={service.recentProjects || []} />
            <ServiceOtherSkills skills={service.otherSkills || []} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <ServiceReviews reviews={service.reviews || []} />
          </Box>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            width: { xs: '400px', md: '550px' },
            height: { xs: '400px', md: '300px' },
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '0 0 12px 12px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '8px',
              backgroundColor: '#6750A4',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <Box mb={2}>
            <TextAtom variant="title" size="large" sx={{ fontWeight: 'bold' }}>
              {t('services.serviceDetails.dateModalTitle')}
            </TextAtom>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time"
              value={selectedDateTime}
              onChange={(newValue) => setSelectedDateTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
          <Box display="flex" justifyContent="center" mt={8}>
            <ButtonAtom
              onClick={handleCloseModal}
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              Cancel
            </ButtonAtom>
            <ButtonAtom
              variant="filled"
              color="primary"
              onClick={handleConfirm}
            >
              Confirm
            </ButtonAtom>
          </Box>
        </Box>
      </Modal>

      <Footer />
    </UserLayout>
  );
};

export default ServiceDetailPage;
