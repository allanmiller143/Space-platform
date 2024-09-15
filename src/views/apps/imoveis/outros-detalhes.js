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

const OutrosDetalhes = () => {
  const [codigoImovel, setCodigoImovel] = React.useState('');
  const [disponibilidade, setDisponibilidade] = React.useState('');
  const [dataCadastro, setDataCadastro] = React.useState('');
  const [nomeProprietario, setNomeProprietario] = React.useState('');
  const [contato, setContato] = React.useState('');

  const handleCodigoImovelChange = (event) => {
    setCodigoImovel(event.target.value);
  };

  const handleDisponibilidadeChange = (event) => {
    setDisponibilidade(event.target.value);
  };

  const handleDataCadastroChange = (event) => {
    setDataCadastro(event.target.value);
  };

  const handleNomeProprietarioChange = (event) => {
    setNomeProprietario(event.target.value);
  };

  const handleContatoChange = (event) => {
    setContato(event.target.value);
  };

  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ mb: 2 }}>Outros Detalhes</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="codigo-imovel">Código do Imóvel</CustomFormLabel>
          <CustomTextField
            id="codigo-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={codigoImovel}
            onChange={handleCodigoImovelChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="disponibilidade">Disponibilidade</CustomFormLabel>
            <CustomSelect
              value={disponibilidade}
              onChange={handleDisponibilidadeChange}
              label="Disponibilidade"
              id="disponibilidade"
            >
              <MenuItem value="Disponível">Disponível</MenuItem>
              <MenuItem value="Indisponível">Indisponível</MenuItem>
              <MenuItem value="Alugado">Alugado</MenuItem>
              <MenuItem value="Vendido">Vendido</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="data-cadastro">Data de Cadastro</CustomFormLabel>
          <CustomTextField
            id="data-cadastro"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            value={dataCadastro}
            onChange={handleDataCadastroChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="nome-proprietario">Nome do Proprietário/Imobiliária</CustomFormLabel>
          <CustomTextField
            id="nome-proprietario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nomeProprietario}
            onChange={handleNomeProprietarioChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="contato">Contato</CustomFormLabel>
          <CustomTextField
            id="contato"
            variant="outlined"
            fullWidth
            margin="normal"
            value={contato}
            onChange={handleContatoChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OutrosDetalhes;
