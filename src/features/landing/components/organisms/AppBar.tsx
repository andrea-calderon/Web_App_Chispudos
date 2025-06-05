import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Container,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Translate as TranslateIcon,
  AccountCircleOutlined as AccountIcon,
  FavoriteBorderOutlined as FavoriteIcon,
  HomeOutlined as HomeIcon,
  AssignmentOutlined as TaskIcon,
  Storefront as StorefrontIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLogo from '../../../../components/molecules/AppLogo';
import { ButtonAtom } from '../../../../components/atoms';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';
import RoleSwitcherButton from '../../components/atoms/RoleSwitcherButton';
import { getApiImageUrl } from '../../../../utils/baseEnvironment';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(selectAuth); // Asegúrate de que `user` esté disponible
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { palette } = theme;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState('en');

  // Estado para el modo actual
  const [currentMode, setCurrentMode] = useState<'user' | 'merchant'>('user');

  // Función para alternar entre modos
  const toggleMode = () => {
    if (
      hasPermission(
        { id: user.id, roles: ['user', 'merchant'] }, // Simula el usuario con roles
        'tasks', // Recurso de ejemplo
        'view', // Acción de ejemplo
      )
    ) {
      setCurrentMode((prevMode) => {
        const newMode = prevMode === 'user' ? 'merchant' : 'user';
        console.log(`Modo cambiado a: ${newMode}`); // Depuración
        return newMode;
      });
    } else {
      console.log('El usuario no tiene permisos para cambiar de modo.');
    }
  };

  const NAV_ITEMS = [
    {
      label: t('appBar.navItems.business'),
      icon: <StorefrontIcon sx={{ color: theme.palette.primary.main }} />,
      path: '/login',
    },
    {
      label: t('appBar.authNavItems.home'),
      icon: <HomeIcon />,
      path: '/home',
    },
    { label: t('appBar.navItems.services'), path: '/search-services' },
    { label: <TranslateIcon />, action: () => toggleLanguage() },
    { label: t('auth.login.title'), path: '/login' },
    {
      label: (
        <ButtonAtom
          type="submit"
          variant="filled"
          fullWidth
          sx={{ maxWidth: '128px', maxHeight: '38px', textTransform: 'none' }}
        >
          {t('auth.login.register')}
        </ButtonAtom>
      ),
      path: '/register',
    },
  ];

  const AUTH_NAV_ITEMS = [
    {
      label: t('appBar.navItems.business'),
      icon: <StorefrontIcon sx={{ color: theme.palette.primary.main }} />,
      path: '/stepper',
    },
    {
      label: t('appBar.authNavItems.home'),
      icon: <HomeIcon />,
      path: '/home',
    },
    {
      label: t('appBar.authNavItems.tasks'),
      icon: <TaskIcon />,
      path: '/tasks',
    },
    {
      label: t('appBar.authNavItems.favorites'),
      icon: <FavoriteIcon />,
      path: '/favorites',
    },
    { label: <TranslateIcon />, action: () => toggleLanguage() },
    {
      label: (
        <Avatar
          src={getApiImageUrl(user?.avatarUrl)}
          sx={{
            width: 35,
            height: 35,
            borderRadius: 50
            
          }}
        />
      ),
      path: '/profile',
    },
  ];
  console.error('ERROR: ', getApiImageUrl(user?.avatarUrl));
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const renderMenuItems = (items) =>
    items.map(({ label, icon, path, action }, index) => (
      <MenuItem
        key={index}
        onClick={() => (action ? action() : handleNavigation(path))}
      >
        <Typography
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          {icon && <IconButton>{icon}</IconButton>}
          {label}
        </Typography>
      </MenuItem>
    ));

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppLogo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleMenuOpen}>
              <MenuIcon sx={{ color: palette.primary.main }} />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {renderMenuItems(isAuthenticated ? AUTH_NAV_ITEMS : NAV_ITEMS)}
            </Menu>
          </Box>
          <AppLogo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {renderMenuItems(isAuthenticated ? AUTH_NAV_ITEMS : NAV_ITEMS)}
          </Box>
          {isAuthenticated &&
            user?.roles?.some((role) => role.name === 'User') &&
            user?.roles?.some((role) => role.name === 'Merchant') && (
              <Button
                color="inherit"
                onClick={toggleMode}
                sx={{ marginLeft: 'auto' }}
              >
                Switch to {currentMode === 'user' ? 'Merchant' : 'User'} Mode
              </Button>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
