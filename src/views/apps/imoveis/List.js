import PageContainer from 'src/components/container/PageContainer';
import FilteringTable from "src/components/react-tables/filter/pageimoveis";
import { Box, Typography, Badge } from '@mui/material';
import { Button } from '@mui/material';

function Page() {
  return (
    <>
      <PageContainer title="Central de Imóveis" description="Gerencie seus imóveis de forma eficiente">
        <Box sx={{ bgcolor: 'primary.light', py: 4 , mb: 4}}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Bem-vindo à sua Central de Imóveis
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Aqui você pode gerenciar todos os seus imóveis de forma fácil e eficiente. Publique novos anúncios, atualize informações existentes e mantenha seu portfólio sempre atualizado.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" size="large" href="#" color="primary">
                Adicionar Novo Imóvel »
              </Button>
              <Button variant="outlined" size="large" href="#" color="inherit" sx={{ ml: 2 }}>
                Saiba como funciona
              </Button>
            </Box>
          </Box>
        </Box>
        <FilteringTable />
      </PageContainer>
    </>
  );
}

export default Page;
