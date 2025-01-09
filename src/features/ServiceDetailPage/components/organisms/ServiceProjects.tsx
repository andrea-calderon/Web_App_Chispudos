import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Project {
  title: string;
  img: string;
}

interface ServiceProjectsProps {
  projects?: Project[]; // projects ahora es opcional para manejar estados indefinidos
}

export const ServiceProjects: React.FC<ServiceProjectsProps> = ({
  projects = [], // Valor por defecto para evitar errores si no se pasa la prop
}) => {
  // Si no hay proyectos, mostramos un mensaje
  if (!projects.length) {
    return (
      <Box marginY="6rem" marginLeft={16} textAlign="center">
        <Typography variant="h5" fontWeight="bold" marginBottom="1rem">
          Proyectos recientes
        </Typography>
        <Typography variant="body1" color="textSecondary">
          No hay proyectos disponibles en este momento.
        </Typography>
      </Box>
    );
  }

  return (
    <Box marginY="6rem" marginLeft={16}>
      <Typography variant="h5" fontWeight="bold" marginBottom="1rem">
        Proyectos recientes
      </Typography>
      <Box display="flex" gap="1rem" flexWrap="wrap">
        {projects.map((project) => (
          <Card
            key={project.title}
            sx={{ width: '200px', borderRadius: '8px' }}
          >
            <CardMedia
              component="img"
              image={project.img}
              alt={project.title}
              sx={{ height: '120px', width: '200px', objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="body1" textAlign="center">
                {project.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
