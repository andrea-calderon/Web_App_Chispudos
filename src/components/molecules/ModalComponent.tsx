import React from 'react';
import {
  Modal,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonAtom, TextAtom } from '../atoms';

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children: React.ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isConfirmButtonDisabled?: boolean;
  isConfirmButtonLoading?: boolean;
  hideCancelbutton?: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  isConfirmButtonDisabled = false,
  isConfirmButtonLoading = false,
  hideCancelbutton = false,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 300,
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            position: 'relative',
          }}
        >
          <TextAtom
            variant="title"
            size="large"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            {title}
          </TextAtom>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', right: -30, top: -30 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mb: 2, textAlign: 'center' }}>{children}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            {!hideCancelbutton && (
                <ButtonAtom variant="outlined" onClick={onClose}>
                {cancelButtonText}
                </ButtonAtom>
            )}
          {onConfirm && (
            <ButtonAtom
              variant="filled"
              onClick={onConfirm}
              disabled={isConfirmButtonDisabled || isConfirmButtonLoading}
            >
              {isConfirmButtonLoading ? (
                <CircularProgress size={24} />
              ) : (
                confirmButtonText
              )}
            </ButtonAtom>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
