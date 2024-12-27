import React from 'react';
import { Box, Typography } from '@mui/material';

interface ServiceSkillsProps {
  skills: string;
}

export const ServiceSkills: React.FC<ServiceSkillsProps> = ({ skills }) => {
  return (
    <Box marginY="2rem" marginLeft={16} marginBottom={8} marginRight={8}>
      <Typography variant="h5" fontWeight="bold" marginBottom="1rem">
        Habilidades y experiencia
      </Typography>
      <Typography>{skills}</Typography>
    </Box>
  );
};
