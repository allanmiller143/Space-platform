import { Card, CardContent, Typography, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const PaginaEmBranco = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Página em Branco',
    },
  ];

  return (
    <PageContainer title="Página em Branco" description="">
      <Breadcrumb title="Página em Branco" items={BCrumb} />
      <Card>
        <CardContent>
          <Box>
            <Typography variant="h4">Conteúdo da Página em Branco</Typography>
            <Typography variant="body1" mt={2}>
              Adicione seu conteúdo aqui.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default PaginaEmBranco;