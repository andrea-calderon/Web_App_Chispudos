import { ReactNode } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ButtonTab from '../molecules/organisms/ButtonTab';
import DrawerMenu from '../molecules/organisms/DrawerMenu';

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
