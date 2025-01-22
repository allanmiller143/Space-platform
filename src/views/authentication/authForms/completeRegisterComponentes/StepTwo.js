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

  const formatCNPJ = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 5) {
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
    } else if (cleaned.length <= 12) {
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
    } else {
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
    }
  };
  
  const handleCNPJChange = (event) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setFormData({
      ...formData,
      cnpj: formattedCNPJ,
    });
  };

  const handlePhoneChange = (event) => {
    const formattedPhone = formatPhoneNumber(event.target.value);
    setFormData({
      ...formData,
      phone: formattedPhone,
    });
  };

  const formatCPF = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    } else if (cleaned.length <= 9) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    } else if (cleaned.length <= 11) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
    }

    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  };

  const handleCPFChange = (event) => {
    const formattedCPF = formatCPF(event.target.value);
    setFormData({
      ...formData,
      cpf: formattedCPF,
    });
  };

  const formatRG = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 5) {
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
    } else {
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}-${cleaned.slice(8, 9)}`;
    }
  };
  
  const handleRGChange = (event) => {
    const formattedRG = formatRG(event.target.value);
    setFormData({
      ...formData,
      rg: formattedRG,
    });
  };

  const renderUserSpecificFields = () => {
    switch (selectedType) {
      case 'Corretor':
        return (
          <Stack spacing={1} mb={3}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom pb={2}> 
                Informações do Corretor
              </Typography>
              <Grid container spacing={2} pb ={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="name" >Nome</CustomFormLabel>
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
              <Grid container spacing={2}  pb ={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="phone">Telefone</CustomFormLabel>
                  <TextField id="phone" variant="outlined" fullWidth value={formData.phone} onChange={handlePhoneChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="rg">RG</CustomFormLabel>
                  <TextField id="rg" variant="outlined" fullWidth value={formData.rg} onChange={handleRGChange} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="cpf">CPF</CustomFormLabel>
                  <TextField id="cpf" variant="outlined" fullWidth value={formData.cpf} onChange={handleCPFChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="creci">CRECI</CustomFormLabel>
                  <TextField id="creci" variant="outlined" fullWidth value={formData.creci} onChange={handleChange} helperText="Ex. CRECI-XX 00000" />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        );
      case 'Proprietário':
        return (
          <Stack spacing={1} mb={3}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom  pb ={2}>
                Informações do Proprietário
              </Typography>
              <Grid container spacing={2}  pb ={2}>
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
              <Grid container spacing={2}  pb ={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="phone">Telefone</CustomFormLabel>
                  <TextField id="phone" variant="outlined" fullWidth value={formData.phone} onChange={handlePhoneChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="rg">RG</CustomFormLabel>
                  <TextField id="rg" variant="outlined" fullWidth value={formData.rg} onChange={handleRGChange} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="cpf">CPF</CustomFormLabel>
                  <TextField id="cpf" variant="outlined" fullWidth value={formData.cpf} onChange={handleCPFChange} />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        );
      case 'Imobiliária':
        return (
          <Stack spacing={3} mb={3}>
            <Paper elevation={1} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom  pb ={2}>
                Informações da Imobiliária
              </Typography>
              <Grid container spacing={2}  pb ={2}>
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
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="phone">Telefone</CustomFormLabel>
                  <TextField id="phone" variant="outlined" fullWidth value={formData.phone} onChange={handlePhoneChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="creci">Creci</CustomFormLabel>
                  <TextField id="creci" variant="outlined" fullWidth value={formData.creci} onChange={handleChange}  helperText="Ex. CRECI-XX 00000" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="cnpj">CNPJ</CustomFormLabel>
                  <TextField id="cnpj" variant="outlined" fullWidth value={formData.cnpj} onChange={handleCNPJChange}  />
                </Grid>
              </Grid>
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
