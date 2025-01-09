import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Project {
  title: string;
  img: string;
}

interface ServiceProjectsProps {
  projects?: Project[];
}

export const ServiceProjects: React.FC<ServiceProjectsProps> = ({
  projects = [
    {
      title: 'Reforma de baño',
      img: 'https://via.placeholder.com/200x120?text=Reforma+de+baño',
    },
    {
      title: 'Construcción de terraza',
      img: 'https://via.placeholder.com/200x120?text=Construcción+de+terraza',
    },
    {
      title: 'Pintura de fachada',
      img: 'https://via.placeholder.com/200x120?text=Pintura+de+fachada',
    },
  ],
}) => {
  if (!projects.length) {
    return (
      <Box marginY="6rem" marginLeft={16} textAlign="left">
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
            sx={{
              width: '200px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardMedia
              component="img"
              image={project.img}
              alt={project.title}
              sx={{ height: '120px', objectFit: 'cover' }}
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
