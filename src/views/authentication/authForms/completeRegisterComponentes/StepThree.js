/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, Grid, Card, CardContent, Avatar, Stack, TextField, Paper, Select, MenuItem } from '@mui/material';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import DropDownFilter from '../DropDownFilter';

const StepThree = ({ selectedType, formData, setFormData,setDropdownLocaleValue }) => {


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


  const renderAddressFields = () => (
    <Stack spacing={3} mb={3}>
      <Paper elevation={1} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Informações do Endereço
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="CEP">CEP</CustomFormLabel>
            <TextField id="CEP" variant="outlined" fullWidth value={formData.cep} onChange={handleChange} />
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
            <DropDownFilter handleSelectChange={handleSelectChange} data={{ label: '', itens: localItens }} className="WhoAreYouPage__dropdown"/>
            </Grid>
        </Grid>
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
