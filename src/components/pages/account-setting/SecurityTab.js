import React from 'react';
import {
  Avatar,
  Box,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Button,
  Divider,
  Stack
} from '@mui/material';

// componentes
import BlankCard from '../../shared/BlankCard';
import { IconDeviceLaptop, IconDeviceMobile, IconDotsVertical } from '@tabler/icons';

const SecurityTab = () => {
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Autenticação de Dois Fatores
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis sapiente sunt
                  earum officiis laboriosam ut.
                </Typography>
                <Button variant="contained" color="primary">
                  Ativar
                </Button>
              </Stack>

              <Divider />

              {/* lista 1 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Aplicativo de Autenticação</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Aplicativo Google Authenticator
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Configurar
                  </Button>
                </Box>
              </Stack>
              <Divider />
              {/* lista 2 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Outro e-mail</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    E-mail para enviar link de verificação
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Configurar
                  </Button>
                </Box>
              </Stack>
              <Divider />
              {/* lista 3 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Recuperação por SMS</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Seu número de telefone ou algo assim
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Configurar
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <BlankCard>
            <CardContent>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}
              >
                <IconDeviceLaptop size="26" />
              </Avatar>

              <Typography variant="h5" mt={2}>
                Dispositivos
              </Typography>
              <Typography color="textSecondary" mt={1} mb={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
              </Typography>
              <Button variant="contained" color="primary">
                Sair de todos os dispositivos
              </Button>

              {/* lista 1 */}
              <Stack direction="row" spacing={2} py={2} mt={3} alignItems="center">
                <IconDeviceMobile size="26" />

                <Box>
                  <Typography variant="h6">iPhone 14</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Londres, Reino Unido, 23 de Out às 1:15
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <IconButton>
                    <IconDotsVertical size="22" />
                  </IconButton>
                </Box>
              </Stack>
              <Divider />
              {/* lista 2 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <IconDeviceLaptop size="26" />

                <Box>
                  <Typography variant="h6">Macbook Air </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Gujarat, Índia, 24 de Out às 3:15
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <IconButton>
                    <IconDotsVertical size="22" />
                  </IconButton>
                </Box>
              </Stack>
              <Stack>
                <Button variant="text" color="primary">
                  Precisa de Ajuda?
                </Button>
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

export default SecurityTab;
