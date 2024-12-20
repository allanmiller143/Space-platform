// src/Dashboard.jsx
import { Grid, Paper, Typography, CircularProgress, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getData } from '../../../../Services/Api';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const SeenGraphic = () => {
  const token = localStorage.getItem('token');  
  const [loading, setLoading] = useState(false);
  const [graphicClicks, setGraphicClicks] = React.useState([]);

  const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const getGraphicLikes = async () => {
    try {
      setLoading(true);
      const response = await getData('dashboard/properties/data/monthly', token);
      if (response.status === 200 || response.status === 201) {
        const formattedData = response.userInfo.map((item,index) => ({
          ...item,
          month: monthNames[index],
        }));
        setGraphicClicks(formattedData);  
        console.log(formattedData);
      } else {
        toast.error('Erro ao carregar conteúdo');
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getGraphicLikes();
  }, []); 

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" mb={2}>Visualizações por mês</Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphicClicks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Paper>
    </Grid>
  );
};

export default SeenGraphic;