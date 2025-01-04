/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState } from 'react';
import {Typography, Box, CircularProgress } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import MessageActions from '../ChatMessages/Actions/MessageActions ';



const AudioCard = ({ message }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showIcon, setShowIcon] = useState(false); // Controla a visibilidade do ícone
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
};

  return (
    <Box 
      mb={1}      
      sx={{  
          ml: 'auto', 
          maxWidth: '320px', 
          position: 'relative', 
      }}
      // Exibe o ícone quando o mouse está sobre a mensagem
      onMouseEnter={() => {
          if(message.senderEmail === currentUserls.email){
              setShowIcon(true)
          }
      }}
      onMouseLeave={() => setShowIcon(false)}
      >
      {showIcon && currentUserls.email === message.senderEmail &&  (
          
          <ArrowDropDown
              onClick={handlePopoverOpen}
              sx={{ 
                  position: 'absolute', 
                  top: -2, 
                  right: 0,
                  color: 'primary.dark',
                  cursor: 'pointer',
                  
          }}/>
      )}
      {message.id !== 1 ? 
          <Box>
            <audio src={message.url} controls controlsList="download noinfer " />
          </Box>
      : 
          <Box display="flex" justifyContent="center" alignItems="center" gap={4}>
              <Typography> Enviando arquivo... </Typography>
              <CircularProgress />  
          </Box>                
          
      }

      {/* <MessageActions message={message} anchorEl={anchorEl} setAnchorEl={setAnchorEl} showIcon={showIcon} setShowIcon={setShowIcon}/> */}
    </Box>
  );
};

export default AudioCard;
