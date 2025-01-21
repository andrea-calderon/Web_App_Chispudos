import { Box, TextField } from '@mui/material';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import { useTranslation } from 'react-i18next';

interface TaskDetailInputProps {
  userText: string;
  setUserText: (text: string) => void;
  onComplete: () => void;
}

const TaskDetailInput: React.FC<TaskDetailInputProps> = ({
  userText,
  setUserText,
  onComplete,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: '2rem', marginBottom: '4rem' }}>
      <TextField
        label={t('services.serviceDetails.textPlaceholder')}
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        sx={{ marginY: '1rem' }}
        value={userText}
        onChange={(e) => setUserText(e.target.value)} // Guarda el texto ingresado por el usuario
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonAtom
          variant="filled"
          color="primary"
          onClick={onComplete} // Llama al método para completar el ingreso
        >
          {t('services.serviceDetails.button')}
        </ButtonAtom>
      </Box>
    </Box>
  );
};

export default TaskDetailInput;
