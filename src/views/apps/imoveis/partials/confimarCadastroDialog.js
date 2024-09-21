/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, IconButton, Typography } from '@mui/material';
import houseImage from 'src/assets/images/ilustracoes/house.png';
import { Box, fontSize } from '@mui/system';
import { Cancel } from '@mui/icons-material';

const ConfimarCadastroDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth open={open} 
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: '30px', // Bordas arredondadas
          padding: '20px', // Padding adicional
        },
      }}
    >
      <>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h4" component="span" style={{ flexGrow: 1 }}>
              Obrigado por registrar seu imóvel!
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              mt: 2,
            }}
          >
            {/* Imagem da casa */}
            <Box
              component="img"
              src={houseImage}
              alt="Imagem da casa"
              sx={{
                maxWidth: '130px',
                height: 'auto',
                mb: 3, // Margem inferior
              }}
            />

            {/* Texto de agradecimento */}
            <Typography variant="h5" color={'text.primary'}>
              Seu anúncio foi inserido com sucesso. Estamos revisando as informações e em breve, ele estará disponível.
            </Typography>
          </Box>
        </DialogContent>
      </>
    </Dialog>
  );
};

export default ConfimarCadastroDialog;
