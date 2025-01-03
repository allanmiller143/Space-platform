import PageContainer from 'src/components/container/PageContainer';
import FilteringTable from "src/components/react-tables/filter/imoveisTabela";
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import houseImage from 'src/assets/images/ilustracoes/house.png';
import { Container, Grid, Stack } from '@mui/material';
import { Add as IconPlus } from '@mui/icons-material';
import { IconCalendar } from '@tabler/icons';
function Page() {
  const navigate = useNavigate();

  return (
    <>
      <PageContainer title="Central de Imóveis" description="Gerencie seus imóveis de forma eficiente">
        <Container maxWidth="lg" sx={{ bgcolor: 'primary.light', py: 4, mb: 4,  borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" component="h1" gutterBottom>
                Imóveis
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph fontWeight={400}>
                Aqui você pode gerenciar todos os seus imóveis de forma fácil e eficiente. Publique novos anúncios, atualize informações existentes e mantenha seus prontos para venda.
              </Typography>
              <Stack direction="row" spacing={2} mt={4}>
              <Button 
                  variant="contained" 
                  onClick={() => navigate('/apps/imoveis/edit', { state: { mode: 'add' } })}
                  color="primary" 
                  startIcon={<IconPlus size={20} />}
                >
                  Adicionar Novo Imóvel
                </Button>
                <Button variant="outlined" href="#" color="primary" startIcon={<IconCalendar size={20} />} onClick={() => navigate('/apps/agenda')}>
                  Cadastrar Horários para visitas
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
