import PageContainer from 'src/components/container/PageContainer';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import houseImage from 'src/assets/images/ilustracoes/house.png';
import { Grid, Stack, useMediaQuery } from '@mui/material';
import { Add as IconPlus, RepeatOneSharp } from '@mui/icons-material';
import { IconCalendar } from '@tabler/icons';
import LimitAdvice from './LimitAdvice/LimitAdvice';
import { useEffect, useState } from 'react';
import { getData } from '../../../Services/Api';
import { Box } from '@mui/system';
import FilteringTable from '../../../components/apps/TabelaMeusIMoveis/imoveisTabela'
import MobileImoveisTabela from '../../../components/apps/TabelaMeusIMoveis/mobileImoveisTabela'
function Page() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isMd = useMediaQuery((theme) => theme.breakpoints.up('md')); // Verifica se a tela é maior ou igual ao breakpoint 'md'
  const [myLimit, setMyLimit] = useState(0);
  const [myTotal, setMyTotal] = useState(0);

  async function handleOpenDialog() {
    try{
      const response = await getData('properties/limits',token);
      console.log(response);
      if(response.status === 200 || response.status === 201){
        if(response.userInfo.totalPublishProperties >= response.userInfo.publishLimit){
          setOpenDialog(true);
        }else{
          navigate('/apps/imoveis/edit', { state: { mode: 'add' } })
        }
      }else{
        navigate('/error');
      }
    }catch(e){
      navigate('/error');
    }
  }

  async function seeLimit() {
    try{
      const response = await getData('properties/limits',token);
      if(response.status === 200 || response.status === 201){
        console.log(response);
        setMyLimit(response.userInfo.publishLimit);
        setMyTotal(response.userInfo.totalHighlightedProperties + response.userInfo.totalPublishProperties);
      }else{
        navigate('/error');
      }
    }catch(e){
      navigate('/error');
    }
  }

  useEffect (() => {
    seeLimit();
  }, []);

  return (
    <>
      <PageContainer title="Central de Imóveis" description="Gerencie seus imóveis de forma eficiente">
        <LimitAdvice openDialog={openDialog} setOpenDialog={setOpenDialog}/>
        <Box  sx={{ bgcolor: 'primary.light', py: 4, mb: 4, px : 2,   borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" component="h1" gutterBottom>
                Imóveis
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph fontWeight={400} fontSize={ { xs: '14px', md: '16px' }}>
                Aqui você pode gerenciar todos os seus imóveis de forma fácil e eficiente. 
              </Typography>

              <Typography gutterBottom sx = {{mt : -2, mb: 2}}>
                vc ja postou {myTotal} de um limite de {myLimit} imóveis
              </Typography>

              <Stack sx = {{flexDirection :'row',width : '100%', alignItems : 'end', gap: 2}} spacing={2} >
                <Button 
                    variant="contained" 
                    onClick={handleOpenDialog}
                    color="primary" 
                    startIcon={<IconPlus size={20} />}
                  >
                    Novo Imóvel
                  </Button>
                  {
                    currentUser.type === 'realtor' || currentUser.type === 'realstate' ?
                    <Button variant="outlined" href="#" color="primary" startIcon={<IconCalendar size={20} />} onClick={() => navigate('/apps/agenda')}>
                      Horários
                    </Button>
                    : null 
                  }
              </Stack>
            </Grid>
            <Grid item xs={12} md={4} container justifyContent="center" alignItems="center" sx={{ display: { xs: 'none', md: 'block' } }}>
              <img src={houseImage} alt="Ilustração de casa" width={180} />
            </Grid>
          </Grid>
        </Box>
        {/* Exibe FilteringTable para telas maiores ou iguais a 'md' e MobileImoveisTabela para telas menores */}
        {isMd ? <FilteringTable /> : <MobileImoveisTabela />}

      </PageContainer>
    </>
  );
}

export default Page;
