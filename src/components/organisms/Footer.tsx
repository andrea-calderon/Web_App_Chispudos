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
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useTranslation } from 'react-i18next';
import AppLogo from '../molecules/AppLogo';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Primer Box */}
      <Box
        sx={{
          backgroundColor: '#F3ECFF',
          py: 15,
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        }}
      >
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
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent !important',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        '&:hover': {
                          backgroundColor: '#5D50C6',
                          '& svg': {
                            color: 'white',
                          },
                        },
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid item xs={12} textAlign="center">
          <Box padding={8}><AppLogo maxWidth='250px' /></Box>
          
          <Box>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              style={{ color: '#0A142F' }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://www.pinterest.com"
              target="_blank"
              style={{ color: '#0A142F' }}
            >
              <PinterestIcon />
            </IconButton>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              style={{ color: '#0A142F' }}
            >
              <FacebookIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} textAlign="center" mt={3} marginBottom="80px">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} -
            <a
              href="https://www.bytecode.com"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              byteCode
            </a>
            : {t('landing_footer.copyright')}
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
