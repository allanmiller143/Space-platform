import React from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { Button, CardContent, Divider } from '@mui/material';


const Modern = () => {
  return (
    <PageContainer title="Home" description="Bem-vindo ao nosso projeto em desenvolvimento!">
      <Box sx={{ flexGrow: 1 }}>
        {/* Seção principal para uma mensagem de marketing primária ou chamada para ação */}
        <Box sx={{ bgcolor: 'primary.light', py: 8 }}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Bem-vindo ao nosso projeto em desenvolvimento!
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Estamos atualmente em fase de testes e desenvolvimento. Pedimos sua paciência enquanto trabalhamos para aprimorar nossa plataforma. Agradecemos sua compreensão e feedback durante este período de aperfeiçoamento.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" size="large" href="#" color="primary">
                Saiba mais »
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Exemplo de linha de colunas */}
        <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 8 }}>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom>
                      Título
                    </Typography>
                    <Typography variant="" paragraph>
                      Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                    </Typography>
                    <Button variant="outlined" href="#" color="primary">
                      Ver detalhes »
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ maxWidth: 'lg', mx: 'auto', my: 8 }}>
          <Divider />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Modern;