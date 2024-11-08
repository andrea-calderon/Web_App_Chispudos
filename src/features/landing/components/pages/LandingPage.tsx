import { Box, Grid2 } from '@mui/material';
import { LandingLayout } from '../templates/LandingLayout';
import { PersonAppImage } from '../../../../components/atoms/';
import { LandingForm } from '../organisms';
import FeatureGuarantee from '../../components/organisms/FeatureGuarantee';
import FeatureTestimonials from '../../components/organisms/FeatureTestimonials';
import FeatureDownloadApp from '../../components/organisms/FeatureDownloadApp';
import Footer from '../../../../components/organisms/Footer';
import HighlightedCategories from '../../../home/components/organisms/Categories';

export const LandingPage = () => {
  return (
    <LandingLayout>
      <HighlightedCategories />
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
      <FeatureGuarantee />
      <FeatureTestimonials />
      <FeatureDownloadApp />
      <Footer />
    </LandingLayout>
  );
};
