import PageContainer from 'src/components/container/PageContainer';
import FilteringTable from "src/components/react-tables/filter/pageimoveis";
import { Box, Typography, Badge } from '@mui/material';
import { Button } from '@mui/material';
// Importe a imagem
import houseImage from 'src/assets/images/ilustracoes/house.png';
import { Container, Grid, Stack } from '@mui/material';
import { Add as IconPlus, InfoOutlined as IconInfoCircle } from '@mui/icons-material';
function Page() {
  return (
    <>
      <PageContainer title="Central de Imóveis" description="Gerencie seus imóveis de forma eficiente">
        <Container maxWidth="lg" sx={{ bgcolor: 'primary.light', py: 4, mb: 4,  borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" component="h1" gutterBottom>
                Bem-vindo à sua lista de Imóveis
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph fontWeight={400}>
                Aqui você pode gerenciar todos os seus imóveis de forma fácil e eficiente. Publique novos anúncios, atualize informações existentes e mantenha seus prontos para venda.
              </Typography>
              <Stack direction="row" spacing={2} mt={4}>
                <Button variant="contained" href="/apps/imoveis/edit" color="primary" startIcon={<IconPlus size={20} />}>
                  Adicionar Novo Imóvel
                </Button>
                <Button variant="outlined" href="#" color="primary" startIcon={<IconInfoCircle size={20} />}>
                  Saiba como funciona
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4} container justifyContent="center" alignItems="center">
              <img src={houseImage} alt="Ilustração de casa" width={180} />
            </Grid>
          </Grid>
        </Container>
        <FilteringTable />
      </PageContainer>
    </>
  );
}

export default Page;
