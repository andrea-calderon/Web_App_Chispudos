import React, { useState } from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { DoneAll, Chat, Task, NotInterested, StarRate, MoreVert } from '@mui/icons-material';
import { format } from 'date-fns';
import DEFAULT_IMAGE from '../../../../../assets/images/DEFAULT_IMAGE.png';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ButtonAtom } from '../../../../../components/atoms';
import { getApiImageUrl } from '../../../../../utils/baseEnvironment';

interface OrderListItemProps {
  order: any;
  onAction: (action: string, orderId: number) => void;
}

const OrderListItem: React.FC<OrderListItemProps> = ({ order, onAction }) => {
  const { id, startDate, details } = order;
  const product = details[0]?.productService;
  const image = product?.urlImage? getApiImageUrl(product?.urlImage) : DEFAULT_IMAGE;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <img
          alt={product?.name}
          src={image}
          style={{
            width: 50,
            height: 50,
            borderRadius: '5%',
            objectFit: 'cover',
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={product?.name}
        secondary={`${format(new Date(startDate), 'dd/MM/yyyy HH:mm')} — ${details[0]?.comment}`}
      />
      {isMobile ? (
        <>
          <IconButton edge="end" aria-label="more" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => onAction('complete', id)}>
              <DoneAll fontSize="small" />
              {t('features.businessOrdersPage.actions.completed', 'Completada')}
            </MenuItem>
            <MenuItem onClick={() => onAction('accept', id)}>
              <Task fontSize="small" />
              {t('features.businessOrdersPage.actions.accept', 'Aceptar')}
            </MenuItem>
            <MenuItem onClick={() => onAction('notInterested', id)}>
              <NotInterested fontSize="small" />
              {t('features.businessOrdersPage.actions.notInterested', 'No interesado')}
            </MenuItem>
            <MenuItem onClick={() => onAction('chat', id)}>
              <Chat fontSize="small" />
              {t('features.businessOrdersPage.actions.chat', 'Chat')}
            </MenuItem>
            <MenuItem onClick={() => onAction('rate', id)}>
              <StarRate fontSize="small" />
              {t('features.businessOrdersPage.actions.rate', 'Calificar')}
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box display="flex" gap={1}>
          <ButtonAtom
            variant="elevated"
            startIcon={<DoneAll />}
            title={t('features.businessOrdersPage.actions.completed', 'Completada')}
            onClick={() => onAction('complete', id)}
          />
          <ButtonAtom
            variant="elevated"
            startIcon={<Task />}
            title={t('features.businessOrdersPage.actions.accept', 'Aceptar')}
            onClick={() => onAction('accept', id)}
          />
          <ButtonAtom
            variant="elevated"
            startIcon={<NotInterested />}
            title={t('features.businessOrdersPage.actions.notInterested', 'No interesado')}
            onClick={() => onAction('notInterested', id)}
          />
          <ButtonAtom
            variant="elevated"
            startIcon={<Chat />}
            title={t('features.businessOrdersPage.actions.chat', 'Chat')}
            onClick={() => onAction('chat', id)}
          />
          <ButtonAtom
            variant="elevated"
            startIcon={<StarRate />}
            title={t('features.businessOrdersPage.actions.rate', 'Calificar')}
            onClick={() => onAction('rate', id)}
          />
        </Box>
      )}
    </ListItem>
  );
};

export default OrderListItem;