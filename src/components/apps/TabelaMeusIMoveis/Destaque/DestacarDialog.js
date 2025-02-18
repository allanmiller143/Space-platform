/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Cancel, CheckCircle } from '@mui/icons-material';
import Vantagens from './Vantagens';
import ImovelDestacado from './DadosDestacado/ImovelDestacado';

function DestacarDialog({ open, handleClose, property, setImovelToSee, setFilteredImoveis, setImoveis }) {

  if (!property) {
    return null;
  }else{
    console.log(property);
  }


  return (
    <Dialog
      fullWidth
      maxWidth= {property.destaque ? "md" : "sm"}
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
        <Box sx={{  mt: 2 }}>
          {property.destaque ? (
            <ImovelDestacado open={open} handleClose={handleClose} property={property} setImovelToSee={setImovelToSee} setFilteredImoveis={setFilteredImoveis} setImoveis={setImoveis} />
          ) : (
            <Vantagens property={property} setImovelToSee={setImovelToSee} setFilteredImoveis={setFilteredImoveis} setImoveis={setImoveis}  />
          )}
        </Box>

      </DialogContent>
    </Dialog>
  );
}

export default DestacarDialog;