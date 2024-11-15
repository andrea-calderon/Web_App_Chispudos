import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileApp from '../../../../assets/images/MobileApp.webp';
import GooglePlay from '../../../../assets/images/GooglePlay.svg';
import AppStore from '../../../../assets/images/Appstore.svg';
import LogoIsotype from '../../../../assets/images/isotipo.svg';
import TextAtom from '../../../../components/atoms/TextAtom';

const FeatureDownloadApp = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{ padding: '60px 10px 0px 10px' }}
    >
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <img
            src={LogoIsotype}
            alt={t('downloadSection.appPreviewAlt')}
            style={{ width: '100%', maxWidth: '90px', margin: '20px' }}
          />
        </Grid>
        <TextAtom
          variant="headline"
          size="large"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {t('landing.downloadSection.title')}
        </TextAtom>
        <TextAtom variant="body" size="medium" color="textSecondary">
          {t('landing.downloadSection.description')}
        </TextAtom>
        <Grid container spacing={2}>
          <img
            src={GooglePlay}
            alt={t('downloadSection.appPreviewAlt')}
            style={{ width: '100%', maxWidth: '170px', margin: '30px 15px' }}
          />
          <img
            src={AppStore}
            alt={t('downloadSection.appPreviewAlt')}
            style={{
              width: '100%',
              maxWidth: '170px',
              margin: '0px 15px',
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <img
          src={MobileApp}
          alt={t('downloadSection.appPreviewAlt')}
          style={{
            width: '100%',
            maxWidth: '600px',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FeatureDownloadApp;
