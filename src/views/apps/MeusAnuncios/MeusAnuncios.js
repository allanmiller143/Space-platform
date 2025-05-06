import { Box, Button, Tab, Tabs, } from '@mui/material';
import { useState } from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../../components/shared/BlankCard';
import DataTable from './Componentes/DataTable';
import PageContainer from '../../../components/container/PageContainer';
import { useNavigate } from 'react-router';

const MeusAnuncios = () => {

  const [adType, setAdType] = useState('big'); // Estado para controlar o tipo de anúncio
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setAdType(newValue);
  };

  const children = (
    <Button variant="contained" onClick={() => navigate('/inserirPropaganda')}>
    Adicionar anúncio
  </Button>
  );

  
  return (
    <PageContainer title={'Anunciar'}>
        <Breadcrumb title="Gerenciador de anúncios" subtitle={"Gerencie os anúncios existentes na Space imóveis"}  description="this is Form Wizard page" children={children} />
        <DataTable type={adType}/>
      </PageContainer>
    );
};

export default MeusAnuncios;
