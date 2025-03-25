/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import {Button,Dialog,DialogActions,DialogContent,IconButton,Typography,Divider,CardContent,DialogTitle,Box,Stack,Chip,Tooltip,CircularProgress,}from '@mui/material';
import { Cancel, Delete, CalendarToday, Email, Event } from '@mui/icons-material';
import moment from 'moment';
import { getData, postData } from '../../../../Services/Api';
import { toast } from 'sonner';
import ImageViewer from '../../../../components/apps/TabelaMeusIMoveis/ImoveisImageView';
import NotificationContext from '../../../../Services/Notification/NotificationContext/NotificationContext';
import socket from '../../../../Services/socket';
import { seeAppointmentNotification } from '../../../../Services/Utils/Notifications';
const ViewDetailDialog = ({ open, handleClose, selectedEvent, events, setEvents  }) => {
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [property, setProperty] = useState(null);
  const [advertiser, setAdvertiser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadAceita, setLoadAceita] = useState(false);
  const [loadNega, setLoadNega] = useState(false);
  const token = localStorage.getItem('token');
  const { notifications, setNotifications,called,setCalled } = useContext(NotificationContext);
  
  const openConfirmDeleteDialog = () => {
    setConfirmDeleteEvent(selectedEvent);
  };

  const statusLabel = (event) => {
    switch (event.status) {
      case 'accepted':
        return <Chip label="Confirmado" color="success" />;
      case 'rejected':
        return <Chip label="Recusado" color="error" />;
      case 'pending':
        return <Chip label="Pendente" color="warning" />;
      default:
        return <Chip label="Desconhecido" />;
    }
  };

    const sendNotification = (string) => {
        const data = {
          'sender': currentUser.email,
          'receiver': selectedEvent.solicitorEmail,
          'title': string,
          'type': 'appointment_response'
        };
        socket.emit('send_notification', data);
    };
  async function loadPropertyData() {
    setLoading(true);
    try {
        const response = await getData(`properties/${selectedEvent.propertyId}`);
        if (response.status === 200 || response.status === 201) {
            setProperty(response.userInfo);
            setAdvertiser(response.userInfo.seller);
        } else {
            toast.error(`Erro ao carregar dados da propriedade: ${response.message}`);
        }
    } catch (error) {
        toast.error(`Erro ao carregar dados da propriedade: ${error.message}`);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
      if (selectedEvent) {
          loadPropertyData();
      }
  }, [selectedEvent]);

  async function aceitaEvento() {
    setLoadAceita(true);
    try {
      const response = await postData(`realtor/appointment/approve/${selectedEvent.id}`,{}, token);
      if (response.status === 200 || response.status === 201) {
        toast.success('Agendamento aceito com sucesso!');
        sendNotification("agendamento aceito com sucesso");
        await seeAppointmentNotification(selectedEvent.id, notifications,setNotifications);
        const updatedEvents = events.map((event) => {
          if (event.id === selectedEvent.id) {
            return { ...event, status: 'accepted' };
          }
          return event;
        });
        setEvents(updatedEvents);
        handleClose();
      } else {
        toast.error(`Erro ao aceitar agendamento: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao aceitar agendamento: ${error.message}`);
    } finally {
      setLoadAceita(false);
    }
  }

  async function negaEvento() {
    setLoadNega(true);
    try {
      const response = await postData(`realtor/appointment/reject/${selectedEvent.id}`,{}, token);
      if (response.status === 200 || response.status === 201) {
        toast.success('Agendamento negado com sucesso!');
        sendNotification("Agendamento não foi aceito!");
        await seeAppointmentNotification(selectedEvent.id, notifications,setNotifications);


        const updatedEvents = events.map((event) => {
          if (event.id === selectedEvent.id) {
            return { ...event, status: 'rejected' };
          }
          return event;
        });

        setEvents(updatedEvents);
        handleClose();
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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {!selectedEvent ? (
        <Box p={3} textAlign="center">
          <Typography variant="body1">Nenhum evento selecionado</Typography>
        </Box>
      ) : 
      (loading)  ? 

      <Box p={3} textAlign="center" sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center', gap : '20px'}}>
        <Typography variant="body1">Carregando...</Typography>
        <CircularProgress />
      </Box> :
      (property && advertiser) ?

      (
        <Box>
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
                Detalhes do Agendamento
              </Typography>
              <Tooltip title="Fechar">
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                  <Cancel />
                </IconButton>
              </Tooltip>
            </Box>
          </DialogTitle>
          <Divider />
          <CardContent>
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between"> 
                <Typography variant="h6">{selectedEvent.title}</Typography>
                <Box>
                  {statusLabel(selectedEvent)}
                </Box>

              </Box>

              {
                (selectedEvent.solitorEmail === currentUser.email && selectedEvent.status === 'pending') &&
                <Typography variant="body2" sx =  {{display : 'flex', alignItems : 'center'}} >
                  Aguarde o anunciante aceitar o seu pedido de agendamento
                </Typography>
              }
              <Box>
                <Typography variant="body2" color="textSecondary" sx = {{display : 'flex', alignItems : 'center'}}>
                  <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                  <strong>Início:</strong>{' '}
                  {moment(selectedEvent.start).format('DD/MM/YYYY HH:mm')}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx = {{display : 'flex', alignItems : 'center'}}>
                  <Event fontSize="small" sx={{ mr: 1 }} />
                  <strong>Término:</strong>{' '}
                  {moment(selectedEvent.end).format('DD/MM/YYYY HH:mm')}
                </Typography>
              </Box>
              <Typography variant="body2" sx =  {{display : 'flex', alignItems : 'center'}} >
                <Email fontSize="small" sx={{ mr: 1 }} />
                <strong>Anunciante:</strong> {selectedEvent.advertiserEmail || 'Não especificado'}
              </Typography>
              <Typography variant="body2" sx =  {{display : 'flex', alignItems : 'center'}} >
                <Email fontSize="small" sx={{ mr: 1 }} />
                <strong>Solicitante:</strong> {selectedEvent.solicitorEmail || 'Não especificado'}
              </Typography>

              <Divider  sx={{ my: 2 }} />
              <Typography variant="h6">Informações da Propriedade</Typography>

              <Box sx = {{display : 'flex', alignItems : 'start', gap : 2}}>
                <ImageViewer src={property.pictures[0].url} alt="Imóvel" />
                <Box>
                  <Typography variant="body2">
                    <strong>Local:</strong> { `${property.address.street} - ${property.address.number}, ${property.address.neighborhood} - ${property.address.city}, ${property.address.state}` }
                  </Typography>
                  <Typography variant="body2" textAlign={'justify'}>
                    <strong>Descrição:</strong> {property.description || 'Nenhuma descrição fornecida'}
                  </Typography>
                </Box>
              </Box>

            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2} justifyContent="flex-end">


              {selectedEvent.status === 'pending' &&
                selectedEvent.advertiserEmail === currentUser.email && (
                    <Button color="error" onClick={openConfirmDeleteDialog}>
                      <Delete />
                        Negar Agendamento
                    </Button>
                )}
              {selectedEvent.status === 'pending' &&
                selectedEvent.advertiserEmail === currentUser.email && (
                  <Button variant="contained" color="primary" onClick={aceitaEvento}>
                    {
                      loadAceita ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Typography>
                          Aceitar
                        </Typography>
                      )
                    }
                    
                  </Button>
                )}
            </Stack>
          </CardContent>
        </Box>
      ): null}
      {/* Diálogo de Confirmação de Exclusão */}
      <Dialog open={!!confirmDeleteEvent} onClose={() => setConfirmDeleteEvent(null)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir este agendamento?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteEvent(null)} color="inherit">
            Cancelar
          </Button>
          <Button color="secondary" onClick={negaEvento}>
            {
              loadNega ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Typography>
                  Nega
                </Typography>
              )
            }
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ViewDetailDialog;
