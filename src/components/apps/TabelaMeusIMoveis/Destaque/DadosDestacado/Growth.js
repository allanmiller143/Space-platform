import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import BlankCard from '../../../../shared/BlankCard';
import { Typography } from 'antd';
import { getData } from '../../../../../Services/Api';
import { useEffect, useState } from 'react';


const monthMap = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const Growth = ({property}) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const [data, SetData] = useState([]);




  useEffect(() => {
    loadData();
  }, []);


  async function loadData(){
    try{
      const response = await getData(`properties/times-seen/monthly/${property.fullImovel.id}`);
      console.log(response);
      if(response.status === 200 || response.status === 201){
        console.log(response.userInfo);
        const monthlyCounts = Array(12).fill(0);
        response.userInfo.visualizations.forEach(item => {
          const monthIndex = new Date(item.createdAt).getMonth();
          monthlyCounts[monthIndex]++;
        });
        const FormattedData = monthMap.map((month, index) => ({
          month,
          value: monthlyCounts[index]
        }));

        SetData(FormattedData);
      }
    }catch(e){
      console.log(e);
    }
  }


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
