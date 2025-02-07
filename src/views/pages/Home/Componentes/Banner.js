import {Typography, Button, Box,} from '@mui/material';
import image from '../../../../assets/images/posters/imagem-8.jpg';
const Banner = () => {

  return (
    <Box maxWidth={'lg'} sx={{ margin: '0 auto',px : {xs : 1, sm: 2}, }} pt = {3}>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 200, sm: 500 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 2, borderRadius: 1 }}>
          <Typography variant="h4" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
            Encontre a Casa dos Seus Sonhos
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/marketplace">
            Ver Imóveis
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
