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
  TextField,
} from '@mui/material';
import { ServiceHeader } from '../organisms/ServiceDetailHeader';
import { ServiceSkills } from '../organisms/ServiceDetailSkills';
import { ServiceProjects } from '../organisms/ServiceDetailProjects';
import { ServiceReviews } from '../organisms/ServiceDetailReviews';
import { ServiceOtherSkills } from '../organisms/ServiceDetailOtherSkills';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useTranslation } from 'react-i18next';
import { useDateValidation } from '../../../../hooks/useDateValidation';
import CustomError from '../../../../utils/CustomError';
import { ModalComponent } from '../../../../components/molecules';

export const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, isError } = useGetProductByIdQuery(id!);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const { isDateEnabled } = useDateValidation({
    disabledDates: [
      new Date(2025, 0, 1),
      new Date(2025, 4, 1),
      new Date(2025, 5, 30),
      new Date(2025, 7, 15),
      new Date(2025, 8, 15),
      new Date(2025, 9, 20),
      new Date(2025, 10, 1),
      new Date(2025, 11, 25),
    ],
    disableWeekends: true,
    customValidation: (date) => {
      const month = date.getMonth();
      const day = date.getDate();
      if (month === 3 && day >= 17 && day <= 20) {
        return false;
      }
      return true;
    },
  });

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
    throw new CustomError('500', 'Server or API Error:  Try again later', 'Go Back', () => navigate('/'));
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

      <ModalComponent open={openModal} onClose={handleCloseModal} title={t('services.serviceDetails.dateModalTitle')}
      onConfirm={handleConfirm}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time"
              value={selectedDateTime}
              onChange={(newValue) => setSelectedDateTime(newValue)}
              shouldDisableDate={(date) =>
                !isDateEnabled(date.toDate()) || date.isBefore(dayjs(), 'day')
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
      </ModalComponent>

      <Footer />
    </UserLayout>
  );
};

export default ServiceDetailPage;
