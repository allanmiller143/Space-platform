/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, TextField } from "@mui/material";
import { useState } from 'react';
import fetchCepData from '../../../Services/SearchCep';

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

const Localizacao = ({  formData, setFormData }) => {

  const [cep, setCep] = useState('');

  const handleCepChange = async (value) => {
    setCep(value);
    setFormData(prevState => ({
      ...prevState,
      cep: value
    }));

    if (value.length === 8) {
      try {
        const cepData = await fetchCepData(value);
        console.log(cepData);
        setFormData(prevState => ({
          ...prevState,
          rua: cepData.street,
          cidade: cepData.city,
          bairro: cepData.district,
          estado: cepData.state
        }));
      } catch (error) {
        setFormData(prevState => ({
          ...prevState,
          street: '',
          city: '',
          neighborhood: '',
          state: ''
        }));
      }
    }
  };



  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ mb: 2 }}>Localização do Imóvel</Typography>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="cep">CEP</CustomFormLabel>
          <CustomTextField
            id="cep"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleCepChange(e.target.value)}
            value={formData.cep}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="cidade">Cidade</CustomFormLabel>
          <CustomTextField
            id="cidade"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            value={formData.cidade}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="estado">Estado</CustomFormLabel>
          <CustomTextField
            id="estado"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            value={formData.estado}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bairro">Bairro</CustomFormLabel>
          <CustomTextField
            id="bairro"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
            value={formData.bairro}
          />
        </Grid>
        <Grid item xs={9} md={10}>
          <CustomFormLabel htmlFor="endereco-completo">Endereço Completo</CustomFormLabel>
          <CustomTextField
            id="endereco-completo"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
            value={formData.rua}
          />
        </Grid>
        <Grid item xs={3} md={2}>
          <CustomFormLabel htmlFor="numero">Número</CustomFormLabel>
          <CustomTextField
            id="numero"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
            value={formData.numero}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomFormLabel htmlFor="complemento">Complemento</CustomFormLabel>
          <CustomTextField
            id="complemento"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
            value={formData.complemento}
          />
        </Grid>
        <button type="submit" onClick={() => console.log(formData)}>Cadastrar</button>
      </Grid>
    </Box>
  );
};

export default Localizacao;
