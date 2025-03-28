import React from 'react';
import { UserLayout } from '../../../../components/templates/UserLayout';
import HighlightedCategories from '../organisms/Categories';
import SearchForm from '../../../../components/organisms/SearchForm';
import NewsletterSubscription from '../../../../components/organisms/NewsletterSubscription';
import RecommendedServices from '../organisms/RecommendedServices';
import { Box } from '@mui/material';

export const HomePage: React.FC = () => {
  return (
    <UserLayout>
      <HighlightedCategories />
      <SearchForm />
      <RecommendedServices />
      <NewsletterSubscription />
    </UserLayout>
  );
};

export default HomePage;
