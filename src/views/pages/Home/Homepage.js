/* eslint-disable no-unused-vars */
import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import Features from '../../../components/frontend-pages/homepage/features/Features';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import Filtros from './Componentes/Filtros';
import Banner from './Componentes/Banner';
import SearchBar from './Componentes/SearchBar';
import { useContext } from 'react';
import marketplaceContext from '../../apps/Classificados/MarketplaceContext/MarketplaceContext';
import AnunciosCarrossel from '../../../components/apps/Anuncios/Anuncios';
import CarroselCompleto from './Componentes/CarroselCompleto';
import CarrosselHome from './Componentes/CarrosselHome';

const HomePage = () => {
  const  {test} = useContext(marketplaceContext);

  return (
    <PageContainer title="Space iMóveis" description="">
      <HeaderAlert />
      <HpHeader />
      <SearchBar/>
      <Banner/>
      <CarrosselHome/>
      <AnunciosCarrossel/>
      <Filtros/>
      <CarroselCompleto/>
      {/* <DestinationComponent/> */}
      <Features />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;
