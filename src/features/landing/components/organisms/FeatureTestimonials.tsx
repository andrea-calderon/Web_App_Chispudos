import React from 'react';
import { Box, Typography, Avatar, IconButton, Rating } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import SofiaPhoto from '../../assets/images/Sofia.png';

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  margin: '20px auto',
  position: 'relative',
  width: '85%', // Occupy the full width of the parent container
}));

const CircleButton = styled(IconButton)(({}) => ({
  backgroundColor: '#FFFFFF',
  border: '1px solid #CBCBCB',
  color: '#191825',
  width: '70px',
  height: '70px',
  '&:hover': {
    backgroundColor: '#6750A4',
    color: '#fff',
  },
}));

const Dots = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const Dot = styled(Box)(({ theme, active }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : '#ccc',
  margin: '0 5px',
}));

export default function Testimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Cambia entre los tres testimonios
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3); // Cambia entre los tres testimonios
  };

  return (
    <StyledContainer>
      <Typography
        variant="h7"
        color="#019FE9"
        fontWeight="bold"
        textTransform="uppercase"
      >
        {t('testimonials.title')}
      </Typography>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        {t('testimonials.subtitle')}
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center">
        <CircleButton onClick={handlePrev} aria-label="prev">
          <ArrowBackIosIcon />
        </CircleButton>

        <Box mx={2}>
          <Avatar
            alt={t(`testimonials.feedback.${currentIndex}.name`)}
            src="url-a-la-imagen"
            sx={{ width: 80, height: 80, margin: 'auto' }}
          />
          <Typography variant="h6" color="secondary">
            <span style={{ color: '#FF7043' }}>
              {t(`testimonials.feedback.${currentIndex}.name`)}
            </span>{' '}
            / {t(`testimonials.feedback.${currentIndex}.title`)}
          </Typography>
          <Rating value={5} readOnly />
          <Typography variant="body1" mt={2}>
            {t(`testimonials.feedback.${currentIndex}.comment`)}
          </Typography>
        </Box>

        <CircleButton onClick={handleNext} aria-label="next">
          <ArrowForwardIosIcon />
        </CircleButton>
      </Box>

      <Dots>
        {[...Array(3)].map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </Dots>
    </StyledContainer>
  );
}
