import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from '../../components/dashboards/ecommerce/WelcomeCard';
import Expence from '../../components/dashboards/ecommerce/Expence';
import Sales from '../../components/dashboards/ecommerce/Sales';
import RevenueUpdates from '../../components/dashboards/ecommerce/RevenueUpdates';
import SalesOverview from '../../components/dashboards/ecommerce/SalesOverview';
import SalesTwo from '../../components/dashboards/ecommerce/SalesTwo';
import MonthlyEarnings from '../../components/dashboards/ecommerce/MonthlyEarnings';
import PaymentGateways from '../../components/dashboards/ecommerce/PaymentGateways';
import RecentTransactions from '../../components/dashboards/ecommerce/RecentTransactions';
import ProductPerformances from '../../components/dashboards/ecommerce/ProductPerformances';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import WeeklyStats from '../../components/dashboards/modern/WeeklyStats';


const Ecommerce = () => {
  return (
    <PageContainer title="eCommerce Dashboard" description="this is eCommerce Dashboard page">
      <HpHeader/>
      <Box sx = {{my : 5}} maxWidth="lg" margin={'0 auto'}>
        <Grid container spacing={3}>

          <Grid item xs={12} lg={8}>
            <WelcomeCard />
          </Grid>
 
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Expence />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Sales />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <RevenueUpdates />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <SalesTwo />
              </Grid>

              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <WeeklyStats/>
          </Grid>


          <Grid item xs={12} lg={4}>
            <PaymentGateways/>
          </Grid>


          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>

          <Grid item xs={12} lg={8}>
            <ProductPerformances />
          </Grid> *
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Ecommerce;
