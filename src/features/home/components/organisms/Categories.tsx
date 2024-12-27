import React from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../../services/api';
import TextAtom from '../../../../components/atoms/TextAtom';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HighlightedCategories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCategoriesQuery();

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleNavigate = () => {
    navigate('/search-services');
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data?.data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      >
        <Typography variant="h6" color="error">
          {t('error.loadingCategories')}
        </Typography>
      </Box>
    );
  }

  const categories = data.data;

  return (
    <Box sx={{ py: 5, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TextAtom variant="title" size="large" fontWeight="bold">
          {t('landing.categories.title')}
        </TextAtom>
        <ButtonAtom
          variant="text"
          sx={{
            textTransform: 'none',
            color: 'primary.main',
            marginLeft: 2,
          }}
          onClick={handleNavigate}
        >
          <TextAtom variant="label" size="large">
            {t('landing.categories.button')}
          </TextAtom>
        </ButtonAtom>
      </Box>

      <IconButton
        onClick={scrollLeft}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: 'primary.main',
          zIndex: 1,
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
          padding: 1,
          margin: 1,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={scrollRight}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: 'primary.main',
          zIndex: 1,
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
          padding: 1,
          margin: 1,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          gap: 2,
          padding: '10px 0',
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.id}
            sx={{
              display: 'flex',
              backgroundColor: 'primary.light',
              textAlign: 'center',
              borderRadius: '32px',
              padding: '15px',
              boxShadow: 'none',
              minWidth: '150px',
              maxWidth: '150px',
              flexShrink: 0,
            }}
          >
            <CardContent>
              <img
                src={category.icon}
                alt={category.name}
                width="30"
                height="30"
              />
              <br />
              <TextAtom
                variant="body"
                size="medium"
                color="text.primary"
                sx={{ mt: 1 }}
              >
                {category.name}
              </TextAtom>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HighlightedCategories;
