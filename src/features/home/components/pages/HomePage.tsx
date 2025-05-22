import React from 'react';
import { UserLayout } from '../../../../components/templates/UserLayout';
import HighlightedCategories from '../organisms/Categories';
import SearchForm from '../../../../components/organisms/SearchForm';
import NewsletterSubscription from '../../../../components/organisms/NewsletterSubscription';
import RecommendedServices from '../organisms/RecommendedServices';

export const HomePage: React.FC = () => {
  return (
    <UserLayout>
      <SearchForm />
      <HighlightedCategories />
      <RecommendedServices />
      <NewsletterSubscription />
    </UserLayout>
  );
};

export default HomePage;
