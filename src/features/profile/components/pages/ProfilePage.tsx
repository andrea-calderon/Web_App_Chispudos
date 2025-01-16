import { UserLayout } from '../../../../components/templates/UserLayout';
import { ButtonAtom, TextAtom } from '../../../../components/atoms';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { logout, selectAuth } from '../../../../redux/slices/authSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { Avatar,List, ListItem} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user} = useAppSelector(selectAuth);
  

  
  return (
    <UserLayout>
      <Grid container 
      spacing={2} 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
      >
      
      <Grid
        size={{ xs: 12, sm: 0 }}
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          px: 2,
          mb: 2,
        }}
      >
        <TextAtom variant="title" size='medium' sx={{ fontWeight: "bold" }}>
          Perfil
        </TextAtom>
        <ButtonAtom
          variant="text"
          sx={{
            
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={() => {}}
        >
          Salir
        </ButtonAtom>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6, lg: 4, xl: 3 }} 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: { xs: 4, sm: 6 }
        }}
      >
        <Avatar 
          src={'https://picsum.photos/300/200?random=4'} 
          sx={{ width: 100, height: 100, mb: 3, mt:5, alignItems:"center" }}  
        />
        
        
        <TextAtom variant="title" size="large">
          {user?.name || 'Name'}
          &nbsp;
          {user?.lastname || 'Lastname'}
        </TextAtom>
      </Grid>  

      <Grid size={{  xs: 12, md: 8, lg: 6, xl: 5 }}>  
        <List sx={{ width:'100%' }}>
          <ListItem disablePadding>
            <ButtonAtom
              variant="text"
              fullWidth
              
              sx={{
                height:'50px',
                justifyContent: 'space-between', 
                textTransform: 'none',
                borderRadius:'0',
                borderBottom: '1px solid rgb(226, 226, 230)'
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
            {['Cambiar contraseña', 'Métodos de pago', 'Promociones', 'Notificaciones', 'Soporte'].map((item, index) => (
            <ListItem key={index} disablePadding sx={{borderBottom:'1px solid rgb(226, 226, 230)'}}>
              
              <ButtonAtom
                variant="text"
                fullWidth
                sx={{
                  height:'50px',
                  justifyContent: 'space-between',
                  textTransform: 'none'}}
              >
                <TextAtom variant="title" size="medium">
                  {item}
                </TextAtom>
                <ArrowForwardIosIcon fontSize="small" sx={{ color: "#6750A4" }} />
              </ButtonAtom>
            </ListItem>
          ))}
        </List>
      </Grid> 
           
      <Grid 
        size={{ xs: 12, md: 8, lg: 6, xl: 5 }} 
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: 'center',
          justifyContent: { xs: "center", sm: "flex-end" }, 
          gap: 2,
          mt: { xs: 2, sm: 0 },
          textAlign: { xs: "center", sm: "right" }, 
        }}>

        <ButtonAtom
          variant="outlined"
          sx={{ fontWeight: 'bold', mr: 2, mb: 2, mx: { xs: "auto", sm: 0 }, width: { xs: '75%', sm: '200px'}}}
        >
         <TextAtom
          variant="title"
          size='medium'
          sx={{ cursor: 'pointer', textTransform: 'none'}}
        >
          Ofrecer mis servicios
        </TextAtom>
        </ButtonAtom>

        <ButtonAtom
          variant="filled"
          onClick={() => dispatch(logout())}
          sx={{ fontWeight: 'bold', mb: 2, mx: { xs: "auto", sm: 0 }, width: { xs: '75%', sm: '200px'}}}
        >
           <TextAtom
          variant="title"
          size='medium'
          sx={{ cursor: 'pointer', textTransform: 'none', mr:3, ml:3}}
        >
          Cerrar Sesión
        </TextAtom>
        </ButtonAtom>
      </Grid>

      
    
    </Grid>
    </UserLayout>
  
  );
};
