import { Typography, Box, Skeleton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { putData } from '../../../Services/Api';
import HomeCard from './HomeCard';

const CarroselCompleto = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const filter = async () => {
    setLoading(true);
    try {
      const response = await putData(`properties/filter?page=${1}&verified=true`, {});
      if (response.status === 200 || response.status === 201) {
        setProperties(response.data.result);
        console.log(response.data.result);
      } else {
        navigate('/error');
      }
    } catch (error) {
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filter();
  }, []);

  return (
    <Box maxWidth={'lg'} sx ={{ margin: '0 auto', px : {xs : 1, sm: 2},  }}>
      <Typography variant="h4" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' }, mt: 2, }}>
        Nossos destaques
      </Typography>
      {loading ? (
        <Box >
          {Array.from({ length: 1 }).map((_, index) => (
            <Skeleton
              key={index}
              animation="wave"
              variant="rectangular"
              width="100%"
              height={320}
              sx={{ borderRadius: 2, flex: 1 }}
            />
          ))}
        </Box>
      ) : (
        <Carousel
          animation="slide"
          autoPlay
          indicators={true}
          sx={{ marginTop: 2 }}
          interval={15000}

          indicatorContainerProps={{
            style: {
              display: 'flex',
              justifyContent: 'center',
              marginTop: '16px',
            },
          }}
          indicatorIconButtonProps={{
            style: {
              color: '#ddd', // Cor dos dots inativos
              margin: '0 4px',
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: '#1976d2', // Cor do dot ativo
            },
          }}
        >
          {properties.map((house, index) => (
            <Box key={index}>
              <HomeCard post={house} />
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default CarroselCompleto;
