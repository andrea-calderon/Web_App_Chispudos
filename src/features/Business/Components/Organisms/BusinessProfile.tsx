import {
  Box,
  Grid,
  Avatar,
  Chip,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextAtom from '../../../../components/atoms/TextAtom';
import EditIcon from '@mui/icons-material/Edit';

const BusinessProfilePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box px={{ xs: 4, md: 10, lg: 24 }} py={5}>
      {/* Header */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Box position="relative">
          <Avatar
            src="https://picsum.photos/300/200?random=4"
            alt={t('businessProfile.avatarAlt')}
            sx={{ width: 150, height: 150 }}
          />
          <Button
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: theme.palette.primary.main,
              color: '#fff',
              minWidth: 'unset',
              padding: '5px',
              borderRadius: '50%',
            }}
          >
            <EditIcon fontSize="small" />
          </Button>
        </Box>
        <TextAtom
          variant="headline"
          size="small"
          fontWeight="bold"
          sx={{ mt: 2 }}
        >
          Fontanería La Bendición
        </TextAtom>
        <Typography>
          {t('businessProfilePage.profile.dayPrice')} <strong>Q300</strong>
        </Typography>
      </Box>

      {/* Habilidades y experiencia */}
      <Box mb={{ xs: 6, md: 8 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="left"
          mb={1}
        >
          <Box display="flex" alignItems="center">
            <TextAtom variant="title" size="large" fontWeight="bold">
              {t('businessProfilePage.profile.skillsTitle')}
            </TextAtom>
            <Button
              size="small"
              startIcon={<EditIcon />}
              sx={{ ml: 2, textTransform: 'none' }}
            >
              {t('businessProfilePage.profile.editButton')}
            </Button>
          </Box>
        </Box>
        <Typography>{t('businessProfile.skillsDescription')}</Typography>
      </Box>

      {/* Proyectos recientes */}
      <Box mb={{ xs: 6, md: 8 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box display="flex" alignItems="center">
            <TextAtom variant="title" size="large" fontWeight="bold">
              {t('businessProfilePage.profile.recentsProjects')}
            </TextAtom>
            <Button
              size="small"
              startIcon={<EditIcon />}
              sx={{ ml: 2, textTransform: 'none' }}
            >
              {t('businessProfilePage.profile.editButton')}
            </Button>
          </Box>
        </Box>
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((project, index) => (
            <Grid item xs={6} md={3} lg={2.4} key={index}>
              <img
                src="https://picsum.photos/300/200?random=4"
                alt={t('businessProfile.projectAlt')}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <TextAtom variant="title" size="medium">
                {t('businessProfilePage.profile.recentsProjects')}
              </TextAtom>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Otras habilidades */}
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box display="flex" alignItems="center">
            <TextAtom variant="title" size="large" fontWeight="bold">
              {t('businessProfilePage.profile.otherSkills')}
            </TextAtom>
            <Button
              size="small"
              startIcon={<EditIcon />}
              sx={{ ml: 2, textTransform: 'none' }}
            >
              {t('businessProfilePage.profile.editButton')}
            </Button>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {[1, 2, 3].map((skill, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box p={2} border="1px solid #ccc" borderRadius={2}>
                <Chip label={t('businessProfile.urgentElectrician')} />
                <Typography fontWeight="bold">
                  {t('businessProfile.electricService')}
                </Typography>
                <Typography>
                  {t('businessProfile.electricServiceDesc')}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BusinessProfilePage;
