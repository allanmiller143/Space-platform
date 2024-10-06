/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Popover, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const MessageActions  = ({ message, anchorEl, setAnchorEl,showIcon, setShowIcon}) => {

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const onDelete = (id) => {
        console.log('deletar', id);
    };

    const onEdit = (id) => {
        console.log('editar', id);
    };

    return (
        <Box>
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

            {/* Popover com as opções Editar/Excluir */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    <ListItem button onClick={() => onEdit(message.id)} >
                        <ListItemText primary="Editar" />
                    </ListItem>
                    <ListItem  button onClick={() => onDelete(message.id)}>
                        <ListItemText primary="Apagar" />
                    </ListItem>
                </List>
            </Popover>
        </Box>
    );
};

export default MessageActions;
