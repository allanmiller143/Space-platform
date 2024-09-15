import React from 'react';
import { Avatar, Box, CardContent, Grid, IconButton, Typography, Tooltip, Button, Stack } from '@mui/material';

// componentes
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSwitch from '../../forms/theme-elements/CustomSwitch';

import {
  IconArticle,
  IconCheckbox,
  IconClock,
  IconDownload,
  IconMail,
  IconPlayerPause,
  IconTruckDelivery,
} from '@tabler/icons';

const NotificationTab = () => {
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Preferências de Notificação
              </Typography>
              <Typography color="textSecondary">
                Selecione as notificações que você gostaria de receber por e-mail. Por favor, note que você
                não pode optar por não receber mensagens de serviço, como notificações de pagamento, segurança ou legais.
              </Typography>

              <CustomFormLabel htmlFor="text-email">Endereço de E-mail*</CustomFormLabel>
              <CustomTextField id="text-email" variant="outlined" fullWidth />
              <Typography color="textSecondary">Necessário para notificações.</Typography>

              {/* lista 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconArticle size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Atualizações de Propriedades
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Receba notificações sobre novas propriedades adicionadas
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>

              {/* lista 2 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconCheckbox size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Confirmação de Reserva
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Você será notificado quando uma reserva for confirmada
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>

              {/* lista 3 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconClock size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Alteração no Status da Reserva
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Você será notificado quando houver alterações no status da reserva
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>

              {/* lista 4 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconTruckDelivery size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Propriedade Alugada
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Você será notificado assim que a propriedade for alugada
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>

              {/* lista 5 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconMail size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Notificação por E-mail
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Ative a notificação por e-mail para receber atualizações por e-mail
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>

        {/* 2 */}
        <Grid item xs={12} lg={6}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Data e Hora
              </Typography>
              <Typography color="textSecondary">
                Configurações de fuso horário e exibição do calendário.
              </Typography>

              {/* lista 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconClock size="22" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    Fuso horário
                  </Typography>
                  <Typography variant="h6" mb={1}>
                    (UTC + 02:00) Atenas, Bucareste
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Tooltip title="Download">
                    <IconButton>
                      <IconDownload size="22" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>

        {/* 3 */}
        <Grid item xs={12} lg={6}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Ignorar Rastreamento
              </Typography>

              {/* lista 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconPlayerPause size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Ignorar Rastreamento do Navegador
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Cookie do Navegador
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
        <Button size="large" variant="contained" color="primary">
          Salvar
        </Button>
        <Button size="large" variant="text" color="error">
          Cancelar
        </Button>
      </Stack>
    </>
  );
};

export default NotificationTab;
