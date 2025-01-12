/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { IconButton, Box, Badge, Menu, MenuItem, Avatar, Typography, Chip } from '@mui/material';
import { IconBellRinging } from '@tabler/icons';
import { Stack } from '@mui/system';
import NotificationContext from '../../../../Services/Notification/NotificationContext/NotificationContext';
import { openNotification } from '../../../../Services/Notification/NotificationApi';
import ChatContext from '../../../../components/apps/chats/ChatContext/ChatContext';
import { openNewChat } from '../../../../components/apps/chats/ChatService/Api';
import { getData } from '../../../../Services/Api';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import Loading from '../../../../components/Loading/Loading';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { notifications, setNotifications,called,setCalled, socket } = useContext(NotificationContext);
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);
  const { activeChat,setFilteredChats, setUserChats,setActiveChat, setChats, selectedUser, setSelectedUser,messages, setMessages } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const seePhone = async ({email,chatId}) => {
    if (currentUser) {
      setLoading(true);
      setSelectedUser(null);
      setMessages([]);
      setActiveChat(chatId);
      setSelectedUser({email : email, name: 'Torres resolve'});
      navigate(`/apps/chats`);
  
    } else {
      navigate('/auth/login');
      toast.success('Faça um cadastro para enviar uma mensagem');
    }
  };


  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  useEffect(() => {
    if(called === false) {
      fetchNotifications();
    }
  }, [called]);

  async function fetchNotifications() {
    setCalled(true);
    try {
      const response = await openNotification(socket, currentUser.email);
      setNotifications(response.messages); 
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  }


  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        setNotifications((prev) => [...prev, data]);});
    }

    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, [socket, setNotifications]);




  return (
    <Box>
      {loading && <Loading data = {{open:loading, all: true}}/>}
      <IconButton
        size="large"
        aria-label="show new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(anchorEl2 && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Badge
          badgeContent={notifications.length}
          color="primary"
        >
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        {/* <Stack
          direction="row"
          py={2}
          px={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Notificações</Typography>
          {notifications.some((n) => n.isNew) && (
            <Chip
              label={`${notifications.length} novas`}
              color="primary"
              size="small"
            />
          )}
        </Stack> */}
        <Box>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem key={notification.id} sx={{ py: 2, px: 4 }} onClick={()=>{seePhone({email: notification.senderEmail, chatId: notification.chatId})}} >
                <Stack direction="row" spacing={2}>
                  <Avatar
                    src=''
                    alt= 'oi'
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {notification.senderEmail}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {notification.text}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            ))
          ) : (
            <Typography textAlign="center" p={2}>
              Sem notificações para mostrar
            </Typography>
          )}
        </Box>
        {/* {notifications.length > 0 && (
          <Box p={2}>
            <Button
              onClick={markAllAsRead}
              variant="outlined"
              color="primary"
              fullWidth
            >
              Marcar todas como lidas
            </Button>
          </Box>
        )} */}
      </Menu>
    </Box>
  );
};

export default Notifications;
