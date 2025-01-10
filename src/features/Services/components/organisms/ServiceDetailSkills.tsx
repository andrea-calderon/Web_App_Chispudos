import React from 'react';
import { Box, Typography } from '@mui/material';

interface ServiceSkillsProps {
  skills: { value: string }[];
}

export const ServiceSkills: React.FC<ServiceSkillsProps> = ({ skills }) => {
  return (
    <Box marginY="2rem" marginLeft={16} marginBottom={8} marginRight={8}>
      <Typography variant="h5" fontWeight="bold" marginBottom="1rem">
        Habilidades y experiencia
      </Typography>
      {skills.length ? (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              <Typography>{skill.value}</Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography color="textSecondary">
          No hay habilidades disponibles para este servicio.
        </Typography>
      )}
    </Box>
  );
};
