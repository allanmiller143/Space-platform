/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { IconButton, Box, Badge, Menu, MenuItem, Avatar, Typography, Chip, Button } from '@mui/material';
import { IconBellRinging } from '@tabler/icons';
import { Stack } from '@mui/system';
import NotificationContext from '../../../../Services/Notification/NotificationContext/NotificationContext';
import { openNotification } from '../../../../Services/Notification/NotificationApi';
import ChatContext from '../../../../components/apps/chats/ChatContext/ChatContext';
import { useNavigate,useLocation } from 'react-router';
import { toast } from 'sonner';
import Loading from '../../../../components/Loading/Loading';
import { io } from 'socket.io-client';
import socket from '../../../../Services/socket'
import { seeNotification } from '../../../../Services/Utils/Notifications';
import { forEach } from 'lodash';
import ContactsContext from '../../../../views/apps/contacts/ContactsContext/ContactsContext';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { notifications, setNotifications,called,setCalled } = useContext(NotificationContext);
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { userChats, setUserChats, filteredChats, setFilteredChats,activeChat, setActiveChat, messages, setMessages,selectedUser, setSelectedUser  } = useContext(ChatContext);
  const {list, active, activeList, setActive, accepted,afterLoad,setAfterLoad} = useContext(ContactsContext);
  const location = useLocation();


  const seePhone = async ({email,senderName,chatId,profile,type,id,notification}) => {
    if (currentUser) {
      if(type === "message"){
        setSelectedUser(null);
        handleClose2();
        setMessages([]);
        setActiveChat(chatId);
        setSelectedUser({email : email, name: senderName, profile: profile});
        handleNavigate("/apps/chats");
      }else if(type === "appointment"){
        handleNavigate("/apps/calendar");
        //seeNotification(id,notifications,setNotifications);
      }else if(type === "appointment_response"){
        handleNavigate("/apps/calendar");
        seeNotification(id,notifications,setNotifications);
      }else if(type === 'like'){
        seeNotification(id,notifications,setNotifications);
        setAnchorEl2(false);
      }else if(type === "share"){
        console.log("share")
        setAfterLoad(notification.sharedPropertyId);
        handleNavigate("/apps/contacts");
        seeNotification(id,notifications,setNotifications);
        
      }else if(type === "share_response"){
        handleNavigate("/apps/imoveis/list");
        seeNotification(id,notifications,setNotifications);
      }else if(type === "follow"){
        
        handleNavigate(`/user-profile/${notification.senderEmail.replaceAll('.', '-')}`);
        seeNotification(id,notifications,setNotifications);
      }
    } else {
      navigate('/auth/login');
      toast.success('Faça um cadastro para enviar uma mensagem');
    }
  };

  const handleNavigate = (route) => {
    // Verificar se já estamos na rota desejada
    if (location.pathname === route) {
      // Se já estamos na tela, recarregar a página
      window.location.reload();
    } else {
      // Caso contrário, apenas navegar para a rota
      navigate(route);
    }
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const markAllAsRead = async () => {
    const notificationsCopy = notifications;
    setNotifications([]);
    for (const notification of notifications) {
      setNotifications([]);
      await seeNotification(notification.id, notificationsCopy, setNotifications);
    }
  };
  


    const [open, setOpen] = useState(false);

    useEffect(() => {

      if (!open) {
        setOpen(true);
        socket.emit("open_notification", { email: currentUser.email }, (response) => {
          console.log(response)
          setNotifications(response);
        });
      }



      // Listen for notifications
      socket.on("notification", (notification) => {
        console.log(notification);
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      });
      
  
      return () => {
        socket.off('notification');
        };
      }, []);
    




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
            maxHeight: 'calc(100vh - 32px)', // Adiciona um limite máximo de altura
            overflowY: 'auto', // Permite scroll se necessário
          },
        }}
      >
        <Box>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem 
                key={notification.id} 
                sx={{ 
                  py: 2, 
                  px: 4,
                  display: 'block', // Importante para o layout do conteúdo
                  width: '100%',
                }} 
                onClick={() => {seePhone({email: notification.senderEmail, chatId: notification.chatId, senderName: notification.senderName, profile: notification.senderProfile, type: notification.type, id: notification.id, notification: notification})}}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar
                    src={notification.senderProfile ? notification.senderProfile.url : ''}
                    alt='profile'
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  />
                  <Box sx={{ 
                    minWidth: 0, // Importante para evitar problemas de overflow
                    width: 'calc(100% - 64px)' // 48px do avatar + 16px de spacing
                  }}>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        width: '100%',
                      }}
                    >
                      {notification.senderEmail}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      sx={{
                        width: '100%',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal', // Sobrescreve o comportamento padrão do Typography
                        wordBreak: 'break-word', // Quebra palavras longas se necessário
                      }}
                    >
                      {notification.type === "message" ? notification.text : notification.title}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            ))
            ) : (
              <Typography sx={{ p: 2 }}>Nenhuma notificação</Typography>
            )}
          </Box>
          {notifications.length > 0 && (
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
        )}
        </Menu>
    </Box>
  );
};

export default Notifications;
