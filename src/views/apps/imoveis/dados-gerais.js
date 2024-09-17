/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

const CustomSelect = styled((props) => <Select {...props} />)(({}) => ({}));

const DadosGerais = () => {
  const [tipoImovel, setTipoImovel] = React.useState('');
  const [finalidade, setFinalidade] = React.useState('');

  const handleTipoImovelChange = (event) => {
    setTipoImovel(event.target.value);
  };

  const handleFinalidadeChange = (event) => {
    setFinalidade(event.target.value);
  };

  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ mb: 2 }}>Dados Gerais do Imóvel</Typography>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="tipo-imovel">Tipo de Imóvel</CustomFormLabel>
            <CustomSelect
              value={tipoImovel}
              onChange={handleTipoImovelChange}
              label="Tipo de Imóvel"
              id="tipo-imovel"
            >
              <MenuItem value="Apartamento">Apartamento</MenuItem>
              <MenuItem value="Casa">Casa</MenuItem>
              <MenuItem value="Terreno">Terreno</MenuItem>
              <MenuItem value="Sala Comercial">Sala Comercial</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomFormLabel htmlFor="descricao-imovel">Descrição</CustomFormLabel>
          <CustomTextField
            id="descricao-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="finalidade-imovel">Finalidade</CustomFormLabel>
            <CustomSelect
              value={finalidade}
              onChange={handleFinalidadeChange}
              label="Finalidade"
              id="finalidade-imovel"
            >
              <MenuItem value="Venda">Venda</MenuItem>
              <MenuItem value="Aluguel">Aluguel</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="preco-imovel">Preço</CustomFormLabel>
          <CustomTextField
            id="preco-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="area-total-imovel">Área Total (m²)</CustomFormLabel>
          <CustomTextField
            id="area-total-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="area-construida-imovel">Área Construída (m²)</CustomFormLabel>
          <CustomTextField
            id="area-construida-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="numero-quartos-imovel">Número de Quartos</CustomFormLabel>
          <CustomTextField
            id="numero-quartos-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="numero-banheiros-imovel">Número de Banheiros</CustomFormLabel>
          <CustomTextField
            id="numero-banheiros-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="numero-suites-imovel">Número de Suítes</CustomFormLabel>
          <CustomTextField
            id="numero-suites-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="vagas-garagem-imovel">Vagas de Garagem</CustomFormLabel>
          <CustomTextField
            id="vagas-garagem-imovel"
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

export default DadosGerais;
