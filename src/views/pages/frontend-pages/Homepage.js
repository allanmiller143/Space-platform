/* eslint-disable no-unused-vars */
import PageContainer from 'src/components/container/PageContainer';
import Banner from '../../../components/frontend-pages/homepage/banner/Banner';
import HeaderAlert from '../../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
// import Features from '../../../components/frontend-pages/homepage/features/Features';
import DefendFocus from '../../../components/frontend-pages/homepage/defend-focus';
import Leadership from '../../../components/frontend-pages/shared/leadership';
import Pricing from '../../../components/frontend-pages/shared/pricing';
import FAQ from '../../../components/frontend-pages/homepage/faq';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';

const HomePage = () => {
  return (
    <PageContainer title="Space iMóveis" description="">
      <HeaderAlert />
      <HpHeader />
      <Banner />
      {/* <Features /> */}
      <Leadership />
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
