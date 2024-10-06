/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Typography, Avatar, Box } from '@mui/material';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';  // Importa o locale para português
import ChatContext from '../ChatContext/ChatContext';
import ImageMessage from './ImageMassege';
import TextMessage from './TextMessage';
import TimeText from './TimeText';

const ChatsMessages = ({ message }) => {
  const { selectedUser } = useContext(ChatContext);
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);

  return (
    <Box>
      {message.senderEmail !== currentUserls.email ? (
        <Box display="flex">
          <Avatar
            alt={selectedUser.profile.url}
            src={selectedUser.profile.url}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            {message.createdAt ? (<TimeText name = {selectedUser.name} createdAt={message.createdAt}/>) : null}
            {message.type === 'text' ? (<TextMessage message={message}/>) : null}
            {message.type === 'image' ? (<ImageMessage message={message}/>) : null}
          </Box>
        </Box>
      ) : (
        <Box mb={1} display="flex" flexDirection="row-reverse" gap={2}>
          <Avatar
            alt={currentUserls.profile.url}
            src={currentUserls.profile.url}
            sx={{ width: 40, height: 40 }}
          />
          <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
            {message.createdAt ? (<TimeText name = {currentUserls.name} createdAt={message.createdAt}/>) : null}
            {message.type === 'text' ? (<TextMessage message={message}/>) : null}
            {message.type === 'image' ? (<ImageMessage message={message}/>) : null}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatsMessages;
