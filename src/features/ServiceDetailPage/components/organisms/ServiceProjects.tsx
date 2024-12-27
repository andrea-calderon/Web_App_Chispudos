import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Project {
  title: string;
  img: string;
}

interface ServiceProjectsProps {
  projects: Project[];
}

export const ServiceProjects: React.FC<ServiceProjectsProps> = ({
  projects,
}) => {
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
