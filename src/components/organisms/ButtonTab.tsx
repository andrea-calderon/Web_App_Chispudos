import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export default function ButtonTab({ children }: Props) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      {children}
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.url)}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

const navItems = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    url: '/home',
  },
  {
    label: 'Profile',
    icon: <PersonIcon />,
    url: '/profile',
  },
];
