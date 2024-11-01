/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Popover, List, ListItem, ListItemText, IconButton, CircularProgress, Typography } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import MessageActions from './Actions/MessageActions ';
import GetAppIcon from '@mui/icons-material/GetApp';

const FileMessage = ({ message }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showIcon, setShowIcon] = useState(false); // Controla a visibilidade do ícone
    const cuString = localStorage.getItem('currentUser');
    const currentUserls = JSON.parse(cuString);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDownload = () => {
        if (message.url) {
          const link = document.createElement('a');
          link.href = message.url;
          link.download = 'Documento';
          link.target = '_blank'; // Open in a new tab
          link.rel = 'noopener noreferrer'; // Prevents security risk with target="_blank"
          document.body.appendChild(link); // Append link to the body
          link.click();
          document.body.removeChild(link); // Remove link after clicking
        } 
      };

    return (
        <Box 
            mb={1}
            p={1}
            pr={2.5}
            sx={{ 
                backgroundColor: 'primary.light', 
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
                    {message.fileName} Arquivo
                    <IconButton onClick={handleDownload} sx={{ width: '20px', paddingLeft: '25px', color: 'primary.dark' }}> <GetAppIcon /></IconButton>
                </Box>
            : 
                <Box display="flex" justifyContent="center" alignItems="center" gap={4}>
                    <Typography> Enviando arquivo... </Typography>
                     
                    <CircularProgress/>  
                </Box>                
                
            }
            
            <MessageActions message={message} anchorEl={anchorEl} setAnchorEl={setAnchorEl} showIcon={showIcon} setShowIcon={setShowIcon}/>
            
        </Box>
    );
};

export default FileMessage;
