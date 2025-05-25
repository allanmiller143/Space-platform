/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, TextField } from "@mui/material";
import { useState } from 'react';
import InputMask from 'react-input-mask';
import fetchCepData from '../../../../Services/SearchCep';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';

const Localizacao = ({ formData, setFormData }) => {
  const [cep, setCep] = useState(formData.cep || '');
  const [complemento, setComplemento] = useState(formData.complemento || '');

  const handleCepChange = async (value) => {
    const unmaskedValue = value.replace(/\D/g, ''); // Removes any non-numeric characters
    setCep(value);
    setFormData(prevState => ({
      ...prevState,
      cep: unmaskedValue
    }));

    if (unmaskedValue.length === 8) {
      try {
        const cepData = await fetchCepData(unmaskedValue);
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

  const handleComplementoChange = (value) => {
    if (value.length <= 100) {
      setComplemento(value);
      setFormData(prevState => ({
        ...prevState,
        complemento: value
      }));
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ mb: 2 }}>Localização do Imóvel</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="cep">CEP</CustomFormLabel>
          <InputMask
            mask="99999-999"
            value={cep}
            onChange={(e) => handleCepChange(e.target.value)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                id="cep"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          </InputMask>
        </Grid>

        {/* Rest of your fields */}
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="cidade">Cidade</CustomFormLabel>
          <TextField
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
          <TextField
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
          <TextField
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
          <TextField
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
          <TextField
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
          <TextField
            id="complemento"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            inputProps={{ maxLength: 100 }}
            onChange={(e) => handleComplementoChange(e.target.value)}
            value={complemento}
          />
          <Typography variant="body2" color="textSecondary" align="right">
            {complemento.length}/100
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Localizacao;
