import { Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import image from '../../../../assets/images/posters/imagem-8.jpg';
import Anuncioslaterais from '../../../../components/apps/Anuncios/Anuncioslaterais';
<<<<<<< HEAD

=======
>>>>>>> bac2417eb284444fa0aff441ca4349f96f09e1e8
const Banner = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg')); // Verifica se a tela é lg ou maior

  return (
<<<<<<< HEAD
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      {isLg && <Anuncioslaterais side="left" />}
      
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 'lg', px: { xs: 2, sm: 2 } }} pt={3}>
=======
    <Box sx = {{ width : '100%', display : 'flex', flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center' }}>
      <Anuncioslaterais side = 'left'/>
      <Box sx={{ position : 'relative', width : '100%', maxWidth : 'lg', px : { xs : 2, sm : 2}}} pt = {3}>
>>>>>>> bac2417eb284444fa0aff441ca4349f96f09e1e8
        <Box
          sx={{
            position: 'relative',
            width: '100%',
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
<<<<<<< HEAD

      {isLg && <Anuncioslaterais side="right" />}
=======
      <Anuncioslaterais side = 'right'/>

>>>>>>> bac2417eb284444fa0aff441ca4349f96f09e1e8
    </Box>
  );
};

export default Banner;
