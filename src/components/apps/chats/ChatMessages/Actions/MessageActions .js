/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Popover, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { ArrowDropDown, Cancel } from '@mui/icons-material';
import { Typography } from 'antd';
import EditMessageDialog from './EditMessageDialog';
import DeleteMessageDialog from './DeleteMessageDialog';

const MessageActions = ({ message, anchorEl, setAnchorEl, showIcon, setShowIcon }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editText, setEditText] = useState(message.text || ''); // Armazena o texto da mensagem a ser editado

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onDelete = (id) => {
    setOpenDeleteDialog(true);
  };

  const onEdit = (id) => {
    setEditText(message.text); // Carrega o texto atual da mensagem no campo de edição
    setOpenDialog(true); // Abre o diálogo de edição
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
          }}
        />
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
          <ListItem button onClick={() => onEdit(message.id)}>
            <ListItemText primary="Editar" />
          </ListItem>
          <ListItem button onClick={() => onDelete(message.id)}>
            <ListItemText primary="Apagar" />
          </ListItem>
        </List>
      </Popover>

      {/* Diálogo de Edição */}
    <EditMessageDialog message={message} openDialog={openDialog} setOpenDialog={setOpenDialog}/>
    <DeleteMessageDialog message={message} openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog}/>

    </Box>
  );
};

export default MessageActions;
