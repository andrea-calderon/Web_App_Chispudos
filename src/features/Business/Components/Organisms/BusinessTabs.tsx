import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BusinessProfile from './BusinessProfile';
import BusinessChat from './BusinessChat';
import BusinessOrderPage from './BusinessOrders';
import { ProfilePage } from '../../../profile/components/pages/ProfilePage';

const BusinessTabs = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(2);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        py: { xs: '10px', md: '30px' },
        px: { xs: '10px', md: '20px' },
        width: '100%',
        height: '100%',
        bgcolor: '#F5F1FF',
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        centered
        textColor="primary"
        TabIndicatorProps={{ sx: { backgroundColor: '#4B2E83', height: 4 } }}
        sx={{
          flexWrap: 'wrap', // Permitir que las pestañas se ajusten en pantallas pequeñas
          '.MuiTab-root': {
            fontSize: { xs: '12px', md: '14px' },
            minWidth: { xs: '40px', md: '150px' }, // Ajustar el ancho mínimo de las pestañas
          },
        }}
      >
        <Tab
          label={t('businessProfilePage.tabs.tasks')}
          sx={{ color: selectedTab === 0 ? 'black' : 'gray' }}
        />
        <Tab
          label={t('businessProfilePage.tabs.chat')}
          sx={{ color: selectedTab === 1 ? 'black' : 'gray' }}
        />
        <Tab
          label={t('businessProfilePage.tabs.services')}
          sx={{ color: selectedTab === 2 ? 'black' : 'gray' }}
        />
        <Tab
          label={t('businessProfilePage.tabs.profile')}
          sx={{ color: selectedTab === 3 ? 'black' : 'gray' }}
        />
      </Tabs>

      <Box
        sx={{
          p: { xs: 2, md: 3 }, // Reducir padding en pantallas pequeñas
          bgcolor: 'white',
          borderRadius: '8px', // Agregar bordes redondeados para mejor apariencia
          overflowY: 'auto', // Habilitar scroll si el contenido es más grande que la pantalla
          height: { xs: 'calc(100vh - 150px)', md: 'auto' }, // Ajustar altura en mobile
        }}
      >
        {selectedTab === 0 && <BusinessOrderPage />}
        {selectedTab === 1 && <BusinessChat />}
        {selectedTab === 2 && <BusinessProfile />}
        {selectedTab === 3 && <ProfilePage />}
      </Box>
    </Box>
  );
};

export default BusinessTabs;
