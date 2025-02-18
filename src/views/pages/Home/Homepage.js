/* eslint-disable no-unused-vars */
import PageContainer from 'src/components/container/PageContainer';
import HeaderAlert from '../../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import Features from '../../../components/frontend-pages/homepage/features/Features';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import Filtros from './Componentes/Filtros';
import Banner from './Componentes/Banner';
import SearchBar from './Componentes/SearchBar';
import { useContext, useEffect } from 'react';
import marketplaceContext from '../../apps/Classificados/MarketplaceContext/MarketplaceContext';
import AnunciosCarrossel from '../../../components/apps/Anuncios/Anuncios';
import CarroselCompleto from './Componentes/CarroselCompleto';
import CarrosselHome from './Componentes/CarrosselHome';
import Anuncioslaterais from '../../../components/apps/Anuncios/Anuncioslaterais';
import { Box } from '@mui/system';

const HomePage = () => {

  const requestUserLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  const location = [latitude, longitude];
                  const savedLocation = localStorage.getItem('userLocation');

                  if (savedLocation) {
                      const [savedLat, savedLon] = JSON.parse(savedLocation);
                      const tolerance = 0.01;
                      if (Math.abs(savedLat - latitude) > tolerance || Math.abs(savedLon - longitude) > tolerance) {
                          localStorage.setItem('userLocation', JSON.stringify(location));
                      }
                  } else {
                      localStorage.setItem('userLocation', JSON.stringify(location));
                  }
              },
              (error) => {
                  console.error("Error getting user location:", error);
              }
          );
      }
  };
  
  useEffect(() => {
      requestUserLocation();
  }, []);

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
