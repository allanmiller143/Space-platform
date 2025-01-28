import {Box,Button,Typography,Avatar,Divider,Grid, CircularProgress,} from '@mui/material';
import {isEdit,DeleteContact,} from 'src/store/apps/contacts/ContactSlice';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import { useContext, useState } from 'react';
import ContactsContext from '../../../views/apps/contacts/ContactsContext/ContactsContext';
import AceitarNegarCompartilhamentoDialog from './AceitarNegarCompartilhamentoDialog';
import InfoProprietario from './InfoProprietario';
import InfoImovel from './InfoImovel';
import PropertyInfo from '../../../views/apps/Share/Componentes/PropertyInfo';

const ContactDetails = () => {
  const {list, activeList, active, setActive, accepted, setAccepted,loading} = useContext(ContactsContext);
  const [open, setOpen] = useState(false);

  const renderCommision = () => {
    if (active.announcementType === "both") {
      return (
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#000" }}>
            Em caso de venda você recebe {active.shared.cut *100 }% do valor do imóvel. que equivale a cerca de R$
            {active.prices.sellPrice * (active.shared.cut)}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#000", mt : 1 }}>
            Em caso de aluguel você recebe {active.shared.cut *100}% do valor do imóvel. Equivalente a cerca de R$
            {active.prices.rentPrice * (active.shared.cut)}
          </Typography>
        </ Grid>
      );
    } else if (active.announcementType === "rent") {
      return (
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#000" }}>
            Em caso de aluguel você recebe {active.shared.cut * 100}% do valor do imóvel. Equivalente a cerca de R$
            {active.prices.rentPrice * (active.shared.cut)}
          </Typography>
        </ Grid>
      );
    } else {
      return (
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#000" }}>
            Em caso de venda você recebe {active.shared.cut * 100}% do valor do imóvel. que equivale a cerca de R$
            {active.prices.sellPrice * (active.shared.cut)}
          </Typography>
        </Grid>
      );
    }
  };



  return (
    <>
      {active ? (
        <>
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Detalhes do Compartilhamento </Typography>
          </Box>
          <Divider />

          <Box sx={{ height: '100%',  }} >
              <Box display={'flex'} height={'100%'} justifyContent={'space-between'} flexDirection={'column'} >
                <Box p={3}>
                  <InfoProprietario user={active}/>
                  <Divider/> <Box mt={2}></Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600} mb ={1} >Comissão</Typography>
                    {renderCommision()}
                  </Box>
                  <Box mt={2}></Box> <Divider/> <Box mt={2}></Box>
                  <PropertyInfo imovel={active} all = {true} />
                </Box>

                {
                  active.shared.status !== "accepted" ?
                    <Box p={3} gap={1} display="flex" justifyContent="flex-end">
                      <Button
                        color="error"
                        variant="contained"
                        size="small"
                        onClick={() => {setAccepted(false);setOpen(true) }}
                      >
                        Negar
                      </Button>                  
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={() => {setAccepted(true);setOpen(true) }}
                      >
                        Aceitar
                      </Button>

                    </Box>
                  : null
                }
              </Box>
          </Box>
        </>
      ) : 
      (
        activeList.length === 0 && !loading ? (
          <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
            <Box display={'flex'} justifyContent="center" alignItems={'center'} flexDirection={'column'}>
              <Typography variant="h4" textAlign={'center'}>Você não tem pedidos de compartilhamento pendentes no momento</Typography>
              <br />
              <img src={emailIcon} alt={emailIcon} width={'250px'} />
            </Box>
          </Box>
        ) 
        :
        (
          loading ? 
          <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
            <CircularProgress />
          </Box>
          :

          <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
            <Box>
              <Typography variant="h4" textAlign={'center'}>Por favor, selecione um imovel</Typography>
              <br />
              <img src={emailIcon} alt={emailIcon} width={'250px'} />
            </Box>
          </Box>
        )
      )}
      <AceitarNegarCompartilhamentoDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ContactDetails;
