/* eslint-disable react/prop-types */
import { useState } from 'react';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,Typography,IconButton,Box,CircularProgress} from '@mui/material';
import { Cancel, Delete as DeleteIcon } from '@mui/icons-material';

const DeleteDialog = ({
  open,
  onCancel,
  onConfirm,
  title = 'Confirmar Exclusão',
  message = 'Tem certeza de que deseja excluir este item?',
  secondaryMessage = 'Esta operação não pode ser desfeita.'
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(); // Supondo que onConfirm é uma função assíncrona
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        style: {
          borderRadius: '30px', // Bordas arredondadas
          padding: '10px', // Padding adicional
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="span" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onCancel} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
        <Typography variant="subtitle1" color="error" component="span" style={{ flexGrow: 1, fontSize: '12px' }}>
          {secondaryMessage}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <DeleteIcon />}
          disabled={loading}
        >
          {loading ? 'Excluindo...' : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
