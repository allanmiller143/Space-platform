import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ContractContext from '../../../ContractContext/ContractContext';
import ContractDetails from './ContractDetails';

const WaitingForOwnerStepDialog = ({openDialog, setOpenDialog}) => {
  const { property,history } = useContext(ContractContext);

  return (

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Detalhes do Contrato</DialogTitle>
        <DialogContent>
          <ContractDetails/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default WaitingForOwnerStepDialog;
