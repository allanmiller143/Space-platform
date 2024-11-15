/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { gapi } from 'gapi-script';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, CardContent, Typography, Box, Divider } from '@mui/material';
import { Cancel, Edit, Delete } from '@mui/icons-material';


function Agendamentos({ openListing, setOpenListing, events, setEvents }) {
  const [editEvent, setEditEvent] = useState(null);
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState(null);

  const handleOpenListingDialog = () => {
    setOpenListing(true);
    fetchEvents();
  };

  const handleCloseListingDialog = () => {
    setOpenListing(false);
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
        const events = response.result.items.filter(event => 
          new Date(event.start.dateTime || event.start.date) > now
        );
        setEvents(events);
      }).catch(error => {
        console.error("Erro ao buscar eventos:", error);
      });
    } else {
      console.error("Módulo de calendário não foi carregado.");
    }
    console.log('events',events)
  };

  const openConfirmDeleteDialog = (event) => {
    setConfirmDeleteEvent(event);
  };

  const handleDeleteEvent = () => {
    if (confirmDeleteEvent) {
      gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: confirmDeleteEvent.id
      }).then(() => {
        setEvents(events.filter(event => event.id !== confirmDeleteEvent.id));
        setConfirmDeleteEvent(null); // Close confirmation dialog
      }).catch(error => console.error("Erro ao excluir evento:", error));
    }
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
  };

  const status = (event) => {
    const updatedAttendees = event.attendees.map(attendee => {
      if (attendee.organizer === undefined) {
        if (attendee.responseStatus === 'accepted') {
          return 'Aceito';
        } else if (attendee.responseStatus === 'declined') {
          return 'Recusado';
        } else if (attendee.responseStatus === 'needsAction') {
          return 'Pendente';
        }
      }
    });
    return updatedAttendees;
  };


  const statusColor = (event) => {
    const color = event.attendees.map(attendee => {
      if (attendee.organizer === undefined) {
        if (attendee.responseStatus === 'accepted') {
          return 'green';
        } else if (attendee.responseStatus === 'declined') {
          return 'red';
        } else if (attendee.responseStatus === 'needsAction') {
          return 'orange';
        }
      }
    });
    return color[0];

  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenListingDialog}>
        Ver Agendamentos
      </Button>

      <Dialog open={openListing} onClose={handleCloseListingDialog}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
              Seus Agendamentos
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseListingDialog} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />   
        <DialogContent>
          {events.length > 0 ? (
            events.map((event, index) => (
              <Box key={index} style={{ marginBottom: '5px' }}>
                <CardContent>
                  <Typography variant="h4" mb={1}>{event.summary}</Typography>
                  <Typography variant="h6" mb={1} style={{ color: statusColor(event) }}>Status: {status(event)}</Typography>
                  <Divider />
                  <Typography color="ActiveBorder" mt={1}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Início:</span> {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                  </Typography>
                  <Typography color="ActiveBorder" mt={1}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Local:</span> {event.location}
                  </Typography>
                  <Typography color="ActiveBorder" mt={1}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Dados gerais:</span> {event.description}
                  </Typography>
0
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <IconButton color="primary" onClick={() => handleEditEvent(event)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => openConfirmDeleteDialog(event)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Box>
            ))
          ) : (
            <Typography>Carregando...</Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={!!confirmDeleteEvent} onClose={() => setConfirmDeleteEvent(null)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir o agendamento "{confirmDeleteEvent?.summary}"?</Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={() => setConfirmDeleteEvent(null)} color="inherit">Cancelar</Button>
            <Button onClick={handleDeleteEvent} color="secondary">Confirmar</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      {/* <Dialog open={!!editEvent} onClose={() => setEditEvent(null)}>
        <DialogTitle>Editar Agendamento</DialogTitle>
        <DialogContent>
          <Button onClick={handleSaveEvent} color="primary">
            Salvar
          </Button>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

export default Agendamentos;
