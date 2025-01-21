import { Box, Avatar } from '@mui/material';
import TextAtom from '../../../../components/atoms/TextAtom';
import userPhoto from '../../../../assets/images/Profile/userPhoto.png';
import { useTranslation } from 'react-i18next';

interface TaskDetailCompletedProps {
  userText: string;
}

const TaskDetailCompleted: React.FC<TaskDetailCompletedProps> = ({
  userText,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <Avatar
        src={userPhoto}
        alt="User"
        sx={{ width: 50, height: 50, marginRight: '1rem' }}
      />
      <TextAtom variant="body" size="medium">
        {userText || t('services.serviceDetails.emptyMessage')}
      </TextAtom>
    </Box>
  );
};

export default TaskDetailCompleted;
