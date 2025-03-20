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
  useSendMessageMutation,
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

  // Usuario autenticado
  const auth = useAppSelector(selectAuth);
  const userID = auth?.user?.id;

  // Hook para enviar mensajes
  const [sendMessage, { isLoading: isSending, error: sendError }] =
    useSendMessageMutation();

  // Hook para obtener las conversaciones
  const {
    data: chatUser,
    isLoading,
    error,
  } = useGetChatsByUserIdQuery(userID, { skip: !userID });
  const chats = chatUser?.data || [];

  // Función para construir URLs completas de avatares
  const getAvatarUrl = (avatarUrl) => {
    const baseUrl = 'http://localhost:8000/api/v1';
    return avatarUrl?.startsWith('http') ? avatarUrl : `${baseUrl}${avatarUrl}`;
  };

  // Función para enviar mensajes
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const payload = {
        conversationId: selectedChat.id,
        senderId: userID,
        content: newMessage,
      };

      const response = await sendMessage(payload).unwrap();

      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...(prevChat?.messages || []), response.data],
      }));

      setNewMessage('');
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
    }
  };

  // Función para manejar el envío con la tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Evitar salto de línea
      handleSend();
    }
  };

  // Funciones relacionadas con reacciones (sin cambios)
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
        height: '70vh',
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
            <Box
              sx={{
                display: 'flex',
                p: 4,
                justifyContent: 'center',
                alignItems: 'top',
                flexGrow: 1,
              }}
            >
              <Typography variant="h6">Selecciona una conversación</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', p: 2, bgcolor: '#fff' }}>
            <IconButton color="#625B71" onClick={() => {}}>
              <CameraAltOutlinedIcon />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Detectar tecla Enter
              disabled={isSending}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '32px',
                  },
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={isSending}
            >
              <SendIcon />
            </IconButton>
          </Box>
          {sendError && (
            <Typography color="error" sx={{ textAlign: 'center', mt: 1 }}>
              Error al enviar el mensaje.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
