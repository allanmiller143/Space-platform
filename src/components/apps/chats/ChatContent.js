/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Typography, Divider, Avatar, ListItem, ListItemText, ListItemAvatar, IconButton, Box, Stack, Badge, useMediaQuery } from '@mui/material';
import { IconDotsVertical, IconMenu2, IconPhone, IconVideo } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { formatDistanceToNowStrict } from 'date-fns';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import ChatNoConversationSelected from './ChatNoConversationSelected';
import ChatMsgSent from './ChatMsgSent';

const ChatContent = ({ toggleChatSidebar, open, setOpen }) => {
  const chatDetails = useSelector(
    (state) => state.chatReducer.chats[state.chatReducer.chatContent - 1],
  );

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {chatDetails ? (
        <>
          <Box>
            <Box display="flex" alignItems="center" p={2}>
              <Box
                sx={{
                  display: { xs: 'block', md: 'block', lg: 'none' },
                  mr: '10px',
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box>
              <ListItem key={chatDetails.id} dense disableGutters sx={{ gap: 1 }}>
                <Avatar alt={chatDetails.name} src={chatDetails.thumb} />
                <Typography variant="h5">{chatDetails.name}</Typography>
              </ListItem>
              <Stack direction={'row'}>
                <IconButton aria-label="mais opções" onClick={() => setOpen(!open)}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
          </Box>

          {/* O conteúdo flexível que ocupa o espaço restante */}
          <Box flexGrow={1} overflow="hidden">
            <Scrollbar sx={{ height: '100%', overflow: 'auto' }}>
              <Box p={3}>
                {chatDetails.messages.map((chat) => (
                  <Box key={chat.id + chat.msg + chat.createdAt}>
                    {chatDetails.id === chat.senderId ? (
                      <Box display="flex">
                        <ListItemAvatar>
                          <Avatar
                            alt={chatDetails.name}
                            src={chatDetails.thumb}
                            sx={{ width: 40, height: 40 }}
                          />
                        </ListItemAvatar>
                        <Box>
                          {chat.createdAt ? (
                            <Typography variant="body2" color="grey.400" mb={1}>
                              {chatDetails.name},{' '}
                              {formatDistanceToNowStrict(new Date(chat.createdAt), {
                                addSuffix: false,
                              })}{' '}
                              atrás
                            </Typography>
                          ) : null}
                          {chat.type === 'text' ? (
                            <Box
                              mb={2}
                              sx={{
                                p: 1,
                                backgroundColor: 'grey.100',
                                mr: 'auto',
                                maxWidth: '320px',
                              }}
                            >
                              {chat.msg}
                            </Box>
                          ) : null}
                          {chat.type === 'image' ? (
                            <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px' }}>
                              <img src={chat.msg} alt="anexo" width="150" />
                            </Box>
                          ) : null}
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        mb={1}
                        display="flex"
                        alignItems="flex-end"
                        flexDirection="row-reverse"
                      >
                        <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
                          {chat.createdAt ? (
                            <Typography variant="body2" color="grey.400" mb={1}>
                              atrás
                            </Typography>
                          ) : null}
                          {chat.type === 'text' ? (
                            <Box
                              mb={1}
                              key={chat.id}
                              sx={{
                                p: 1,
                                backgroundColor: 'primary.light',
                                ml: 'auto',
                                maxWidth: '320px',
                              }}
                            >
                              {chat.msg}
                            </Box>
                          ) : null}
                          {chat.type === 'image' ? (
                            <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px' }}>
                              <img src={chat.msg} alt="anexo" width="250" />
                            </Box>
                          ) : null}
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Scrollbar>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" p={2} pb={1} pt={1} flexGrow={1}>
          <Box
            sx={{
              display: { xs: 'flex', md: 'flex', lg: 'none' },
              mr: '10px',
            }}
          >
            <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
          </Box>
          <ChatNoConversationSelected />
        </Box>
      )}

      {/* ChatMsgSent sempre fixo na parte inferior */}
      <Box>
        <Divider />
        <ChatMsgSent />
      </Box>
    </Box>
  );
};

export default ChatContent;
