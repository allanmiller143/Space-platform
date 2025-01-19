/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Avatar, List, TextField, Box, Alert, Typography, InputAdornment, Skeleton } from '@mui/material';
import Scrollbar from '../../custom-scroll/Scrollbar';
import { IconSearch } from '@tabler/icons';
import ChatConversationButtomItem from './ChatSideBar/ChatConversationButtomItem';
import { getData } from '../../../Services/Api';
import { useContext } from 'react';
import ChatContext from './ChatContext/ChatContext';
const ChatListing = ({ socket }) => {
  const { userChats, setUserChats, filteredChats, setFilteredChats,activeChat, setActiveChat,setSelectedUser } = useContext(ChatContext);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');

  // Função para carregar os chats do usuário
  const fetchUserChats = async () => {
    setLoading(true);
    try {
      const response = await getData('chat', token);
      if (response.status === 200 || response.status === 201) {
        setUserChats(response.userInfo);
        setFilteredChats(response.userInfo);  // Iniciar com todos os chats disponíveis
        
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para carregar os chats na montagem do componente
  useEffect(() => {
    if(userChats.length === 0){
      fetchUserChats();
    }
  }, []);

  // useEffect para filtrar os chats conforme o usuário digita
  useEffect(() => {
    if (search.trim() !== '') {
      const filtered = userChats.filter((chat) => {
        const user = chat.user1.email === currentUserls.email ? chat.user2 : chat.user1;
        return user.name && user.name.toLowerCase().includes(search.trim().toLowerCase());
      });
      setFilteredChats(filtered);
    } else {
      setFilteredChats(userChats);  // Resetar ao exibir todos os chats
    }
  }, [search, userChats, currentUserls.email]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);  // Atualiza o estado de busca em tempo real
  };

  return (
    <Box >
      <Box display={'flex'} alignItems="center" gap="10px" py ={2} sx={{ px: { lg: 2, xs: 1 } }}>
        <Avatar alt="Remy Sharp" src={currentUserls.profile && currentUserls?.profile.url} sx={{ width: 54, height: 54 }} />
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {currentUserls?.name}
          </Typography>
          <Typography variant="body2">
            {currentUserls.type === 'realtor'
              ? 'Corretor de imóveis'
              : currentUserls.type === 'realstate'
              ? 'Imobiliária'
              : 'Vendedor'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: { lg: 2, xs: 1 }}}>
        <TextField
          id="outlined-search"
          placeholder="Buscar contatos"
          size="small"
          type="search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      <List sx={{ px: 0 }}>
        <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '600px' }}>
          {loading ? (
            // Skeleton loading effect
            [...Array(6)].map((_, index) => (
              <Box key={index} display="flex" alignItems="center" sx={{ py: 1, px: 3 }} gap={2}>
                <Skeleton variant="circular" width={45} height={45} />
                <Box flexGrow={1}>
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="60%" height={15} />
                </Box>
              </Box>
            ))
          ) : filteredChats && filteredChats.length ? (
            filteredChats.map((chat) => (
              <Box key={chat.id}>
                <ChatConversationButtomItem chat={chat} />
              </Box>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="error" variant="filled" sx={{ color: 'white' }}>
                Nenhum Contato Encontrado!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </List>
    </Box>
  );
};

export default ChatListing;
