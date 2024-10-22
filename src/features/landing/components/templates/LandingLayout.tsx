import { ReactNode } from 'react';
import ResponsiveAppBar from '../organisms/AppBar';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
}

export const LandingLayout = ({ children }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }} mx={15}>
      <ResponsiveAppBar />
      {children}
    </Box>
  );
};
