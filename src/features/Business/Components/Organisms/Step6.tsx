import { Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextAtom from '../../../../components/atoms/TextAtom';
import ButtonAtom from '../../../../components/atoms/ButtonAtom';
import congratsImage from '../../../../assets/images/stepper/step6_congratsImage.svg';

const Step6 = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={{ xs: 6, sm: 20, md: 40, lg: 60 }}
      mt={20}
      textAlign="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        mb={2}
      >
        <img src={congratsImage} alt="Illustration of festive hat" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <TextAtom
          variant="display"
          size="medium"
          fontWeight="bold"
          sx={{ mb: 1 }}
          gutterBottom
        >
          {t('businessStepper.step6.heading')}
        </TextAtom>

        <TextAtom variant="body" size="large" gutterBottom sx={{ mb: 2 }}>
          {t('businessStepper.step6.description')}
        </TextAtom>
        <Divider sx={{ width: '20%', mb: 2 }} />
        <TextAtom
          variant="body"
          size="small"
          color="textSecondary"
          gutterBottom
        >
          {t('businessStepper.step6.tip')}
        </TextAtom>
      </Box>

      <ButtonAtom variant="filled" color="primary" sx={{ mt: 4 }}>
        {t('businessStepper.step6.ctaBottom')}
      </ButtonAtom>
    </Box>
  );
};

export default Step6;
