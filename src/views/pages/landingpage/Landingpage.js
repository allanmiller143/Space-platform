import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
import Banner from './Componentes/banner/Banner';
import C2a from '../../../components/landingpage/c2a/C2a';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import DemoSlider from './Componentes/demo-slider/DemoSlider';
import Features from '../../../components/landingpage/features/Features';
import Footer from '../../../components/landingpage/footer/Footer';
import Frameworks from '../../../components/landingpage/frameworks/Frameworks';
import LpHeader from '../../../components/landingpage/header/Header';
import Testimonial from '../../../components/landingpage/testimonial/Testimonial';
import DemoTitle from './Componentes/demo-slider/DemoTitle';

const Landingpage = () => {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <Banner />
      <DemoTitle />
      <Testimonial />
      <Footer />
    </PageContainer>
  );
};

export default Landingpage;
