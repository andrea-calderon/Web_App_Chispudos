import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';

const randomSkills = [
  'Limpieza a fondo',
  'Organización de espacios',
  'Mantenimiento de jardines',
  'Pintura',
  'Albañilería básica',
  'Reparación de grifería',
  'Instalación de luminarias',
  'Carpintería básica',
  'Electricidad básica',
  'Reparación de electrodomésticos',
  'Soldadura',
  'Impermeabilización',
  'Instalación de pisos',
  'Mantenimiento de aires acondicionados',
  'Reparación de techos',
];

interface ServiceOtherSkillsProps {
  skills: string[];
}

export const ServiceOtherSkills: React.FC<ServiceOtherSkillsProps> = ({
  skills,
}) => {
  const [randomSkillsList, setRandomSkillsList] = useState<string[]>([]);

  useEffect(() => {
    const generateRandomSkills = () => {
      const selectedSkills = [];
      while (selectedSkills.length < 6) {
        const randomIndex = Math.floor(Math.random() * randomSkills.length);
        const randomSkill = randomSkills[randomIndex];
        if (!selectedSkills.includes(randomSkill)) {
          selectedSkills.push(randomSkill);
        }
      }
      setRandomSkillsList(selectedSkills);
    };

    generateRandomSkills();
  }, []);

  return (
    <Box marginY="2rem" marginLeft={16} marginBottom={8} marginRight={8}>
      <Typography variant="h5" fontWeight="bold" marginBottom="1rem">
        Otras Habilidades
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {randomSkillsList.map((skill) => (
          <Chip key={skill} label={skill} variant="outlined" />
        ))}
      </Box>
    </Box>
  );
};
