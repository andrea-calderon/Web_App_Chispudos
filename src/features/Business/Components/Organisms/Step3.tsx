import { TextField, MenuItem, Box, Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextAtom from '../../../../components/atoms/TextAtom';
import InputAtom from '../../../../components/atoms/InputAtom';

const Step3 = () => {
  const { t } = useTranslation();

  return (
    <Box
      alignItems={{ xs: 'center', md: 'flex-start' }}
      px={{ xs: 4, md: 10, lg: 24 }}
    >
      <Box
        flex={1}
        width={{ xs: '100%', md: 'auto' }}
        textAlign={{ xs: 'left', md: 'left' }}
        mb={{ xs: 2, md: 0 }}
        display="flex"
        flexDirection="column"
        pt={{ xs: 5, sm: 12, md: 12, lg: 18 }}
        mr={{ md: 5, lg: 5 }}
        pb="28px"
      >
        <TextAtom variant="title" size="large" fontWeight="bold" sx={{ mb: 1 }}>
          {t('businessStepper.step3.title')}
        </TextAtom>
        <TextAtom
          variant="display"
          size="medium"
          fontWeight="bold"
          sx={{ mb: 1 }}
          gutterBottom
        >
          {t('businessStepper.step3.heading')}
        </TextAtom>
        <TextAtom variant="body" size="medium" gutterBottom>
          {t('businessStepper.step3.description')}
        </TextAtom>
      </Box>
      <Grid container spacing={4}>
        {/* Dirección Principal */}
        <Grid item xs={12} md={6}>
          <TextAtom variant="title" size="medium" fontWeight="bold">
            {t('businessStepper.step3.mainDirectionTitle')}
          </TextAtom>
          <TextField
            fullWidth
            label={t('businessStepper.step3.textField')}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label={t('businessStepper.step3.inputDeparment')}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="">Elige un departamento</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label={t('businessStepper.step3.inputCity')}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="">Elige un municipio</MenuItem>
          </TextField>
        </Grid>

        {/* Áreas de Cobertura */}
        <Grid item xs={12} md={6}>
          <TextAtom variant="title" size="medium" fontWeight="bold">
            {t('businessStepper.step3.secondDirectionTitle')}
          </TextAtom>
          <TextAtom variant="body" size="medium" gutterBottom>
            {t('businessStepper.step3.secondDirectionDescription')}
          </TextAtom>
          <TextField
            fullWidth
            select
            label={t('businessStepper.step3.inputDeparment')}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="">Agregar ubicación</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label={t('businessStepper.step3.inputCity')}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="">Agregar ubicación</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step3;
