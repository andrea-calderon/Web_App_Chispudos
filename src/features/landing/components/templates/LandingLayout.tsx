import { ReactNode } from 'react';
import ResponsiveAppBar from '../organisms/AppBar';
import LanguageSwitcher from '../../../../components/molecules/LanguajeSwitcher';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
}

export const LandingLayout = ({ children }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }} mx={15}>
      <ResponsiveAppBar />
      <LanguageSwitcher />
      {children}
    </Box>
  );
};
