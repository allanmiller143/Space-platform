/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Typography, Grid, Divider, Button, CircularProgress, Avatar } from '@mui/material';
import { putData } from '../../../../Services/Api';
import {useNavigate} from 'react-router-dom';
import PropertyInfo from './PropertyInfo';
import { toast } from 'sonner';
import socket from "../../../../Services/socket";
const PropertyDetails = ({ formData, setActiveStep }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

   const renderCommision = (property) => {
    if (property.announcementType === "both") {
      return (
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: "#888", marginBottom: 0.5 }}>
            Comissão em caso de venda
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#000" }}>
            Em caso de vendo o anuncioante recebe {formData.comissao}% do valor do imóvel. que equivale a cerca de R$
            {property.prices.sellPrice * (formData.comissao / 100)}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#888", marginTop: 2, marginBottom: 0.5 }}>
            Comissão em caso de aluguel
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#000" }}>
            Em caso de alugando o anunciante recebe {formData.comissao}% do valor do imóvel. Equivalente a cerca de R$
            {property.prices.rentPrice * (formData.comissao / 100)}
          </Typography>
        </ Grid>
      );
    } else if (property.announcementType === "rent") {
      return (
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: "#888", marginBottom: 0.5 }}>
            Comissão em caso de aluguel
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#000" }}>
            Em caso de alugando o anunciante recebe {formData.comissao}% do valor do imóvel. Equivalente a cerca de R$
            {property.prices.rentPrice * (formData.comissao / 100)}
          </Typography>
        </ Grid>
      );
    } else {
      return (
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: "#888", marginBottom: 0.5 }}>
            Comissão em caso de venda
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#000" }}>
            Em caso de vendo o anunciante recebe {formData.comissao}% do valor do imóvel. Equivalente a cerca de R$
            {property.prices.sellPrice * (formData.comissao / 100)}
          </Typography>
        </Grid>
      );
    }
  };

  async function shareProperty() {
    setLoading(true);
    try{
      const body = {
        guestEmail : formData.selectedUser.email,
        cut : formData.comissao/100,
      }
      const response = await putData(`properties/share/${formData.property.id}`,body,token);
      if(response.status === 200){
        toast.success('Pedido enviado com sucesso');
        console.log(response);
        sendNotification(response.data.shared.id);
        navigate('/apps/imoveis/list');
      }else{
        toast.error('Ocorreu um erro ao compartilhar o imóvel, tente novamente mais tarde');
      }
    }catch(error){
      navigate('/error');
    }finally{
      setLoading(false);
    }
  }


  const sendNotification = (id) => {
      const data = {
        'sender': currentUser.email,
        'receiver': formData.selectedUser.email,
        'title': 'Novo compartilhamento',
        'type': 'share',
        "sharedPropertyId" : id
      };
      socket.emit('send_notification', data);
  };



  return(
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, width: '100%'}}>
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textAlign: 'start',
          marginBottom: 3,
          color: '#333',
        }}
      >
        Detalhes do Comparilhamento
      </Typography>

      <Divider sx={{ marginBottom: 3 }} />
      <PropertyInfo imovel={formData.property} />
      <Divider sx={{ marginY: 3 }} />
      <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Informações do Anunciante
      </Typography>

      <Grid container spacing={1} alignItems="center">
        {/* Avatar */}
        <Grid item xs={2} md = {1.5}>
          <Avatar
            alt={formData.selectedUser?.profile?.url || "Avatar"}
            src={formData.selectedUser?.profile?.url || ""}
            sx={{ width: 72, height: 72 }}
          />
        </Grid>

        {/* Informações do Anunciante */}
        <Grid item xs={10} md = {10.5}>
          <Box mb={1}>
            <Typography variant="subtitle2" sx={{ color: "#888", mb: 0.5 }}>
              Nome :  {formData.selectedUser?.name || "Não informado"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: "#888", mb: 0.5 }}>
              Contato :  {formData.selectedUser?.info?.phone || "Não informado"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>

   
      <Divider sx={{ marginY: 3 }} />

      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Dados da Comissão
      </Typography>

      <Grid container spacing={2}>
        {renderCommision(formData.property)}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <Box>
              <Button fullWidth variant="outlined" onClick={() => setActiveStep(1)}>
                Voltar
              </Button>
            </Box>
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={shareProperty}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Enviar pedido"}
              </Button>
            </Box>
          </Box>
    </Box>

  </Box>
  );
}


export default PropertyDetails;
