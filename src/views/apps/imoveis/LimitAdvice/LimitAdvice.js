/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Collapse, 
  Grid 
} from '@mui/material';
import { Cancel, ExpandMore, ExpandLess } from '@mui/icons-material';
import QRCode from 'react-qr-code'; // Instale com `npm install react-qr-code`

const LimitAdvice = ({ openDialog, setOpenDialog }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const paymentOptions = [
    { label: "10 Postagens - R$ 10,90", value: "pix_10", price: "10,90" },
    { label: "20 Postagens - R$ 15,90", value: "pix_20", price: "15,90" },
    { label: "30 Postagens - R$ 20,90", value: "pix_30", price: "20,90" },
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
                <QRCode value={`PIX:${option.value}`} size={50} />
              </Box>
            ))}
          </Box>
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          color="secondary"
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            backgroundColor: '#f50057',
            color: 'white',
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => alert(`Você escolheu: ${selectedOption}`)}
          color="primary"
          disabled={!selectedOption}
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            backgroundColor: selectedOption ? '#3f51b5' : '#ccc',
            color: selectedOption ? 'white' : '#666',
          }}
        >
          Confirmar Pagamento
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LimitAdvice;
