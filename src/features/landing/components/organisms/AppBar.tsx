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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Translate as TranslateIcon,
  AccountCircleOutlined as AccountIcon,
  FavoriteBorderOutlined as FavoriteIcon,
  Engineering as EngineeringIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLogo from '../../../../components/molecules/AppLogo';
import { ButtonAtom } from '../../../../components/atoms';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { palette } = theme;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState('en');

  const NAV_ITEMS = [
    { label: 'Cómo funciona', path: '/how-it-works' },
    { label: '¿Eres profesional?', path: '/are-you-a-professional' },
    { label: 'Servicios', path: '/services' },
    { label: <TranslateIcon />, action: () => toggleLanguage() },
    { label: 'Iniciar sesión', path: '/login' },
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
      label: '¿Eres profesional?',
      icon: <EngineeringIcon />,
      path: '/are-you-a-professional',
    },
    { label: 'Tareas', icon: <AssignmentIcon />, path: '/tasks' },
    { label: 'Especialistas', icon: <FavoriteIcon />, path: '/specialists' },
    { label: <TranslateIcon />, action: () => toggleLanguage() },
    { label: <AccountIcon fontSize="large" />, path: '/profile' },
  ];

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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
