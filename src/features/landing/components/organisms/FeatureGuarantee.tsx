import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';

// contenedor
const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFF9E9',
  borderRadius: '40px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10),
    margin: '60px -130px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    padding: theme.spacing(10),
    margin: '60px 0px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10),
    margin: '60px 0px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
    margin: '60px 0px',
  },
}));

// Botón
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#5D50C6',
  color: '#fff',
  borderRadius: '20px',
  padding: theme.spacing(1, 4),
  margin: '40px 0px',
  marginTop: theme.spacing(4),
  '&:hover': {
    backgroundColor: '#6750A4',
  },
}));

const FeatureGuarantee: React.FC = () => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <Typography
        variant="body"
        sx={{
          color: '#019FE9',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        {t('landing.guarantee.category')}
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        {t('landing.guarantee.tittle')}
      </Typography>
      <StyledButton>{t('landing.guarantee.button')}</StyledButton>
    </StyledContainer>
  );
};

export default FeatureGuarantee;
