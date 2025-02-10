import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import BlankCard from '../../../../shared/BlankCard';
import { Typography } from 'antd';

const Growth = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  // Dados no formato desejado
  const data = [
    { month: 'Jan', value: 50 },
    { month: 'Fev', value: 10 },
    { month: 'Mar', value: 30 },
    { month: 'Abr', value: 35 },
    { month: 'Mai', value: 45 },
    { month: 'Jun', value: 60 },
    { month: 'Jul', value: 30 },
    { month: 'Ago', value: 600 },
    { month: 'Set', value: 50 },
    { month: 'Out', value: 52 },
    { month: 'Nov', value: 30 },
    { month: 'Dez', value: 40 },
  ];

  // Extraindo meses e valores
  const meses = data.map((item) => item.month);
  const valores = data.map((item) => item.value);

  // Configuração do gráfico
  const optionscolumnchart = {
    chart: {
      type: 'area',
      height: 200,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      toolbar: { show: false },
      sparkline: { enabled: false },
      zoom: { enabled: false }, 
    },
    colors: [secondary],
    stroke: { curve: 'straight', width: 2 },
    fill: { type: 'solid', opacity: 0.2 },
    markers: { size: 4 },
    tooltip: { theme: 'dark' },
    xaxis: {
      categories: meses, // Define os meses no eixo X
      labels: { show: true },
    },
  };

  const seriescolumnchart = [
    {
      name: 'Valor',
      data: valores, // Define os valores da série
    },
  ];

  return (
    <Box sx = {{px : 2}}>
      <BlankCard>
        <Box sx = {{m:2}}>
          <Typography variant="h6">visualizações</Typography>
          <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="200px" />
        </Box>
      </BlankCard>
    </Box>
  );
};

export default Growth;
