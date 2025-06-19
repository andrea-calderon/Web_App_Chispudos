import React, { useMemo, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetOrdersByMerchantIdQuery, useGetOrdersByUserIdQuery, useUpdateOrderMutation } from '../../../../services/ordersApi';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';
import ConfirmActionModal from './orders/ConfirmActionModal';
import OrderTabs from './orders/OrderTabs';
import OrderList from './orders/OrderList';
import { useCreateChatMutation } from '../../../../services/chatApi';
import { useNavigate } from 'react-router-dom';
import { EmptySection } from '../../../../components/molecules';
import { useHasRole } from '../../../../hooks/useHasRole';

const BusinessOrderPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  const isMerchant = useHasRole('Merchant');
  const { data, isLoading, refetch } = useGetOrdersByUserIdQuery(user?.id, {
    skip: !user?.id || isMerchant,
  });
  const { data: ordersMerchant, isLoading: isOrdersMerchantLoading} = useGetOrdersByMerchantIdQuery(user?.id, {
    skip: !user?.id || !isMerchant,
  });

  const [updateOrder] = useUpdateOrderMutation();
  const [createChat] = useCreateChatMutation();

  const [orderStatus, setOrderStatus] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);

  const orders = data?.data || ordersMerchant?.data || [];

  const ordersFilteredByStatus = useMemo(
    () => orders?.filter((order) => order.status === orderStatus) || [],
    [orders, orderStatus]
  );

// i18next-parser-start
// t('BusinessOrdersPage.soon', 'Beginning soon')
// t('BusinessOrdersPage.inProgress', 'In progress')
// t('BusinessOrdersPage.completed', 'Completed')
// t('BusinessOrdersPage.canceled', 'Canceled')
// i18next-parser-end

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
        navigate(`/messages`);
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

    const actionMerchantMap: Record<string, () => Promise<void>> = {
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

    const actionUserMap: Record<string, () => Promise<void>> = {
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

    const actionHandler = isMerchant? actionMerchantMap[selectedAction] : actionUserMap[selectedAction];

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
      {ordersFilteredByStatus?.length ? (
        <OrderList
          orders={ordersFilteredByStatus}
          onAction={handleOpenModal}
          />
      ) : (
        <EmptySection />
      )}
    </Box>
  );
};

export default BusinessOrderPage;
