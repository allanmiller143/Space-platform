import { Grid, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Table from './Componentes/Table';
import SeenGraphic from './Componentes/SeenGraphic';
import LikesGraphic from './Componentes/LikesGraphic';
import PizzaGraphic from './Componentes/PizzaGraphic';
import Cards from './Componentes/Cards';
import Top3 from './Componentes/Top3';
import { Card } from 'antd';
import Map from './Componentes/Map';

const Dash = () => {
  return (
    <PageContainer title="Dashboard" description="">
      <Typography variant="h4" gutterBottom>
        Dashboard de Desempenho
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Transformando dados em decisões!
      </Typography>
      <Grid container spacing={3}>
      <Cards/>
      <SeenGraphic />
      <LikesGraphic/>
      <PizzaGraphic/>
      <Map/>
      <Grid item xs={12}>
        <Card>
            <Typography variant="h4" gutterBottom>
              Propriedades mais visualizadas
            </Typography>
            <Top3/>
        </Card>
      </Grid> 

      <Table/>
      </Grid>
    </PageContainer>
  );
};

export default Dash;
