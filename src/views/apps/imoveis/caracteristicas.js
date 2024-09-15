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

const Caracteristicas = () => {
  const [posicaoSolar, setPosicaoSolar] = React.useState('');
  const [mobiliado, setMobiliado] = React.useState('');
  const [permiteAnimais, setPermiteAnimais] = React.useState('');
  const [condominioIncluso, setCondominioIncluso] = React.useState('');

  const handlePosicaoSolarChange = (event) => {
    setPosicaoSolar(event.target.value);
  };

  const handleMobiliadoChange = (event) => {
    setMobiliado(event.target.value);
  };

  const handlePermiteAnimaisChange = (event) => {
    setPermiteAnimais(event.target.value);
  };

  const handleCondominioInclusoChange = (event) => {
    setCondominioIncluso(event.target.value);
  };

  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ mb: 2 }}>Características do Imóvel</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="ano-construcao">Ano de Construção</CustomFormLabel>
          <CustomTextField
            id="ano-construcao"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="andares-predio">Andares no Prédio</CustomFormLabel>
          <CustomTextField
            id="andares-predio"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="posicao-solar">Posição Solar</CustomFormLabel>
            <CustomSelect
              value={posicaoSolar}
              onChange={handlePosicaoSolarChange}
              label="Posição Solar"
              id="posicao-solar"
            >
              <MenuItem value="Norte">Norte</MenuItem>
              <MenuItem value="Sul">Sul</MenuItem>
              <MenuItem value="Leste">Leste</MenuItem>
              <MenuItem value="Oeste">Oeste</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="mobiliado">Mobiliado</CustomFormLabel>
            <CustomSelect
              value={mobiliado}
              onChange={handleMobiliadoChange}
              label="Mobiliado"
              id="mobiliado"
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="permite-animais">Permite Animais</CustomFormLabel>
            <CustomSelect
              value={permiteAnimais}
              onChange={handlePermiteAnimaisChange}
              label="Permite Animais"
              id="permite-animais"
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="condominio-incluso">Condomínio Incluso</CustomFormLabel>
            <CustomSelect
              value={condominioIncluso}
              onChange={handleCondominioInclusoChange}
              label="Condomínio Incluso"
              id="condominio-incluso"
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="valor-condominio">Valor do Condomínio</CustomFormLabel>
          <CustomTextField
            id="valor-condominio"
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

export default Caracteristicas;
