import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { PersonAppImage, TextAtom } from '../../../../components/atoms';
import introSliderImg1 from '../../../../assets/images/intro_sliders/intro_1.png';
import introSliderImg2 from '../../../../assets/images/intro_sliders/intro_2.png';
import introSliderImg3 from '../../../../assets/images/intro_sliders/intro_3.png';
import introSliderImg4 from '../../../../assets/images/intro_sliders/intro_4.png';

const slides = [
  { title: 'auth.slider_intro.title_1', image: introSliderImg1 },
  { title: 'auth.slider_intro.title_2', image: introSliderImg2 },
  { title: 'auth.slider_intro.title_3', image: introSliderImg3 },
  { title: 'auth.slider_intro.title_4', image: introSliderImg4 },
];

const IntroSlider: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { palette } = theme;
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={8}
      sx={{
        backgroundColor: '#F4F4F4',
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
        position: 'relative',
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          color: palette.primary.main,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '500px',
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <TextAtom
          variant="headline"
          size="small"
          sx={{
            mb: 2,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            letterSpacing: '0.5px',
            fontWeight: 'bold',
          }}
        >
          {t(slides[currentSlide].title)}
        </TextAtom>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <PersonAppImage imageSrc={slides[currentSlide].image} />
      </Box>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          color: palette.primary.main,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {slides.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor:
                currentSlide === index
                  ? palette.primary.main
                  : palette.secondary.light,
              mx: 1,
            }}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default IntroSlider;
