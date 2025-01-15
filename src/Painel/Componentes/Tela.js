/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PageContainer from 'src/components/container/PageContainer';
import NovosImoveis from './NovosImoveis/NovosImoveis';
import UsersTable from './Usuarios/UsersTable';
import { Box} from '@mui/material';
import DashBoardSeenGraphic from './Usuarios/DashBoardSeenGraphic';
import NotificationContext from '../../Services/Notification/NotificationContext/NotificationContext';
import { useContext, useState } from 'react';
import DashBoardPropertiesGraphic from './Metricas/DashBoardPropertiesGraphic';
import Header from './Header/Header';
import { Typography } from 'antd';
import Usuarios from '../Telas/Usuarios';
import Propriedades from '../Telas/Propriedades';
import ProfessionalForm from './ProfessionalForm';
const Tela = () => {
  const { socket } = useContext(NotificationContext);
  const [selectedPage, setSelectedPage] = useState('Usuários'); // Estado para armazenar a página atual


  const renderPageContent = () => {
    switch (selectedPage) {
      case 'Usuários':
        return <Usuarios/>;
      case 'Propriedades':
        return <Propriedades/>;
      case 'Send email':
        return <ProfessionalForm/>;
      case 'Drafts':
        return <Typography variant="h4">View your saved drafts!</Typography>;
      case 'All mail':
        return <Typography variant="h4">All your emails are here!</Typography>;
      case 'Trash':
        return <Typography variant="h4">Check your trash items!</Typography>;
      case 'Spam':
        return <Typography variant="h4">These are your spam emails!</Typography>;
      default:
        return <Typography variant="h4">Page not found</Typography>;
    }
  };

  return (
    <PageContainer title="Space iMóveis" description="">
      {/* Header */}
      <Header selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>

      {/* Conteúdo Principal */}
      <Box maxWidth="lg" margin="0 auto" >
        {renderPageContent()}

      </Box>
    </PageContainer>
  );
};

export default Tela;
