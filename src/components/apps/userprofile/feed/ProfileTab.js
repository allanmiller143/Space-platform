/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid, Button, Typography, Container, Stack } from '@mui/material';
import { IconHeart, IconUserCircle, IconHome, IconAd2, IconMessage, IconCalendarEvent, IconPlus, IconInfoCircle } from '@tabler/icons';
import FriendsCard from 'src/components/apps/userprofile/friends/FriendsCard';
import FollowerCard from 'src/components/apps/userprofile/followers/FollowerCard';
import Feed from 'src/components/apps/userprofile/feed/Feed';
import Loading from '../../../Loading/Loading';
import { openNewChat } from '../../chats/ChatService/Api';
import { getData } from '../../../../Services/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import FilteringTable from "src/components/react-tables/filter/imoveisTabela";
import houseImage from 'src/assets/images/ilustracoes/house.png';

const MeusImoveis = () => {
  const navigate = useNavigate();

  return (
    <Box p={3} px={0}>
      <Container maxWidth="lg" sx={{ bgcolor: 'primary.light', py: 4, mb: 4,  borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h2" component="h1" gutterBottom>
              Bem-vindo à sua lista de Imóveis
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph fontWeight={400}>
              Aqui você pode gerenciar todos os seus imóveis de forma fácil e eficiente. Publique novos anúncios, atualize informações existentes e mantenha seus prontos para venda.
            </Typography>
            <Stack direction="row" spacing={2} mt={4}>
              <Button 
                variant="contained" 
                onClick={() => navigate('/apps/imoveis/edit', { state: { mode: 'add' } })}
                color="primary" 
                startIcon={<IconPlus size={20} />}
              >
                Adicionar Novo Imóvel
              </Button>
              <Button variant="outlined" href="#" color="primary" startIcon={<IconInfoCircle size={20} />}>
                Saiba como funciona
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} container justifyContent="center" alignItems="center">
            <img src={houseImage} alt="Ilustração de casa" width={180} />
          </Grid>
        </Grid>
      </Container>
      <FilteringTable />
    </Box>
  );
};

const Anuncios = () => (
  <Box p={3}>
    <Typography variant="h6">Anúncios</Typography>
    <Typography>Conteúdo em branco para Anúncios</Typography>
  </Box>
);

const Mensagens = () => {
  const handleOpenChat = () => {
    console.log('Abrindo chat...');
  };

  return (
    <Box p={3}>
      <Typography variant="h6">Mensagens</Typography>
      <Typography>Conteúdo em branco para Mensagens</Typography>
      <Box ml sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Button variant="text" onClick={handleOpenChat}>
          Abrir chat
        </Button>
      </Box>
    </Box>
  );
};

const Agendamentos = () => (
  <Box p={3}>
    <Typography variant="h6">Agendamentos</Typography>
    <Typography>Conteúdo em branco para Agendamentos</Typography>
  </Box>
);

const ProfileTab = ({ email, socket, myPost, setMyPost,userData }) => {
  const [value, setValue] = useState(0);
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setMyPost([]);
    setValue(newValue);
  };

  const ProfileTabs = [
    {
      label: 'Meu perfil',
      icon: <IconUserCircle size="20" />,
      component: <Feed email={email} myPost={myPost} setMyPost={setMyPost} userData={userData} />
    },
    {
      label: 'Meus Imóveis',
      icon: <IconHome size="20" />,
      component: <MeusImoveis />
    },
    {
      label: 'Anúncios',
      icon: <IconAd2 size="20" />,
      component: <Anuncios />
    },
    {
      label: 'Mensagens',
      icon: <IconMessage size="20" />,
      component: <Mensagens />
    },
    {
      label: 'Agendamentos',
      icon: <IconCalendarEvent size="20" />,
      component: <Agendamentos />
    },
    {
      label: 'Amigos',
      icon: <IconUserCircle size="20" />,
      component: <FriendsCard />
    },
    {
      label: 'Seguidores',
      icon: <IconHeart size="20" />,
      component: <FollowerCard />
    },
  ];

  const seePhone = async () => {
    if (currentUserls) {
      setLoading(true);
      try {
        await openNewChat(socket, 'allan.miller@upe.br');
      } catch (err) {
        console.log('Erro ao carregar mensagens:', err);
      }

      try {
        const response = await getData('chat', token);
        if (response.status === 200 || response.status === 201) {
          const selectedChat = response.userInfo.find(chat => chat.user1.email === 'allan.miller@upe.br' || chat.user2.email === 'allan.miller@upe.br');
          if (selectedChat) {
            console.log('Chat encontrado:', selectedChat);
          } else {
            console.log('Usuário não encontrado nos chats carregados.');
          }

          navigate('/apps/chats');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      navigate('/google-form');
      toast.success('Faça um cadastro para enviar uma mensagem');
    }
  };

  return (
    <>
      <Loading data={{ open: loading }} />
      <Box sx={{ mt: 2, backgroundColor: (theme) => theme.palette.grey[100] }}>
        <Box justifyContent={'center'} alignItems={'center'} display="flex" sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="abas do perfil"
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

      <Grid backgroundColor="transparent" sm={12} sx={{ paddingX: '0 !important' }}>
        {ProfileTabs[value].component}
      </Grid>
    </>
  );
};

export default ProfileTab;
