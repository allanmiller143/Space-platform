import { AppBar, Toolbar, IconButton, Typography, Button, Box, Grid, TextField, Card, CardContent, CardMedia } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';

const Teste = () => {
  const featuredHouses = [
    { title: "Casa Luxuosa em São Paulo", price: "R$ 1.200.000", img: "https://via.placeholder.com/300" },
    { title: "Casa Moderna no Rio", price: "R$ 850.000", img: "https://via.placeholder.com/300" },
    { title: "Apartamento em Recife", price: "R$ 500.000", img: "https://via.placeholder.com/300" },
  ];

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CasaFácil
          </Typography>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ position: 'relative', height: 300, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" align="center" sx={{ padding: 2 }}>
          Encontre a Casa dos Seus Sonhos
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
          Ver Casas
        </Button>
      </Box>

      {/* Carrossel de Casas */}
      <Carousel>
        {featuredHouses.map((house, index) => (
          <Card key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={house.img}
              alt={house.title}
            />
            <CardContent>
              <Typography variant="h6">{house.title}</Typography>
              <Typography color="text.secondary">{house.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>

      {/* Filtros e Listagem */}
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Filtros
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Localização" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Preço Máximo" variant="outlined" />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Casas Disponíveis
        </Typography>
        <Grid container spacing={2}>
          {featuredHouses.map((house, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={house.img}
                  alt={house.title}
                />
                <CardContent>
                  <Typography variant="h6">{house.title}</Typography>
                  <Typography color="text.secondary">{house.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Rodapé */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', padding: 2, mt: 4 }}>
        <Typography variant="body2" align="center">
          © 2025 CasaFácil. Todos os direitos reservados.
        </Typography>
      </Box>
    </>
  );
};

export default Teste;
