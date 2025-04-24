/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect,useRef, useState } from 'react';
import { Typography, Divider, Avatar, ListItem, ListItemText, ListItemAvatar, IconButton, Box, Stack, Badge, useMediaQuery, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import ChatContext from './ChatContext/ChatContext';
import MessageSender from './MessageSender';
import { openNewChat } from './ChatService/Api';
import ChatPreViewDialog from './ChatPreViewDialog';
import Spinner from '../../../views/spinner/Spinner';
import ChatsMessages from './ChatMessages/ChatsMessages';
import ChatInsideSidebar from './ChatInsideSidebar';
import  socket  from '../../../Services/socket';
import { ArrowBack } from '@mui/icons-material';

const ChatContent = () => {
  const {activeChat, setActiveChat, messages, setMessages,selectedUser, setSelectedUser  } = useContext(ChatContext);
  const [dragging, setDragging] = useState(false);
  const messagesEndRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false); // Controle do diálogo de pré-visualização
  const [previewFiles, setPreviewFiles] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isInSidebar, setIsInSidebar] = useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };
 
  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
      socket.on('message', (data) => {   
        setMessages((prevMessages) => {const filteredMessages = prevMessages.filter((message) => message.id !== 1);
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
      return () => {
        socket.off('message');
        socket.off('deleted_message');
      };
  }, [setMessages, socket]);

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
    <Box display="flex" flexDirection="column" height="100%" maxHeight = {isSmallScreen ? '100vh' : "90vh"} sx = {{position : 'relative',}} >

      {
        activeChat ? (
          <Box display="flex" flexDirection="column" height="100%"  minHeight={'430px'} onDragOver={handleDragOver} onDragLeave={handleDragLeave }onDrop={handleDrop} sx = {{position : 'relative'}} >

            {
              loadingChat && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Spinner />
                </Box>
              )
            }
            {!loadingChat && (  
            <Box height={'100%'} sx ={{display: 'flex', flexDirection: 'column', justifyContent : 'space-between'}}>
            <Box >
              <Box display="flex" alignItems="center" p={2} position={'relative'}>
                <ListItem  dense disableGutters sx={{ gap: 1 }}>
                  <Box
                      sx={{
                        display: { xs: 'block', sm: 'none', lg: 'none' },
                        ml: '-10px',
                        mr: '10px',
                        mt: '10px',
                      }}
                    >
                      <ArrowBack stroke={1.5} onClick={()=>{setSelectedUser(null);setActiveChat(null);setMessages([]);
                        
                      }} />
                  </Box>
                  <Avatar alt="imagem de perfil" src={selectedUser.profile ? selectedUser.profile.url : ''} />
                  <Typography variant="h5">{selectedUser.name}</Typography>
                </ListItem>
              </Box>
              <Divider />
            </Box>
              
            <Box
              sx={{
                flex: 1, // Ocupa o máximo de espaço disponível
                overflowY: 'auto', // Adiciona scroll apenas no eixo vertical
                minHeight: '100px', // Evita que o contêiner desapareça
                p: { lg: 3, xs: 1 },
              }}
            >
              {messages.map((message) => (
                <Box key={message.id}>
                  <ChatsMessages message={message} />
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>


              <Box>
               <Divider />
                <MessageSender socket = {socket} />
              </Box>
            </Box>
            )}

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
        (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" minHeight='400px'> </Box>
        )
      }
      <ChatInsideSidebar isInSidebar={isInSidebar} setIsInSidebar = {setIsInSidebar} />
 
    </Box>
  );
};

export default ChatContent;
