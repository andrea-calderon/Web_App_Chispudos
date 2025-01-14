import { ReactNode } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ButtonTab from '../organisms/ButtonTab';
import DrawerMenu from '../organisms/DrawerMenu';
import ResponsiveAppBar from '../../features/landing/components/organisms/AppBar';

interface Props {
  children: ReactNode;
}

export const UserLayout = ({ children }: Props) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      {isLargeScreen ? (
        <>
          <ResponsiveAppBar />
          {children}
        </>
      ) : (
        <ButtonTab children={children} />
      )}
    </>
  );
};
