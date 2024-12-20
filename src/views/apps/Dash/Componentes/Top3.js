// src/Dashboard.jsx
import { Grid,CircularProgress, Box } from '@mui/material';
import { getData } from '../../../../Services/Api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Minicard from './Minicard';

const Top3 = () => {
  const token = localStorage.getItem('token');

  const [loadingTop3, setLoadingTop3] = useState(false);
  const [top3, setTop3] = useState([]);

  const getTop3 = async () => {
    setLoadingTop3(true);
    try {
      const response = await getData('dashboard/top/properties', token);
      if (response.status === 200 || response.status === 201) {
        setTop3(response.userInfo);
      } else {
        toast.error('Erro ao carregar propriedades em destaque');
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado ao carregar propriedades em destaque');
    } finally {
      setLoadingTop3(false);
    }
  };

  useEffect(() => {
    getTop3();
  }, []);

  return (
    <Grid container spacing={3}  pt={4}>
      {loadingTop3 ? (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <CircularProgress size={40} />
        </Box>
      ) : (
        top3.map((property,index) => (
          <Grid item xs={12} md={4} key={property.id}>
           <Minicard data={property} index = {index}/>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Top3;
