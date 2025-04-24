import { useEffect, useState } from 'react';
import { CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importe o locale de português
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import PageContainer from '../../../components/container/PageContainer';
import BlankCard from '../../../components/shared/BlankCard';
import Header from '../../../layouts/full/horizontal/header/Header';
import Grid from '@mui/material/Grid';
import ViewDetailDialog from './Components/ViewDetailDialog';
import { getData } from '../../../Services/Api';
import { Box } from '@mui/system';
import PendentEvents from './Components/PendentEvents';

moment.locale('pt-br');
moment.updateLocale('pt-br', {
  months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_')
});
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
    const eventEndDate = new Date(event.end); // Converte a string para um objeto Date
    const now = new Date();

    if (eventEndDate < now ) {
      return 'gray';
    }
    if (event.status === 'accepted') {
      return 'green';
    } else if (event.status === 'rejected') {
      return 'red';
    } else if (event.status === 'pending') {
      return 'orange';
    }
    return ''; // Retorna uma string vazia se nenhum status for correspondente
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getData(`appointments/${currentUser.email}`);
      if (response.status === 200 || response.status === 201) {
        const convertedEvents = response.userInfo.map((event) => {
          const startDate = new Date(event.start);
          const endDate = new Date(event.end);
        
          return {
            ...event,
            start: startDate,
            end: endDate,
            title: `${String(startDate.getHours()).padStart(2, '0')}h - ${String(endDate.getHours()).padStart(2, '0')}h`,
          };
        });
        

        console.log(convertedEvents);
  
        const solicitorFiltered = convertedEvents.filter(
          (event) => event.solicitorEmail === currentUser.email
        );
  
        const advertiserFiltered = convertedEvents.filter(
          (event) => event.advertiserEmail === currentUser.email
        );
  
        setEvents(convertedEvents);
        setSolicitorEvents(solicitorFiltered);
        setAdvertiserEvents(advertiserFiltered);
  
        // Aqui garantimos que o displayEvents é atualizado corretamente
        if (currentUser.type === "realtor" || currentUser.type === "realstate") {
          setDisplayEvents(advertiserFiltered);
          setX(0);
        } else {
          setDisplayEvents(solicitorFiltered);
          setX(1);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
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
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    work_week: 'Semana de trabalho',
    allDay: 'Dia inteiro',
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
                culture="pt" // Esta propriedade é CRUCIAL
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
                events={displayEvents}
                setEvents={setDisplayEvents}
              />
            </CardContent>
          </BlankCard>
        </Grid>
        {
          x === 0 && (
            <Grid item xs={12} lg={3} sx={{ height: { lg: '90vh' }, overflowY: { lg: 'scroll' } }}>
              <Stack spacing={3}>
                {events.length > 0 && <PendentEvents events={displayEvents} setEvents={setDisplayEvents}  />}
              </Stack>
            </Grid>
          )
        }
      </Grid>
    </PageContainer>
  );
};

export default BigCalendar;
