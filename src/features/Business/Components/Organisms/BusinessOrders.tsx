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
import { DoneAll, Chat, Task, MoreVert, NotInterested, StarRate } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useGetOrdersQuery, useUpdateOrderMutation } from '../../../../services/ordersApi';
import { format } from 'date-fns';
import DEFAULT_IMAGE from '../../../../assets/images/DEFAULT_IMAGE.png';
import { useSelector } from 'react-redux';
import { selectMode } from '../../../../redux/slices/roleSwitcherSlice';
import { useUserRole } from '../../../../features/auth/hooks/authHooks';
import { EmptySection } from '../../../../components/molecules';
import { useTheme } from '@mui/material/styles';
import RoleSwitcherButton from '../../../../components/atoms/RoleSwitcherButton';
import { useCreateChatMutation } from '../../../../services/chatApi';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ButtonAtom } from '../../../../components/atoms';

const getFullImageUrl = (url: string | null) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  return url?.startsWith('http') ? url : `${baseUrl}${url}`;
};

const BusinessOrderPage = () => {
  const { t } = useTranslation();
  const { data, isLoading, refetch: refetchOrders } = useGetOrdersQuery();
  const [orderStatus, setOrderStatus] = React.useState(1);
  const currentMode = useSelector(selectMode);
  const { user } = useAppSelector(selectAuth)
  const userRoles = useUserRole();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const [createChat] = useCreateChatMutation();

  const handleChat = async (user2Id: number) => {
      const chatBody = {
        user1Id: user?.id,
        user2Id 
      };
      const respChatCreated = await createChat(chatBody).unwrap();
      console.log('Chat created successfully', chatBody);
      if (respChatCreated) {
        console.log('Chat created successfully', respChatCreated);
        navigate(`/profile`);
      }
    }

  // order status constants
  // 1: requested, 2: in progress, 3: completed, 4: cancelled, 5: refunded, 6: failed, 7: reviewed
  const [updateOrder] = useUpdateOrderMutation();
  const handleOrderUpdate = async (orderId: number, status: number) => {
    try {
      await updateOrder({ orderId, status }).unwrap();
      refetchOrders();
      console.log('Order updated successfully');
    } catch (error) {
      console.error('Failed to update order:', error);
    }
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
                      <MenuItem onClick={() => handleOrderUpdate(order.id, 3)}>
                        <ButtonAtom variant='outlined' fullWidth  startIcon={<DoneAll />} size='small' >{t('features.businessOrdersPage.actions.completed', 'Completada')}</ButtonAtom>
                      </MenuItem>
                      <MenuItem onClick={() => handleOrderUpdate(order.id, 2)}>
                        <ButtonAtom variant='outlined' fullWidth startIcon={<Task />} >{t('features.businessOrdersPage.actions.accept', 'Aceptar')}</ButtonAtom>
                      </MenuItem>
                      <MenuItem onClick={() => handleOrderUpdate(order.id, 4)}>
                        <ButtonAtom variant='outlined' fullWidth startIcon={<NotInterested />} >{t('features.businessOrdersPage.actions.notInterested', 'No interesado')}</ButtonAtom>
                      </MenuItem>
                      <MenuItem onClick={() => handleChat(order?.details[0]?.productService?.userId)}>
                        <ButtonAtom variant='outlined' fullWidth startIcon={<Chat />} >{t('features.businessOrdersPage.actions.chat', 'Chat')}</ButtonAtom>
                      </MenuItem>
                      <MenuItem onClick={() => console.log(`Rate order ${order.id}`)}>
                        <ButtonAtom variant='outlined' fullWidth startIcon={<StarRate />} >{t('features.businessOrdersPage.actions.rate', 'Calificar')}</ButtonAtom>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box display="flex" gap={1}>
                    <ButtonAtom variant='elevated' startIcon={<DoneAll />} title={t('features.businessOrdersPage.actions.completed', 'Completada')} onClick={()=> handleOrderUpdate(order.id, 3) } />
                    <ButtonAtom variant='elevated' startIcon={<Task />} title={t('features.businessOrdersPage.actions.accept', 'Aceptar')} onClick={() => handleOrderUpdate(order.id, 2)} />
                    <ButtonAtom variant='elevated' startIcon={<NotInterested />} title={t('features.businessOrdersPage.actions.notInterested', 'No interesado')} onClick={() => handleOrderUpdate(order.id, 4)} />
                    <ButtonAtom variant='elevated' startIcon={<Chat />} title={t('features.businessOrdersPage.actions.chat', 'Chat')} onClick={() => handleChat(order?.details[0]?.productService?.userId)} />
                    <ButtonAtom variant='elevated' startIcon={<StarRate />} title={t('features.businessOrdersPage.actions.rate', 'Calificar')} />
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