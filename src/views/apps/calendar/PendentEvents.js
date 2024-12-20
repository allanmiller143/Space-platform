/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CardContent, Button, Typography } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import BlankCard from '../../../components/shared/BlankCard';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const PendentEvents = ({ events, setEvents }) => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const cuString = localStorage.getItem('currentUser'); 
  const currentUserls = JSON.parse(cuString); 

  useEffect(() => {
    console.log('events', events);
    setPendingEvents(events.filter((event) => (
      event.status === 'Pendente' &&
      event.completeEvent.attendees.some(attendee => (
        attendee.email === currentUserls.email &&
        attendee.responseStatus === 'needsAction' &&
        attendee.organizer === undefined
      ))
    )));
    console.log(pendingEvents);
  }, [events]);


  const handleAcceptEvent = (event) => {
    if (event && event.status === 'Pendente') {
      const updatedAttendees = event.completeEvent.attendees.map(attendee => {
        // Verifica se o e-mail corresponde ao do convidado, para definir o status como 'accepted'
        if (attendee.email === currentUserls.email) {
          return { ...attendee, responseStatus: "accepted" };
        }
        return attendee;
      });
  
      // Atualiza o evento com o attendee modificado
      gapi.client.calendar.events.patch({
        calendarId: 'primary',
        eventId: event.id,
        resource: {
          attendees: updatedAttendees
        }
      }).then(() => {
        // Atualiza o estado do evento localmente
        const updatedEvent = { ...event, color: 'green', completeEvent: { ...event.completeEvent, attendees: updatedAttendees } };
        setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));



      }).catch(error => console.error("Erro ao aceitar o evento:", error));
    }
  };

  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">
        Solicitações de Agendamento
      </Typography>

      {pendingEvents && pendingEvents.length > 0 ? (
        pendingEvents.map((event, index) => (
          <BlankCard key={index}>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {event.completeEvent.summary}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(event.completeEvent.start.dateTime || event.completeEvent.start.date).toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleAcceptEvent(event)}
                >
                  Aceitar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                >
                  Rejeitar
                </Button>
              </Box>
            </CardContent>
          </BlankCard>
        ))
      ) : (
        <BlankCard>
          <CardContent>
            <Typography variant="subtitle1" color="textSecondary" textAlign="center">
              Não há solicitações de agendamento pendentes no momento.
            </Typography>
          </CardContent>
        </BlankCard>
      )}
    </Box>
  );
};

export default PendentEvents;
