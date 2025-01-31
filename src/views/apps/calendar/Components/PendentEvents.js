/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CardContent, Button, Typography, Avatar } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { CalendarToday, Event } from '@mui/icons-material';
import { toast } from 'sonner';
import { getData, postData } from '../../../../Services/Api';
import BlankCard from '../../../../components/shared/BlankCard';

const PendentEvents = ({ events,setEvents,advertiserEvents,setAdvertiserEvents }) => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  const cuString = localStorage.getItem('currentUser'); 
  const currentUserls = JSON.parse(cuString); 
  const [loadAceita, setLoadAceita] = useState(false);
  const [loadNega, setLoadNega] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const now = new Date();

    const filteredEvents = events.filter(
      (event) => event.status === 'pending' && event.advertiserEmail === currentUserls.email && moment(event.start).isAfter(now)  
    );
    setPendingEvents(filteredEvents);
  }, [events]);

  useEffect(() => {
    const loadAllPropertyData = async () => {
      try {
        const propertyData = {};
        for (const event of pendingEvents) {
          const response = await getData(`properties/${event.propertyId}`);
          if (response.status === 200 || response.status === 201) {
            propertyData[event.propertyId] = response.userInfo;
          } else {
            toast.error(`Erro ao carregar propriedade ${event.propertyId}: ${response.message}`);
          }
        }
        setPropertiesData(propertyData);
      } catch (error) {
        toast.error(`Erro ao carregar propriedades: ${error.message}`);
      }
    };

    if (pendingEvents.length > 0) {
      loadAllPropertyData();
    }
  }, [pendingEvents]);


  async function aceitaEvento({ selectedEvent }) {
    setLoadAceita(true);
    try {
      const response = await postData(`realtor/appointment/approve/${selectedEvent.id}`,{}, token);
      if (response.status === 200 || response.status === 201) {
        toast.success('Agendamento aceito com sucesso!');

        const updatedEvents = events.map((event) => {
          if (event.id === selectedEvent.id) {
            return { ...event, status: 'accepted' };
          }
          return event;
        });

        setEvents(updatedEvents);
        console.log(response);
        
      } else {
        toast.error(`Erro ao aceitar agendamento: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao aceitar agendamento: ${error.message}`);
    } finally {
      setLoadAceita(false);
    }
  }

  async function negaEvento({ selectedEvent }) {
      setLoadNega(true);
      try {
        const response = await postData(`realtor/appointment/reject/${selectedEvent.id}`,{}, token);
        if (response.status === 200 || response.status === 201) {
          toast.success('Agendamento negado com sucesso!');
  
          const updatedEvents = events.map((event) => {
            if (event.id === selectedEvent.id) {
              return { ...event, status: 'rejected' };
            }
            return event;
          });
  
          setEvents(updatedEvents);
          console.log(response);
        } else {
          toast.error(`Erro ao negar agendamento: ${response.message}`);
        }
      } catch (error) {
        toast.error(`Erro ao negar agendamento: ${error.message}`);
      } finally {
        setLoadNega(false);
      }
  }


  return (
    <Box sx={{ mt: 3, pr : 2, display: 'flex', flexDirection: 'column', gap: 2, }}>
      <Typography variant="h6" onClick={() => {console.log(propertiesData)}}>Solicitações de Agendamento</Typography>
      {
        loadAceita || loadNega &&
        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <Event fontSize="small" sx={{ mr: 1 }} />
          carregando...
        </Typography>
      }

      {pendingEvents && pendingEvents.length > 0 ? (
        pendingEvents.map((event, index) => {
          const property = propertiesData[event.propertyId] || {};
          return (
            <BlankCard key={index}>
              <CardContent>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={property.pictures?.[0]?.url || ''}
                  alt={property.name || 'Propriedade'}
                  sx={{ width: 60, height: 60 }}
                />

                  <Box>
                    <Typography variant="body2">
                      <strong>Local:</strong> { property.address?.street && `${property.address?.street} - ${property.address?.number}, ${property.address?.neighborhood} - ${property.address?.city}, ${property.address?.state}`  || ''}
                    </Typography>

                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                    <strong>Início:</strong> {moment(event.start).format('DD/MM/YYYY HH:mm')}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Event fontSize="small" sx={{ mr: 1 }} />
                    <strong>Término:</strong> {moment(event.end).format('DD/MM/YYYY HH:mm')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button variant="contained" color="primary" size="small" onClick={() => aceitaEvento({ selectedEvent: event })}>
                    Aceitar
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => negaEvento({ selectedEvent: event })}>
                    Rejeitar
                  </Button>
                </Box>
              </CardContent>
            </BlankCard>
          );
        })
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
