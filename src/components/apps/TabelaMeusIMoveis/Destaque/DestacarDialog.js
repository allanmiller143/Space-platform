/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Cancel, CheckCircle } from '@mui/icons-material';
import Vantagens from './Vantagens';
import ImovelDestacado from './DadosDestacado/ImovelDestacado';

function DestacarDialog({ open, handleClose, property }) {
  const [currentPage, setCurrentPage] = useState('info'); // Estado para controlar a página atual

  if (!property) {
    return null;
  }

  useEffect(() => {
    console.log(property);
  }, [property]);


  return (
    <Dialog
      fullWidth
      maxWidth= {property.highlighted ? "md" : "sm"}
      open={open}
      onClose={handleClose}
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
            Destacar anúncio
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />

      <DialogContent>
        {currentPage === 'info' && (
          <Box sx={{  mt: 2 }}>
            {property.highlighted ? (
              <ImovelDestacado open={open} handleClose={handleClose} property={property} />
            ) : (
              <Vantagens currentPage={currentPage} setCurrentPage={setCurrentPage} property={property} />
            )}
          </Box>
        )}

        {currentPage === 'highlighted' && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Anúncio destacado com sucesso!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Seu anúncio agora está destacado e receberá todas as vantagens mencionadas.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleClose}
            >
              Fechar
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DestacarDialog;