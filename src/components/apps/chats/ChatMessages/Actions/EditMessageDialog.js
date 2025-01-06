/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { Typography } from 'antd';

const EditMessageDialog = ({ message, openDialog, setOpenDialog}) => {
  const [editText, setEditText] = useState(message.text || ''); // Armazena o texto da mensagem a ser editado

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    console.log('Texto editado:', editText); // Aqui você pode enviar o texto editado para o backend ou atualizar o estado
    setOpenDialog(false); // Fecha o diálogo após salvar
  };

  return (
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
      <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h2" component="span" style={{ flexGrow: 1 }}>
              Editar Mensagem
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleDialogClose} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>       
        <DialogContent fullWidth >
          <TextField
            autoFocus
            margin="dense"
            id="editMessage"
            label="Mensagem"
            type="text"
            fullWidth
            variant="outlined"
            value={editText}
            onChange={(e) => setEditText(e.target.value)} // Atualiza o texto enquanto o usuário edita
          />
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
            onClick={handleSave}
            color="primary"
            style={{
                textTransform: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
              }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default EditMessageDialog;
