import { useEffect, useState } from 'react';
import { Button, CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import PageContainer from '../../../components/container/PageContainer';
import BlankCard from '../../../components/shared/BlankCard';
import Header from '../../../layouts/full/horizontal/header/Header';
import Grid from '@mui/material/Grid';
import ViewDetailDialog from './ViewDetailDialog';
import PendentEvents from './PendentEvents';
import { getData } from '../../../Services/Api';
import { Box } from '@mui/system';

moment.locale('pt-BR');
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [events, setEvents] = useState([]);
  const [advertiserEvents, setAdvertiserEvents] = useState([]);
  const [solicitorEvents, setSolicitorEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [displayEvents, setDisplayEvents] = useState([]); // Controla a lista de eventos visível atualmente
  const [x, setX] = useState(0);
  const [loading  , setLoading] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const statusColor = (event) => {
    if (event.status === 'accepted') {
      return 'green';
    } else if (event.status === 'rejected') {
      return 'red';
    } else if (event.status === 'pending') {
      return 'orange';
    }
    return ''; // Retorna uma string vazia se nenhum participante for encontrado
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getData(`appointments/${currentUser.email}`);
      if (response.status === 200 || response.status === 201) {
        const convertedEvents = response.userInfo.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        // Filtrar eventos por advertiserEmail e solicitorEmail
        const advertiserFiltered = convertedEvents.filter(
          (event) => event.advertiserEmail === currentUser.email
        );
        const solicitorFiltered = convertedEvents.filter(
          (event) => event.solicitorEmail === currentUser.email
        );

        setEvents(convertedEvents);
        setAdvertiserEvents(advertiserFiltered);
        setSolicitorEvents(solicitorFiltered);
        setDisplayEvents(advertiserFiltered); // Visualização padrão
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventStyleGetter = (event) => {
    const backgroundColor = statusColor(event);
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        opacity: 0.8,
        display: 'block',
        padding: '2px 5px',
      },
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
    showMore: (total) => `+ Ver mais (${total})`,
  };

  const editEvent = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  return (
    <PageContainer title="Calendário de Contatos" description="">
      <Header />
      {
        loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '15px'}}> 
              carregando...
              <CircularProgress color="primary" />
            </div>
          </div>
        )
      }
      <Grid container spacing={3} sx={{ p: 4, height: { xs: 'auto', lg: '90vh' } }}>
        <Grid container spacing={3} xs = {12} >
          <Box sx={{ display: 'flex',alignItems : 'center', justifyContent: 'center', width: '100%', mt: 5,gap : 2 }}>
            <Button
              onClick={() => {
                setDisplayEvents(advertiserEvents);
                setX(0);
              }}
              sx ={{height: '40px'}}
              variant ={ x === 0 ? 'contained' : 'outlined'}
            >
              Agendamentos nos meus imóveis
            </Button>
            <Button
              onClick={() => {
                setDisplayEvents(solicitorEvents);
                setX(1);
              }}
              sx ={{height: '40px'}}
              variant ={ x === 1 ? 'contained' : 'outlined'}
            >
              Meus agendamentos
              </Button>
          </Box>
        </Grid>
        <PageContainer >
          <Box sx={{ display: 'flex',alignItems : 'center', justifyContent: 'start', width: '100%', mt: 5, ml : 3,gap : 2 }}>
            <Typography variant="h6">
              {x=== 0 ? 
              'Aqui você pode ver os agendamentos que os usuários estão agendando para seus imóveis' 
              : 
              'Aqui você pode ver os seus agendamentos'}
            </Typography>

          </Box>
        </PageContainer>
        <Grid item xs={12} lg={x=== 0 ? 9 : 12}>
          <BlankCard sx={{ p: 4 }}>
            <CardContent>
              <Calendar
                events={displayEvents} // Exibe a lista de eventos selecionada
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
        {
          x === 0 && (
            <Grid item xs={12} lg={3} sx={{ height: { lg: '90vh' }, overflowY: { lg: 'scroll' } }}>
              <Stack spacing={3}>
                {events.length > 0 && <PendentEvents events={events} setEvents={setEvents} />}
              </Stack>
            </Grid>
          )
        }
      </Grid>
    </PageContainer>
  );
};

export default BigCalendar;
