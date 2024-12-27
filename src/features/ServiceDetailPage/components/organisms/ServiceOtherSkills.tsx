import React from 'react';
import { Box, Typography } from '@mui/material';

interface ServiceSkillsProps {
  skills: string;
}

export const ServiceOtherSkills: React.FC<ServiceSkillsProps> = ({
  skills,
}) => {
  return (
    <Box marginY="2rem">
      <Typography variant="h5" fontWeight="bold" marginBottom="1rem">
        Habilidades y experiencia
      </Typography>
      <Typography>{skills}</Typography>
    </Box>
  );
};
