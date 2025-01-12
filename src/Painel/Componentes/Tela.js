/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PageContainer from 'src/components/container/PageContainer';
import NovosImoveis from './NovosImoveis/NovosImoveis';
import UsersTable from './Usuarios/UsersTable';
import { Box} from '@mui/material';
import DashBoardSeenGraphic from './Metricas/DashBoardSeenGraphic';
import NotificationContext from '../../Services/Notification/NotificationContext/NotificationContext';
import { useContext } from 'react';
import DashBoardPropertiesGraphic from './Metricas/DashBoardPropertiesGraphic';
import Header from './Header/Header';

const Tela = () => {
  const { socket } = useContext(NotificationContext);

  return (
    <PageContainer title="Space iMóveis" description="">
      {/* Header */}
      <Header/>

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

export default Tela;
