/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from 'react';
import { Cancel, Delete as DeleteIcon } from '@mui/icons-material';

function DashBoardWaitingAvaliationProperties({ open, handleClose, property, func }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    {
      label: 'Anúncio sob análise',
      description: 'Seu anúncio esta sob analise. Em breve entraremos em contato para confirmar seu anúncio.',
    },

  ];

  if (property.verified === 'rejected') {
    steps.push({
      label: 'Anúncio recusado',
      description: `Infelizmente, seu anúncio foi recusado. Verifique os requisitos e tente novamente.\n\nMotivo: ${property.reason.reason}`,
    });
  }

  if (property.verified !== 'rejected') {
    steps.push( {
      label: 'Anúncio publicado',
      description: 'Seu anúncio foi revisado e publicado. ',
    },);
  }

  useEffect(() => {
    if(property.verified === 'pending'){
      setActiveStep(0);
    } else if(property.verified === 'verified'){
      setActiveStep(1);
    } else if(property.verified === 'rejected'){
      setActiveStep(1);
    }
  }, [open]);

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
            Situação do anúncio
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ maxWidth: 400, mt: 2 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === steps.length - 1 ? (
                      <Typography variant="caption">Último passo</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography variant="body2">{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </DialogContent>

    </Dialog>
  );
}

export default DashBoardWaitingAvaliationProperties;
