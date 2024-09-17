import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, TextField } from "@mui/material";

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

const Localizacao = () => {
  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ mb: 2 }}>Localização do Imóvel</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <CustomFormLabel htmlFor="endereco-completo">Endereço Completo</CustomFormLabel>
          <CustomTextField
            id="endereco-completo"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="cidade">Cidade</CustomFormLabel>
          <CustomTextField
            id="cidade"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="estado">Estado</CustomFormLabel>
          <CustomTextField
            id="estado"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="cep">CEP</CustomFormLabel>
          <CustomTextField
            id="cep"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bairro">Bairro</CustomFormLabel>
          <CustomTextField
            id="bairro"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="latitude">Latitude</CustomFormLabel>
          <CustomTextField
            id="latitude"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="longitude">Longitude</CustomFormLabel>
          <CustomTextField
            id="longitude"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Localizacao;
