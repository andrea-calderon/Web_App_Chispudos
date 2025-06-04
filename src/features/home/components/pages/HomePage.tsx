import React from 'react';
import { UserLayout } from '../../../../components/templates/UserLayout';
import ListCategories from '../organisms/ListCategories';
import SearchForm from '../../../../components/organisms/SearchForm';
import NewsletterSubscription from '../../../../components/organisms/NewsletterSubscription';
import GroupedServices from '../organisms/GroupedServices';
import { useGetProductsQuery } from '../../../../services/productApi';
import { useProductServiceFilter } from '../../../../hooks/useProductServiceFilter';

export const HomePage: React.FC = () => {
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
      totalCount
    } = useProductServiceFilter(data?.data?.items || []);

    const handleCategoryClick = (categoryId: number) => {
      updateCategories([categoryId]);
    }
  return (
    <UserLayout>
      <SearchForm />
      <ListCategories handleCategoryClick={handleCategoryClick} />
      <GroupedServices services={filteredServices}  />
      <NewsletterSubscription />
    </UserLayout>
  );
};

export default HomePage;
