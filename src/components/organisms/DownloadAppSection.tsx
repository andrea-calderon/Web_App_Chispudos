import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Button, Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileApp from '../../assets/images/MobileApp.webp';
import GooglePlay from '../../assets/images/GooglePlay.svg';
import AppStore from '../../assets/images/Appstore.svg';
import LogoIsotype from '../../assets/images/isotipo.svg';

const DownloadAppSection = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ padding: '60px 150px 0px 150px' }}
    >
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <img
            src={LogoIsotype}
            alt={t('downloadSection.appPreviewAlt')}
            style={{ width: '100%', maxWidth: '90px', margin: '20px' }}
          />
        </Grid>
        <Typography variant="h3" fontWeight="bold" component="h2" gutterBottom>
          {t('landing_downloadSection.title')}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {t('landing_downloadSection.description')}
        </Typography>
        <Grid container spacing={2}>
          <img
            src={GooglePlay}
            alt={t('downloadSection.appPreviewAlt')}
            style={{ width: '100%', maxWidth: '175px', margin: '30px 15px' }}
          />
          <img
            src={AppStore}
            alt={t('downloadSection.appPreviewAlt')}
            style={{ width: '100%', maxWidth: '175px', margin: '0px 15px' }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <img
          src={MobileApp}
          alt={t('downloadSection.appPreviewAlt')}
          style={{ width: '100%', maxWidth: '600px', margin: '0px 15px' }}
        />
      </Grid>
    </Grid>
  );
};

export default DownloadAppSection;
