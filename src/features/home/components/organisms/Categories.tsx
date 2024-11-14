import React from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import TextAtom from '../../../../components/atoms/TextAtom';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CleanIcon from '../../../../assets/images/categories_icons/CleanIcon.svg';
import MechanicIcon from '../../../../assets/images/categories_icons/MecanicIcon.svg';
import PaintIcon from '../../../../assets/images/categories_icons/PaintIcon.svg';
import ElectricianIcon from '../../../../assets/images/categories_icons/ElectricianIcon.svg';
import PlumberIcon from '../../../../assets/images/categories_icons/PlumberIcon.svg';
import GardenerIcon from '../../../../assets/images/categories_icons/GardenerIcon.svg';
import BuilderIcon from '../../../../assets/images/categories_icons/BuilderIcon.svg';
import LocksmithIcon from '../../../../assets/images/categories_icons/LocksmithIcon.svg';
import CarwashIcon from '../../../../assets/images/categories_icons/CarwashIcon.svg';

const HighlightedCategories = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const categories = [
    { name: t('categories.cleaning'), icon: CleanIcon },
    { name: t('categories.mechanic'), icon: MechanicIcon },
    { name: t('categories.paint'), icon: PaintIcon },
    { name: t('categories.carwash'), icon: CarwashIcon },
    { name: t('categories.electrician'), icon: ElectricianIcon },
    { name: t('categories.plumber'), icon: PlumberIcon },
    { name: t('categories.gardener'), icon: GardenerIcon },
    { name: t('categories.carpenter'), icon: BuilderIcon },
    { name: t('categories.locksmith'), icon: LocksmithIcon },
    { name: t('categories.paint'), icon: PaintIcon },
    { name: t('categories.carwash'), icon: CarwashIcon },
  ];

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } =
        scrollContainerRef.current;
      if (scrollLeft === 0) {
        scrollContainerRef.current.scrollTo({
          left: scrollWidth,
          behavior: 'smooth',
        });
      } else {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } =
        scrollContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }
  };

  return (
    <Box sx={{ py: 5, position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <TextAtom variant="title" size="large" fontWeight="bold">
          {t('categories.title')}
        </TextAtom>

        <ButtonAtom
          variant="text"
          sx={{
            textTransform: 'none',
            color: 'primary.main',
            marginLeft: 2,
          }}
        >
          <TextAtom variant="label" size="large">
            {t('categories.button')}
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
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
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
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
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
          scrollbarWidth: 'none', // For Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // For Chrome, Safari, and Opera
          },
          gap: 2,
          padding: '10px 0',
        }}
      >
        {categories.map((category, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              backgroundColor: 'primary.light',
              textAlign: 'center',
              borderRadius: '32px',
              padding: '15px',
              boxShadow: 'none',
              minWidth: '125px',
              maxWidth: '125px',
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
