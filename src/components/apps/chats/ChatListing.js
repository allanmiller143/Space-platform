/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Avatar, List, TextField, Box, Alert, Typography, InputAdornment, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Scrollbar from '../../custom-scroll/Scrollbar';
import { fetchChats, SearchChat } from '../../../store/apps/chat/ChatSlice';
import { IconSearch } from '@tabler/icons';
import ChatConversationButtomItem from './ChatSideBar/ChatConversationButtomItem';
import { getData } from '../../../Services/Api';

const ChatListing = ({ socket }) => {
  const dispatch = useDispatch();
  const [userChats, setUserChats] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');

  const seePhone = async () => {
    setLoading(true);
    try {
      const response = await getData('chat', token);
      if (response.status === 200 || response.status === 201) {
        setUserChats(response.userInfo);
        console.log(response.userInfo);
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchChats());
    seePhone();
  }, [dispatch]);

  const filterChats = (chats, cSearch) => {
    if (chats)
      return chats.filter((t) => t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()));
    return chats;
  };

  const chats = useSelector((state) =>
    filterChats(state.chatReducer.chats, state.chatReducer.chatSearch),
  );

  return (
    <div>
      <Box display={'flex'} alignItems="center" gap="10px" p={3}>
        <Avatar alt="Remy Sharp" src={currentUserls?.profile.url} sx={{ width: 54, height: 54 }} />
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

      <Box px={3} py={1}>
        <TextField
          id="outlined-search"
          placeholder="Buscar contatos"
          size="small"
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={'16'} />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={(e) => dispatch(SearchChat(e.target.value))}
        />
      </Box>

      <List sx={{ px: 0 }}>
        <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '600px' }}>
          {loading ? (
            // Skeleton loading effect
            [...Array(6)].map((_, index) => (
              <Box key={index} display="flex" alignItems="center" sx = {{py: 1,px: 3,}} gap={2}>
                <Skeleton variant="circular" width={45} height={45} />
                <Box flexGrow={1}>
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="60%" height={15} />
                </Box>
              </Box>
            ))
          ) : userChats && userChats.length ? (
            userChats.map((chat) => (
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
    </div>
  );
};

export default ChatListing;
