import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Rating } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  margin: '20px auto',
  position: 'relative',
  width: '85%',
  [theme.breakpoints.down('sm')]: {
    margin: '10px auto',
    width: '95%',
    padding: theme.spacing(2),
  },
}));

const CircleButton = styled(IconButton)(() => ({
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
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1),
  },
}));

const Dot = styled(Box)(({ active }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: active ? '#019FE9' : '#ccc',
  margin: '10px',
}));

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: t('testimonials.feedback.0.name'),
      title: t('testimonials.feedback.0.title'),
      comment: t('testimonials.feedback.0.comment'),
      image: 'src/assets/images/AnaF.webp',
    },
    {
      name: t('testimonials.feedback.1.name'),
      title: t('testimonials.feedback.1.title'),
      comment: t('testimonials.feedback.1.comment'),
      image: 'src/assets/images/Juan.webp',
    },
    {
      name: t('testimonials.feedback.2.name'),
      title: t('testimonials.feedback.2.title'),
      comment: t('testimonials.feedback.2.comment'),
      image: 'src/assets/images/Sofia.webp',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
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
      <Typography variant="h4" fontWeight="bold" padding="30px 0px" mb={2}>
        {t('testimonials.subtitle')}
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center">
        <CircleButton onClick={handlePrev} aria-label="prev">
          <ArrowBackIosIcon />
        </CircleButton>

        <Box mx={2}>
          <Avatar
            alt={testimonials[currentIndex].name}
            src={testimonials[currentIndex].image}
            sx={{ width: 90, height: 90, margin: 'auto' }}
          />
          <Typography variant="h6" color="secondary">
            <span style={{ color: '#FF7043' }}>
              {testimonials[currentIndex].name}
            </span>{' '}
            / {testimonials[currentIndex].title}
          </Typography>
          <Rating value={5} readOnly />
          <Typography color="#5F5F5F" variant="body1" mt={2}>
            {testimonials[currentIndex].comment}
          </Typography>
        </Box>

        <CircleButton onClick={handleNext} aria-label="next">
          <ArrowForwardIosIcon />
        </CircleButton>
      </Box>

      <Dots>
        {testimonials.map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </Dots>
    </StyledContainer>
  );
};

export default Testimonials;
