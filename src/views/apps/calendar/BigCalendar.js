/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { CardContent, Button, Dialog, DialogActions, DialogContent, Fab, TextField, Typography, Stack, Menu, MenuItem, FormGroup, FormControlLabel, Checkbox, Divider, IconButton } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import PageContainer from '../../../components/container/PageContainer';
import BlankCard from '../../../components/shared/BlankCard';
import Header from '../../../layouts/full/horizontal/header/Header';
import Grid from '@mui/material/Grid';
import { gapi } from 'gapi-script';
import ViewDetailDialog from './ViewDetailDialog';
import AskForGoogleAuth from './Componentes/AskForGoogleAuth';
import PendentEvents from './PendentEvents';

const clientId = "760335256184-rt5r85qubq5v4aq4cee32g0p3dld8kia.apps.googleusercontent.com";

moment.locale('pt-BR');
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [open, setOpen] = useState(false);
  const [openAsk, setOpenAsk] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/calendar.events",
      }).then(() => {
        return gapi.client.load('calendar', 'v3');
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        if (!authInstance.isSignedIn.get()) {
          setOpenAsk(true);
        }
        authInstance.isSignedIn.listen(setIsSignedIn);
      })
      .then(fetchEvents)
      .catch(error => console.error("Erro ao inicializar o gapi.client:", error));
    };
    gapi.load("client:auth2", start);
  }, []);

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

  const editEvent = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || 'blue';
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        opacity: 0.8,
        display: 'block',
        padding: '2px 5px'
      }
    };
  };

  const messages = {
    today: 'Hoje',
    previous: 'Anterior',
    next: 'Próximo',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'Nenhum evento neste período.',
    showMore: total => `+ Ver mais (${total})`
  };

  return (
    <PageContainer title="Calendário de Contatos" description="">
      <Header />
      <Grid container spacing={3} sx={{ p: 4, height: { xs: 'auto', lg: '90vh' } }}>
        <Grid item xs={12} lg={9}>
          <BlankCard sx={{ p: 4 }}>
            <CardContent>
              <Calendar
                events={events}
                defaultView="month"
                views={['month', 'week', 'day']} // Adicione as views para habilitar botões
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                localizer={localizer}
                style={{ height: 'calc(100vh - 350px)' }}
                onSelectEvent={editEvent}
                eventPropGetter={eventStyleGetter}
                messages={messages}
              />
              <ViewDetailDialog
                open={open}
                handleClose={handleClose}
                selectedEvent={selectedEvent}
                events={events}
                setEvents={setEvents} 
              />
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid item xs={12} lg={3} sx={{ height: { lg: '90vh' }, overflowY: { lg: 'scroll' } }}>
          <Stack spacing={3}>
            {events.length > 0 && <PendentEvents events={events} setEvents={setEvents} />}
          </Stack>
        </Grid>
        
        <AskForGoogleAuth open={openAsk} setOpen={setOpenAsk} setIsSignedIn={setIsSignedIn} setEvents={setEvents} />
      </Grid>
    </PageContainer>
  );
};

export default BigCalendar;
