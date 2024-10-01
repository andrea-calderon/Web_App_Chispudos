import { ReactNode } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ButtonTab from '../organisms/ButtonTab';
import DrawerMenu from '../organisms/DrawerMenu';

interface Props {
  children: ReactNode;
}

export const UserLayout = ({ children }: Props) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      {isLargeScreen ? (
        <DrawerMenu children={children} />
      ) : (
        <ButtonTab children={children} />
      )}
    </>
  );
};
