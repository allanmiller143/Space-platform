/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from 'react';
import { Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ImoveisSharedDialog({ open, handleClose, property }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [sharingDialogOpen, setSharingDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(property);
  }, [property]);

  const steps = [
    {
      label: 'Anúncio sob análise',
      description: 'O corretor/imobiliária está analisando seu anúncio. Em breve ele dará uma resposta.',
    },
  ];

  if (property.shared.status === 'rejected') {
    steps.push({
      label: 'Anúncio recusado',
      description: `Infelizmente, O corretor/imobiliária recusou seu pedido.\n\n${property.shared.reasonRejected}`,
    });
  }

  if (property.shared.status === 'accepted') {
    steps.push({
      label: 'Corretor/imobiliária deu resposta',
      description: 'O corretor Aceitou seu pedido, para ver mais detalhes, clique no botão abaixo.',
    });
  }

  useEffect(() => {
    if (property.shared.status === 'pending') {
      setActiveStep(0);
    } else if (property.shared.status === 'accepted') {
      setActiveStep(1);
    } else if (property.shared.status === 'rejected') {
      setActiveStep(1);
    }
  }, [open]);

  const handleNavigate = () => {
    navigate(`/apps/share/${property.id}`);
  };

  const handleOpenSharingDialog = () => {
    setSharingDialogOpen(true);
  };

  const handleCloseSharingDialog = () => {
    setSharingDialogOpen(false);
  };

  return (
    <>
      <Dialog
        fullWidth
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
              Situação do compartilhamento
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

                    {property.shared.status === 'rejected' && index === 1 && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleNavigate}
                        sx={{ mt: 2 }}
                      >
                        Tentar novo compartilhamento
                      </Button>
                    )}

                    {property.shared.status === 'accepted' && index === 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenSharingDialog}
                        sx={{ mt: 2 }}
                      >
                        Ver Informações do Compartilhamento
                      </Button>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog para exibir informações do compartilhamento */}
      <Dialog
        fullWidth
        open={sharingDialogOpen}
        onClose={handleCloseSharingDialog}
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
              Informações do Compartilhamento
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseSharingDialog} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {/* Substitua pelo conteúdo real das informações do compartilhamento */}
          <Typography variant="body2">
            Detalhes do compartilhamento aqui.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ImoveisSharedDialog;
