import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BusinessProfile from '../../../Business/Components/Organisms/BusinessProfile';
import BusinessChat from '../../../Business/Components/Organisms/BusinessChat';
import UserProfile from './UserProfile';

const ProfileTabs = () => {
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
        height: '100%vh',
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
          flexWrap: 'wrap',
          '.MuiTab-root': {
            fontSize: { xs: '12px', md: '14px' },
            minWidth: { xs: '40px', md: '150px' }, // Ajustar el ancho mínimo de las pestañas
          },
        }}
      >
        <Tab
          label={t('businessProfilePage.tabs.chat')}
          sx={{ color: selectedTab === 0 ? 'black' : 'gray' }}
        />
        <Tab
          label={t('businessProfilePage.tabs.services')}
          sx={{ color: selectedTab === 1 ? 'black' : 'gray' }}
        />
        <Tab
          label={t('businessProfilePage.tabs.profile')}
          sx={{ color: selectedTab === 2 ? 'black' : 'gray' }}
        />
      </Tabs>

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          bgcolor: 'white',
          borderRadius: '8px',
          overflowY: 'auto',
          height: { xs: 'calc(100vh - 150px)', md: 'auto' },
        }}
      >
        {selectedTab === 0 && <BusinessChat />}
        {selectedTab === 1 && <BusinessProfile />}
        {selectedTab === 2 && <UserProfile />}
      </Box>
    </Box>
  );
};

export default ProfileTabs;
