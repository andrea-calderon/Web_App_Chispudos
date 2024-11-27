import { LandingLayout } from '../templates/LandingLayout';
import FeatureGuarantee from '../../components/organisms/FeatureGuarantee';
import FeatureTestimonials from '../../components/organisms/FeatureTestimonials';
import FeatureDownloadApp from '../../components/organisms/FeatureDownloadApp';
import Footer from '../../../../components/organisms/Footer';
import HighlightedCategories from '../../../home/components/organisms/Categories';
import CategoriesSection from '../organisms/CategoriesSection';
import SearchForm from '../../../../components/organisms/SearchForm';

export const LandingPage = () => {
  return (
    <LandingLayout>
      <HighlightedCategories />
      <SearchForm />

      <FeatureGuarantee />
      <FeatureTestimonials />
      <FeatureDownloadApp />
      <Footer />
    </LandingLayout>
  );
};
