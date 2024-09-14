import React from 'react';
import { Grid, Box, Card, Typography, CardMedia } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { Button, CardContent, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Ecommerce = () => {
  return (
    <PageContainer title="Dashboard Moderno" description="Esta é a página do Dashboard Moderno">
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="quartos-label">Quartos</InputLabel>
                        <Select
                          labelId="quartos-label"
                          id="quartos"
                          label="Quartos"
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3+</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Área (m²)"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="preco-label">Faixa de Preço</InputLabel>
                        <Select
                          labelId="preco-label"
                          id="preco"
                          label="Faixa de Preço"
                        >
                          <MenuItem value="0-100000">Até R$ 100.000</MenuItem>
                          <MenuItem value="100000-300000">R$ 100.000 - R$ 300.000</MenuItem>
                          <MenuItem value="300000-500000">R$ 300.000 - R$ 500.000</MenuItem>
                          <MenuItem value="500000+">Acima de R$ 500.000</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="tipo-imovel-label">Tipo de Imóvel</InputLabel>
                        <Select
                          labelId="tipo-imovel-label"
                          id="tipo-imovel"
                          label="Tipo de Imóvel"
                        >
                          <MenuItem value="casa">Casa</MenuItem>
                          <MenuItem value="apartamento">Apartamento</MenuItem>
                          <MenuItem value="terreno">Terreno</MenuItem>
                          <MenuItem value="comercial">Comercial</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, overflow: 'auto', height: 'calc(100vh - 104px)' }}>
                <Grid container spacing={2}>
                  {[...Array(20)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                      <Card sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image="/static/images/casa-exemplo.jpg"
                          alt="Casa exemplo"
                        />
                        <CardContent>
                          <Typography variant="h5" component="h3" gutterBottom>
                            Casa Moderna em Condomínio
                          </Typography>
                          <Box display="flex" alignItems="center" mb={1}>
                            <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              Rua das Flores, 123 - Jardim Primavera
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <AttachMoneyIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              Valor total: R$ 450.000,00
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={2}>
                            <HomeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              3 quartos | 2 banheiros | 150m²
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                            <Button 
                              variant="contained" 
                              color="primary" 
                              startIcon={<FavoriteIcon />}
                            >
                              Favoritar
                            </Button>
                            <Button 
                              variant="outlined" 
                              endIcon={<ArrowForwardIcon />}
                            >
                              Ver detalhes
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1">Componente de mapa</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Ecommerce;