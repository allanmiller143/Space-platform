/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import AgendarDialog from './AgendarDialog';
import { toast } from 'sonner';
import { getData } from '../../Api';
import { set } from 'lodash';

const CalendarioDisponibilidade = ({ open, onClose, property, advertiser }) => {
  const localizer = momentLocalizer(moment);
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const [loading, setLoading] = useState(false);

  // Horários baseados nos dias da semana
  const [disponibilidade, setDisponibilidade] = useState(
    {
      segunda: [],
      terça: [],
      quarta: [],
      quinta: [],
      sexta: [],
      sábado: [],
      domingo: [],
    }
  );

  const [agendamentosPreenchidos, setAgendamentosPreenchidos] = useState([]);

  useEffect(() => {   
    loadAgendamentosPreenchidos();
    loadPreInfo();
  }, []);


  const formatAvailability = (userInfo) => {
    // Criação de um objeto que representa os dias e suas disponibilidades

  
    // Iterando sobre os dados de disponibilidade recebidos na resposta
    userInfo.forEach(item => {
      // Adicionando a disponibilidade ao dia correto
      if (disponibilidade[item.dia]) {
        disponibilidade[item.dia].push({
          inicio: item.inicio,
          fim: item.fim
        });
      }
    });
  
    return disponibilidade;
  };
  
  // Função para carregar e formatar as informações
  const loadPreInfo = async () => {
    setLoading(true);
    try {
      const response = await getData(`realtor/availability/${currentUserls.email}`);
      if (response.status === 200 || response.status === 201) {
        console.log('deu bom!!!');
        console.log(response.userInfo);
        
        // Formata a resposta para o formato desejado
        const disponibilidade = formatAvailability(response.userInfo);
        console.log(disponibilidade); // Aqui você terá os dados formatados
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


  const loadAgendamentosPreenchidos = async () =>{
    console.log(advertiser.email);
    const response = await getData(`appointments/${advertiser.email}`);
    setAgendamentosPreenchidos(response.userInfo);
    console.log(response);
  }


  // Gerar as datas de disponibilidade para o mês de dezembro de 2024
  const gerarDatas = (diaDaSemana, inicioPeriodo, fimPeriodo) => {
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
    let dataAtual = moment(inicioPeriodo);

    while (dataAtual.isBefore(fimPeriodo)) {
      if (dataAtual.day() === diasDaSemana[diaDaSemana]) {
        datas.push(dataAtual.clone());
      }
      dataAtual.add(1, 'day');
    }

    return datas;
  };

  const inicioPeriodo = moment('2024-12-01');
  const fimPeriodo = moment('2024-12-31');

 // Gerar eventos disponíveis com base nos horários e já reservar os agendados
    const eventosDisponiveis = Object.keys(disponibilidade).flatMap((dia) => {
        const datas = gerarDatas(dia, inicioPeriodo, fimPeriodo);
    
        return datas.flatMap((data) => {
        return disponibilidade[dia].map((horario) => {
            const [horaInicio, minutoInicio] = horario.inicio.split(':').map(Number);
            const [horaFim, minutoFim] = horario.fim.split(':').map(Number);
    
            const inicio = data.clone().hour(horaInicio).minute(minutoInicio).toDate();
            const fim = data.clone().hour(horaFim).minute(minutoFim).toDate();
    
            // Verificar se o horário já foi reservado
            const eventoReservado = agendamentosPreenchidos.some((evento) => {
            return (
                moment(evento.start).isSame(inicio) && moment(evento.end).isSame(fim)
            );
            });
    
            // Exibir horário no lugar do dia da semana
            const horarioFormatado = `${moment(inicio).format('HH:mm')} - ${moment(fim).format('HH:mm')}`;
    
            // Se o horário já foi reservado, retorna como 'reservado', senão 'disponível'
            return {
            title: horarioFormatado,
            start: inicio,
            end: fim,
            status: eventoReservado ? 'reservado' : 'disponivel',
            };
        });
        });
    }).filter((evento) => moment(evento.start).isSameOrAfter(moment(), 'day'));
  

  // Combina eventos já agendados e eventos disponíveis
  const [eventos, setEventos] = useState([...agendamentosPreenchidos]);

  useEffect(() => {
    // Adicionar eventos disponíveis sem duplicar os eventos já agendados
    const eventosFiltrados = eventosDisponiveis.filter((evento) => {
      return !eventos.some(
        (eventoExistente) =>
          moment(eventoExistente.start).isSame(evento.start) &&
          moment(eventoExistente.end).isSame(evento.end)
      );
    });

    setEventos((prevEventos) => [...prevEventos, ...eventosFiltrados]);
  }, [eventosDisponiveis]);

  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [openConfirmacao, setOpenConfirmacao] = useState(false);

  const handleClickEvent = (event) => {
    console.log(agendamentosPreenchidos);
    if (event.status === 'disponivel') {
      setEventoSelecionado(event);
      setOpenConfirmacao(true);
    }else if(event.status === 'reservado' && event.solicitorEmail === currentUserls.email){
        setEventoSelecionado(event);
        toast.success('Seu agendamento foi confirmado!');
    }else if(event.status === 'reservado' && event.solicitorEmail !== currentUserls.email){
        setEventoSelecionado(event);
        toast.warning('Horario reservado por outro usuário!');
    }else if(event.status === 'pending' && event.solicitorEmail === currentUserls.email){
      setEventoSelecionado(event);
      toast.success('solicitado por você');
    }
  };

  const handleCancelarConfirmacao = () => {
    setOpenConfirmacao(false);
    setEventoSelecionado(null);
  };

  return (
    <>
      {/* Dialog Principal */}
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Disponibilidade de Horários</DialogTitle>
        <DialogContent>
            <div style={{ height: 600 }}>
            <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                defaultView="month"
                views={["month", "week", "day"]}
                onSelectEvent={handleClickEvent}
                eventPropGetter={(event) => ({
                style: {
                    backgroundColor:
                    (event.status === 'reservado' && event.solicitorEmail !== currentUserls.email) ? '#d9534f' :
                    (event.status === 'reservado' && event.solicitorEmail === currentUserls.email) ? 'darkblue' :
                    (event.status === 'pending' && event.solicitorEmail !== currentUserls.email) ? '#d9534f' :
                    (event.status === 'pending' && event.solicitorEmail === currentUserls.email) ? 'purple' :
                    event.status === 'confirmado' ? '#5bc0de' : '#5cb85c',
                    color: 'white',
                },
                })}
                messages={{
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
                today: 'Hoje',
                previous: 'Anterior',
                next: 'Próximo',
                }}
            />
            {/* Legenda */}
            <div style={{ marginTop: 16 }}>
            <Typography variant="subtitle1" style={{ marginBottom: 8 }}>
                <b>Legenda:</b>
            </Typography>
            <div
                style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                alignItems: 'center',
                margin : '0 auto'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: '#d9534f', borderRadius: '50%', width: 12, height: 12 }}></div>
                    <Typography>Indisponível</Typography>
                </div>                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: '#5cb85c', borderRadius: '50%', width: 12, height: 12 }}></div>
                    <Typography>Disponível para visitas</Typography>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: 'darkblue', borderRadius: '50%', width: 12, height: 12 }}></div>
                    <Typography>Seu horário confirmado</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: 'purple', borderRadius: '50%', width: 12, height: 12 }}></div>
                    <Typography>Sua solicitação está em análise</Typography>
                </div>
            </div>
            </div>

            </div>
        </DialogContent>
        </Dialog>


      <AgendarDialog agendamentosPreenchidos={agendamentosPreenchidos} openConfirmacao={openConfirmacao} setOpenConfirmacao={setOpenConfirmacao} onClose={handleCancelarConfirmacao} eventos={eventos} eventoSelecionado={eventoSelecionado} setEventoSelecionado={setEventoSelecionado}  property={property} advertiser={advertiser} setEventos={setEventos}/>

    </>
  );
};

export default CalendarioDisponibilidade;
