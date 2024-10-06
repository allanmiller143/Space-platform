/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Popover, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import MessageActions from './MessageActions ';

const TextMessage = ({ message, onDelete, onEdit }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showIcon, setShowIcon] = useState(false); // Controla a visibilidade do ícone

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

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
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
        >
            {message.text}

            {/* Popover Trigger (Ícone que só aparece com hover) */}
            {showIcon && (
                
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

            <MessageActions message={message} anchorEl={anchorEl} setAnchorEl={setAnchorEl} showIcon={showIcon} setShowIcon={setShowIcon}/>
            
        </Box>
    );
};

export default TextMessage;
