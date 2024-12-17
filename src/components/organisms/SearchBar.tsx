import React, { useState, useContext } from 'react';
import {
  TextField,
  IconButton,
  Chip,
  Box,
  Typography,
  Stack,
  Menu,
  MenuItem,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Slider,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { SearchContext } from '../../context/SearchContext';
import { useGetProductsQuery } from '../../services/api';

const SearchBar = () => {
  const { filters, setFilters, handleLocationChange, handlePriceChange } =
    useContext(SearchContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Fetch data from the endpoint based on filters
  const { data: products, isLoading, error } = useGetProductsQuery(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      textSearch: e.target.value,
    }));
  };

  const handleDeleteFilter = (filterToDelete: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: prevFilters.categories.filter(
        (category) => category !== filterToDelete,
      ),
    }));
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: [...prevFilters.categories, filter],
    }));
    handleCloseMenu();
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f4ecff',
        maxWidth: '100%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Buscar servicio o producto
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar..."
          value={filters?.textSearch}
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
          }}
        />
      </Box>

      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
        {filters?.categories.map((filter) => (
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
        {isLoading ? (
          <MenuItem>
            <CircularProgress size={24} />
          </MenuItem>
        ) : error ? (
          <MenuItem>Error al cargar datos</MenuItem>
        ) : (
          <>
            {/* Categorías */}
            <MenuItem>
              <FormControlLabel control={<Checkbox />} label="Categoría 1" />
            </MenuItem>
            {/* ... otras categorías */}

            {/* Ubicaciones */}
            <MenuItem>
              <FormControlLabel
                control={<Checkbox />}
                label="San José Pinula"
              />
            </MenuItem>
            {/* ... otras ubicaciones */}

            {/* Rango de precios */}
            <MenuItem>
              <Slider
                value={filters?.price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={2000}
              />
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default SearchBar;
