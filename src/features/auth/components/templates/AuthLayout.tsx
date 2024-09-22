import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TextAtom, PersonAppImage } from '../../../../components/atoms';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          backgroundColor: '#F4F4F4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
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
            {t('auth.initialTitle')}
          </TextAtom>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <PersonAppImage />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          backgroundColor: '#fff',
          position: 'relative',
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
