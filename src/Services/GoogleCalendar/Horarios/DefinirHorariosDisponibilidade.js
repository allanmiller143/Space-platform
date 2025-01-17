import { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField, Grid, Chip, MenuItem, Card, CircularProgress, Divider } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { toast } from 'sonner'; // Para exibir mensagens de erro ou sucesso
import { getData, postData } from '../../Api'
import { Container } from '@mui/system';
import houseImage from 'src/assets/images/ilustracoes/house.png';

function DefinirHorariosDisponibilidade() {
  const [disponibilidade, setDisponibilidade] = useState({
    segunda: [{inicio: '2024-12-17T05:00:00.000Z', fim: '2024-12-17T06:00:00.000Z'}],
    terça: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sábado: [],
    domingo: [],
  });

  const token = localStorage.getItem('token');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));


  // carregar os dados que ja estão cadastrados

  useEffect(() => {
    loadPreInfo();
  },[])

  const loadPreInfo = async () =>{
    setLoading(true);
    try{
      const response = await getData(`realtor/availability/${currentUser.email}`);
      if(response.status === 200 || response.status === 201){
        console.log('deu bom!!!');
        setDisponibilidade(transformData(response.userInfo));
      }else{
        console.log(response);
      }
    }catch(e){
      console.log(e);
    }
    finally{
      setLoading(false);
    }
  }

  const transformData = (data) => {
    const diasDaSemana = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];
    
    // Inicializa o objeto final com os dias da semana
    const resultado = diasDaSemana.reduce((acc, dia) => {
        acc[dia] = [];
        return acc;
    }, {});

    // Mapeia os dados recebidos
    data.forEach(item => {
        const dia = item.dia;
        const inicio = new Date(`2024-12-17T${item.inicio}:00.000Z`).toISOString();
        const fim = new Date(`2024-12-17T${item.fim}:00.000Z`).toISOString();

        // Adiciona o intervalo no dia correspondente
        if (resultado[dia]) {
            resultado[dia].push({ inicio, fim });
        }
    });

    return resultado;
  };

  const criarDateTime = (hora) => {
    const [hours, minutes] = hora.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  const gerarIntervalos = (inicio, fim) => {
    const intervalos = [];
    let horaAtual = new Date(inicio);

    while (horaAtual < fim) {
      const proximaHora = new Date(horaAtual);
      proximaHora.setHours(horaAtual.getHours() + 1);

      if (proximaHora > fim) {
        intervalos.push({ inicio: horaAtual.toISOString(), fim: fim.toISOString() });
      } else {
        intervalos.push({ inicio: horaAtual.toISOString(), fim: proximaHora.toISOString() });
      }

      horaAtual = proximaHora;
    }

    return intervalos;
  };

  const verificaConflito = (novoInicio, novoFim, horariosExistentes) => {
    return horariosExistentes.some(({ inicio, fim }) => {
      const existenteInicio = new Date(inicio);
      const existenteFim = new Date(fim);
      return (
        (novoInicio >= existenteInicio && novoInicio < existenteFim) ||
        (novoFim > existenteInicio && novoFim <= existenteFim) ||
        (novoInicio <= existenteInicio && novoFim >= existenteFim)
      );
    });
  };

  const handleAdicionarHorario = () => {
    if (!horaInicio || !horaFim || diasSelecionados.length === 0) {
      toast.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const inicioDateTime = criarDateTime(horaInicio);
    const fimDateTime = criarDateTime(horaFim);

    if (inicioDateTime >= fimDateTime) {
      toast.error('O horário de início deve ser antes do horário de fim.');
      return;
    }

    const intervalos = gerarIntervalos(inicioDateTime, fimDateTime);

    const novosHorarios = diasSelecionados.reduce((acc, dia) => {
      const horariosExistentes = disponibilidade[dia] || [];
      const conflito = verificaConflito(inicioDateTime, fimDateTime, horariosExistentes);

      if (conflito) {
        toast.error(`Conflito detectado nos horários para ${dia}.`);
        return acc;
      }

      acc[dia] = [...horariosExistentes, ...intervalos];
      return acc;
    }, {});

    setDisponibilidade({
      ...disponibilidade,
      ...novosHorarios,
    });

    setHoraInicio('');
    setHoraFim('');
    setDiasSelecionados([]);
  };

  const formatarHorario = (dateTime) => {
    const date = new Date(dateTime);
    return `${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`;
  };

  const handleRemoverHorario = (dia, horario) => {
    const novosHorarios = disponibilidade[dia].filter(
      (h) => h.inicio !== horario.inicio || h.fim !== horario.fim
    );
    setDisponibilidade({
      ...disponibilidade,
      [dia]: novosHorarios,
    });
  };

  const handleDiaSelecionado = (dia) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  const gerarOpcoesHora = () => {
    const opcoesHora = [];
    for (let hora = 0; hora < 24; hora++) {
      ['00', '30'].forEach((minuto) => {
        const valorHora = String(hora).padStart(2, '0');
        opcoesHora.push(`${valorHora}:${minuto}`);
      });
    }
    return opcoesHora;
  };

  const salvarHorarios = async () => {
    console.log(disponibilidade);  
    const horariosSalvos = Object.entries(disponibilidade).flatMap(([dia, horarios]) =>
      horarios.map(({ inicio, fim }) => ({
        dia,
        inicio: formatarHorario(inicio),
        fim: formatarHorario(fim),
      }))
    );
  
    // Agora você pode enviar `horariosSalvos` para uma API ou salvá-los localmente
    console.log('Disponibilidade salva:', horariosSalvos);

    setLoading(true);
    try{
      const response = await postData('realtor/availability', {disponibilidade: horariosSalvos},token);
      if(response.status === 200 || response.status === 201){
        console.log('deu bom');
        toast.success('Horários salvos com sucesso!');
      }else{
        console.log(response);
        toast.error(`Erro ao salvar horários: ${response.message}`);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  };
  

  return (
    <Box sx={{ padding: { xs: 1, sm: 4 }, maxWidth: 1200, margin: 'auto' }}>
      
      <Container maxWidth="lg" sx={{ bgcolor: 'primary.light', py: 2, mb: 4,  borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" component="h1" gutterBottom>
                Defina seus Horários de Disponibilidade
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph fontWeight={400}>
                Aqui você pode gerenciar os horarios em que estará disponivel para aceitar agendamentos para visitas nos seus imóveis.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} container justifyContent="center" alignItems="center">
              <img src={houseImage} alt="Ilustração de casa" width={180} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" color="text.secondary" paragraph fontWeight={400}>
                Selecione os dias e horários em que você está disponível para receber visitas.
              </Typography>
            </Grid>

          </Grid>
        </Container>
      <Box>

        {
          loading &&
          <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Card>
        }
        {
          !loading &&
          <Container maxWidth="lg" sx={{ bgcolor: 'primary.light', py: 4, mb: 4,  borderRadius: 2 }}>
            <Card>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" mt={2} mb={1}> 
                  Selecione os dias da semana:
                </Typography>
                <Grid container spacing={1} mb ={1}>
                  {['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'].map((dia) => (
                    <Grid item key={dia}>
                      <Button
                        variant={diasSelecionados.includes(dia) ? 'contained' : 'outlined'}
                        onClick={() => handleDiaSelecionado(dia)}
                      >
                        {dia.charAt(0).toUpperCase() + dia.slice(1)}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  label="Hora Início"
                  fullWidth
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                >
                  {gerarOpcoesHora().map((hora) => (
                    <MenuItem key={hora} value={hora}>
                      {hora}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  label="Hora Fim"
                  fullWidth
                  value={horaFim}
                  onChange={(e) => setHoraFim(e.target.value)}
                >
                  {gerarOpcoesHora().map((hora) => (
                    <MenuItem key={hora} value={hora}>
                      {hora}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleAdicionarHorario}
                    sx={{ width: '100%' }}
                  >
                    Adicionar Horário
                  </Button>
                </Box>
              </Grid>
            </Grid>
            </Card>
            <Card sx={{ mt: 4 }}>
              <Box sx={{  p: 1 }}>
                <Typography variant="h6" color="textSecondary">
                  Horários Selecionados:
                </Typography>
              </Box>
              <Box sx={{ mt: 2, p: 1 }}>
                {Object.keys(disponibilidade).map((dia) => (
                  <Box key={dia} sx={{ mb: 2 }}>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      {dia.charAt(0).toUpperCase() + dia.slice(1)}:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {disponibilidade[dia].map((horario, index) => (
                        <Chip
                          key={index}
                          label={`${formatarHorario(horario.inicio)} - ${formatarHorario(horario.fim)}`}
                          onDelete={() => handleRemoverHorario(dia, horario)}
                          color="primary"
                          deleteIcon={<Remove />}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                    <Divider sx={{ mt: 2 }}/>

                  </Box>
                ))}
              </Box>
            </Card>
          </Container>
        }

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={salvarHorarios}>
            Salvar Horários
          </Button>
        </Box>
      </Box>
      
      
    </Box>
  );
}

export default DefinirHorariosDisponibilidade;
