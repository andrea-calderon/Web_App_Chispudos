import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BusinessOrderPage from '../../../Business/Components/Organisms/BusinessOrders';
import ChatComponent from '../../../Business/Components/Organisms/BusinessChat';

const BusinessTabs = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

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
          label={t('tasksPage.tabs.summary', 'Task summary')}
          sx={{ color: selectedTab === 0 ? 'black' : 'gray' }}
        />
        <Tab
          label={t('tasksPage.tabs.chat', 'Chat')}
          sx={{ color: selectedTab === 1 ? 'black' : 'gray' }}
        />
      </Tabs>

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          bgcolor: 'white',
          borderRadius: '8px',
          overflowY: 'auto',
          height: { xs: 'calc(100vh - 150px)', md: 'auto' }, // Ajustar altura en mobile
        }}
      >
        {selectedTab === 0 && <BusinessOrderPage />}
        {selectedTab === 1 && <ChatComponent />}
      </Box>
    </Box>
  );
};

export default BusinessTabs;
