import React, { useMemo, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetOrdersQuery, useUpdateOrderMutation } from '../../../../services/ordersApi';
import { useSelector } from 'react-redux';
import { selectMode } from '../../../../redux/slices/roleSwitcherSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';
import { useUserRole } from '../../../../features/auth/hooks/authHooks';
import RoleSwitcherButton from '../../../../components/atoms/RoleSwitcherButton';
import ConfirmActionModal from './orders/ConfirmActionModal';
import OrderTabs from './orders/OrderTabs';
import OrderList from './orders/OrderList';
import { useCreateChatMutation } from '../../../../services/chatApi';
import { useNavigate } from 'react-router-dom';

const BusinessOrderPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [createChat] = useCreateChatMutation();
  const currentMode = useSelector(selectMode);
  const { user } = useAppSelector(selectAuth);
  const userRoles = useUserRole();

  const [orderStatus, setOrderStatus] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);

  const orders = data?.data;

  const ordersFilteredByStatus = useMemo(
    () => orders?.filter((order) => order.status === orderStatus) || [],
    [orders, orderStatus]
  );

  const FILTER_OPTIONS = useMemo(
    () =>
      [1, 2, 3, 4].map((status) => ({
        status,
        value: orders?.filter((o) => o.status === status).length || 0,
        label: t(`BusinessOrdersPage.${['soon', 'inProgress', 'completed', 'canceled'][status - 1]}`),
      })),
    [orders, t]
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setOrderStatus(newValue);
  };

  const handleOpenModal = (action: string, orderId: number) => {
    setSelectedAction(action);
    setSelectedOrder(orderId);
    setShowConfirmActionModal(true);
  };

  const handleChat = async (user2Id: number) => {
    const chatBody = {
      user1Id: user?.id,
      user2Id,
    };
    try {
      const respChatCreated = await createChat(chatBody).unwrap();
      if (respChatCreated) {
        navigate(`/profile`);
      }
    } catch (error) {
      console.error('Failed to create chat:', error);
    }
  };

  const handleReview = (orderId: number) => {
    navigate(`/review`);
  };

  const handleConfirmAction = async () => {
    if (!selectedAction || !selectedOrder) {
      console.error('Missing action or order ID');
      return;
    }

    const user2Id = orders?.find((order) => order.id === selectedOrder)?.details[0]?.productService?.userId;

    const actionMap: Record<string, () => Promise<void>> = {
      complete: async () => {
        await updateOrder({ orderId: selectedOrder, status: 3 }).unwrap();
        refetch();
      },
      accept: async () => {
        await updateOrder({ orderId: selectedOrder, status: 2 }).unwrap();
        refetch();
      },
      notInterested: async () => {
        await updateOrder({ orderId: selectedOrder, status: 4 }).unwrap();
        refetch();
      },
      chat: async () => {
        if (user2Id) {
          await handleChat(user2Id);
        } else {
          console.error('User ID for chat not found');
        }
      },
      rate: async () => {
        handleReview(selectedOrder);
      },
    };

    const actionHandler = actionMap[selectedAction];

    if (actionHandler) {
      try {
        await actionHandler();
      } catch (error) {
        console.error(`Error handling ${selectedAction}:`, error);
      }
    } else {
      console.error('Invalid action');
    }

    setShowConfirmActionModal(false);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!userRoles) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">{t('BusinessOrdersPage.loadingRoles', 'Loading user roles...')}</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column">
      <ConfirmActionModal
        open={showConfirmActionModal}
        onClose={() => setShowConfirmActionModal(false)}
        onConfirm={handleConfirmAction}
        action={selectedAction}
      />
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {t('BusinessOrdersPage.yourOrders', 'Your orders')}
      </Typography>
      <OrderTabs value={orderStatus} onChange={handleTabChange} options={FILTER_OPTIONS} />
      <OrderList orders={ordersFilteredByStatus} onAction={handleOpenModal} />
      <Box mt={3}>
        <RoleSwitcherButton />
      </Box>
    </Box>
  );
};

export default BusinessOrderPage;
