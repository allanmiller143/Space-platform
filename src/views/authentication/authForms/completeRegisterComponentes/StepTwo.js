/* eslint-disable react/prop-types */
import { Box, Typography, Grid, Paper, TextField, Stack } from '@mui/material';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import { useEffect } from 'react';

const StepTwo = ({ selectedType, formData, setFormData }) => {

  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto

  useEffect(() => {
    setFormData({
      ...formData,
      email: currentUserls.email,
      phone: currentUserls.phone || formData.phone,
      name : currentUserls.name || ''
    });
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const formatPhoneNumber = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
  
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (event) => {
    const formattedPhone = formatPhoneNumber(event.target.value);
    setFormData({
      ...formData,
      phone: formattedPhone,
    });
  };

  const renderUserSpecificFields = () => {
    switch (selectedType) {
      case 'Corretor':
        return (
          <Stack spacing={1} mb={3}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Informações do Corretor
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="name">Nome</CustomFormLabel>
                  <TextField id="name" variant="outlined" fullWidth value={formData.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                  <TextField
                    id="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    disabled // Adicionado para desabilitar o campo
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="phone">Telefone</CustomFormLabel>
                  <TextField id="phone" variant="outlined" fullWidth value={formData.phone} onChange={handlePhoneChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="rg">RG</CustomFormLabel>
                  <TextField id="rg" variant="outlined" fullWidth value={formData.rg} onChange={handleChange} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="cpf">CPF</CustomFormLabel>
                  <TextField id="cpf" variant="outlined" fullWidth value={formData.cpf} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="creci">CRECI</CustomFormLabel>
                  <TextField id="creci" variant="outlined" fullWidth value={formData.creci} onChange={handleChange} />
                </Grid>
              </Grid>
              {/* <Typography variant="h6" gutterBottom mt={3}>
                Redes Sociais
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="instagram">Instagram (opcional)</CustomFormLabel>
                  <TextField id="instagram" variant="outlined" fullWidth value={formData.instagram} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="facebook">Facebook (opcional)</CustomFormLabel>
                  <TextField id="facebook" variant="outlined" fullWidth value={formData.facebook} onChange={handleChange} />
                </Grid>
              </Grid> */}
            </Paper>
          </Stack>
        );
      case 'Vendedor':
        return (
          <Stack spacing={1} mb={3}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Informações do Vendedor
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="name">Nome</CustomFormLabel>
                  <TextField id="name" variant="outlined" fullWidth value={formData.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                  <TextField
                    id="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    disabled // Adicionado para desabilitar o campo
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="phone">Telefone</CustomFormLabel>
                  <TextField id="phone" variant="outlined" fullWidth value={formData.phone} onChange={handlePhoneChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="rg">RG</CustomFormLabel>
                  <TextField id="rg" variant="outlined" fullWidth value={formData.rg} onChange={handleChange} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="cpf">CPF</CustomFormLabel>
                  <TextField id="cpf" variant="outlined" fullWidth value={formData.cpf} onChange={handleChange} />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        );
      case 'Imobiliária':
        return (
          <Stack spacing={3} mb={3}>
            <Paper elevation={1} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Informações da Imobiliária
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="name">Razão Social</CustomFormLabel>
                  <TextField id="name" variant="outlined" fullWidth value={formData.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                  <TextField
                    id="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    disabled // Adicionado para desabilitar o campo
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="phone">Telefone</CustomFormLabel>
                  <TextField id="phone" variant="outlined" fullWidth value={formData.phone} onChange={handlePhoneChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="creci">Creci</CustomFormLabel>
                  <TextField id="creci" variant="outlined" fullWidth value={formData.creci} onChange={handleChange} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="cnpj">CNPJ</CustomFormLabel>
                  <TextField id="cnpj" variant="outlined" fullWidth value={formData.cnpj} onChange={handleChange} />
                </Grid>
              </Grid>
              {/* <Typography variant="h6" gutterBottom mt={3}>
                Redes Sociais
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="socialOne">Instagram (opcional)</CustomFormLabel>
                  <TextField id="socialOne" variant="outlined" fullWidth value={formData.socialOne} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="socialTwo">Facebook (opcional)</CustomFormLabel>
                  <TextField id="socialTwo" variant="outlined" fullWidth value={formData.socialTwo} onChange={handleChange} />
                </Grid>
              </Grid> */}
            </Paper>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {renderUserSpecificFields()}
    </Box>
  );
};

export default StepTwo;
