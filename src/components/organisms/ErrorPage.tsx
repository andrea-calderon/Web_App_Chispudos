import { Box } from '@mui/material';
import TextAtom from '../atoms/TextAtom';
import ButtonAtom from '../atoms/ButtonAtom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserLayout } from '../templates/UserLayout';
import NotFoundImage from '../../assets/images/NotFoundPage/NotFoundImage.svg';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <UserLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#F9F5FF',
          padding: 2,
        }}
      >
        <Box
          component="img"
          src={NotFoundImage}
          alt={t('errorPage.ImageAlt')}
          sx={{
            width: { xs: '100%', md: '60%' },
            height: 'auto',
            marginBottom: '2rem',
          }}
        />

        <TextAtom variant="headline" size="large" sx={{ marginBottom: 2 }}>
          {t('errorPage.title')}
        </TextAtom>
        <TextAtom variant="body" size="large" sx={{ marginBottom: 4 }}>
          {t('errorPage.message')}
        </TextAtom>

        <ButtonAtom
          variant="filled"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ marginBottom: 2 }}
        >
          {t('errorPage.button')}
        </ButtonAtom>
      </Box>
    </UserLayout>
  );
};

export default ErrorPage;
