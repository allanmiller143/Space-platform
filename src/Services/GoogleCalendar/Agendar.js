/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Button,
} from '@mui/material';
import { toast } from 'sonner';
import CalendarioDisponibilidade from './Horarios/Calendar';

function Agendar({ advertiser, property }) {


  const [dialogAberto, setDialogAberto] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleAbrirDialog = () => {
    if(currentUser === null){
      toast.error('Necessário estar logado para agendar');
      return;
    } 
    setDialogAberto(true);
  };

  const handleFecharDialog = () => {
    setDialogAberto(false);
  };

  return (
    <div>

      <Button variant="contained" color="primary" onClick={handleAbrirDialog}>
        Abrir Calendário
      </Button>
      <CalendarioDisponibilidade open={dialogAberto} onClose={handleFecharDialog} property={property} advertiser={advertiser}  />

     
    </div>
  );
}

export default Agendar;
