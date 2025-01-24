import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Modal,
  IconButton,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid2';
import { UserLayout } from '../../../../components/templates/UserLayout';
import { ButtonAtom, TextAtom } from '../../../../components/atoms';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { logout, selectAuth } from '../../../../redux/slices/authSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';

const modalUploadFileStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};



export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setPreviewImage(null);
    setErrorMsg(null);
  };


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    
    const validFileTypes = ['image/jpeg', 'image/png'];
    if (!validFileTypes.includes(file.type)) {
      setErrorMsg('Solo se permiten archivos JPG o PNG.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('El archivo debe ser menor a 5MB.');
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;

    setLoadingImage(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      //TODO: Connect to the API

      const response = await fetch('//users/2/avatar', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen.');
      }

     
      const data = await response.json();
      console.log('Imagen actualizada:', data);

      setLoadingImage(false);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setErrorMsg('No se pudo guardar la imagen. Intenta de nuevo.');
      setLoadingImage(false);
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
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
            }}
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
          <Box sx={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
            <Avatar
              src={previewImage || '/default-avatar.png'}
              alt="Avatar"
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#6750A4',
                color: 'white',
                width: 32,
                height: 32,
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: '#55379A',
                },
              }}
            >
              <EditIcon fontSize="small" />
              <input
                type="file"
                hidden
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
              />
            </IconButton>
          </Box>
          {errorMsg && (
            <Typography color="error" mt={2}>
              {errorMsg}
            </Typography>
          )}
          <TextAtom variant="title" size="large">
            {user?.name || 'Name'}&nbsp;{user?.lastname || 'Lastname'}
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
            {['Cambiar contraseña', 'Métodos de pago', 'Promociones', 'Notificaciones', 'Soporte'].map(
              (item, index) => (
                <ListItem key={index} disablePadding sx={{ borderBottom: '1px solid rgb(226, 226, 230)' }}>
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
                    <ArrowForwardIosIcon fontSize="small" sx={{ color: '#6750A4' }} />
                  </ButtonAtom>
                </ListItem>
              )
            )}
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
            sx={{ fontWeight: 'bold', mr: 2, mb: 2, mx: { xs: 'auto', sm: 0 }, width: { xs: '75%', sm: '200px' } }}
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
            sx={{ fontWeight: 'bold', mb: 2, mx: { xs: 'auto', sm: 0 }, width: { xs: '75%', sm: '200px' } }}
          >
            <TextAtom
              variant="title"
              size="medium"
              sx={{ cursor: 'pointer', textTransform: 'none', mr: 3, ml: 3 }}
            >
              Cerrar Sesión
            </TextAtom>
          </ButtonAtom>

          <Modal open={modalOpen} onClose={handleCloseModal}>
            <Box sx={modalUploadFileStyle}>
              <TextAtom variant="title" size='medium' mb={2}>
                Cambiar foto de perfil
              </TextAtom>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Vista previa"
                    style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
                  />
                ) : (
                  <TextAtom variant="title" size='medium'>
                    No hay imagen seleccionada
                  </TextAtom>
                )}
                <ButtonAtom
                  variant="outlined"
                  onClick={() => document.getElementById('fileInput')?.click()}
                  sx={{ mt: 2 }}
                >
                  Seleccionar archivo
                  <input
                    id="fileInput"
                    type="file"
                    hidden
                    accept="image/jpeg,image/png"
                    style={{display:'none'}}
                    onChange={handleImageChange}
                  />
                </ButtonAtom>
                {errorMsg && (
                  <TextAtom variant="title" size='medium' color='red'>
                    {errorMsg}
                  </TextAtom>
                )}
                <ButtonAtom
                  variant="outlined"
                  onClick={handleSaveImage}
                  disabled={loadingImage}
                >
                  {loadingImage ? <CircularProgress size={24} /> : 'Guardar'}
                </ButtonAtom>
              </Box>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </UserLayout>
  );
};

