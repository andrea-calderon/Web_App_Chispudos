import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserLayout } from '../../../../components/templates/UserLayout';
import { Box, Typography } from '@mui/material';
import { useSearchServicesFormData } from '../../../../context/SearchContext';
import ServicesList from '../organisms/ServicesList';
import SearchBar from '../../../../components/organisms/SearchBar';
import { useGetProductsQuery } from '../../../../services/productApi';
import RecommendedServices from '../../../home/components/organisms/RecommendedServices';
import { ProductService } from '../../../../types/api/modelTypes';
import SearchForm from '../../../../components/organisms/SearchForm';

export const SearchServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchData } = useSearchServicesFormData();
  const [filteredResults, setFilteredResults] = useState([]);
  const { data: allServices, isLoading } = useGetProductsQuery();

  const [favorites, setFavorites] = useState<ProductService[]>(() => {
    return JSON.parse(localStorage.getItem('favoriteServices') || '[]');
  });

  
  const toggleFavorite = (service: ProductService) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === service.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== service.id);
    } else {
      updatedFavorites = [...favorites, service];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteServices', JSON.stringify(updatedFavorites));
  };

  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    if (!allServices?.data.items?.length) return;
    let results = allServices?.data?.items || [];

    if (selectedCategory) {
      const selectedCategoryId = parseInt(selectedCategory, 10);
      results = results.filter((service) =>
        service.categories?.some(
          (category) => category.id === selectedCategoryId,
        ),
      );
    }

    if (searchData?.service?.length) {
      results = results.filter((service) =>
        searchData.service.includes(service.categories?.[0]?.name),
      );
    }

    if (searchData?.location?.length) {
      results = results.filter((service) =>
        searchData.location.includes(service.location),
      );
    }

    if (searchData?.priceRange) {
      const { min, max } = searchData.priceRange;
      results = results.filter(
        (service) => service.pricePerHour >= min && service.pricePerHour <= max,
      );
    }

    setFilteredResults(results);
  }, [searchData, allServices, selectedCategory]);

  if (isLoading) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h6">Cargando servicios...</Typography>
        </Box>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {/* <SearchBar /> */}
      <SearchForm />
      <Box sx={{ padding: 4 }}>
        {filteredResults.length > 0 ? (
          <ServicesList
            professionals={filteredResults}
            favorites={favorites.map((fav) => fav.id)} // Pasar solo los IDs de favoritos
            onToggleFavorite={(id) => {
              const service = filteredResults.find((s) => s.id === id);
              if (service) toggleFavorite(service);
            }}
            onServiceClick={(id) => navigate(`/services/${id}`)}
          />
        ) : (
          <Typography variant="h6" color="textSecondary">
            No se encontraron resultados.
          </Typography>
        )}
      </Box>
      <RecommendedServices />
    </UserLayout>
  );
};

export default SearchServicesPage;
