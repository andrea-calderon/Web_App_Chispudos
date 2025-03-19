import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import {
  useGetChatByIdQuery,
  useGetChatsByUserIdQuery,
} from '../../../../services/chatApi';
import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';

export default function ChatComponent() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const auth = useAppSelector(selectAuth);
  const userID = auth?.user?.id;

  const getAvatarUrl = (avatarUrl) => {
    const baseUrl = 'http://localhost:8000/api/v1'; // Reemplaza con la URL base de tu servidor
    return avatarUrl?.startsWith('http') ? avatarUrl : `${baseUrl}${avatarUrl}`;
  };

  const {
    data: chatUser,
    isLoading,
    error,
  } = useGetChatsByUserIdQuery(userID, {
    skip: !userID,
  });
  const chats = chatUser?.data || [];

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'pro',
      reactions: [],
    };

    setSelectedChat((prevChat) => ({
      ...prevChat,
      messages: [...(prevChat?.messages || []), newMsg],
    }));
    setNewMessage('');
  };

  const handleReactionClick = (
    event: React.MouseEvent<HTMLElement>,
    messageId: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessage(messageId);
  };

  const handleReactionClose = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleAddReaction = (reaction: string) => {
    if (selectedMessage !== null) {
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: prevChat?.messages.map((msg) =>
          msg.id === selectedMessage
            ? { ...msg, reactions: [...msg.reactions, reaction] }
            : msg,
        ),
      }));
    }
    handleReactionClose();
  };

  return (
    <Box
      sx={{
        marginY: { xs: 0, md: 5 },
        marginX: { xs: 4, md: 20 },
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        {/* Left Section: Chat List */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            borderRight: { md: '1px solid #ccc', xs: 'none' },
            borderBottom: { xs: '1px solid #ccc', md: 'none' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
              Error al cargar las conversaciones.
            </Typography>
          ) : (
            <List sx={{ height: '100%', overflowY: 'auto' }}>
              {chats.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  onClick={() => setSelectedChat(chat)}
                  selected={selectedChat?.id === chat.id}
                >
                  <ListItemAvatar sx={{ display: 'flex', pr: 2 }}>
                    {/* Usar getAvatarUrl para construir las URLs de los avatares */}
                    <Avatar
                      src={getAvatarUrl(chat.user1.avatarUrl)}
                      alt={chat.user1.name}
                    />
                    <Avatar
                      src={getAvatarUrl(chat.user2.avatarUrl)}
                      alt={chat.user2.name}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${chat.user1.name}, ${chat.user2.name}`}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {new Date(chat.updatedAt).toLocaleDateString()}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          {new Date(chat.updatedAt).toLocaleTimeString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>

        {/* Right Section: Chat Messages */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {selectedChat ? (
            <>
              <Box
                sx={{
                  px: 2,
                  py: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Mostrar los avatares de los usuarios */}
                <Avatar src={getAvatarUrl(selectedChat.user1.avatarUrl)} />
                <Avatar src={getAvatarUrl(selectedChat.user2.avatarUrl)} />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {selectedChat.user1.name}, {selectedChat.user2.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Divider sx={{ ml: 5, flexGrow: 1 }} />
                <Typography variant="body2" sx={{ textAlign: 'center', mx: 1 }}>
                  {new Date(selectedChat.updatedAt).toLocaleDateString()}
                </Typography>
                <Divider sx={{ mr: 5, flexGrow: 1 }} />
              </Box>

              <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                {selectedChat.messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent:
                        msg.senderId === userID ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    {/* Mostrar avatar del otro usuario si el mensaje no es del usuario autenticado */}
                    {msg.senderId !== userID && (
                      <Avatar
                        src={
                          msg.senderId === selectedChat.user1.id
                            ? getAvatarUrl(selectedChat.user1.avatarUrl)
                            : getAvatarUrl(selectedChat.user2.avatarUrl)
                        }
                        sx={{ mr: 1 }}
                      />
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        sx={{
                          display: 'inline-block',
                          p: 1,
                          borderRadius: '10px',
                          bgcolor:
                            msg.senderId === userID ? '#673ab7' : '#e0e0e0',
                          color: msg.senderId === userID ? '#fff' : '#000',
                        }}
                      >
                        {msg.content}
                      </Typography>
                    </Box>
                    {/* Mostrar avatar del usuario autenticado si el mensaje es suyo */}
                    {msg.senderId === userID && (
                      <Avatar
                        src={getAvatarUrl(selectedChat.user1.avatarUrl)}
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}
            >
              Selecciona una conversación para comenzar.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
