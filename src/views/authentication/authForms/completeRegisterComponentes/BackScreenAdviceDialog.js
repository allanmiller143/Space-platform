/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { Typography } from 'antd';
import { useNavigate } from 'react-router';

const BackScreenAdviceDialog = ({ openDialog, setOpenDialog }) => {

  const Navigate = useNavigate();  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const BackScreenAdviceDialog = () => {
    Navigate(-1); // Voltar uma página no histórico
  }

  return (
    <Dialog open={openDialog} onClose={handleDialogClose} fullWidth >
      <DialogTitle variant='h3'>
        <Box display="flex" alignItems="center">
          <Typography variant="h3" component="span" style={{ flexGrow: 1 }}>
            Tem certeza que deseja voltar?
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleDialogClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" style={{ marginTop: '5px' }}>
            Ao voltar, todos os dados inseridos serão apagados.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleDialogClose}
          color="secondary"
          size='small'
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 8px',
            backgroundColor: '#f50057',
            color: 'white',
          }}
        >
          Fechar
        </Button>

        <Button
          onClick={BackScreenAdviceDialog}
          color="primary"
          size='small'
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 8px',
          }}
        >
          Continuar mesmo assim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BackScreenAdviceDialog;
