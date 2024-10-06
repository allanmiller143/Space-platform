/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { Typography } from 'antd';

const DeleteMessageDialog = ({ message, openDeleteDialog, setOpenDeleteDialog }) => {
  const handleDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    console.log('Mensagem apagada:', message.id); // Aqui você pode chamar a função de exclusão ou o backend
    setOpenDeleteDialog(false); // Fecha o diálogo após confirmar a exclusão
  };

  return (
    <Dialog open={openDeleteDialog} onClose={handleDialogClose} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h2" component="span" style={{ flexGrow: 1 }}>
          Tem certeza que deseja apagar esta mensagem?
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleDialogClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          {message.text}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleDialogClose}
          color="secondary"
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            backgroundColor: '#f50057',
            color: 'white',
          }}
        >
          Cancelar
        </Button>

        <Button
          onClick={handleDelete}
          color="primary"
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
          }}
        >
          Apagar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMessageDialog;
