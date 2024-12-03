import React from 'react';
import { UserLayout } from '../../../../components/templates/UserLayout';
import { Box } from '@mui/material';
import Footer from '../../../../components/organisms/Footer';
import SearchBar from '../../../../components/organisms/SearchBar';
import { useGetProductsQuery } from '../../../../services/api'; // Hook generado por RTK Query
import ProfessionalList from '../organisms/ProfessionalList';

export const SearchProfessionalPage: React.FC = () => {
  // Hook de RTK Query para obtener datos
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <h2>Cargando profesionales...</h2>
        </Box>
      </UserLayout>
    );
  }

  if (isError) {
    return (
      <UserLayout>
        <Box sx={{ padding: 4 }}>
          <h2 style={{ color: 'red' }}>
            Error al cargar los datos. Intenta de nuevo.
          </h2>
        </Box>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {/* Barra de búsqueda */}
      <SearchBar />

      {/* Lista de profesionales */}
      <Box sx={{ padding: 4 }}>
        <ProfessionalList professionals={products || []} />
      </Box>

      {/* Pie de página */}
      <Footer />
    </UserLayout>
  );
};
