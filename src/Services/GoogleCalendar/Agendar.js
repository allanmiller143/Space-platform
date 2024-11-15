/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { gapi } from 'gapi-script';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography, Box } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { toast } from 'sonner';

function Agendar({ open, setOpen, setEvents, advertiser,property }) {
  const cuString = localStorage.getItem('currentUser'); 
  const currentUserls = JSON.parse(cuString); 
  const location = ` ${property.address.street} - ${property.address.number}, ${property.address.city} - ${property.address.state},Bairro: ${property.address.neighborhood}, complemento: ${property.address.complement}.`|| ''
    
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: location,
    description: '',
    startDateTime: '',
    endDateTime: '',
    name: currentUserls !== null && currentUserls.name || '',  
    phone: currentUserls !== null && currentUserls.info.phone || '',
  });
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
    fetchEvents();
  };

  const handleCloseDialog = () => {
    setEventDetails({});
    setOpen(false);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmation(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSchedule = () => {
    console.log("Tentando criar o evento com os detalhes:", eventDetails);
    console.log(advertiser);
    console.log(property);
    if (!eventDetails.startDateTime || !eventDetails.endDateTime) {
      toast.error('Por favor, preencha o campo de data e hora corretamente.');
      return;
    }
    const event = {
        summary: eventDetails.summary + " - space-Imoveis",
        location: eventDetails.location,
        description: `
          Anunciante: ${advertiser.name}; 
          Email do Anunciante: ${advertiser.email}; 
          Telefone do Anunciante: ${advertiser.info.phone}; 
          Nome do comprador: ${currentUserls.name};
          Telefone do comprador: ${currentUserls.info.phone}
        `,
        start: {
          dateTime: new Date(eventDetails.startDateTime).toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        end: {
          dateTime: new Date(eventDetails.endDateTime).toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        attendees: [
          { email: advertiser.email },
          { email: currentUserls.email, displayName: eventDetails.name }
        ]
      };
      

    if (gapi.client.calendar) {
      gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        sendUpdates: 'all'
      }).then(response => {
        console.log("Evento criado com sucesso:", response);
        handleCloseDialog();
        setOpenConfirmation(true);
      }).catch(error => {
        console.error("Erro ao criar evento:", error);
        toast.error("Falha ao criar o agendamento. Verifique o console para detalhes.");
      });
    } else {
      console.error("Módulo de calendário não foi carregado.");
    }
  };

  const fetchEvents = () => {
    if (gapi.client.calendar) {
      const now = new Date();
      const oneYearLater = new Date();
      oneYearLater.setFullYear(now.getFullYear() + 1);

      gapi.client.calendar.events.list({
        calendarId: 'primary',
        q: 'space-Imoveis',
        timeMin: now.toISOString(),
        timeMax: oneYearLater.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      }).then(response => {
        const events = response.result.items;
        setEvents(events);
      }).catch(error => {
        console.error("Erro ao buscar eventos:", error);
      });
    } else {
      console.error("Módulo de calendário não foi carregado.");
    }
  };

  const handleStartDateTimeChange = (e) => {
    const startDateTime = e.target.value;
    const start = new Date(startDateTime);
  
    const end = new Date(start);
    end.setHours(start.getHours() + 1);
  
    const formattedEndDateTime = end.toLocaleString('sv-SE').slice(0, 16);
  
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      startDateTime,
      endDateTime: formattedEndDateTime
    }));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Agendar visita
      </Button> 
      
      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
              Fazer agendamento
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>  
        <Divider />        
        <DialogContent>
          <Box sx = {{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', my :1 }}>
            <Typography variant="h6" color="textSecondary" paragraph> Local </Typography>
            <Typography variant="body1" color="textSecondary" paragraph> {eventDetails.location}</Typography>
          </Box>

          <TextField
            margin="dense"
            label="Título"
            name="summary"
            fullWidth
            variant="outlined"
            value={eventDetails.summary}
            onChange={handleInputChange}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Typography variant="body2">Data e Hora de Início</Typography>
            <TextField
              name="startDateTime"
              type="datetime-local"
              fullWidth
              variant="outlined"
              value={eventDetails.startDateTime}
              onChange={handleStartDateTimeChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Typography variant="body2">Data e Hora de Término</Typography>
            <TextField
              disabled
              name="endDateTime"
              type="datetime-local"
              fullWidth
              variant="outlined"
              value={eventDetails.endDateTime}
              onChange={handleInputChange}
            />
          </Box>

          <Typography variant="body1" color="textSecondary" paragraph mt={2}>
            O agendamento será analisado pelo anunciante e ele poderá aceitar ou recusar sua solicitação.
          </Typography>

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSchedule} color="primary">
            Confirmar Agendamento
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmation} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>
          <Typography variant="h6">Pedido de Agendamento Enviado</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            O período de agendamento foi entregue ao anunciante. Por favor, aguarde a confirmação.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Agendar;
