import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Divider,
  CircularProgress,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  useSendMessageMutation,
  useGetChatsByUserIdQuery,
} from '../../../../services/chatApi';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { selectAuth } from '../../../../redux/slices/authSlice';
import { getApiImageUrl } from '../../../../utils/baseEnvironment';
import { UserLayout } from '../../../../components/templates/UserLayout';
import { useParams, useNavigate } from 'react-router-dom';

export default function ChatConversation() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userID = useAppSelector(selectAuth)?.user?.id;

  const {
    data: chatUser,
    isLoading,
  } = useGetChatsByUserIdQuery(userID, { skip: !userID });
  const chats = chatUser?.data || [];
  
  // Find the specific chat by ID
  const selectedChat = chats.find((chat: { id: number }) => chat.id === parseInt(chatId || '0'));

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Scroll automático optimizado
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  }, []);

  useEffect(() => {
    if (selectedChat?.messages) {
      // Scroll inmediato al cargar y suave al enviar
      scrollToBottom(selectedChat.messages.length > 10 ? 'auto' : 'smooth');
    }
  }, [selectedChat, scrollToBottom]);

  // Envío de mensajes optimizado
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await sendMessage({
        conversationId: selectedChat.id,
        senderId: userID,
        content: newMessage,
      }).unwrap();

      setNewMessage('');
      scrollToBottom();
    } catch (err) {
      console.error('Error al enviar:', err);
    }
  };

  const groupMessagesByDate = useCallback((messages: any[]) => {
    return messages.reduce((groups: any, message: any) => {
      const date = new Date(message.createdAt).toLocaleDateString();
      groups[date] = groups[date] || [];
      groups[date].push(message);
      return groups;
    }, {});
  }, []);

  const handleBackToChats = () => {
    navigate('/messages');
  };

  if (isLoading) {
    return (
      <UserLayout>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </UserLayout>
    );
  }

  if (!selectedChat) {
    return (
      <UserLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
            gap: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Chat no encontrado
          </Typography>
          <Button variant="contained" onClick={handleBackToChats}>
            Volver a mensajes
          </Button>
        </Box>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <Box
        sx={{
          height: '70vh',
          maxHeight: '800px',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '10px',
          overflow: 'hidden',
          margin: { xs: 2, md: 5 },
        }}
      >
        {/* Header con botón de retroceso */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #eee',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={handleBackToChats} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ position: 'relative', mr: 2 }}>
            <Avatar
              src={getApiImageUrl(selectedChat.user1.avatarUrl)}
              sx={{ width: 40, height: 40 }}
            />
            <Avatar
              src={getApiImageUrl(selectedChat.user2.avatarUrl)}
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

        {/* Área de mensajes */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            backgroundColor: '#fafafa',
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
                        msg.senderId === userID ? 'flex-end' : 'flex-start',
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
                            ? getApiImageUrl(selectedChat.user1.avatarUrl)
                            : getApiImageUrl(selectedChat.user2.avatarUrl)
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
                            msg.senderId === userID ? 'white' : 'text.primary',
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
      </Box>
    </UserLayout>
  );
}
