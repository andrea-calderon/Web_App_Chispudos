import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useTheme } from '@mui/material/styles';
import { TextAtom, ButtonAtom } from '../../../../components/atoms';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const pages = [
  { title: 'Ubicación', url: '/location' },
  { title: 'Cómo funciona', url: '/how-it-works' },
  { title: '¿Eres profesional?', url: '/are-you-a-professional' },
  { title: 'Servicios', url: '/services' },
  { title: 'Iniciar sesión', url: '/login' },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const theme = useTheme();
  const { palette } = theme;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <TextAtom
            variant="display"
            size="small"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: palette.primary.main,
              textDecoration: 'none',
            }}
          >
            Workoo
          </TextAtom>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ textAlign: 'center' }}
                    onClick={() => navigate(page.url)}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <TextAtom
            variant="display"
            size="small"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: palette.primary.main,
              textDecoration: 'none',
            }}
          >
            Workoo
          </TextAtom>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page) => (
              <Button
                href={page.url}
                key={page.url}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'gray', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
            <ButtonAtom
              onClick={() => navigate('/register')}
              type="submit"
              variant="filled"
              fullWidth
              sx={{
                mt: 2,
                width: '100%',
                maxWidth: '128px',
                maxHeight: '38px',
                textTransform: 'none',
              }}
            >
              {t('auth.login.register')}
            </ButtonAtom>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
