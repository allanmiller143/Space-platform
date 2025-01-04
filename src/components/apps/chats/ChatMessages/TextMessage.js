/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Popover, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import MessageActions from './Actions/MessageActions ';

const TextMessage = ({ message }) => {
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
            p={1}
            pr={2.5}
            sx={{ 
                backgroundColor: 'primary.light', 
                ml: 'auto', 
                maxWidth: '320px', 
                position: 'relative', 
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                wordBreak: 'break-word', // Adicionado para garantir a quebra de palavras longas
                overflow: 'hidden', // Adicionado para evitar transbordamento
            }}
            // Exibe o ícone quando o mouse está sobre a mensagem
            onMouseEnter={() => {
                if(message.senderEmail === currentUserls.email){
                    setShowIcon(true)
                }
            }}
            onMouseLeave={() => setShowIcon(false)}
        >
            {message.text}
            {/* Popover Trigger (Ícone que só aparece com hover) */}
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

            {/* <MessageActions message={message} anchorEl={anchorEl} setAnchorEl={setAnchorEl} showIcon={showIcon} setShowIcon={setShowIcon}/> */}
            
        </Box>
    );
};

export default TextMessage;
