/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { gapi } from 'gapi-script';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography, Box } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { toast } from 'sonner';
const clientId = "760335256184-rt5r85qubq5v4aq4cee32g0p3dld8kia.apps.googleusercontent.com";

function AskForGoogleAuth({ open, setOpen,setIsSignedIn,setEvents }) {
  const cuString = localStorage.getItem('currentUser'); 
  const currentUserls = JSON.parse(cuString); 
 
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log("Usuário desconectado");
      setIsSignedIn(false);
    });
  };

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        console.log("Usuário autenticado");
  
        const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        const email = profile.getEmail();
  
        // Verifica se o email autenticado é o mesmo que `currentUserls.email`
        if (email !== currentUserls.email) {
          toast.error('Para marcar um agendamento, você precisa usar o mesmo email logado: ' + currentUserls.email);
          handleLogout();
          return Promise.reject('E-mail diferente'); // Interrompe a execução se o e-mail for diferente
        } else {
          setIsSignedIn(true);
          return fetchEvents(); // Chama `fetchEvents` somente se o e-mail for o mesmo
        }
      })
      .then(() => setOpen(false)) // Fecha o modal apenas se o e-mail for válido e fetchEvents foi bem-sucedido
      .catch(error => console.error("Erro ao autenticar ou ao buscar eventos:", error));
  };
  

  const status = (event) => {
    const attendee = event.attendees && event.attendees[1];
    if (attendee) {
      switch (attendee.responseStatus) {
        case 'accepted':
          return 'Aceito';
        case 'declined':
          return 'Recusado';
        case 'needsAction':
          return 'Pendente';
        default:
          return 'Status desconhecido';
      }
    }
    return 'Status desconhecido';
  };

  const statusColor = (event) => {
    if (event.attendees && event.attendees[1]?.responseStatus === 'accepted') {
      return 'green';
    } else if (event.attendees && event.attendees[1]?.responseStatus === 'declined') {
      return 'red';
    } else if (event.attendees && event.attendees[1]?.responseStatus === 'needsAction') {
      return 'orange';
    }
    return 'blue'; // Default color
  };

  const fetchEvents = () => {
    if (gapi.client.calendar) {
      const now = new Date();
      const oneYearLater = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

      gapi.client.calendar.events.list({
        calendarId: 'primary',
        q: 'space-Imoveis',
        timeMin: now.toISOString(),
        timeMax: oneYearLater.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      }).then(response => {
        const events = response.result.items.map((event) => {
          const start = event.start?.dateTime || event.start?.date;
          const end = event.end?.dateTime || event.end?.date;
          if (start && end) {
            return {
              title: event.summary,
              start: new Date(start),
              end: new Date(end),
              status: status(event),
              location: event.location || 'Local não especificado',
              description: event.description || 'Sem descrição',
              color: statusColor(event),
              id: event.id,
              completeEvent: event
            };
          }
          return null;
        }).filter(event => event !== null);

        setEvents(events);
      }).catch(error => {
        console.error("Erro ao buscar eventos:", error);
      });
    } else {
      console.error("Módulo de calendário não foi carregado.");
    }
  };

  return (
    <div>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
              Parece que você não esta logado no Google.
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>  
        <Divider />        
        <DialogContent>
          <Typography variant="body1" color="textSecondary" paragraph mt={2}>
            Para continuar, efetue o login com o Google.
          </Typography>

        </DialogContent>
        <DialogActions>

          <Button onClick={handleLogin} color="primary">
            Fazer login com o google
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AskForGoogleAuth;
