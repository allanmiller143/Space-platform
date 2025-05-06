import { Box, Skeleton, CardMedia, Button, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getData, putData } from '../../../Services/Api';
import { ArrowOutward } from '@mui/icons-material';


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
        setTotal(response.userInfo.length)
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
    <Box sx={{ width: '100%', maxWidth: (total === 0 || total === 1 )? '0px' : '250px', pt: 3, mx: 2 }}>
      {loading ? (
        <Skeleton animation="wave" variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1 }} />
      ) : anuncios.length > 0 ? (
        <Carousel animation="slide" autoPlay interval={10000} indicators={false}>
          {anuncios.map((anuncio) => (
            <Box key={anuncio.id} sx={{ position: 'relative' }}>
              <Box sx = {{
                backgroundColor : "#6E35B7",
                padding: '8px 8px',
                borderRadius: '10px 10px 0px 0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
              }}>
                <ArrowOutward sx={{ fontSize: "1rem", mr: 1 }} />
                <Typography variant="caption" sx={{ color: "white", fontWeight: 500 }}>
                  {anuncio.siteUrl.split("/")[2]}
                </Typography>
              </Box>
              <CardMedia
                component="img"
                height="300"
                image={anuncio.photoUrl}
                alt={`Anúncio ${anuncio.id}`}
                sx={{
                  borderRadius: '0px 0px 10px 10px',
                  objectFit: 'cover',
                  pointerEvents: 'none', // Evita bloqueio de clique
                }}
              />
              <Button
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  borderRadius: '10px',
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',}}
                onClick={() => {window.open(anuncio.siteUrl, '_blank'); handleClick(anuncio.id);}} // Abre link em nova aba
              >
                Saiba mais
              </Button>
            </Box>
          ))}
        </Carousel>
      ) : (
        <> 
          {(total === 0 || total === 1)  ? null : <Box sx={{ width: '100%', height: 300, borderRadius: 1}}></Box>}
        </>
      )}
    </Box>
  );
};

export default Anuncioslaterais;
