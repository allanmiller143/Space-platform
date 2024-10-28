/* eslint-disable react-hooks/exhaustive-deps *//* eslint-disable react/prop-types */ /* eslint-disable no-unused-vars */
import React, { useContext, useEffect,useRef, useState } from 'react';
import { Typography, Divider, Avatar, ListItem, ListItemText, ListItemAvatar, IconButton, Box, Stack, Badge, useMediaQuery, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { IconDotsVertical, IconMenu2, IconPhone, IconVideo } from '@tabler/icons';
import { useSelector } from 'react-redux';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import ChatNoConversationSelected from './ChatNoConversationSelected';
import ChatContext from './ChatContext/ChatContext';
import MessageSender from './MessageSender';
import { openNewChat } from './ChatService/Api';
import ChatPreViewDialog from './ChatPreViewDialog';
import Spinner from '../../../views/spinner/Spinner';
import ChatsMessages from './ChatMessages/ChatsMessages';
import ChatInsideSidebar from './ChatInsideSidebar';

const ChatContent = ({ toggleChatSidebar, open, setOpen, socket }) => {
  const { userChats, setUserChats, filteredChats, setFilteredChats,activeChat, setActiveChat, messages, setMessages,selectedUser, setSelectedUser  } = useContext(ChatContext);
  const [dragging, setDragging] = useState(false);
  const messagesEndRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false); // Controle do diálogo de pré-visualização
  const [previewFiles, setPreviewFiles] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isInSidebar, setIsInSidebar] = useState(false);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };
 
  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket.on('message', (data) => {
        setMessages((prevMessages) => {
          const filteredMessages = prevMessages.filter((message) => message.id !== 1);
          return [...filteredMessages, data];
        });
        scrollToBottom();
      });
      socket.on('deleted_message', (data) => {
        setMessages((prevMessages) => {
          return prevMessages.filter((message) => message.id !== data.id);
        });
        scrollToBottom();
      });
    }

    return () => {
      if (socket) {
        socket.off('message');
        socket.off('deleted_message');
      }
    };
  }, [socket, setMessages]);

  useEffect(() => {
    if (selectedUser !== undefined || selectedUser !== null) {
      loadMessages();
    }
  }, [selectedUser]);

  const loadMessages = async () => {
    setLoadingChat(true);
    try {
      const response = await openNewChat(socket, selectedUser.email);
      setMessages(response);
      scrollToBottom();
    } catch (err) {
      console.log('Error loading messages:', err);
    } finally {
      setLoadingChat(false);
    }
  };

  const chatDetails = useSelector(
    (state) => state.chatReducer.chats[state.chatReducer.chatContent - 1],
  );
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => {
    setDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setPreviewFiles(files); // Armazena os arquivos para pré-visualização
    setPreviewOpen(true); // Abre o diálogo de pré-visualização
  };


  return (
    <Box display="flex" flexDirection="column" height="100%" sx = {{position : 'relative'}} >
      {
        activeChat && messages && messages.length > 0 ? (
          <Box display="flex" flexDirection="column" height="100%" maxHeight="700px" onDragOver={handleDragOver} onDragLeave={handleDragLeave }onDrop={handleDrop} sx = {{position : 'relative'}} >
            <>
            <Box>
              <Box display="flex" alignItems="center" p={2} position={'relative'}>
                <Box
                  sx={{
                    display: { xs: 'block', md: 'block', lg: 'none' },
                    mr: '10px',
                  }}
                >
                  <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
                </Box>
                <ListItem  dense disableGutters sx={{ gap: 1 }}>
                  <Avatar alt="imagem de perfil" src={selectedUser.profile ? selectedUser.profile.url : ''} />
                  <Typography variant="h5">{selectedUser.name}</Typography>
                </ListItem>
                <Stack direction={'row'}>
                  <IconButton aria-label="mais opções" onClick={() => setIsInSidebar(!isInSidebar)}>
                    <IconDotsVertical stroke={1.5} />
                  </IconButton>
                </Stack>
              </Box>
              <Divider />
            </Box>
            <Box flexGrow={1} overflow="hidden">
              <Scrollbar sx={{ height: '100%', overflow: 'auto' }}>
                <Box p={3}>
                  {messages.map((message) => (
                    <Box key={message.id}>
                      <ChatsMessages message={message}/>
                    </Box>
                  ))}
                </Box>     
                <div ref={messagesEndRef} />
              </Scrollbar>
            </Box>
          </>
            {dragging && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                background: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <Typography variant="h6" color="primary">
                Solte o arquivo aqui
              </Typography>
            </Box>
          )}
          <ChatPreViewDialog previewOpen={previewOpen} setPreviewOpen = {setPreviewOpen} previewFiles={previewFiles}setPreviewFiles = {setPreviewFiles} socket={socket} />
          </Box >
        ) 
        : 
        loadingChat ? <Spinner height='100%'/> :
        (
          <ChatNoConversationSelected />
        )
      }
      <ChatInsideSidebar isInSidebar={isInSidebar} setIsInSidebar = {setIsInSidebar} />

  
      {activeChat ?  
      <Box>
        <Divider />
        <MessageSender socket = {socket} sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1 }} />
      </Box> : null}    
    </Box>
  );
};

export default ChatContent;
