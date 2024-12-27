/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import {Dialog,DialogContent,DialogTitle,Typography,Box,IconButton,Divider,Grid,Avatar,Card,CardContent} from '@mui/material';
import { Cancel, CalendarToday, LocationOn, AccountCircle } from '@mui/icons-material';

const EditEventDialog = ({
  openConfirmacao,
  setOpenConfirmacao,
  eventoSelecionado,
  property,
  advertiser,
}) => {
  return (
    <Dialog open={openConfirmacao}  onClose={ ()=> setOpenConfirmacao(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="span" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Detalhes do Agendamento
          </Typography>
          <IconButton
            edge="end"
            onClick={() => setOpenConfirmacao(false)}
            aria-label="close"
            sx={{ color: '#888' }}
          >
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ padding: 3 }}>
        {eventoSelecionado && (
          <Box>
            {/* Status do Agendamento */}
            <Box mb={3}>
              <Box sx ={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                  Status do Agendamento
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold',  color  : eventoSelecionado.status === 'pending' ? 'orange' : 'green' }}>
                  {eventoSelecionado.status === 'pending' ? 'Pendente' : 'Confirmado'}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{color: 'text.secondary' }}>
                {
                  eventoSelecionado.status === 'pending'
                    ? 'Seu agendamento ainda está pendente de confirmação pelo anunciante do imóvel.'
                    : 'Seu agendamento foi confirmado pelo anunciante do imóvel.'
                }
              </Typography>
            </Box>

            {/* Grid de Informações */}
            <Grid container spacing={3}>
              {/* Informações do Imóvel */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOn color="primary" sx={{ fontSize: 30, marginRight: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Localização do Imóvel
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {property.address.street}, {property.address.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {property.address.city}, {property.address.state}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Horário do Agendamento */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CalendarToday color="primary" sx={{ fontSize: 30, marginRight: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Horário do Agendamento
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {`${moment(eventoSelecionado.start).format('DD/MM/YYYY HH:mm')} - ${moment(eventoSelecionado.end).format('HH:mm')}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Informações do Solicitante e Anunciante */}
            <Box mt={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Informações do Agendamento
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2 }}>
                      <AccountCircle />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Solicitante
                      </Typography>
                      <Typography variant="body1">{eventoSelecionado.solicitorEmail}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: 'secondary.main', marginRight: 2 }}>
                      <AccountCircle />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Anunciante
                      </Typography>
                      <Typography variant="body1">{advertiser.email}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
