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
import { useTranslation } from 'react-i18next';

const NewsletterSubscription: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: '#F3ECFF',
        paddingBottom: 15,
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
          <Typography variant="h6" sx={{ paddingTop: '80px' }}>
            {t('footer.title')}
          </Typography>
          <TextField
            variant="outlined"
            placeholder={t('footer.placeholder')}
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
  );
};

export default NewsletterSubscription;
