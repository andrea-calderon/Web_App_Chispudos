import React, { useState, useEffect, useMemo } from 'react';
import {
  TextField,
  IconButton,
  Chip,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

type FilterType = {
  [key: string]: string[];
};

const SearchBarWithFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [availableFilters, setAvailableFilters] = useState<string[]>([]);
  const [resultsCount, setResultsCount] = useState(0);

  // Datos de ejemplo para los resultados
  const allResults = useMemo(
    () => [
      { name: 'Plomero', details: 'Reparación de tuberías' },
      { name: 'Electricista', details: 'Instalación eléctrica' },
      { name: 'Carpintero', details: 'Restauración de muebles' },
      { name: 'Pintor', details: 'Pintura interior y exterior' },
      { name: 'Jardinero', details: 'Diseño y mantenimiento de jardines' },
      {
        name: 'Fontanero',
        details: 'Desatascos y mantenimiento de sistemas de agua',
      },
      {
        name: 'Cerrajero',
        details: 'Apertura de puertas y instalación de cerraduras',
      },
      {
        name: 'Técnico de Aire Acondicionado',
        details: 'Instalación y mantenimiento de equipos de aire acondicionado',
      },
      { name: 'Limpiador', details: 'Limpieza de casas y oficinas' },
      { name: 'Diseñador Gráfico', details: 'Diseño de logotipos y branding' },
    ],
    [],
  );

  // Usar useMemo para definir allFilters

  const allFilters: FilterType = useMemo(
    () => ({
      Plomero: [
        'Reparación de tuberías',
        'Instalación de grifos',
        'Filtraciones en la cocina',
      ],
      Electricista: [
        'Instalación eléctrica',
        'Reparación de enchufes',
        'Mantenimiento de sistemas eléctricos',
      ],
      Carpintero: [
        'Restauración de muebles',
        'Construcción de estanterías',
        'Reparación de puertas',
      ],
      Pintor: ['Pintura interior', 'Pintura exterior', 'Acabado de paredes'],
      Jardinero: [
        'Cuidado del césped',
        'Poda de árboles',
        'Diseño de jardines',
      ],
      Fontanero: [
        'Desatascos',
        'Reparación de cañerías',
        'Instalación de sanitarios',
      ],
      Cerrajero: [
        'Apertura de puertas',
        'Instalación de cerraduras',
        'Reparación de cerraduras',
      ],
      'Técnico de Aire Acondicionado': [
        'Instalación de aire acondicionado',
        'Reparación de unidades',
        'Mantenimiento de equipos',
      ],
      Limpiador: [
        'Limpieza de casas',
        'Limpieza de oficinas',
        'Limpieza post obra',
      ],
      'Diseñador Gráfico': [
        'Diseño de logotipos',
        'Diseño de folletos',
        'Identidad corporativa',
      ],
    }),
    [],
  );

  // Actualizar los filtros disponibles según el término de búsqueda
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filters = Object.keys(allFilters).filter((filter) =>
      filter.toLowerCase().includes(lowerCaseSearchTerm),
    );
    const availableOptions = filters.flatMap((filter) => allFilters[filter]);
    setAvailableFilters(availableOptions);

    // Filtrar los resultados en función del término de búsqueda y los filtros aplicados
    const filteredResults = allResults.filter((result) => {
      const matchesSearchTerm =
        result.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        result.details.toLowerCase().includes(lowerCaseSearchTerm);
      const matchesFilters =
        appliedFilters.length === 0 || appliedFilters.includes(result.name);
      return matchesSearchTerm && matchesFilters;
    });
    setResultsCount(filteredResults.length); // Actualizar el contador de resultados
  }, [searchTerm, appliedFilters, allResults, allFilters]); // Añadido allFilters a las dependencias

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteFilter = (filterToDelete: string) => {
    setAppliedFilters(
      appliedFilters.filter((filter) => filter !== filterToDelete),
    );
  };

  const handleClearFilters = () => {
    setAppliedFilters([]); // Limpiar todos los filtros
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f4ecff',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Buscar especialista
      </Typography>

      {/* Campo de búsqueda */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    if (searchTerm && !appliedFilters.includes(searchTerm)) {
                      setAppliedFilters((prev) => [...prev, searchTerm]);
                    }
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            borderRadius: '50px',
            paddingRight: 1,
          }}
        />
      </Box>

      {/* Filtros aplicados */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {appliedFilters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            onDelete={() => handleDeleteFilter(filter)}
            sx={{ backgroundColor: '#7a4cec', color: 'white' }}
          />
        ))}
      </Stack>

      {/* Botón para limpiar filtros */}
      {appliedFilters.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <IconButton onClick={handleClearFilters} sx={{ color: 'red' }}>
            Limpiar Filtros
          </IconButton>
        </Box>
      )}

      {/* Filtros disponibles según la búsqueda */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {availableFilters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            onClick={() => setAppliedFilters([...appliedFilters, filter])}
            sx={{ backgroundColor: '#7a4cec', color: 'white' }}
          />
        ))}
      </Stack>

      {/* Número de resultados */}
      <Typography sx={{ color: 'gray' }}>
        {resultsCount} resultados para "{searchTerm || '...'}"
      </Typography>
    </Box>
  );
};

export default SearchBarWithFilters;
