import React from 'react';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTranslation } from 'react-i18next';
import LogoChispudosHorizontal from '../../assets/images/LogoChispudosHorizontal.svg';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: '#F3ECFF', py: 10 }}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={6} textAlign="center">
          <Typography variant="h6">{t('landing_footer.title')}</Typography>
          <TextField
            variant="outlined"
            placeholder={t('landing_footer.placeholder')}
            sx={{
              mt: 2,
              width: '60%',
              borderColor: 'none',
              backgroundColor: 'white',
              borderRadius: '30px',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} textAlign="center">
          <img
            src={LogoChispudosHorizontal}
            alt="Logo Chispudos"
            style={{
              width: '100%',
              maxWidth: '200px',
              margin: '0px 15px',
              padding: '30px',
            }}
          />
          <Box>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              color="primary"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              color="primary"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              color="primary"
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} textAlign="center" mt={3}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} - byteCode:{' '}
            {t('landing_footer.copyright')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
