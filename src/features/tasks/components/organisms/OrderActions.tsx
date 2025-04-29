import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';

type OrderActionsProps = {
  orderStatus: number;
  userRoles: string[] | null;
  currentMode: 'user' | 'merchant';
  onViewDetails: () => void;
  onChat: () => void;
  onAcceptTask?: () => void;
  onCompleteTask?: () => void;
  onRateService?: () => void;
};

const OrderActions: React.FC<OrderActionsProps> = ({
  orderStatus,
  userRoles,
  currentMode,
  onViewDetails,
  onChat,
  onAcceptTask,
  onCompleteTask,
  onRateService,
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {/* Botón "Ver detalle de la tarea" */}
      <Tooltip title="Ver detalle de la tarea">
        <IconButton
          style={{ color: '#019FE9' }}
          size="small"
          onClick={onViewDetails}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Botón "Chat" */}
      {(userRoles?.includes('user') || userRoles?.includes('merchant')) && (
        <Tooltip title="Iniciar conversación">
          <IconButton color="primary" size="small" onClick={onChat}>
            <ChatIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {/* Botón "Aceptar tarea" (solo para merchant en estado "Beginning soon") */}
      {currentMode === 'merchant' &&
        userRoles?.includes('merchant') &&
        orderStatus === 1 && (
          <Tooltip title="Aceptar tarea">
            <IconButton color="success" size="small" onClick={onAcceptTask}>
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

      {/* Botón "Completar tarea" (solo para merchant en estado "In progress") */}
      {currentMode === 'merchant' &&
        userRoles?.includes('merchant') &&
        orderStatus === 2 && (
          <Tooltip title="Completar tarea">
            <IconButton color="success" size="small" onClick={onCompleteTask}>
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

      {/* Botón "Calificar servicio" (solo para user en estado "Completed") */}
      {currentMode === 'user' &&
        userRoles?.includes('user') &&
        orderStatus === 3 && (
          <Tooltip title="Calificar servicio">
            <IconButton color="warning" size="small" onClick={onRateService}>
              <StarIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
    </Box>
  );
};

export default OrderActions;
