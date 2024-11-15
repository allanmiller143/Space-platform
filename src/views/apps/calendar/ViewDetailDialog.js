/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography, Divider, CardContent, DialogTitle, Box } from '@mui/material';
import { Cancel, Delete } from '@mui/icons-material';
import { gapi } from 'gapi-script';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

moment.locale('pt-BR');

const ViewDetailDialog = ({ open, handleClose, selectedEvent, events, setEvents }) => {
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState(null);
  const cuString = localStorage.getItem('currentUser'); 
  const currentUserls = JSON.parse(cuString); 

  const openConfirmDeleteDialog = () => {
    setConfirmDeleteEvent(selectedEvent);
  };

  const handleDeleteEvent = () => {
    if (confirmDeleteEvent) {
      gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: confirmDeleteEvent.id
      }).then(() => {
        setEvents(events.filter(event => event.id !== confirmDeleteEvent.id)); // Atualiza o estado dos eventos
        setConfirmDeleteEvent(null); // Fecha o diálogo de confirmação de exclusão
        handleClose(); // Fecha o diálogo principal
      }).catch(error => console.error("Erro ao excluir evento:", error));
    }
  };

  const handleAcceptEvent = () => {
    if (selectedEvent && selectedEvent.status === 'Pendente') {
      const updatedAttendees = selectedEvent.completeEvent.attendees.map(attendee => {
        // Verifica se o e-mail corresponde ao do convidado, para definir o status como 'accepted'
        if (attendee.email === currentUserls.email) {
          return { ...attendee, responseStatus: "accepted" };
        }
        return attendee;
      });
  
      // Atualiza o evento com o attendee modificado
      gapi.client.calendar.events.patch({
        calendarId: 'primary',
        eventId: selectedEvent.id,
        resource: {
          attendees: updatedAttendees
        }
      }).then(() => {
        // Atualiza o estado do evento localmente
        const updatedEvent = { 
          ...selectedEvent, 
          color: 'green',
          completeEvent: { ...selectedEvent.completeEvent, attendees: updatedAttendees } 
        };
  
        // Cria uma nova lista de eventos sem o evento atualizado e depois o adiciona de volta com as mudanças
        const newEvents = events
          .filter(event => event.id !== updatedEvent.id) // Remove o evento antigo
          .concat(updatedEvent); // Adiciona o evento atualizado
  
        setEvents(newEvents); // Define a nova lista de eventos
  
        // Fecha o diálogo principal
        handleClose();
      }).catch(error => console.error("Erro ao aceitar o evento:", error));
    }
  };


  const getDescription = () => {
    const description = selectedEvent.description || '';
    const lines = description.split(';');
    return (
      <div>
        {lines.map((line, index) => {
          // Divide cada linha em chave e valor
          const [key, value] = line.split(':');
          return (
            <Typography key={index}>
              <strong>{key.trim()}:</strong> {value?.trim()}
            </Typography>
          );
        })}
      </div>
    );
  };
  
  
  return (
    <Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        {!selectedEvent ? (
          <Box>Carregando...</Box>
        ) : (
          <Box>
            <DialogTitle>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
                  Detalhes do agendamento
                </Typography>
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                  <Cancel />
                </IconButton>
              </Box>
            </DialogTitle>
            <Divider />
            <CardContent>
              <Typography variant="h6" mb={1}>{selectedEvent.title}</Typography>
              <Typography variant="body1" style={{ color: selectedEvent.color }}>
                Status: {selectedEvent.status}
              </Typography>
              <Divider />
              <Typography color="textSecondary" mt={1}>
                <strong>Início:</strong> {new Date(selectedEvent.start || selectedEvent.start.date).toLocaleString()}
              </Typography>
              <Typography color="textSecondary" mt={1}>
                <strong>Local:</strong> {selectedEvent.location || 'Não especificado'}
              </Typography>
              <Typography color="textSecondary" mt={1}>
                <strong>Descrição:</strong> {getDescription()}
              </Typography>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                {selectedEvent.status === 'Pendente' && selectedEvent.completeEvent.attendees.some(attendee => (attendee.email === currentUserls.email && attendee.responseStatus === 'needsAction' && attendee.organizer !== true )) && (
                  <Button variant="contained" color="primary" onClick={handleAcceptEvent}>
                    Aceitar
                  </Button>
                )}
                <IconButton color="secondary" onClick={openConfirmDeleteDialog}>
                  <Delete /> <span style={{ marginLeft: '5px', fontSize: '15px' }}> Excluir </span>
                </IconButton>
              </Box>
            </CardContent>
          </Box>
        )}
      </Dialog>

      <Dialog open={!!confirmDeleteEvent} onClose={() => setConfirmDeleteEvent(null)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o agendamento?
          </Typography>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteEvent(null)} color="inherit">
              Cancelar
            </Button>
            <Button onClick={handleDeleteEvent} color="secondary">
              Confirmar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ViewDetailDialog;
