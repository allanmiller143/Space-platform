/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PageContainer from 'src/components/container/PageContainer';
import NovosImoveis from './NovosImoveis/NovosImoveis';
import UsersTable from './Usuarios/UsersTable';
import { Box, Card, Typography, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashBoardSeenGraphic from './Metricas/DashBoardSeenGraphic';
import NotificationContext from '../../Services/Notification/NotificationContext/NotificationContext';
import { useContext } from 'react';
import DashBoardPropertiesGraphic from './Metricas/DashBoardPropertiesGraphic';
import DrawerList from '../DrawerList';

const Usuarios = () => {
  const { socket } = useContext(NotificationContext);

  return (
    <PageContainer title="Space iMóveis" description="">
      {/* Header */}
      <Box width='100%' margin="0 auto"
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}>
        <Box
          maxWidth="lg"
          margin="0 auto"
          py={2}
          mb = {3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Menu e Título */}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DrawerList />
            <Typography variant="h5" fontWeight="bold" color="primary">
              Space iMóveis
            </Typography>
          </Box>

          {/* Ícones de ação */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="primary">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Conteúdo Principal */}
      <Box maxWidth="lg" margin="0 auto" >

        <UsersTable socket={socket} />

        <NovosImoveis />

        {/* Gráficos */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <DashBoardSeenGraphic />
          <DashBoardPropertiesGraphic />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Usuarios;
