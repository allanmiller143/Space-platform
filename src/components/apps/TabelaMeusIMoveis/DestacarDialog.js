/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Cancel, Delete as DeleteIcon } from '@mui/icons-material';

function DestacarDialog({ open, handleClose, property }) {
  const [activeStep, setActiveStep] = React.useState(0);

  if(!property){
    return null
  }

  return (
    <Dialog
      fullWidth open={open} 
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

      <DialogContent>
        <Box sx={{ maxWidth: 400, mt: 2 }}>
         
        </Box>
      </DialogContent>

    </Dialog>
  );
}

export default DestacarDialog;
