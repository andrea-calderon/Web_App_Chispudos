import { useState } from 'react';
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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

const messagesMock = [
  { id: 1, text: 'Buenos días', sender: 'user' },
  { id: 2, text: '¿En qué puedo ayudarle?', sender: 'pro' },
  {
    id: 3,
    text: 'Tengo un grifo que gotea en la cocina y necesito arreglarlo.',
    sender: 'user',
  },
  {
    id: 4,
    text: 'De acuerdo, puedo agendar una cita. ¿Qué día y hora le queda mejor?',
    sender: 'pro',
  },
];

const chatsMock = [
  {
    id: 1,
    user: { name: 'José', avatar: 'https://picsum.photos/50/50?random=1' },
    pro: { name: 'Rolando', avatar: 'https://picsum.photos/50/50?random=2' },
    lastMessage: 'De acuerdo, puedo agendar una cita.',
    date: '2025-02-27',
    time: '10:30 AM',
  },
  {
    id: 2,
    user: { name: 'Ana', avatar: 'https://picsum.photos/50/50?random=3' },
    pro: { name: 'Rolando', avatar: 'https://picsum.photos/50/50?random=2' },
    lastMessage: 'Gracias, nos vemos mañana.',
    date: '2025-02-26',
    time: '3:45 PM',
  },
];

export default function ChatComponent() {
  const [messages, setMessages] = useState(messagesMock);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(chatsMock[0]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'pro',
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
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

        overflow: 'hidden',
      }}
    >
      <Grid container sx={{ height: '100%' }}>
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
          <List sx={{ height: '100%', overflowY: 'auto' }}>
            {chatsMock.map((chat) => (
              <ListItem
                key={chat.id}
                button
                onClick={() => setSelectedChat(chat)}
                selected={selectedChat.id === chat.id}
              >
                <ListItemAvatar sx={{ display: 'flex', pr: 2 }}>
                  <Avatar src={chat.user.avatar} />{' '}
                  <Avatar src={chat.pro.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${chat.user.name}, ${chat.pro.name}`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {chat.date}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        {chat.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box
            sx={{
              px: 2,
              py: 4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar src={selectedChat.user.avatar} />
            <Avatar src={selectedChat.pro.avatar} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              {selectedChat.user.name}, {selectedChat.pro.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Divider sx={{ ml: 5, flexGrow: 1 }} />
            <Typography variant="body2" sx={{ textAlign: 'center', mx: 1 }}>
              {selectedChat.date}
            </Typography>
            <Divider sx={{ mr: 5, flexGrow: 1 }} />
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    msg.sender === 'pro' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                {msg.sender === 'user' && (
                  <Avatar src={selectedChat.user.avatar} sx={{ mr: 1 }} />
                )}
                <Typography
                  sx={{
                    display: 'inline-block',
                    p: 1,
                    borderRadius: '10px',
                    bgcolor: msg.sender === 'pro' ? '#673ab7' : '#F4F4F4',
                    color: msg.sender === 'pro' ? '#fff' : '#000',
                  }}
                >
                  {msg.text}
                </Typography>
                {msg.sender === 'pro' && (
                  <Avatar src={selectedChat.pro.avatar} sx={{ ml: 1 }} />
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', p: 2, bgcolor: '#fff' }}>
            <IconButton color="#625B71" onClick={() => {}}>
              <CameraAltOutlinedIcon />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '32px',
                  },
                },
              }}
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
