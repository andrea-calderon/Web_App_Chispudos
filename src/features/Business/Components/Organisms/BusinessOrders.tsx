import React, { useMemo } from 'react';
import {
  Box,
  Avatar,
  Typography,
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
import { useGetOrdersQuery } from '../../../../services/ordersApi';
import { format } from 'date-fns';
import DEFAULT_IMAGE from '../../../../assets/images/DEFAULT_IMAGE.png';
import okIcon from '../../../../assets/images/ok_icon-01.svg';
import { useSelector } from 'react-redux';
import { selectMode } from '../../../../redux/slices/modeSlice';
import { useUserRole } from '../../../../features/auth/hooks/authHooks';
import OrderActions from '../../../tasks/components/organisms/OrderActions';
import { hasPermission } from '../../../../utils/permissions'; // Importa hasPermission

const getFullImageUrl = (url: string | null) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000';
  return url?.startsWith('http') ? url : `${baseUrl}${url}`;
};

const BusinessOrderPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetOrdersQuery();
  const [orderStatus, setOrderStatus] = React.useState(1);

  const currentMode = useSelector(selectMode); // Obtén el modo actual ('user' o 'merchant')
  const userRoles = useUserRole(); // Obtén los roles del usuario

  console.log('userRoles', userRoles);
  console.log('currentMode', currentMode);
  console.log('orderStatus', orderStatus);
  console.log('data', data);

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
          ordersFilteredByStatus.map((order) => (
            <ListItem
              key={order.id}
              alignItems="flex-start"
              secondaryAction={
                <OrderActions
                  orderStatus={order.status}
                  userRoles={userRoles}
                  currentMode={currentMode}
                  onViewDetails={() =>
                    console.log(
                      `Ver detalle de la tarea para order ${order.id}`,
                    )
                  }
                  onChat={() =>
                    console.log(`Iniciar chat para order ${order.id}`)
                  }
                  onAcceptTask={() => {
                    if (
                      hasPermission(
                        { id: 'user-id', roles: userRoles },
                        'tasks',
                        'accept',
                      )
                    ) {
                      console.log(`Aceptar tarea para order ${order.id}`);
                    } else {
                      console.log('No tienes permiso para aceptar esta tarea.');
                    }
                  }}
                  onCompleteTask={() => {
                    if (
                      hasPermission(
                        { id: 'user-id', roles: userRoles },
                        'tasks',
                        'complete',
                      )
                    ) {
                      console.log(`Completar tarea para order ${order.id}`);
                    } else {
                      console.log(
                        'No tienes permiso para completar esta tarea.',
                      );
                    }
                  }}
                  onRateService={() =>
                    console.log(`Calificar servicio para order ${order.id}`)
                  }
                />
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
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="300px"
            textAlign="center"
            gap={2}
            sx={{
              border: '2px dashed',
              borderColor: 'primary.light',
              borderRadius: 2,
              padding: 3,
            }}
          >
            <img
              src={okIcon}
              alt="Ok Icon"
              style={{
                width: '150px',
                height: '150px',
              }}
            />

            {/* Mensaje descriptivo */}
            <TextAtom variant="body" size="medium" fontWeight="bold">
              {t('BusinessOrdersPage.noOrders', 'No hay órdenes disponibles')}
            </TextAtom>
            <Typography variant="body2" color="text.secondary">
              {t(
                'BusinessOrdersPage.noOrdersDescription',
                'Parece que no tienes órdenes en este momento. ¡Vuelve más tarde o crea una nueva orden!',
              )}
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default BusinessOrderPage;
