/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Collapse, Grid } from '@mui/material';
import { Cancel, ExpandMore, ExpandLess, Payment } from '@mui/icons-material';
import PaymentButton from '../../../../Services/MercadoPago/PaymentButton';

const LimitAdvice = ({ openDialog, setOpenDialog }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const paymentOptions = [
    { label: "10 Postagens - R$ 10,90", value: "pix_10", price: "10,90", data : {
      transaction_amount: 10.99,
      new_limit : 10,
      description: "Aumentar o limite de postagens de imóveis para 10",
      payment_method_id: "pix",
      payer: {
        email: currentUser.email,
        identification: {
          type: "CPF",
          number: currentUser.info.cpf,
        },
      },
    } },
    { label: "20 Postagens - R$ 15,90", value: "pix_20", price: "15,90", data : {
      transaction_amount: 15.99,
      new_limit : 20,
      description: "Aumentar o limite de postagens de imóveis para 20",
      payment_method_id: "pix",
      payer: {
        email: currentUser.email,
        identification: {
          type: "CPF",
          number: currentUser.info.cpf,
        },
      },
    }},
    { label: "30 Postagens - R$ 20,90", value: "pix_30", price: "20,90", data : {
      transaction_amount: 20.99,
      new_limit : 30,
      description: "Aumentar o limite de postagens de imóveis para 30",
      payment_method_id: "pix",
      payer: {
        email: currentUser.email,
        identification: {
          type: "CPF",
          number: currentUser.info.cpf,
        },
      },
    }},
  ];

  return (
    <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
            Limite de anúncios grátis atingido
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleDialogClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Você atingiu o limite de anúncios gratuitos. Para continuar publicando, escolha uma das opções de pagamento e libere mais postagens!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExpandClick}
          endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
          fullWidth
          style={{
            marginTop: '16px',
            textTransform: 'none',
            borderRadius: '8px',
          }}
        >
          Ver opções de pagamento
        </Button>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box mt={2}>
            {paymentOptions.map((option) => (
              <Box 
                key={option.value} 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between" 
                py={2} 
                px={3} 
                mb={2}
                border="1px solid #ddd" 
                borderRadius="8px"
                style={{
                  backgroundColor: selectedOption === option.value ? "#f0f8ff" : "#fff",
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedOption(option.value)}
              >
                <Typography variant="body1">{option.label}</Typography>
                <PaymentButton data={option.data} close={handleDialogClose}/>
              </Box>
            ))}
          </Box>
        </Collapse>
      </DialogContent>
    </Dialog>
  );
};

export default LimitAdvice;
