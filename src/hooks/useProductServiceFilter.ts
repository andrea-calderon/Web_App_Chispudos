import { useState, useMemo, useCallback } from 'react';
import { ProductService, Category } from '../types/api/modelTypes';

export type FilterOptions = {
  searchTerm: string;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  categories: number[];
  locationIds: number[];
  minRating: number | null;
  sortBy: 'price_asc' | 'price_desc' | 'rating' | 'newest' | null;
  type: number | null;
};

const initialFilterOptions: FilterOptions = {
  searchTerm: '',
  priceRange: {
    min: null,
    max: null,
  },
  categories: [],
  locationIds: [],
  minRating: null,
  sortBy: null,
  type: null,
};

export const useProductServiceFilter = (services: ProductService[] = []) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilterOptions);

  // Update filter functions
  const updateSearchTerm = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  }, []);

  const updatePriceRange = useCallback((min: number | null, max: number | null) => {
    setFilters(prev => ({ ...prev, priceRange: { min, max } }));
  }, []);

  const updateCategories = useCallback((categories: number[]) => {
    setFilters(prev => ({ ...prev, categories }));
  }, []);

  const updateLocations = useCallback((locationIds: number[]) => {
    setFilters(prev => ({ ...prev, locationIds }));
  }, []);

  const updateMinRating = useCallback((minRating: number | null) => {
    setFilters(prev => ({ ...prev, minRating }));
  }, []);

  const updateSortBy = useCallback((sortBy: FilterOptions['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const updateType = useCallback((type: number | null) => {
    setFilters(prev => ({ ...prev, type }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilterOptions);
  }, []);

  // Apply all filters
  const filteredServices = useMemo(() => {
    // Start with all services
    let result = [...services];

    // Apply text search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(service => 
        service.name.toLowerCase().includes(searchLower) || 
        service.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply price range filter
    if (filters.priceRange.min !== null) {
      result = result.filter(service => service.price >= (filters.priceRange.min || 0));
    }
    if (filters.priceRange.max !== null) {
      result = result.filter(service => service.price <= (filters.priceRange.max || Infinity));
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(service => 
        service.categories.some(category => filters.categories.includes(category.id))
      );
    }

    // Apply location filter
    if (filters.locationIds.length > 0) {
      result = result.filter(service => 
        service.locations.some(location => filters.locationIds.includes(location.cityId))
      );
    }

    // Apply rating filter
    if (filters.minRating !== null) {
      result = result.filter(service => service.averageRating >= (filters.minRating || 0));
    }

    // Apply type filter
    if (filters.type !== null) {
      result = result.filter(service => service.type === filters.type);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.averageRating - a.averageRating);
          break;
        case 'newest':
          result.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
      }
    }

    return result;
  }, [services, filters]);

  // Extracting available filters from data
  const availableCategories = useMemo(() => {
    const categoryMap = new Map<number, Category>();
    services.forEach(service => {
      service.categories.forEach(category => {
        if (!categoryMap.has(category.id)) {
          categoryMap.set(category.id, category);
        }
      });
    });
    return Array.from(categoryMap.values());
  }, [services]);

  const availableLocations = useMemo(() => {
    const locationMap = new Map<number, { id: number, name: string }>();
    services.forEach(service => {
      service.locations.forEach(location => {
        if (!locationMap.has(location.cityId)) {
          locationMap.set(location.cityId, { 
            id: location.cityId, 
            name: location.name 
          });
        }
      });
    });
    return Array.from(locationMap.values());
  }, [services]);

  const priceRange = useMemo(() => {
    if (services.length === 0) return { min: 0, max: 0 };
    
    let min = services[0].price;
    let max = services[0].price;
    
    services.forEach(service => {
      if (service.price < min) min = service.price;
      if (service.price > max) max = service.price;
    });
    
    return { min, max };
  }, [services]);

  return {
    filteredServices,
    filters,
    updateSearchTerm,
    updatePriceRange,
    updateCategories,
    updateLocations,
    updateMinRating,
    updateSortBy,
    updateType,
    resetFilters,
    availableCategories,
    availableLocations,
    priceRange,
    totalCount: services.length,
    filteredCount: filteredServices.length
  };
};