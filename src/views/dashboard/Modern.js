import React from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { Button, CardContent, Divider } from '@mui/material';

const Modern = () => {
  return (
    <PageContainer title="Home" description="Bem-vindo ao nosso projeto em desenvolvimento!">
   

      {/* Seção Hero */}
      <Box mb={5}>
        <Card sx={{ bgcolor: 'primary.light', borderRadius: 4, height: 560 }}>
          <Grid container>
            <Grid item md={4} sx={{ ml: 8, alignSelf: 'center' }}>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  Aqui é o hero da homepage. Dedicado a busca rápida de imóveis.
                </Typography>
                <Typography variant="body1">
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Seção de Imóveis Patrocinados */}
      <Box mb={5}>
        <Card sx={{ bgcolor: 'warning.light', borderRadius: 4, height: 560 }}>
          <Grid container>
            <Grid item md={4} sx={{ ml: 8, alignSelf: 'center' }}>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  Imóveis selecionados por nós<br />(aqui é o loop de imóveis patrocinados)
                </Typography>
                <Typography variant="body1">
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Seção para falar com o Corretor */}
      <Box mb={5}>
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
      <Box mb={5}>
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
      <Box component="footer" py={5}>
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