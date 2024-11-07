import React, { useState, useEffect, useMemo } from 'react';
import {
  TextField,
  IconButton,
  Chip,
  Box,
  Typography,
  Stack,
  Menu,
  MenuItem,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

type FilterType = {
  [key: string]: string[];
};

//const URL_DE_LA_API='';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [filteredResults, setFilteredResults] = useState<
    { name: string; details: string }[]
  >([]);
  const [allResults, setAllResults] = useState<
    { name: string; details: string }[]
  >([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  //Ejemplos hardcodeados para pruebas
  const initialResults = useMemo(
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
        details: 'Apertura de puertas e instalación de cerraduras',
      },
      {
        name: 'Técnico de Aire Acondicionado',
        details: 'Instalación y mantenimiento de equipos de aire acondicionado',
      },
      { name: 'Limpiador', details: 'Limpieza de casas y oficinas' },
      { name: 'Diseñador Gráfico', details: 'Diseño de logotipos y branding' },
      { name: 'Ubicacion', details: 'San José Pinula' },
    ],
    [],
  );

  useEffect(() => {
    {
      /*const fetchData = async () => {
      try {
        const response = await fetch('URL_DE_LA_API'); // Reemplazar con la URL de la API
        const data = await response.json();
        setAllResults(data); // Ajustar esto según la estructura de respuesta de la API
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();*/
    }
    setAllResults(initialResults);
  }, [initialResults]);

  // Filtros de ejemplo hardcodeados
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
      Ubicación: ['San José Pinula', 'Tecpán', 'Ciudad de Guatemala'], //Esto es solo demostrativo.
    }),
    [],
  );

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const availableOptions = useMemo(() => {
    const options = Object.keys(allFilters).filter((filter) =>
      filter.toLowerCase().includes(lowerCaseSearchTerm),
    );

    Object.entries(allFilters).forEach(([key, subCategories]) => {
      subCategories.forEach((subCategory) => {
        if (
          subCategory.toLowerCase().includes(lowerCaseSearchTerm) &&
          !options.includes(key)
        ) {
          options.push(key);
        }
      });
    });

    return options;
  }, [lowerCaseSearchTerm, allFilters]);

  useEffect(() => {
    const filtered = allResults.filter((result) => {
      const matchesSearchTerm =
        result.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        result.details.toLowerCase().includes(lowerCaseSearchTerm);

      return matchesSearchTerm;
    });

    const uniqueResults = filtered.reduce<{ name: string; details: string }[]>(
      (acc, current) => {
        const x = acc.find((item) => item.name === current.name);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      },
      [],
    );

    setResultsCount(uniqueResults.length);
    setFilteredResults(uniqueResults);
  }, [lowerCaseSearchTerm, appliedFilters, allResults, allFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteFilter = (filterToDelete: string) => {
    setAppliedFilters(
      appliedFilters.filter((filter) => filter !== filterToDelete),
    );
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const handleFilterSelect = (filter: string) => {
    if (!appliedFilters.includes(filter)) {
      setAppliedFilters((prev) => [...prev, filter]);
    }
    handleCloseMenu();
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f4ecff',
        maxWidth: 'auto',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Buscar especialista
      </Typography>

      <Box
        sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '576px' }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleMenuClick}
                sx={{ backgroundColor: '#5D50C6', color: 'white' }}
              >
                <FilterListIcon />
              </IconButton>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            borderRadius: '50px',
            paddingRight: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Box>

      {searchTerm && (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {appliedFilters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onDelete={() => handleDeleteFilter(filter)}
                sx={{
                  backgroundColor: '#6750A4',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                  },
                }}
              />
            ))}
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {availableOptions.map((filter) => (
              <div key={filter}>
                <MenuItem onClick={() => handleCategorySelect(filter)}>
                  {filter}
                </MenuItem>
                {selectedCategory === filter && (
                  <Box sx={{ pl: 4 }}>
                    {allFilters[filter].map((subCategory) => (
                      <MenuItem
                        key={subCategory}
                        onClick={() => handleFilterSelect(subCategory)}
                      >
                        {subCategory}
                      </MenuItem>
                    ))}
                  </Box>
                )}
              </div>
            ))}
          </Menu>

          <Box sx={{ width: '100%' }}>
            {filteredResults.map((result) => (
              <Typography key={result.name} sx={{ mb: 1 }}>
                {result.name} - {result.details}
              </Typography>
            ))}
          </Box>

          <Typography sx={{ color: 'gray' }}>
            {resultsCount} resultados para "{searchTerm || '...'}"
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SearchBar;
