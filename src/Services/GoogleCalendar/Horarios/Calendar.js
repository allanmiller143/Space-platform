/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import AgendarDialog from './AgendarDialog';
import { getData } from '../../Api';
import { toast } from 'sonner';
import EditEventDialog from './EditEventDialog';
import { Box } from '@mui/system';
import { Typography } from 'antd';
import { Cancel } from '@mui/icons-material';


moment.locale('pt-br');
moment.updateLocale('pt-br', {
  months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_')
});
const localizer = momentLocalizer(moment);

const CalendarioDisponibilidade = ({ open, onClose, property, advertiser }) => {
  const localizer = momentLocalizer(moment);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [loading, setLoading] = useState(false);
  const [agendamentosPreenchidos, setAgendamentosPreenchidos] = useState([]);
  const [disponibilidade, setDisponibilidade] = useState({
    segunda: [],
    terça: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sábado: [],
    domingo: [],
  });
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [openConfirmacao, setOpenConfirmacao] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [eventosDisponiveis, setEventosDisponiveis] = useState([]);
  const inicioPeriodo = moment().startOf('day');
  const fimPeriodo = moment().add(1, 'month').endOf('day');

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

  // Converte strings de data ISO 8601 em objetos Date
  const convertToISODate = (isoString) => new Date(isoString);

  // Carregar disponibilidade
  const loadDisponibilidade = async () => {
    try {
      const response = await getData(`realtor/availability/${advertiser.email}`);
      if (response.status === 200 || response.status === 201) {
        const formattedDisponibilidade = response.userInfo.reduce((acc, item) => {
          if (!acc[item.dia]) acc[item.dia] = [];
          acc[item.dia].push({ inicio: item.inicio, fim: item.fim });
          return acc;
        }, { ...disponibilidade });
        setDisponibilidade((prev) => ({ ...prev, ...formattedDisponibilidade }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Carregar agendamentos preenchidos
  const loadAgendamentos = async () => {
    try {
      const response = await getData(`appointments/${advertiser.email}`);
      if (response.status === 200 || response.status === 201) {
        const agendamentosFormatados = response.userInfo.map((evento) => ({
          ...evento,
          start: convertToISODate(evento.start),
          end: convertToISODate(evento.end),
        }));
        setAgendamentosPreenchidos(agendamentosFormatados);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open && !dadosCarregados) {
      setLoading(true);
      Promise.all([loadDisponibilidade(), loadAgendamentos()]).then(() => {
        setDadosCarregados(true);
        setLoading(false);
      });
    }
  }, [open, dadosCarregados]);

  const gerarDatas = (diaDaSemana) => {
    const diasDaSemana = {
      domingo: 0,
      segunda: 1,
      terça: 2,
      quarta: 3,
      quinta: 4,
      sexta: 5,
      sábado: 6,
    };
    const datas = [];
    let dataAtual = inicioPeriodo.clone();
    while (dataAtual.isBefore(fimPeriodo)) {
      if (dataAtual.day() === diasDaSemana[diaDaSemana]) {
        datas.push(dataAtual.clone());
      }
      dataAtual.add(1, 'day');
    }
    return datas;
  };

  const atualizarEventosDisponiveis = () => {
    const novosEventos = Object.keys(disponibilidade).flatMap((dia) => {
      const datas = gerarDatas(dia);
      return datas.flatMap((data) => {
        return disponibilidade[dia].map((horario) => {
          const [horaInicio, minutoInicio] = horario.inicio.split(':').map(Number);
          const [horaFim, minutoFim] = horario.fim.split(':').map(Number);

          const inicio = data.clone().hour(horaInicio).minute(minutoInicio).toDate();
          const fim = data.clone().hour(horaFim).minute(minutoFim).toDate();

          const agendamento = agendamentosPreenchidos.find(
            (evento) =>
              moment(evento.start).isSame(inicio) &&
              moment(evento.end).isSame(fim) &&
              evento.solicitorEmail === currentUser.email &&
              evento.propertyId === property.id
          );

          if (agendamento) {
            return { ...agendamento };
          }

          return {
            title: `${moment(inicio).format('HH:mm')} - ${moment(fim).format('HH:mm')}`,
            start: inicio,
            end: fim,
            status: 'disponivel',
            solicitantes: [],
            propertyId: property.id,
          };
        });
      });
    });

    setEventosDisponiveis(novosEventos);
  };

  useEffect(() => {
    atualizarEventosDisponiveis();
  }, [disponibilidade, agendamentosPreenchidos]);

  const handleClickEvent = (event) => {
    setEventoSelecionado(event);

    if (event.status === 'disponivel') {
      setOpenConfirmacao(true);
    } else if (event.status === 'pending') {
      setOpenEdit(true);
    } else if (event.status === 'accepted') {
      toast.error('Agendamento aceito');
    }

    console.log(eventosDisponiveis)
  };

  return (
    <>


          <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h4" component="span" sx={{ flexGrow: 1 }}>
                  <b>Disponibilidade de Horários</b>
                </Typography>
                <IconButton onClick={onClose} aria-label="close" sx={{ color: '#888' }}>
                  <Cancel />
                </IconButton>
              </Box>
            </DialogTitle>

            {
              (loading) ? 
              <DialogContent sx={{ textAlign: 'center', my: 5 }}>
                <DialogContentText>
                    <CircularProgress color="inherit" />               
                </DialogContentText>
              </DialogContent>
              :
              (!loading && eventosDisponiveis.length === 0 && dadosCarregados) ?
                <DialogContent sx={{ textAlign: 'center', my: 5 }}>
                  <DialogContentText>
                    O anunciante ainda não cadastrou horários para agendamentos de visitas.
                  </DialogContentText>
                </DialogContent>
              : 
              <DialogContent>
                <div style={{ height: 600 }}>
                  <Calendar
                    localizer={localizer}
                    events={eventosDisponiveis}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    defaultView="month"
                    messages={messages}
                    views={['month', 'week', 'day']}
                    onSelectEvent={handleClickEvent}
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: event.status === 'pending' ? 'orange' : 'green',
                        color: 'white',
                      },
                    })}
                  />
                </div>
              </DialogContent>
            }
          </Dialog>
          
      <AgendarDialog
        property={property}
        advertiser={advertiser}
        openConfirmacao={openConfirmacao}
        setOpenConfirmacao={setOpenConfirmacao}
        open={openConfirmacao}
        onClose={() => setOpenConfirmacao(false)}
        eventoSelecionado={eventoSelecionado}
        setEventoSelecionado={setEventoSelecionado}
        setEventosDisponiveis={setEventosDisponiveis}
      />
      <EditEventDialog
        property={property}
        advertiser={advertiser}
        openConfirmacao={openEdit}
        setOpenConfirmacao={setOpenEdit}
        eventoSelecionado={eventoSelecionado}
        setEventoSelecionado={setEventoSelecionado}
        setEventosDisponiveis={setEventosDisponiveis}
      />
    </>
  );
};

export default CalendarioDisponibilidade;
