/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid, Button } from '@mui/material';
import { IconHeart, IconUserCircle } from '@tabler/icons';
import FriendsCard from 'src/components/apps/userprofile/friends/FriendsCard';
import FollowerCard from 'src/components/apps/userprofile/followers/FollowerCard';
import Feed from 'src/components/apps/userprofile/feed/Feed';
import Loading from '../../../Loading/Loading';
import { openNewChat } from '../../chats/ChatService/Api';
import { getData } from '../../../../Services/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Componentes de exemplo


const ProfileTab = ({ email, socket }) => {
  const [value, setValue] = React.useState(0);
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ProfileTabs = [
    {
      label: 'Feed',
      icon: <IconUserCircle size="20" />,
      component: <Feed/>
    },
    {
      label: 'Amigos',
      icon: <IconUserCircle size="20" />,
      component: <FriendsCard/>
    },
    {
      label: 'Seguidores',
      icon: <IconHeart size="20" />,
      component: <FollowerCard/>
    },

  ];

  const seePhone = async () => {
    if (currentUserls) {
      setLoading(true);
      //setSelectedUser(null);
      //setMessages([]);
      try {
        await openNewChat(socket, 'allan.miller@upe.br');
      } catch (err) {
        console.log('Error loading messages:', err);
      }
  
      try {
        const response = await getData('chat', token);
        if (response.status === 200 || response.status === 201) {
          //setChats(response.userInfo);
          const selectedChat = response.userInfo.find(chat => chat.user1.email === 'allan.miller@upe.br' || chat.user2.email === 'allan.miller@upe.br');
          if (selectedChat) {
            //setSelectedUser(selectedChat);
            console.log('Encontrado o chat:', selectedChat);
          } else {
            console.log('Usuário não encontrado nos chats carregados.');
          }

          navigate('/apps/chats');
        } else {
          //setChats([]);
        }
      } catch (e) {
        console.log(e);
      }finally{
        setLoading(false);
      }    
    } else {
      navigate('/google-form');
      toast.success('Faça um cadastro para enviar uma mensagem');
    }
  };

  return (
    <>
      <Loading data={{ open: loading}} />
      <Box sx={{ mt: 2,backgroundColor: (theme) => theme.palette.grey[100] }}>
        <Box justifyContent={'space-between'} alignItems={'center'} display="flex" sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}>
          <Box ml sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button variant="text" onClick={seePhone}>
              Abrir chat
            </Button>
          </Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="profile tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {ProfileTabs.map((tab, index) => (
              <Tab
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: '50px' }}
                icon={tab.icon}
                value={index}
                key={tab.label}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Renderiza o componente selecionado */}
      <Grid  backgroundColor = "transparent" sm={12}>
        {ProfileTabs[value].component}
      </Grid>
    </>
  );
};

export default ProfileTab;
