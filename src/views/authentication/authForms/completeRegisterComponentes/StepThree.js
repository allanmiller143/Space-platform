/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Typography, Grid, TextField, Paper, Stack } from '@mui/material';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import DropDownFilter from '../DropDownFilter';
import fetchCepData from '../../../../Services/SearchCep';
import { toast } from 'sonner';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';

const StepThree = ({ selectedType, formData, setFormData, setDropdownLocaleValue }) => {
  const [cep, setCep] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedLabel = localItens.find(item => item.value === selectedValue)?.label;
    setDropdownLocaleValue(selectedLabel);
    setFormData({
      ...formData,
      state: selectedValue,
    });
  };

  const localItens = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

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
          street: cepData.street,
          city: cepData.city,
          neighborhood: cepData.district,
          state: cepData.state
        }));
        setDropdownLocaleValue(localItens.find(item => item.value === cepData.state)?.label || '');
      } catch (error) {
        toast.error(error.message);
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

  const renderAddressFields = () => (
    <Stack spacing={3} mb={3}>
      <Paper elevation={1} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Informações do Endereço
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="cep">CEP</CustomFormLabel>
            <TextField type='number' id="cep" variant="outlined" fullWidth value={formData.cep} onChange={(e) => handleCepChange(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="city">Cidade</CustomFormLabel>
            <TextField id="city" variant="outlined" fullWidth value={formData.city} onChange={handleChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="street">Rua</CustomFormLabel>
            <TextField id="street" variant="outlined" fullWidth value={formData.street} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="number">Número</CustomFormLabel>
            <TextField id="number" variant="outlined" fullWidth value={formData.number} onChange={handleChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="neighborhood">Bairro</CustomFormLabel>
            <TextField id="neighborhood" variant="outlined" fullWidth value={formData.neighborhood} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="state">Estado</CustomFormLabel>
            <DropDownFilter 
              handleSelectChange={handleSelectChange} 
              initialValue={formData.state}
              data={{ label: '', itens: localItens}} 
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom mt={3}>
          Segurança
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
            <CustomTextField
              id="password"
              variant="outlined"
              fullWidth
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />          
          </Grid>
          <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="confirmPassword">Confirmar senha</CustomFormLabel>
            <CustomTextField
              id="confirmPassword"
              variant="outlined"
              fullWidth
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />          
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" textAlign="left" mt={2}>
            A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
        </Typography>

      </Paper>
    </Stack>
  );

  return (
    <>
      {renderAddressFields()}
    </>
  );
};

export default StepThree;
