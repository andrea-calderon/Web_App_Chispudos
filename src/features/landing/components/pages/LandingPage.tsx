import { Box, Grid2 } from '@mui/material';
import { LandingLayout } from '../templates/LandingLayout';
import { PersonAppImage } from '../../../../components/atoms/';
import { LandingForm } from '../organisms';

export const LandingPage = () => {
  return (
    <LandingLayout>
      <Grid2 container spacing={2} margin={3}>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }} mt={10}>
          <LandingForm />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <PersonAppImage />
          </Box>
        </Grid2>
      </Grid2>
    </LandingLayout>
  );
};
