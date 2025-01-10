import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../../services/api';
import { UserLayout } from '../../../../components/templates/UserLayout';
import Footer from '../../../../components/organisms/Footer';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import { ServiceHeader } from '../organisms/ServiceDetailHeader';
import { ServiceSkills } from '../organisms/ServiceDetailSkills';
import { ServiceProjects } from '../organisms/ServiceDetailProjects';
import { ServiceReviews } from '../organisms/ServiceDetailReviews';
import { ServiceOtherSkills } from '../organisms/ServiceDetailOtherSkills';

export const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, isError } = useGetProductByIdQuery(id!);

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
      <Footer />
    </UserLayout>
  );
};

export default ServiceDetailPage;
