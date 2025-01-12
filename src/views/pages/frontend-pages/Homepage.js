/* eslint-disable no-unused-vars */
import PageContainer from 'src/components/container/PageContainer';
import Banner from '../../../components/frontend-pages/homepage/banner/Banner';
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

const HomePage = () => {

  return (
    <PageContainer title="Space iMóveis" description="">
      <HeaderAlert />
      <HpHeader />
      <Banner />
      {/* <Leadership /> */}
      <Divider />  
      <CarrosselHome/>
      <Features />


      <DefendFocus />
      {/* <PowerfulDozens /> */}
      {/* <Reviews /> */}
      {/* <ExceptionalFeature /> */}
      {/* <Pricing /> */}
      {/* <FAQ/> */}
      {/* <C2a /> */}

      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;
