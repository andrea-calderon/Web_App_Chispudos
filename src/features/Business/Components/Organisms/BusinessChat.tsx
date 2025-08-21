import {
  Box,
  Typography,
  Avatar,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  useGetChatsByUserIdQuery,
} from '../../../../services/chatApi';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';
import { getApiImageUrl } from '../../../../utils/baseEnvironment';
import { UserLayout } from '../../../../components/templates/UserLayout';
import MessagesConversation from '../../../messages/organisms/molecules/MessagesConversation';

export default function ChatComponent() {
  const [selectedChat, setSelectedChat] = useState(null);
  const listRef = useRef(null); // Nueva referencia para la lista de chats
  const userID = useAppSelector(selectAuth)?.user?.id;

  const {
    data: chatUser,
    isLoading,
  } = useGetChatsByUserIdQuery(userID, { skip: !userID });
  const chats = chatUser?.data || [];


  // console.error('chatUser', chatUser);
  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0]); // Selecciona el primer chat por defecto
    }
  }, [chats, selectedChat]);

  // Scroll automático optimizado
  // const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
  //   messagesEndRef.current?.scrollIntoView({ behavior });
  // }, []);

  // useEffect(() => {
  //   if (selectedChat?.messages) {
  //     // Scroll inmediato al cargar y suave al enviar
  //     scrollToBottom(selectedChat.messages.length > 10 ? 'auto' : 'smooth');
  //   }
  // }, [selectedChat, scrollToBottom]);

  // Manejo de scroll en lista de chats
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // if (listRef.current) {
    //   // listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    // }
  };

  return (

    <UserLayout showFooter={false}>
      <Grid container>
      <Grid size={{ xs: 12, md: 4 }} sx={{ border: '1px solid #ccc', borderRadius: '8px', minHeight: { xs: '300px', md: '500px' } }}>
        {/* Lista de chats - Scroll vertical */}
        <Box
          sx={{
            // border: '1px solid #ccc',
            // borderTopLeftRadius: '8px',
            // borderBottomLeftRadius: '8px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            // p:5,
          }}
        >
          <List
            ref={listRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#673ab7',
                borderRadius: '3px',
              },
            }}
          >
            {isLoading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : (
              chats.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  onClick={() => handleChatSelect(chat)}
                  selected={selectedChat?.id === chat.id}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#f3e5f5' },
                    '&:hover': { backgroundColor: '#f3e5f550' },
                  }
                }
                >
                  <ListItemAvatar sx={{ minWidth: '72px' }}>
                    <Box sx={{ml:15}}  >
                      <Avatar
                        src={getApiImageUrl(chat.user1.avatarUrl)}
                        sx={{
                          width: 40,
                          height: 40,
                          position: 'absolute',
                          top: 5,
                          left: 25,
                        }}
                      />
                      <Avatar
                        src={getApiImageUrl(chat.user2.avatarUrl)}
                        sx={{
                          width: 40,
                          height: 40,
                          position: 'absolute',
                          top: 20,
                          left: 50,
                          border: '2px solid white',
                        }}
                      />
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${chat.user1.name} & ${chat.user2.name}`}
                    secondary={
                      <Typography variant="caption" color="textSecondary">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }} sx={{ border: '1px solid #ccc', borderRadius: '8px', minHeight: { xs: '300px', md: '500px' } }}>
        <MessagesConversation conversationId={selectedChat?.id} />
      </Grid>
      </Grid>
    </UserLayout>
  );
}
