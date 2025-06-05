import { LandingLayout } from '../templates/LandingLayout';
import FeatureGuarantee from '../../components/organisms/FeatureGuarantee';
import FeatureTestimonials from '../../components/organisms/FeatureTestimonials';
import FeatureDownloadApp from '../../components/organisms/FeatureDownloadApp';
import Footer from '../../../../components/organisms/Footer';
import ListCategories from '../../../home/components/organisms/ListCategories';
import CategoriesSection from '../organisms/CategoriesSection';
import SearchForm from '../../../../components/organisms/SearchForm';
import NewsletterSubscription from '../../../../components/organisms/NewsletterSubscription';

export const LandingPage = () => {
  return (
    <LandingLayout>
      <SearchForm />
      <ListCategories />
      <CategoriesSection />
      <FeatureGuarantee />
      <FeatureTestimonials />
      <FeatureDownloadApp />
      <NewsletterSubscription />
      <Footer />
    </LandingLayout>
  );
};
