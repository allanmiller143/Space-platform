import { Grid, Paper, Typography, Box } from '@mui/material';
import { Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { getData } from '../../../../Services/Api';
import { useEffect, useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PizzaGraphic = () => {
  const token = localStorage.getItem('token');
  const [pieData, setPieData] = useState([
    { name: 'Apartamento', value: 0 },
    { name: 'Casa', value: 0 },
    { name: 'Terreno', value: 0 },
    { name: 'Fazenda/Chácara', value: 0 },
  ]);

  const loadProperties = async () => {
    try {
      const response = await getData('dashboard/properties/proportions', token);
      if (response.status === 200 || response.status === 201) {
        const updatedData = [
          { name: 'Apartamento', value: response.userInfo.apartment },
          { name: 'Casa', value: response.userInfo.house },
          { name: 'Terreno', value: response.userInfo.land },
          { name: 'Fazenda/Chácara', value: response.userInfo.farm },
        ];
        setPieData(updatedData);
      } else {
        console.error('Erro na resposta:', response);
      }
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <Grid item xs={12} md={5} mt={4}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Distribuição de Imóveis por Tipo
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value" // Use o campo "value" para os valores
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <Grid container spacing={1} justifyContent="center" mt={2}>
          {pieData.map((entry, index) => (
            <Grid item key={index} display="flex" alignItems="center">
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: 1,
                  borderRadius: '50%',
                }}
              />
              <Typography variant="body2">{entry.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PizzaGraphic;
