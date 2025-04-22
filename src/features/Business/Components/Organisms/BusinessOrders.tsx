import {
  Box,
  Avatar,
  Typography,
  useTheme,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextAtom from '../../../../components/atoms/TextAtom';
import { ButtonAtom } from '../../../../components/atoms';
import React, { useMemo } from 'react';
import { useGetOrdersQuery } from '../../../../services/ordersApi';
import { format } from 'date-fns';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton, Tooltip } from '@mui/material';
import { useUserRole } from '../../../../features/auth/hooks/authHooks';
import DEFAULT_IMAGE from '../../../../assets/images/DEFAULT_IMAGE.png';

const getFullImageUrl = (url: string | null) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000';
  return url?.startsWith('http') ? url : `${baseUrl}${url}`;
};

const BusinessOrderPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data, isLoading } = useGetOrdersQuery();
  const [orderStatus, setOrderStatus] = React.useState(1);

  const userRoles = useUserRole();
  console.log('Roles del usuario:', userRoles);

  const handleStatusChange = (status: number) => {
    setOrderStatus(status);
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
        value: orders?.filter((order) => order.status === 1).length,
      },
      {
        label: t('BusinessOrdersPage.inProgress', 'In progress'),
        status: 2,
        value: orders?.filter((order) => order.status === 2).length,
      },
      {
        label: t('BusinessOrdersPage.completed', 'Completed'),
        status: 3,
        value: orders?.filter((order) => order.status === 3).length,
      },
      {
        label: t('BusinessOrdersPage.canceled', 'Canceled'),
        status: 4,
        value: orders?.filter((order) => order.status === 4).length,
      },
    ],
    [orders],
  );

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
    <Box display="flex" flexDirection="column" mt={2} mb={4} ml={4} mr={4}>
      <TextAtom variant="headline" size="small" fontWeight="bold" mb={2}>
        {t('BusinessOrdersPage.yourOrders', 'Your orders')}
      </TextAtom>
      <Stack direction="row" spacing={2} mb={2}>
        {FILTER_OPTIONS.map((option) => (
          <ButtonAtom
            key={option.status}
            variant="outlined"
            onClick={() => handleStatusChange(option.status)}
          >
            <TextAtom variant="body" size="small">
              {`${option.label} (${option.value})`}
            </TextAtom>
          </ButtonAtom>
        ))}
      </Stack>
      <List sx={{ width: '100%', paddingX: 5 }}>
        {ordersFilteredByStatus?.length > 0 ? (
          ordersFilteredByStatus.map((order, index) => (
            <ListItem
              key={order.id}
              alignItems="flex-start"
              secondaryAction={
                <Box display="flex" alignItems="center" gap={1}>
                  {/* Mostrar botón "Finalizar tarea" */}
                  {userRoles?.includes('merchant') && order.status === 2 && (
                    <Tooltip title="Finalizar tarea">
                      <IconButton
                        color="success"
                        size="small"
                        onClick={() =>
                          console.log(`Finalizar tarea para order ${order.id}`)
                        }
                      >
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {/* Mostrar botón "Chat" */}
                  {(userRoles?.includes('user') ||
                    userRoles?.includes('merchant')) &&
                    order.status < 3 && (
                      <Tooltip title="Iniciar conversación">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() =>
                            console.log(`Iniciar chat para order ${order.id}`)
                          }
                        >
                          <ChatIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar
                  alt={order?.details[0]?.productService?.name}
                  variant="rounded"
                  src={
                    order?.details[0]?.productService?.urlImage
                      ? getFullImageUrl(
                          order.details[0].productService.urlImage,
                        )
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
            </ListItem>
          ))
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
          >
            <TextAtom variant="body" size="small">
              {t('No hay órdenes para mostrar')}
            </TextAtom>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default BusinessOrderPage;
