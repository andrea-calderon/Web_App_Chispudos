import React, { useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid2';
import { UserLayout } from '../../../../components/templates/UserLayout';
import { ButtonAtom, TextAtom } from '../../../../components/atoms';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { logout, selectAuth } from '../../../../redux/slices/authSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAvatarUpload } from '../../../../hooks/useAvatarUpload';
import { ModalComponent } from '../../../../components/molecules';
import AvatarUpload from '../organisms/AvatarUpload';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    selectedImage,
    previewImage,
    errorMsg,
    isUploading,
    handleImageChange,
    handleSaveImage,
  } = useAvatarUpload({ userId: user?.id?.toString() || '' });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveClick = async () => {
    if (selectedImage) {
      await handleSaveImage();
      handleCloseModal();
    }
  };

  return (
    <UserLayout>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Grid
          size={{ xs: 12, sm: 0 }}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            px: 2,
            mb: 2,
          }}
        >
          <TextAtom variant="title" size="medium" sx={{ fontWeight: 'bold' }}>
            Perfil
          </TextAtom>
          <ButtonAtom
            variant="text"
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
            onClick={() => dispatch(logout())}
          >
            Salir
          </ButtonAtom>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: { xs: 4, sm: 6 },
          }}
        >
          <AvatarUpload
            previewImage={previewImage}
            userAvatarUrl={user?.avatarUrl || ''}
            handleImageChange={(e) => {
              handleImageChange(e);
              setModalOpen(true);
            }}
            errorMsg={errorMsg}
          />
          <TextAtom variant="title" size="large">
            {user?.name || 'Name'} {user?.lastname || 'Lastname'}
          </TextAtom>
        </Grid>

        <Grid size={{ xs: 12, md: 8, lg: 6, xl: 5 }}>
          <List sx={{ width: '100%' }}>
            <ListItem disablePadding>
              <ButtonAtom
                variant="text"
                fullWidth
                sx={{
                  height: '50px',
                  justifyContent: 'space-between',
                  textTransform: 'none',
                  borderRadius: '0',
                  borderBottom: '1px solid rgb(226, 226, 230)',
                }}
              >
                <TextAtom variant="title" size="medium">
                  Account
                </TextAtom>
                <TextAtom variant="title" size="medium">
                  {user?.email || 'email'}
                </TextAtom>
              </ButtonAtom>
            </ListItem>
            {[
              'Cambiar contraseña',
              'Métodos de pago',
              'Promociones',
              'Notificaciones',
              'Soporte',
            ].map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ borderBottom: '1px solid rgb(226, 226, 230)' }}
              >
                <ButtonAtom
                  variant="text"
                  fullWidth
                  sx={{
                    height: '50px',
                    justifyContent: 'space-between',
                    textTransform: 'none',
                  }}
                >
                  <TextAtom variant="title" size="medium">
                    {item}
                  </TextAtom>
                  <ArrowForwardIosIcon
                    fontSize="small"
                    sx={{ color: '#6750A4' }}
                  />
                </ButtonAtom>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid
          size={{ xs: 12, md: 8, lg: 6, xl: 5 }}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'flex-end' },
            gap: 2,
            mt: { xs: 2, sm: 0 },
            textAlign: { xs: 'center', sm: 'right' },
          }}
        >
          <ButtonAtom
            variant="outlined"
            sx={{
              fontWeight: 'bold',
              mr: 2,
              mb: 2,
              mx: { xs: 'auto', sm: 0 },
              width: { xs: '75%', sm: '200px' },
            }}
          >
            <TextAtom
              variant="title"
              size="medium"
              sx={{ cursor: 'pointer', textTransform: 'none' }}
            >
              Ofrecer mis servicios
            </TextAtom>
          </ButtonAtom>

          <ButtonAtom
            variant="filled"
            onClick={() => dispatch(logout())}
            sx={{
              fontWeight: 'bold',
              mb: 2,
              mx: { xs: 'auto', sm: 0 },
              width: { xs: '75%', sm: '200px' },
            }}
          >
            <TextAtom
              variant="title"
              size="medium"
              sx={{ cursor: 'pointer', textTransform: 'none', mr: 3, ml: 3 }}
            >
              Cerrar Sesión
            </TextAtom>
          </ButtonAtom>

          <ModalComponent
            open={modalOpen}
            onClose={handleCloseModal}
            title="Cambiar foto de perfil"
            onConfirm={handleSaveClick}
            confirmButtonText="Actualizar"
            isConfirmButtonLoading={isUploading}
          >
            <AvatarUpload
              previewImage={previewImage}
              userAvatarUrl={user?.avatarUrl || ''}
              handleImageChange={handleImageChange}
              errorMsg={errorMsg}
            />
          </ModalComponent>
        </Grid>
      </Grid>
    </UserLayout>
  );
};

export default ProfilePage;