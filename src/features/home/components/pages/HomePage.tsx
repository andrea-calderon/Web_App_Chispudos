import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../redux/slices/authSlice';
import { UserLayout } from '../../../../components/templates/UserLayout';
import ListCategories from '../organisms/ListCategories';
import SearchForm from '../../../../components/organisms/SearchForm';
import NewsletterSubscription from '../../../../components/organisms/NewsletterSubscription';
import GroupedServices from '../organisms/GroupedServices';
import { Category } from '../../../../types/api/modelTypes';
import WelcomeBanner from '../organisms/WelcomeBanner';
import { useProductsServiceFilters } from '../../../../hooks/useProductsServiceFilters';
import { useProductServiceFilterData } from '../../../../hooks/useProductServiceFilterData';

export const HomePage: React.FC = () => {
  const { user } = useSelector(selectAuth);

  const userName = user?.name || 'Usuario';

   const {
      updateCategories,
    } = useProductsServiceFilters();

  const {
      filteredServices,
    } = useProductServiceFilterData();

  const [categoryItem, setCategoryItem] = React.useState<Category | null>(null);

  const handleCategoryClick = (category: Category) => {
    updateCategories([category.id]);
    setCategoryItem(category);
  };
  return (
    <UserLayout>
      <WelcomeBanner userName={userName} />
      <SearchForm />
      <ListCategories handleCategoryClick={handleCategoryClick} />
      <GroupedServices
        services={filteredServices}
        titleText={categoryItem?.name}
      />
      <NewsletterSubscription />
    </UserLayout>
  );
};

export default HomePage;
