import React from 'react';
import { Box } from '@mui/material';
import { TextAtom } from '../../../../components/atoms';
import { useTranslation } from 'react-i18next';

interface ServiceSkillsProps {
  description: string;
}

export const ServiceSkills: React.FC<ServiceSkillsProps> = ({
  description,
}) => {
  const { t } = useTranslation();

  return (
    <Box marginBottom={'4rem'}>
      <TextAtom
        variant="headline"
        size="small"
        fontWeight="bold"
        marginBottom="1rem"
      >
        {t('services.detailsPage.skillsAndExperience')}
      </TextAtom>
      <Box marginBottom="1rem" />
      <TextAtom variant="body" size="large" color="text.secondary">
        {description || 'No hay descripción disponible para este servicio.'}
      </TextAtom>
    </Box>
  );
};
