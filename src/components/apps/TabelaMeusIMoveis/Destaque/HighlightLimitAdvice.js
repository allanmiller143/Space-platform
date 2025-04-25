/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Collapse, Grid } from '@mui/material';
import { Cancel, ExpandMore, ExpandLess, Payment } from '@mui/icons-material';
import PaymentButton from '../../../../Services/MercadoPago/PaymentButton';
import PaymentButton2 from '../../../../Services/MercadoPago/PaymentButton2';

const HighlightLimitAdvice = ({ openDialog, setOpenDialog }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("pix_10");
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const paymentOptions = [
    { label: "Destaques ilimitados - R$ 10,90", value: "pix_10", price: "10,90", data : {
      transaction_amount: 10.99,
      new_limit : 10,
      description: "Aumentar o limite de destaques dos imóveis",
      payment_method_id: "pix",
      payer: {
        email: currentUser.email,
        identification: {
          type: "CPF",
          number: currentUser.info.cpf,
        },
      },
    } },

  ];

  return (
    <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
            Limite de destaques grátis atingido
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleDialogClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Você atingiu o limite de destaques gratuitos. Para continuar destacando, escolha uma das opções de pagamento e libere mais destaques!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Pague apenas R$ <span style ={{ fontWeight: 'bold' }}> 10,90 </span> por mês e libere destques ilimitados
        </Typography>
        <PaymentButton2 data={paymentOptions[0].data} close={handleDialogClose}/>
       
      </DialogContent>
      
    </Dialog>
  );
};

export default HighlightLimitAdvice;
