/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import MessagePopover from '../PopOver/PopOver';

const StyledAudioCard = styled('div')(({ sent }) => ({
  display: 'flex',
  alignItems: 'flex-start', // Alinha os elementos ao topo
  justifyContent: sent ? 'flex-end' : 'flex-start', // Inverte a ordem da foto
  flexDirection: sent ? 'row-reverse' : 'row',
  marginTop: 10,
  gap: 5,
}));

const AvatarContainer = styled('div')(({ sent }) => ({
  marginTop: 'auto', // Alinha o Avatar na base da caixa
  marginBottom: 'auto', // Alinha o Avatar na base da caixa
}));

const AudioCard = ({ text, createdAt, sent, url, audioUrl, isDeleted, chatId, socket, id,sender }) => {
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    if (id !== 1) {
      setAudioLoaded(true);
    }
  }, [audioUrl]);



  return (
    <StyledAudioCard sent={sent}>
      <AvatarContainer sent={sent}>
        <Avatar alt="avatar" src={url} style={{ marginLeft: sent ? 'auto' : 10, marginRight: sent ? 10 : 'auto' }} />
      </AvatarContainer>
      <Box
        sx={{
          maxWidth: '100%',
          backgroundColor: '#f5f5f5',
          height: '55px',
          borderRadius: 2,
          marginLeft: sent ? 'auto' : 0,
          marginRight: sent ? 0 : 'auto',
          position: 'relative',
          
        }}
      >
        {!audioLoaded && (
          <Box
            sx={{
              maxWidth: '100%',
              minWidth: '100px',
              height: '55px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}

        {audioUrl && audioLoaded && !isDeleted && (
          <audio src={audioUrl} controls controlsList="download noinfer " />
        )}

        {
          isDeleted && <Typography variant="body1" sx={{ fontSize: '0.9rem', color:  'red', paddingBottom: 1}}>Mensagem excluída</Typography> 
        }


        {
          !audioLoaded ? null : 
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontSize: '0.6rem', position: 'absolute', bottom: 0, left: 20 }}
            >
              {createdAt}
            </Typography>
        }
        
        
        {/* {
          sent && !isDeleted && audioUrl &&
        <div  style={{ position: 'absolute', top: 5, right: 8 }}>
          <MessagePopover
            chatId={chatId}
            messageId={id}
            sender={sender}
            socket={socket}
          />
        </div>
        }  */}
        
      </Box>
    </StyledAudioCard>
  );
};

export default AudioCard;
