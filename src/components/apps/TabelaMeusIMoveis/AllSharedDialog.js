/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Avatar, Box,Button,Dialog,DialogContent,DialogTitle,IconButton,ListItem,ListItemAvatar,ListItemText,Step,StepContent,StepLabel,Stepper,Typography,} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react';
import React, { useEffect } from 'react';
import { Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ImoveisSharedDialog from './ImoveisSharedDialog';

function AllSharedDialog({ open, handleClose, property }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [sharingDialogOpen, setSharingDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const [openShared, setOpenShared] = useState(false);
  const [imovelToSee, setImovelToSee] = useState(null);''


  useEffect(() => {
    console.log(property);
  }, [open]);


  const status = (status) => {
    const statuses = {
      pending: 'Pendente',
      accepted: 'Confirmado',
      rejected: 'Recusado',
    };
    return statuses[status] || 'Desconhecido';
  };

  const statusColor = (status) => {
    const statuses = {
      pending: 'orange',
      accepted: 'green',
      rejected: 'red',
    };
    return statuses[status] || 'black';
  };
  const OpenDialog = (imovel) => {
    //handleClose();
    setImovelToSee(imovel);
    setSharingDialogOpen(true);
    
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '10px', // Bordas arredondadas
            padding: '10px', // Padding adicional
          },
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" component="span" style={{ flexGrow: 1 }}>
              Seus compartilhamentos
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>

            {property.shared.map((imovel) => (
                <ListItem
                  key={imovel.propertyId}
                  sx={{ padding: 0, marginBottom: 1, cursor: "pointer" }}
                  onClick={() => OpenDialog(imovel)}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={property.pictures[0].url}
                      alt={'imagem do imovel'}
                      sx={{ width: 55, height: 55, borderRadius: 1, mr: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={status(imovel.status)}
                    secondary={`${property.address.street}, ${property.address.number} - ${property.address.neighborhood} - ${property.address.city}, ${property.address.state}`}
                    primaryTypographyProps={{color: statusColor(imovel.status) }}
                    secondaryTypographyProps={{
                      sx: {
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2, // Limita a 2 linhas
                        fontSize: "11px",
                      },
                    }}
                  />
                </ListItem>
              ))}
            <Button onClick={() => navigate(`/apps/share/${property.id}`)} sx = {{marginTop: 2}}> Compartilhar com outro corretor</Button>
        </DialogContent>
      </Dialog>
      {sharingDialogOpen && (<ImoveisSharedDialog open={sharingDialogOpen} handleClose={() => setSharingDialogOpen(false)} property={imovelToSee}/>)}

    </>
  );
}

export default AllSharedDialog;
