/* eslint-disable no-unused-vars */
import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import Features from '../../../components/frontend-pages/homepage/features/Features';
import DefendFocus from '../../../components/frontend-pages/homepage/defend-focus';
import Leadership from '../../../components/frontend-pages/shared/leadership';
import Pricing from '../../../components/frontend-pages/shared/pricing';
import FAQ from '../../../components/frontend-pages/homepage/faq';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import { Button, Divider, Typography } from '@mui/material';
import CarrosselHome from '../../../components/frontend-pages/homepage/carrossel/CarrosselHome';
import NovosImoveis from '../../../Painel/Componentes/NovosImoveis/NovosImoveis';
import HomeCard from '../../../Painel/Componentes/ComponentesTest/HomeCard';
import CarroselCompleto from '../../../Painel/Componentes/ComponentesTest/CarroselCompleto';
import Filtros from '../../../Painel/Componentes/ComponentesTest/Filtros';
import Banner from '../../../Painel/Componentes/ComponentesTest/Banner';
import SearchBar from '../../../Painel/Componentes/ComponentesTest/SearchBar';
import DestinationComponent from '../../../Painel/Componentes/ComponentesTest/DestinationComponent';
import { useContext } from 'react';
import marketplaceContext from '../../apps/marketplace/MarketplaceContext/MarketplaceContext';

const HomePage = () => {
  const  {test} = useContext(marketplaceContext);

  return (
    <PageContainer title="Space iMóveis" description="">
      <HeaderAlert />
      <HpHeader />
      <SearchBar/>
      <Banner/>
      <CarrosselHome/>
      <Filtros/>
      <CarroselCompleto/>
      <DestinationComponent/>
      <Features />
      



      {/* <PowerfulDozens /> */}
      {/* <Reviews /> */}
      {/* <ExceptionalFeature /> */}
      {/* <Pricing /> */}
      {/* <FAQ/> */}
      {/* <C2a /> */}

      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;
