import React from 'react';
import { Grid, Box, Card, Typography, MenuItem, TextField, InputAdornment, CardMedia, CardActions } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { Button, CardContent, Divider, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwipperRender from '../../components/swipper/SwipperRender'

const Modern = () => {
  return (
    <PageContainer title="Home" description="Bem-vindo ao nosso projeto em desenvolvimento!">
   
      <Box sx={{ bgcolor: 'red', color: 'white', p: 2, borderRadius: 2, textAlign: 'center', mb: 3 }}>
        <Typography variant="h6">
          SITE EM CONSTANTE ATUALIZAÇÃO. ERROS E LENTIDÃO PODEM OCORRER.
        </Typography>
      </Box>

      {/* Seção Hero */}
      <Box sx={{ mb: 5 }} className="Frameworkui">
        <Card sx={{ bgcolor: 'primary.light', borderRadius: 4, height: 560 }}>
          <Grid container>
            <Grid item md={6} sx={{ alignSelf: 'center', p: 4 }}>
              <Typography variant="h3" gutterBottom>
                Seu próximo imóvel
              </Typography>
              <Typography variant="body1">
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
              </Typography>
            </Grid>
            <Grid item md={5} sx={{ alignSelf: 'center', px: 4 }}>
              <Box mb={3}>
                <Typography variant="subtitle1" component="label" htmlFor="formInput2">
                  Alugar ou comprar
                </Typography>
                <Select
                  id="formInput2"
                  fullWidth
                  defaultValue=""
                >
                  <MenuItem value="">Selecione uma opção</MenuItem>
                  <MenuItem value={1}>Alugar</MenuItem>
                  <MenuItem value={2}>Comprar</MenuItem>
                </Select>
              </Box>
              <Box mb={3}>
                <TextField
                  fullWidth
                  placeholder="Cidade"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item md={11} sx={{ alignSelf: 'center', ml: 8 }}>
              <SwipperRender
                items={[...Array(10)].map((_, index) => ({
                  image: "https://pinegrow.com/placeholders/img10.jpg",
                  title: `Imóvel ${index + 1}`,
                  description: "Descrição breve do imóvel. Clique para mais detalhes.",
                  content: (
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://pinegrow.com/placeholders/img10.jpg"
                        alt={`Imóvel ${index + 1}`}
                      />
                      <CardContent>
                        <Typography variant="h5" component="div">
                          Imóvel {index + 1}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          Localização
                        </Typography>
                        <Typography variant="body2">
                          Descrição breve do imóvel. Clique para mais detalhes.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="primary">Ver Detalhes</Button>
                      </CardActions>
                    </Card>
                  ),
                }))}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Seção de Imóveis Patrocinados */}
      <Box sx={{ mb: 5 }} className="Frameworkui">
        <Card sx={{ bgcolor: 'warning.light', borderRadius: 4, height: 560, p: 4 }}>
          <Grid container>
            <Grid item md={10} sx={{ alignSelf: 'center' }}>
              <Typography variant="h3" gutterBottom>
                Imóveis selecionados por nós
              </Typography>
              <Typography variant="body1">
                Confira nossa seleção especial de imóveis patrocinados. Deslize para ver mais opções.
              </Typography>
            </Grid>
            <Grid item md={12} sx={{ mt: 2 }}>
              <SwipperRender
                items={[...Array(10)].map((_, index) => ({
                  image: "https://pinegrow.com/placeholders/img10.jpg",
                  title: `Imóvel Patrocinado ${index + 1}`,
                  description: "Descrição breve do imóvel patrocinado. Clique para mais detalhes.",
                  content: (
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://pinegrow.com/placeholders/img10.jpg"
                        alt={`Imóvel Patrocinado ${index + 1}`}
                      />
                      <CardContent>
                        <Typography variant="h5" component="div">
                          Imóvel Patrocinado {index + 1}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          Localização
                        </Typography>
                        <Typography variant="body2">
                          Descrição breve do imóvel patrocinado. Clique para mais detalhes.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="primary">Ver Detalhes</Button>
                      </CardActions>
                    </Card>
                  ),
                }))}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Seção para falar com o Corretor */}
      <Box sx={{ mb: 5 }} className="Frameworkui">
        <Card sx={{ bgcolor: 'success.light', borderRadius: 4, height: 560 }}>
          <Grid container>
            <Grid item md={4} sx={{ ml: 8, alignSelf: 'center' }}>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  Seção para falar diretamente com o Corretor
                </Typography>
                <Typography variant="body1">
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Seção para falar com a Imobiliária */}
      <Box sx={{ mb: 5 }} className="Frameworkui">
        <Card sx={{ bgcolor: 'warning.light', borderRadius: 4, height: 560 }}>
          <Grid container>
            <Grid item md={4} sx={{ ml: 8, alignSelf: 'center' }}>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  Seção para falar diretamente com a Imobiliária
                </Typography>
                <Typography variant="body1">
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Footer */}
      <Box component="footer" py={5} className="Frameworkui">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom>
              Como falar com a gente
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <Box component="li" mb={1}>
                <Typography variant="body2">WhatsApp</Typography>
              </Box>
              <Box component="li" mb={1}>
                <Typography variant="body2">+55 11 1234-5678</Typography>
              </Box>
              <Box component="li" mb={1}>
                <Typography variant="body2">Segunda-feira a sexta-feira das 9:00 às 18:00</Typography>
              </Box>
              <Box component="li" mb={1}>
                <Typography variant="body2">contato@spaceimoveis.com.br</Typography>
              </Box>
              <Box component="li" mb={1}>
                <Typography variant="body2">Atendimento a clientes e dúvidas em geral. Respostas em até um dia útil</Typography>
              </Box>
              <Box component="li" mb={1}>
                <Typography variant="body2">imprensa@spaceimoveis.com.br</Typography>
              </Box>
              <Box component="li" mb={1}>
                <Typography variant="body2">Atendimento exclusivo aos profissionais de imprensa</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom>
              Sobre a SpaceImoveis
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              {['Central de Ajuda', 'Como vender', 'Como comprar', 'Sobre nós', 'Carreiras', 'Quero ser fornecedor'].map((item) => (
                <Box component="li" mb={1} key={item}>
                  <Typography
                    component="a"
                    href="#"
                    sx={{ color: 'text.secondary', textDecoration: 'none' }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom>
              Explore
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              {['Portal SpaceImoveis', 'Guia de Venda', 'Mapa do site', 'Avaliação de imóvel'].map((item) => (
                <Box component="li" mb={1} key={item}>
                  <Typography
                    component="a"
                    href="#"
                    sx={{ color: 'text.secondary', textDecoration: 'none' }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom>
              Assine nossa newsletter
            </Typography>
            <Typography variant="body1" gutterBottom>
              Resumo mensal do que há de novo e empolgante de nós.
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography component="label" htmlFor="newsletter1" sx={{ visibility: 'hidden' }}>
                  Endereço de e-mail
                </Typography>
                <input
                  id="newsletter1"
                  type="text"
                  placeholder="Endereço de e-mail"
                  style={{ width: '100%', padding: '8px' }}
                />
              </Box>
              <Button variant="contained" color="primary">
                Assinar
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', borderTop: 1, borderColor: 'divider', py: 4, mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            &copy; 2024 SpaceImoveis. Todos os direitos reservados.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['Portal de Denúncias', 'Políticas de Privacidade', 'Termos e Condições de Uso', 'Guia de Conduta e Ética', 'Mapa - Manual das Imobiliárias parceiras'].map((item) => (
              <Typography
                key={item}
                component="a"
                href="#"
                sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.875rem' }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Modern;