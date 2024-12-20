/* eslint-disable no-unused-vars */
import { Grid, Typography, Card, CardContent, CardHeader, CircularProgress, Box } from '@mui/material';
import { getData } from '../../../../Services/Api';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { IconHome, IconEye, IconHeart, IconChartBar } from '@tabler/icons'; // Adicione ícones

const Cards = () => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const token = localStorage.getItem('token');  

  const [loadingLikes, setLoadingLikes] = useState(false);
  const [loadingClicks, setLoadingClicks] = useState(false);
  const [loadingProperties, setLoadingProperties] = useState(false);

  const [totalProperties, setTotalProperties] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  const getLikes = async () => {
    setLoadingLikes(true);
    try {
      const response = await getData('dashboard/likes', token);
      if (response.status === 200 || response.status === 201) {
        setTotalLikes(response.userInfo.total);
      } else {
        toast.error('Erro ao carregar curtidas');
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado ao carregar curtidas');
    } finally {
      setLoadingLikes(false);
    }
  };

  const getClicks = async () => {
    setLoadingClicks(true);
    try {
      const response = await getData('dashboard/views', token);
      if (response.status === 200 || response.status === 201) {
        setTotalClicks(response.userInfo.total);
      } else {
        toast.error('Erro ao carregar visualizações');
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado ao carregar visualizações');
    } finally {
      setLoadingClicks(false);
    }
  };

  const getUserProperties = async () => {
    setLoadingProperties(true);
    try {
      const route = `properties/seller/${currentUserls.email}?limit=200`;
      const response = await getData(route);
      if (response.status === 200 || response.status === 201) {
        setTotalProperties(response.userInfo.pagination.total);
        console.log(response.userInfo.properties);
      } else {
        toast.error('Erro ao buscar propriedades');
      }
    } catch (error) {
      toast.error('Erro inesperado ao buscar propriedades');
    } finally {
      setLoadingProperties(false);
    }
  };

  useEffect(() => {
    getLikes();
    getClicks();
    getUserProperties();
  }, []);

  const cards = [
    { title: 'Total de Imóveis', value: totalProperties, loading: loadingProperties, icon: <IconHome /> },
    { title: 'Visitas Marcadas', value: 0, loading: loadingClicks, icon: <IconEye /> },
    { title: 'Total de Curtidas', value: totalLikes, loading: loadingLikes, icon: <IconHeart /> },
    { title: 'Total de Visualizações', value: totalClicks, loading: loadingClicks, icon: <IconChartBar /> },
  ];

  return (
    <Grid container spacing={3} pl={3} pt={4}>
      {cards.map((card) => (
        <Grid item xs={12} md={3} key={card.title}>
          <Card elevation={3} sx={{  borderRadius: '10px' }}>
            <CardHeader 
              title={card.title} 
            />
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  {card.loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height={60}>
                      <CircularProgress size={15} />
                    </Box>
                  ) : (
                    <Typography variant="h5">{card.value}</Typography>
                  )}
                </Box>
                <Box sx={{ fontSize: '40px', color: 'primary.dark' }}>
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
