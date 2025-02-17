import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BusinessProfile from './BusinessProfile';

const BusinessTabs = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(2); // Chat como pestaña inicial

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        py: '30px',
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
      >
        <Tab
          label={t('tabs.tasks')}
          sx={{ color: selectedTab === 0 ? 'black' : 'gray' }}
        />
        <Tab
          label={t('tabs.chat')}
          sx={{ color: selectedTab === 1 ? 'black' : 'gray' }}
        />
        <Tab
          label={t('tabs.profile')}
          sx={{ color: selectedTab === 2 ? 'black' : 'gray' }}
        />
      </Tabs>

      <Box sx={{ p: 3, bgcolor: 'white' }}>
        {selectedTab === 0 && <div>{t('tabs.tasksContent')}</div>}
        {selectedTab === 1 && <div>{t('tabs.chatContent')}</div>}
        {selectedTab === 2 && <BusinessProfile />}
      </Box>
    </Box>
  );
};

export default BusinessTabs;
