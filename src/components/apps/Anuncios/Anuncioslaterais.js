import { Box, Skeleton, CardMedia, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getData, putData } from '../../../Services/Api';

import Banner1 from '../../../assets/images/posters/imagem-8.jpg';
import Banner2 from '../../../assets/images/posters/imagem-9.jpg';

const Anuncioslaterais = ({side}) => {
  const [loading, setLoading] = useState(false);
  const [anuncios, setAnuncios] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();


  const filter = async () => {
    setLoading(true);
    try {
      const response = await getData(`announcement/valid`);
      if (response.status === 200 || response.status === 201) {
        // Filtrar apenas os anúncios do tipo "small"
<<<<<<< HEAD
        setTotal(response.userInfo.length)
=======
>>>>>>> bac2417eb284444fa0aff441ca4349f96f09e1e8
        const anunciosSmall = response.userInfo.filter(anuncio => anuncio.type === "small");
  
        // Separar índices pares e ímpares
        const anunciosFiltrados = anunciosSmall.filter((_, index) =>
          side === "left" ? index % 2 !== 0 : index % 2 === 0
        );
        setAnuncios(anunciosFiltrados);
      } else {
        navigate('/error');
      }
    } catch (error) {
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };

  async function handleClick (id){
    try{
      const response = await putData(`announcement/view/${id}`);
      console.log(response);
    }catch(error){
      null
    }
  }

  

  useEffect(() => {
    filter();
  }, []);

  return (
<<<<<<< HEAD
    <Box sx={{ width: '100%', maxWidth: (total === 0 || total === 1 )? '0px' : '250px', pt: 3, mx: 2 }}>
=======
    <Box sx={{ width: '100%', maxWidth: '250px', pt: 3, mx: 2, display: { xs: 'none', lg: 'block' } }}>
>>>>>>> bac2417eb284444fa0aff441ca4349f96f09e1e8
      {loading ? (
        <Skeleton animation="wave" variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1 }} />
      ) : anuncios.length > 0 ? (
        <Carousel animation="slide" autoPlay interval={10000} indicators={false}>
          {anuncios.map((anuncio) => (
            <Box key={anuncio.id} sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="300"
                image={anuncio.photoUrl}
                alt={`Anúncio ${anuncio.id}`}
                sx={{
                  borderRadius: 1,
                  objectFit: 'cover',
                  pointerEvents: 'none', // Evita bloqueio de clique
                }}
              />
              <Button
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  borderRadius: '8px',
                  backgroundColor: 'primary.main',
                  color: 'blue',
                }}
                onClick={() => {window.open(anuncio.siteUrl, '_blank'); handleClick(anuncio.id);}} // Abre link em nova aba
              >
                Saiba mais
              </Button>
            </Box>
          ))}
        </Carousel>
      ) : (
<<<<<<< HEAD
        <> 
          {(total === 0 || total === 1)  ? null : <Box sx={{ width: '100%', height: 300, borderRadius: 1, backgroundColor: 'red' }}> skdnsd</Box>}
        </>
        
=======
        // Exibe um Box vazio com a mesma altura do CardMedia para manter o layout
        <Box sx={{ width: '100%', height: 300, borderRadius: 1, backgroundColor: 'transparent' }} />
>>>>>>> bac2417eb284444fa0aff441ca4349f96f09e1e8
      )}
    </Box>
  );
};

export default Anuncioslaterais;
