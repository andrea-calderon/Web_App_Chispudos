import React, { useMemo, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { Delete, Chat, Task, MoreVert, NotInterested, StarRate } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useGetOrdersQuery } from '../../../../services/ordersApi';
import { format } from 'date-fns';
import DEFAULT_IMAGE from '../../../../assets/images/DEFAULT_IMAGE.png';
import { useSelector } from 'react-redux';
import { selectMode } from '../../../../redux/slices/roleSwitcherSlice';
import { useUserRole } from '../../../../features/auth/hooks/authHooks';
import { EmptySection } from '../../../../components/molecules';
import { useTheme } from '@mui/material/styles';
import RoleSwitcherButton from '../../../../components/atoms/RoleSwitcherButton';

const getFullImageUrl = (url: string | null) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  return url?.startsWith('http') ? url : `${baseUrl}${url}`;
};

const BusinessOrderPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetOrdersQuery();
  const [orderStatus, setOrderStatus] = React.useState(1);
  const currentMode = useSelector(selectMode);
  const userRoles = useUserRole();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const orders = data?.data;

  const ordersFilteredByStatus = useMemo(() => {
    return orders?.filter((order) => order.status === orderStatus);
  }, [orders, orderStatus]);

  const FILTER_OPTIONS = useMemo(
    () => [
      {
        label: t('BusinessOrdersPage.soon', 'Beginning soon'),
        status: 1,
        value: orders?.filter((order) => order.status === 1).length || 0,
      },
      {
        label: t('BusinessOrdersPage.inProgress', 'In progress'),
        status: 2,
        value: orders?.filter((order) => order.status === 2).length || 0,
      },
      {
        label: t('BusinessOrdersPage.completed', 'Completed'),
        status: 3,
        value: orders?.filter((order) => order.status === 3).length || 0,
      },
      {
        label: t('BusinessOrdersPage.canceled', 'Canceled'),
        status: 4,
        value: orders?.filter((order) => order.status === 4).length || 0,
      },
    ],
    [orders],
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setOrderStatus(newValue);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!userRoles) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">
          {t('BusinessOrdersPage.loadingRoles', 'Loading user roles...')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {t('BusinessOrdersPage.yourOrders', 'Your orders')}
      </Typography>

      {/* Tabs for Filtering */}
      <Tabs
        value={orderStatus}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Order Status Tabs"
        sx={{ marginBottom: 3 }}
      >
        {FILTER_OPTIONS.map((option) => (
          <Tab
            key={option.status}
            label={`${option.label} (${option.value})`}
            value={option.status}
          />
        ))}
      </Tabs>

      {/* Orders List */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {ordersFilteredByStatus?.length > 0 ? (
          ordersFilteredByStatus.map((order, index) => (
            <React.Fragment key={order.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={order?.details[0]?.productService?.name}
                    src={
                      order?.details[0]?.productService?.urlImage
                        ? getFullImageUrl(order.details[0].productService.urlImage)
                        : DEFAULT_IMAGE
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={order?.details[0]?.productService?.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline' }}
                      >
                        {format(new Date(order?.startDate), 'dd/MM/yyyy HH:mm')}
                      </Typography>
                      {` — ${order?.details[0]?.comment}`}
                    </React.Fragment>
                  }
                />
                {isMobile ? (
                  <>
                    <IconButton
                      edge="end"
                      aria-label="more"
                      onClick={(event) => handleMenuOpen(event, order.id)}
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedOrder === order.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => console.log(`Delete order ${order.id}`)}>
                        <Delete fontSize="small" /> Delete
                      </MenuItem>
                      <MenuItem onClick={() => console.log(`Chat for order ${order.id}`)}>
                        <Chat fontSize="small" /> Chat
                      </MenuItem>
                      <MenuItem onClick={() => console.log(`Task for order ${order.id}`)}>
                        <Task fontSize="small" /> Task
                      </MenuItem>
                      <MenuItem onClick={() => console.log(`Not interested in order ${order.id}`)}>
                        <NotInterested fontSize="small" /> Not Interested
                      </MenuItem>
                      <MenuItem onClick={() => console.log(`Rate order ${order.id}`)}>
                        <StarRate fontSize="small" /> Rate
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box display="flex" gap={1}>
                    <IconButton onClick={() => console.log(`Delete order ${order.id}`)}>
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => console.log(`Chat for order ${order.id}`)}>
                      <Chat />
                    </IconButton>
                    <IconButton onClick={() => console.log(`Task for order ${order.id}`)}>
                      <Task />
                    </IconButton>
                    <IconButton onClick={() => console.log(`Not interested in order ${order.id}`)}>
                      <NotInterested />
                    </IconButton>
                    <IconButton onClick={() => console.log(`Rate order ${order.id}`)}>
                      <StarRate />
                    </IconButton>
                  </Box>
                )}
              </ListItem>
              {index < ordersFilteredByStatus.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))
        ) : (
          <EmptySection />
        )}
      </List>

      {/* Role Switcher */}
      <Box mt={3}>
        <RoleSwitcherButton />
      </Box>
    </Box>
  );
};

export default BusinessOrderPage;