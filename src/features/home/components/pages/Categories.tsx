import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import BuildIcon from '@mui/icons-material/Build'; // Ejemplo de icono

const HighlightedCategories = () => {
  const { t } = useTranslation();

  const categories = [
    { name: t('categories.mechanic'), icon: <BuildIcon /> },
    { name: t('categories.electrician'), icon: <BuildIcon /> },
    { name: t('categories.mason'), icon: <BuildIcon /> },
    { name: t('categories.plumber'), icon: <BuildIcon /> },
    { name: t('categories.cleaning'), icon: <BuildIcon /> },
    { name: t('categories.gardener'), icon: <BuildIcon /> },
    { name: t('categories.locksmith'), icon: <BuildIcon /> },
    { name: t('categories.carpenter'), icon: <BuildIcon /> },
  ];

  return (
    <Box sx={{ py: 5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h6" component="h2">
          {t('categories.title')}
        </Typography>
        <Button
          variant="text"
          sx={{
            textTransform: 'none',
            color: '#6750A4',
            marginLeft: 2,
          }}
        >
          {t('categories.button')}
        </Button>
      </Box>

      {/* Grid de categorías */}
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={3} sm={2} md={1.5} key={index} sx={{ flexGrow: 1 }}>
            <Card
              sx={{
                backgroundColor: '#EADDFF',
                textAlign: 'center',
                borderRadius: '32px',
                padding: '18px',
                boxShadow: 'none',
                width: '175px', // Ajusta el ancho según tus necesidades
              }}
            >
              <CardContent>
                {category.icon}
                <Typography color="#21005D" variant="body1" sx={{ mt: 1 }}>
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HighlightedCategories;
