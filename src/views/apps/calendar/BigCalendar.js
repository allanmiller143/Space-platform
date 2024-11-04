import React, { useState } from 'react';
import {
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  TextField,
  Typography,
  Stack,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import Events from './EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './Calendar.css';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { IconCheck } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';
import Header from '../../../layouts/full/horizontal/header/Header';
import { Box } from '@mui/material';
import { IconPlus, IconTrash, IconSettings } from '@tabler/icons';
import Grid from '@mui/material/Grid';

moment.locale('pt-BR');
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [calevents, setCalEvents] = useState(Events);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [color, setColor] = useState('default');
  const [update, setUpdate] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const ColorVariation = [
    {
      id: 1,
      eColor: '#1a97f5',
      value: 'default',
    },
    {
      id: 2,
      eColor: '#39b69a',
      value: 'green',
    },
    {
      id: 3,
      eColor: '#fc4b6c',
      value: 'red',
    },
    {
      id: 4,
      eColor: '#615dff',
      value: 'azure',
    },
    {
      id: 5,
      eColor: '#fdd43f',
      value: 'warning',
    },
  ];
  const addNewEventAlert = (slotInfo) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };
  const editEvent = (event) => {
    setOpen(true);
    const newEditEvent = calevents.find((elem) => elem.title === event.title);
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setStart(newEditEvent.start);
    setEnd(newEditEvent.end);
    setUpdate(event);
  };
  const updateEvent = (e) => {
    e.preventDefault();
    setCalEvents(
      calevents.map((elem) => {
        if (elem.title === update.title) {
          return { ...elem, title, start, end, color };
        }
        return elem;
      }),
    );
    setOpen(false);
    setTitle('');
    setColor('');
    setStart('');
    setEnd('');
    setUpdate(null);
  };
  const inputChangeHandler = (e) => setTitle(e.target.value);
  const selectinputChangeHandler = (id) => setColor(id);

  const submitHandler = (e) => {
    e.preventDefault();
    const newEvents = calevents;
    newEvents.push({
      title,
      start,
      end,
      color,
    });
    setOpen(false);
    e.target.reset();
    setCalEvents(newEvents);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
  };
  const deleteHandler = (event) => {
    const updatecalEvents = calevents.filter((ind) => ind.title !== event.title);
    setCalEvents(updatecalEvents);
  };
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }
    return { className: `event-default` };
  };

  const handleStartChange = (newValue) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue) => {
    setEnd(newValue);
  };

  return (
    <PageContainer title="Calendário de Contatos" description="">
      <Header />

      <Grid container spacing={3} sx={{ p: 4, height: { xs: 'auto', lg: '90vh' } }}>
       
        <Grid item xs={12} lg={9}>
          <BlankCard key={slot} sx={{ p: 4 }}>
            {/* ------------------------------------------- */}
            {/* Calendário */}
            {/* ------------------------------------------- */}
            <CardContent>
              <Calendar
                selectable
                events={calevents}
                defaultView="month"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                localizer={localizer}
                style={{ height: 'calc(100vh - 350px' }}
                onSelectEvent={(event) => editEvent(event)}
                onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
                eventPropGetter={(event) => eventColors(event)}
              />
              {/* ------------------------------------------- */}
              {/* Diálogo para Adicionar Evento no Calendário */}
              {/* ------------------------------------------- */}
              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <form onSubmit={update ? updateEvent : submitHandler}>
                  <DialogContent>
                    {/* ------------------------------------------- */}
                    {/* Adicionar/Editar título */}
                    {/* ------------------------------------------- */}
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      {update ? 'Atualizar Contato' : 'Adicionar Contato'}
                    </Typography>
                    <Typography mb={3} variant="subtitle2">
                      {!update
                        ? 'Para adicionar um contato, preencha o título, escolha a cor do evento e pressione o botão adicionar'
                        : 'Para editar/atualizar um contato, altere o título, escolha a cor do evento e pressione o botão atualizar'}
                    </Typography>
                    <TextField
                      id="Event Title"
                      placeholder="Digite o Nome do Contato"
                      variant="outlined"
                      fullWidth
                      label="Nome do Contato"
                      value={title}
                      sx={{ mb: 3 }}
                      onChange={inputChangeHandler}
                    />
                    {/* ------------------------------------------- */}
                    {/* Seleção de Data de Início e Fim */}
                    {/* ------------------------------------------- */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="Data de Início"
                        inputFormat="dd/MM/yyyy"
                        value={start}
                        onChange={handleStartChange}
                        renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
                      />
                      <MobileDatePicker
                        label="Data de Fim"
                        inputFormat="dd/MM/yyyy"
                        value={end}
                        onChange={handleEndChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            sx={{ mb: 3 }}
                            error={start > end}
                            helperText={start > end ? 'A data de fim deve ser posterior à data de início' : ''}
                          />
                        )}
                      />
                    </LocalizationProvider>

                    {/* ------------------------------------------- */}
                    {/* Cor do Evento no Calendário */}
                    {/* ------------------------------------------- */}
                    <Typography variant="h6" fontWeight={600} my={2}>
                      Selecione a Cor do Contato
                    </Typography>
                    {/* ------------------------------------------- */}
                    {/* cores para o evento */}
                    {/* ------------------------------------------- */}
                    {ColorVariation.map((mcolor) => {
                      return (
                        <Fab
                          color="primary"
                          style={{ backgroundColor: mcolor.eColor }}
                          sx={{
                            marginRight: '3px',
                            transition: '0.1s ease-in',
                            scale: mcolor.value === color ? '0.9' : '0.7',
                          }}
                          size="small"
                          key={mcolor.id}
                          onClick={() => selectinputChangeHandler(mcolor.value)}
                        >
                          {mcolor.value === color ? <IconCheck width={16} /> : ''}
                        </Fab>
                      );
                    })}
                  </DialogContent>
                  {/* ------------------------------------------- */}
                  {/* Ações para o diálogo */}
                  {/* ------------------------------------------- */}
                  <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose}>Cancelar</Button>

                    {update ? (
                      <Button
                        type="submit"
                        color="error"
                        variant="contained"
                        onClick={() => deleteHandler(update)}
                      >
                        Excluir
                      </Button>
                    ) : (
                      ''
                    )}
                    <Button type="submit" disabled={!title} variant="contained">
                      {update ? 'Atualizar Contato' : 'Adicionar Contato'}
                    </Button>
                  </DialogActions>
                  {/* ------------------------------------------- */}
                  {/* Fim do Calendário */}
                  {/* ------------------------------------------- */}
                </form>
              </Dialog>
            </CardContent>
          </BlankCard>
        </Grid>
       
        <Grid item xs={12} lg={3} sx={{ height: { lg: '90vh' }, overflowY: { lg: 'scroll' } }}>
          <Stack spacing={3}>
            <BlankCard variant="outlined">
              <CardContent>
                {/* Área direita em branco */}

                {/* Botão Novo */}
                <Box sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<IconPlus />}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    Novo
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={() => {
                      setAnchorEl(null);
                      setOpen(true);
                      setStart(new Date());
                      setEnd(new Date());
                      setUpdate(false);
                    }}>
                      Evento
                    </MenuItem>
                    <MenuItem onClick={() => {
                      setAnchorEl(null);
                      setOpen(true);
                      setStart(new Date());
                      setEnd(new Date());
                      setUpdate(false);
                    }}>
                      Tarefa
                    </MenuItem>
                  </Menu>
                </Box>

                {/* Lista de Calendários */}
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Calendários
                </Typography>

                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Evento empreendimento Mirasol 1"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Visitas Piracicaba"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Visitas Santarém"
                  />
                </FormGroup>
              </CardContent>
            </BlankCard>

            <Typography variant="h6">
              Solicitações de Agendamento
            </Typography>

            <BlankCard>
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Rua João Fernando de Barros, 27
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dia 02 às 15h
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Aceitar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Rejeitar
                  </Button>
                </Box>
              </CardContent>
            </BlankCard>

            <BlankCard>
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Rua João Fernando de Barros, 27
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dia 02 às 15h
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Aceitar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Rejeitar
                  </Button>
                </Box>
              </CardContent>
            </BlankCard>

            <BlankCard>
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Rua João Fernando de Barros, 27
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dia 02 às 15h
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Aceitar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Rejeitar
                  </Button>
                </Box>
              </CardContent>
            </BlankCard>
          </Stack>
        </Grid>
      </Grid>

    </PageContainer>
  );
};

export default BigCalendar;
