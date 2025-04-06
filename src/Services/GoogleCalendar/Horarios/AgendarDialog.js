/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, IconButton, Divider, CircularProgress } from '@mui/material';
import { Cancel, CheckCircleOutline } from '@mui/icons-material';
import { toast } from 'sonner';
import { postData } from '../../Api';
import socket from '../../socket';
const AgendarDialog = ({
  onClose,
  close,
  property,
  advertiser,
  openConfirmacao,
  setOpenConfirmacao,
  eventoSelecionado,
  setEventoSelecionado,
  setEventosDisponiveis
}) => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const token = localStorage.getItem('token');
  const [openSolicitacao, setOpenSolicitacao] = useState(false);
  const [openRestricaoHoras, setOpenRestricaoHoras] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para verificar restrição de tempo (3 horas)
  const verificarRestricaoTempo = (evento) => {
    const now = moment();
    const eventStart = moment(evento.start);
    return eventStart.diff(now, 'hours') < 3; // Se menos de 3 horas
  };

  const convertToISODate = (isoString) => new Date(isoString);

  const sendNotification = (id, eventoSelecionado) => {
    console.log(id);
    const data = {
      sender: currentUserls.email,
      receiver: advertiser.email,
      title: `Novo agendamento em ${property.address.street} - ${property.address.number} na data ${moment(eventoSelecionado.start).format("DD/MM/YYYY HH:mm")} - ${moment(eventoSelecionado.end).format("HH:mm")}`,
      appointmentId: id,
      type: 'appointment'
    };
    socket.emit('send_notification', data);
  };
  


  const handleMarcarConsulta = async () => {
    if (verificarRestricaoTempo(eventoSelecionado)) {
      setOpenRestricaoHoras(true);
      return;
    }

    if(currentUserls.email === advertiser.email){
      toast.error('Nao pode agendar com você mesmo');
      return;
    }
  
    setOpenRestricaoHoras(false); // Reseta caso a restrição não seja aplicada
  
    // Cria o novo evento com os dados atualizados
    const novoEvento = {
      ...eventoSelecionado,
      status: 'pending',
      solicitorEmail: currentUserls.email,
      title: 'Visita Solicitada',
      propertyId: property.id,
      advertiserEmail : advertiser.email
    };

    setLoading(true);
  
    try {
      // Faz a chamada à API para registrar o evento
      const response = await postData('client/appointment', novoEvento, token);
      if(response.status === 200 || response.status === 201){
        // Atualiza os eventos no estado local
        sendNotification(response.data.id, eventoSelecionado);
        setEventosDisponiveis((prevEventos) => {
          const novosEventos = prevEventos.map((evento) => {
            if (
              evento.start === eventoSelecionado.start &&
              evento.end === eventoSelecionado.end
            ) {
              return {...response.data, start: convertToISODate(evento.start),
                end: convertToISODate(evento.end),} ; // Atualiza o evento correspondente
            }
            return evento;
          });
    
          // Adiciona o novo evento caso não exista
          const eventoExistente = novosEventos.some(
            (evento) =>
              moment(evento.start).isSame(eventoSelecionado.start) &&
              moment(evento.end).isSame(eventoSelecionado.end)
          );
    
          if (!eventoExistente) {
            novosEventos.push(novoEvento);
          }
    
          return novosEventos;
        });

     }else{
      toast.error(`Erro ao marcar consulta:\n ${response.message}`);
     }
     console.log(response);
     if(response.status === 200 || response.status === 201){
      setOpenSolicitacao(true);
     }
  
      // Atualiza os estados após o sucesso
      setOpenConfirmacao(false);
      setEventoSelecionado(null);
    } catch (error) {
      console.error('Erro ao marcar consulta:', error);
      console.log(error);
      // Trate o erro aqui, exibindo mensagens ou registrando logs
    }finally{
      setLoading(false);
    }
  };
  

  const handleCancelarConfirmacao = () => {
    setOpenRestricaoHoras(false); // Reseta o estado
    setOpenConfirmacao(false);
    setEventoSelecionado(null);
    onClose();
  };

  const handleFecharSolicitacao = () => {
    setOpenSolicitacao(false);
    onClose();
  };

  // Resetar restrição ao selecionar um novo evento
  useEffect(() => {
    if (eventoSelecionado) {
      setOpenRestricaoHoras(false);
    }
  }, [eventoSelecionado]);

  return (
    <>
      {/* Dialog de Confirmação */}
      <Dialog open={openConfirmacao} onClose={handleCancelarConfirmacao} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
              <b>Ralizar agendamento</b> 
            </Typography>
            <IconButton
              edge="end"
              onClick={handleCancelarConfirmacao}
              aria-label="close"
              sx={{ color: '#888' }}
            >
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />

        <DialogContent sx={{ padding: 3 }}>
          {eventoSelecionado && !openRestricaoHoras && !loading && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                📍 Localização
              </Typography>
              <Typography variant="body1" color="text.secondary" ml={3} sx={{ marginBottom: 2 }}>
                {property.address.street} - {property.address.number}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                ⏰ Horário do Agendamento
              </Typography>
              <Typography variant="h6" ml={3} sx={{ fontWeight: 'bold', marginTop: '8px', color: '#0077FF' }}>
                {`${moment(eventoSelecionado.start).format('DD/MM/YYYY HH:mm')} - ${moment(eventoSelecionado.end).format('HH:mm')}`}
              </Typography>
            </Box>
          )}

          {
            (eventoSelecionado && loading) && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh',width: '100%' }}>
                <CircularProgress color="secondary" />
                <Typography>Carregando...</Typography>
              </Box>
            )
          }
          {openRestricaoHoras && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Não é possível marcar um agendamento com menos de 3 horas de antecedência
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'end', padding: 2 }}>
          <Button onClick={handleCancelarConfirmacao} variant="outlined">
            Cancelar
          </Button>
          {!openRestricaoHoras && (
            <Button onClick={handleMarcarConsulta} variant="contained">
              Confirmar
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog de Solicitação Enviada */}
      <Dialog open={openSolicitacao} onClose={handleFecharSolicitacao}>
        <DialogTitle sx={{ backgroundColor: '#E3F2FD', textAlign: 'center', padding: '16px' }}>
          <CheckCircleOutline sx={{ fontSize: 40, color: '#4CAF50' }} />
          <Typography variant="h6" sx={{ marginTop: '8px' }}>
            Solicitação Enviada
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', padding: 6 }}>
          <Typography variant="body1" color="text.secondary" mt={4}>
            Sua solicitação foi enviada ao anunciante. Você será notificado quando for confirmada.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: 2 }}>
          <Button onClick={handleFecharSolicitacao} variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AgendarDialog;
