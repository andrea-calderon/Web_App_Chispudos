import React from 'react';
import { LandingLayout } from '../templates/LandingLayout';
import FeatureGuarantee from '../../components/organisms/FeatureGuarantee';
import FeatureTestimonials from '../../components/organisms/FeatureTestimonials';
import FeatureDownloadApp from '../../components/organisms/FeatureDownloadApp';
import Footer from '../../../../components/organisms/Footer';
import ListCategories from '../../../home/components/organisms/ListCategories';
import GroupedServices from '../../../home/components/organisms/GroupedServices';
import CategoriesSection from '../organisms/CategoriesSection';
import SearchForm from '../../../../components/organisms/SearchForm';
import NewsletterSubscription from '../../../../components/organisms/NewsletterSubscription';
import HeroSection from '../organisms/HeroSection';
import { useGetProductsQuery } from '../../../../services/productApi';
import { useProductServiceFilter } from '../../../../hooks/useProductServiceFilter';
import { Category } from '../../../../types/api/modelTypes';

export const LandingPage: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  const {
    filteredServices,
    filters,
    updateSearchTerm,
    updatePriceRange,
    updateCategories,
    updateMinRating,
    resetFilters,
    availableCategories,
    priceRange,
    filteredCount,
    totalCount,
  } = useProductServiceFilter(data?.data?.items || []);

  const [categoryItem, setCategoryItem] = React.useState<Category | null>(null);

  const handleCategoryClick = (category: Category) => {
    updateCategories([category.id]);
    setCategoryItem(category);
  };

  return (
    <LandingLayout>
      <HeroSection />
      <SearchForm />
      <ListCategories handleCategoryClick={handleCategoryClick} />
      <GroupedServices
        services={filteredServices}
        titleText={categoryItem?.name}
      />
      {/* <CategoriesSection /> */}
      <FeatureTestimonials />
      <FeatureGuarantee />
      <FeatureDownloadApp />
      <NewsletterSubscription />
      <Footer />
    </LandingLayout>
  );
};
