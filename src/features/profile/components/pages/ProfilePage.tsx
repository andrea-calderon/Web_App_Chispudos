import { UserLayout } from '../../../../components/templates/UserLayout';
import { ButtonAtom, TextAtom } from '../../../../components/atoms';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { logout, selectAuth } from '../../../../redux/slices/authSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { Box, Avatar,List, ListItem, ListItemText, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../../../assets/images/cards/Jose_Perez.svg'


export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user} = useAppSelector(selectAuth);
  

  
  return (
    <UserLayout>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      
      <Avatar src={'Jose_Perez.svg'} sx={{ width: 80, height: 80, mb: 2 }} />
      
      
      <TextAtom variant="title" size="medium">
        {user?.name || 'Usuario Anónimo'}
      </TextAtom>
      <TextAtom variant="title" size='medium'>
        {user?.email || 'Correo no disponible'}
        
      </TextAtom>

      
      <List sx={{ width: '100%', mt: 3 }}>
        {['Cambiar contraseña', 'Métodos de pago', 'Promociones', 'Notificaciones', 'Soporte'].map((item, index) => (
          <ListItem key={index} component="button">
            <ListItemText primary={item} />
            <ArrowForwardIosIcon fontSize="small" />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <ButtonAtom
          
          fullWidth
          variant="text"
          sx={{ mb: 2 }}
        >
         <TextAtom
          variant="title"
          size='medium'
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Convertirse en Especialista
        </TextAtom>
        </ButtonAtom>

        <ButtonAtom
          variant="text"
          onClick={() => dispatch(logout())}
          sx={{ color: 'red', fontWeight: 'bold' }}
          fullWidth
        >
          Cerrar Sesión
        </ButtonAtom>
      </Box>

      
    </Box>
    </UserLayout>
  
  );
};
