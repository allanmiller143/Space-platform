/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, IconButton, Divider } from '@mui/material';
import { Cancel, CheckCircleOutline } from '@mui/icons-material';
import { toast } from 'sonner';
import { postData } from '../../Api';

const AgendarDialog = ({
  setEventos,
  onClose,
  property,
  advertiser,
  openConfirmacao,
  setOpenConfirmacao,
  eventoSelecionado,
  setEventoSelecionado,
  agendamentosPreenchidos
}) => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const token = localStorage.getItem('token');
  const [openSolicitacao, setOpenSolicitacao] = useState(false);
  const [openAvisoMesmoDia, setOpenAvisoMesmoDia] = useState(false);
  const [openRestricaoHoras, setOpenRestricaoHoras] = useState(false);

  // Função para verificar restrição de tempo (3 horas)
  const verificarRestricaoTempo = (evento) => {
    const now = moment();
    const eventStart = moment(evento.start);
    return eventStart.diff(now, 'hours') < 3; // Se menos de 3 horas
  };

  const handleMarcarConsulta = async () => {
    if (verificarRestricaoTempo(eventoSelecionado)) {
      setOpenRestricaoHoras(true);
      return;
    }
  
    setOpenRestricaoHoras(false); // Reseta caso a restrição não seja aplicada
  
    // Cria o novo evento com os dados atualizados
    const novoEvento = {
      ...eventoSelecionado,
      status: 'solicitado',
      solicitorEmail: currentUserls.email,
      title: 'Visita Solicitada',
      propertyId: property.id,
      advertiserEmail : advertiser.email
    };
    console.log(novoEvento);
  
    try {
      // Faz a chamada à API para registrar o evento
      const response = await postData('client/appointment', novoEvento, token);
      console.log(response);
  
      // Atualiza os eventos no estado local
      setEventos((prevEventos) => {
        const novosEventos = prevEventos.map((evento) => {
          if (
            evento.start === eventoSelecionado.start &&
            evento.end === eventoSelecionado.end
          ) {
            return { ...evento, ...novoEvento }; // Atualiza o evento correspondente
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
  
      // Atualiza os estados após o sucesso
      setOpenConfirmacao(false);
      setOpenSolicitacao(true);
      setEventoSelecionado(null);
    } catch (error) {
      console.error('Erro ao marcar consulta:', error);
      // Trate o erro aqui, exibindo mensagens ou registrando logs
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
              <b>Confirmar Agendamento</b>
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
          {eventoSelecionado && !openRestricaoHoras && (
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
