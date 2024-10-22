import React from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Button,
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

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const itemsToShow = isDesktop ? 9 : isTablet ? 0 : 0;

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

  return (
    <Box sx={{ py: 5, position: 'relative' }}>
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

      {isDesktop && (
        <Button
          sx={{
            position: 'absolute',
            left: -20,
            top: '60%',
            transform: 'translateY(-50%)',
            color: '#DADADA',
            zIndex: 1,
          }}
        >
          <ArrowBackIosIcon />
        </Button>
      )}

      {isDesktop && (
        <Button
          sx={{
            position: 'absolute',
            right: -20,
            top: '60%',
            transform: 'translateY(-50%)',
            color: '#DADADA',
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          overflowX: 'scroll',
        }}
      >
        {categories.slice(0, itemsToShow).map((category, index) => (
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
