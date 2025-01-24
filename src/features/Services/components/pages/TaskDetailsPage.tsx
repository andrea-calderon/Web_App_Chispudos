import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UserLayout } from '../../../../components/templates/UserLayout';
import TaskDetailInput from '../organisms/TaskDetailInput';
import TaskDetailCompleted from '../organisms/TaskDetailCompleted';
import Footer from '../../../../components/organisms/Footer';

export const TaskDetailsPage = () => {
  const location = useLocation();
  const { dateTime, serviceTitle } = location.state || {};
  const [userText, setUserText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  if (!dateTime || !serviceTitle) {
    return <div>No data available</div>;
  }

  const formattedDate = format(new Date(dateTime), 'EEEE - MMM dd, yyyy', {
    locale: es,
  });
  const formattedTime = format(new Date(dateTime), 'hh:mm a', { locale: es });

  const handleBackToInput = () => {
    setIsCompleted(false);
  };

  return (
    <UserLayout>
      <Box>
        {!isCompleted ? (
          <TaskDetailInput
            date={formattedDate}
            time={formattedTime}
            serviceTitle={serviceTitle}
            userText={userText}
            setUserText={setUserText}
            onComplete={() => setIsCompleted(true)}
          />
        ) : (
          <TaskDetailCompleted
            date={formattedDate}
            time={formattedTime}
            serviceTitle={serviceTitle}
            userText={userText}
            onBack={handleBackToInput}
          />
        )}
      </Box>
      <Footer />
    </UserLayout>
  );
};
