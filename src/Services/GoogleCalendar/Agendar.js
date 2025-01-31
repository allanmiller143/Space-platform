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

    if(advertiser.type === 'owner'){
      toast.error('opss, esse dono de imóvel não possui permissão para agendar, por favor, para mais informações entre em contato com o proprietário pelo chat');
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
        Agendar Visita
      </Button>


      <CalendarioDisponibilidade open={dialogAberto} onClose={handleFecharDialog} property={property} advertiser={advertiser}  />

     
    </div>
  );
}

export default Agendar;
