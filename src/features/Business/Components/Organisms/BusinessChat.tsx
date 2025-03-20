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
import { useRef, useEffect, useState, useCallback } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';

export default function ChatComponent() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const listRef = useRef(null); // Nueva referencia para la lista de chats
  const userID = useAppSelector(selectAuth)?.user?.id;

  const {
    data: chatUser,
    isLoading,
    error,
  } = useGetChatsByUserIdQuery(userID, { skip: !userID });
  const chats = chatUser?.data || [];

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Scroll automático optimizado
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (selectedChat?.messages) {
      // Scroll inmediato al cargar y suave al enviar
      scrollToBottom(selectedChat.messages.length > 10 ? 'auto' : 'smooth');
    }
  }, [selectedChat, scrollToBottom]);

  // Manejo de scroll en lista de chats
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Envío de mensajes optimizado
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const tempId = Date.now(); // ID temporal para optimismo
      const optimisticMessage = {
        id: tempId,
        content: newMessage,
        senderId: userID,
        createdAt: new Date().toISOString(),
      };

      // Actualización optimista
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, optimisticMessage],
      }));

      const response = await sendMessage({
        conversationId: selectedChat.id,
        senderId: userID,
        content: newMessage,
      }).unwrap();

      // Reemplazar mensaje temporal con respuesta real
      setSelectedChat((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) =>
          msg.id === tempId ? response.data : msg,
        ),
      }));

      setNewMessage('');
      scrollToBottom();
    } catch (err) {
      console.error('Error al enviar:', err);
      setSelectedChat((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg.id !== tempId),
      }));
    }
  };

  const getAvatarUrl = useCallback((avatarUrl: string) => {
    const baseUrl = 'http://localhost:8000/api/v1';
    return avatarUrl?.startsWith('http') ? avatarUrl : `${baseUrl}${avatarUrl}`;
  }, []);

  const groupMessagesByDate = useCallback((messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.createdAt).toLocaleDateString();
      groups[date] = groups[date] || [];
      groups[date].push(message);
      return groups;
    }, {});
  }, []);

  return (
    <Box
      sx={{
        height: '70vh',
        maxHeight: '800px',
        display: 'flex',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        margin: { xs: 2, md: 5 },
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        {/* Lista de chats - Scroll vertical */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            borderRight: '1px solid #ccc',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <List
            ref={listRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
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
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: '72px' }}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        src={getAvatarUrl(chat.user1.avatarUrl)}
                        sx={{
                          width: 40,
                          height: 40,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      />
                      <Avatar
                        src={getAvatarUrl(chat.user2.avatarUrl)}
                        sx={{
                          width: 40,
                          height: 40,
                          position: 'absolute',
                          top: 20,
                          left: 20,
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
        </Grid>

        {/* Área de mensajes - Scroll vertical */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fafafa',
          }}
        >
          {selectedChat ? (
            <>
              <Box
                sx={{
                  p: 2,
                  borderBottom: '1px solid #eee',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ position: 'relative', mr: 2 }}>
                  <Avatar
                    src={getAvatarUrl(selectedChat.user1.avatarUrl)}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Avatar
                    src={getAvatarUrl(selectedChat.user2.avatarUrl)}
                    sx={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      border: '2px solid white',
                    }}
                  />
                </Box>
                <Typography variant="subtitle1">
                  {selectedChat.user1.name} & {selectedChat.user2.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  '&::-webkit-scrollbar': { width: '6px' },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#673ab7',
                    borderRadius: '3px',
                  },
                }}
              >
                {Object.entries(groupMessagesByDate(selectedChat.messages)).map(
                  ([date, messages]) => (
                    <div key={date}>
                      <Divider sx={{ my: 2 }}>
                        <Typography variant="caption" color="textSecondary">
                          {date}
                        </Typography>
                      </Divider>
                      {messages.map((msg) => (
                        <Box
                          key={msg.id}
                          sx={{
                            display: 'flex',
                            justifyContent:
                              msg.senderId === userID
                                ? 'flex-end'
                                : 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              maxWidth: '70%',
                              flexDirection:
                                msg.senderId === userID ? 'row-reverse' : 'row',
                            }}
                          >
                            <Avatar
                              src={
                                msg.senderId === userID
                                  ? getAvatarUrl(selectedChat.user1.avatarUrl)
                                  : getAvatarUrl(selectedChat.user2.avatarUrl)
                              }
                              sx={{ mx: 1 }}
                            />
                            <Typography
                              sx={{
                                p: 2,
                                borderRadius: '15px',
                                backgroundColor:
                                  msg.senderId === userID ? '#673ab7' : '#fff',
                                color:
                                  msg.senderId === userID
                                    ? 'white'
                                    : 'text.primary',
                                boxShadow: 1,
                              }}
                            >
                              {msg.content}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </div>
                  ),
                )}
                <div ref={messagesEndRef} />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}
            >
              <Typography variant="h6" color="textSecondary">
                Selecciona una conversación
              </Typography>
            </Box>
          )}

          {/* Área de entrada de mensajes */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid #eee',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton disabled={isSending}>
              <CameraAltOutlinedIcon />
            </IconButton>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && !e.shiftKey && handleSend()
              }
              disabled={isSending}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  backgroundColor: '#f5f5f5',
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={isSending}
              sx={{
                color: 'white',
                backgroundColor: '#673ab7',
                '&:hover': { backgroundColor: '#8561c5' },
              }}
            >
              {isSending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <SendIcon />
              )}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
