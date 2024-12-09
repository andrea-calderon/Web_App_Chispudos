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
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { SearchContext } from '../../context/SearchContext';

const SearchBar = () => {
  const { filters, setFilters } = useContext(SearchContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      textSearch: e.target.value,
    }));
  };

  const handleDeleteFilter = (filterToDelete: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: prevFilters.categories?.filter(
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
      categories: [...(prevFilters.categories || []), filter],
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
          value={filters.textSearch || ''}
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
        {filters.categories?.map((filter) => (
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
        <MenuItem onClick={() => handleFilterSelect('1')}>Plomero</MenuItem>
        <MenuItem onClick={() => handleFilterSelect('2')}>
          Electricista
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SearchBar;
