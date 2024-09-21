/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid, Typography, Button, Stack } from '@mui/material';
import CustomTextField from '../../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel';
import { useEffect, useState } from 'react';


const DadosPessoais = () => {

    
  const [formData, setFormData] = useState({
    tipoDeAnuncio: '',
    tipoDeImovel : '',
    descricao : '',
    andar : '',
    precoDeVenda: '',
    precoDeAluguel: '',
    negociavel: false,
    iptu: '',
    taxasExtras: '',
    quartos: '',
    banheiros: '',
    vaga: '',
    suites : '',
    mobiliado : '',
    cep : '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
    opcoesRapidas : {},
    area: '',
    aceitaFinanciamento : true,
  });


  return (
    <>
      <Typography variant="h5" mb={1}>
        Detalhes Pessoais
      </Typography>
      <Typography color="textSecondary" mb={3}>
        Para alterar seus detalhes pessoais, edite e salve aqui
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="text-name">Nome</CustomFormLabel>
            <CustomTextField id="text-name" value="Mathew Anderson" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="text-store-name">Nome da Loja</CustomFormLabel>
            <CustomTextField id="text-store-name" value="Maxima Studio" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="text-location">Localização</CustomFormLabel>

          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="text-currency">Moeda</CustomFormLabel>

          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="text-email">E-mail</CustomFormLabel>
            <CustomTextField id="text-email" value="info@modernize.com" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="text-phone">Telefone</CustomFormLabel>
            <CustomTextField id="text-phone" value="+91 12345 65478" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <CustomFormLabel htmlFor="text-address">Endereço</CustomFormLabel>
            <CustomTextField id="text-address" value="814 Howard Street, 120065, India" variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </form>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
        <Button size="large" variant="contained" color="primary">
          Salvar
        </Button>
        <Button size="large" variant="text" color="error">
          Cancelar
        </Button>
      </Stack>
    </>
  );
};

export default DadosPessoais;
