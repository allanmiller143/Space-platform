import { useContext, useState } from "react";
import {
  TextField, Box, Typography, Grid, Button, Select, MenuItem,
  FormControl, InputLabel
} from "@mui/material";
import InputMask from 'react-input-mask';
import ContractContext from "../../ContractContext/ContractContext";
import { handleCepChange } from "./Functions/Validations";
import { validateClientInfo } from "./Functions/ValidateClientInfo";

function ClientInfoStep() {
  const [errors, setErrors] = useState({});
  const { setHistory, history, setCurrentStep } = useContext(ContractContext);
  const maritalStatusOptions = ["Solteiro", "Casado", "Divorciado", "Viúvo"];
  const professionOptions = ["Autônomo", "Empregado", "Empresário", "Estudante"];
  const stateOptions = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if(name === "cpf"){
      const formattedCPF = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
      event.target.value = formattedCPF;
    }
    setHistory((prev) => ({
      ...prev,
      client: { ...prev.client, [name]: value },
    }));

    setErrors((prev) => ({ ...prev, [name]: value ? "" : "Campo obrigatório" }));
  };

  const handleNext = () => {
    const validationErrors = validateClientInfo(history.client || {});
    
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep((prev) => prev + 2);
      console.log(history);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Box>
      {/* Sessão: Informações Pessoais */}
      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        Informações Pessoais
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Nome Completo" name="fullName" onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} required  value ={history.client?.fullName || ""}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.maritalStatus}>
            <InputLabel>Estado Civil</InputLabel>
            <Select name="maritalStatus" value={history.client?.maritalStatus || ""} onChange={handleChange}>
              {maritalStatusOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.profession}>
            <InputLabel>Profissão</InputLabel>
            <Select name="profession" value={history.client?.profession || ""} onChange={handleChange}>
              {professionOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="RG" name="rg" onChange={handleChange} error={!!errors.rg} helperText={errors.rg} required value ={history.client?.rg || ""} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="CPF" name="cpf" onChange={handleChange} error={!!errors.cpf} helperText={errors.cpf} required value ={history.client?.cpf || ""}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Telefone/WhatsApp" name="phone" onChange={handleChange} error={!!errors.phone} helperText={errors.phone} required value ={history.client?.phone || ""} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="E-mail" name="email" onChange={handleChange} error={!!errors.email} helperText={errors.email} required value ={history.client?.email || ""} />
        </Grid>
      </Grid>
      
      {/* Sessão: Endereço */}
      <Typography variant="subtitle1" sx={{ mt: 4 }}>
        Endereço
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
            <InputMask
                mask="99999-999"
                name="cep"
                label="CEP"
                id="cep"
                onChange={(e) => handleCepChange(e.target.value,setHistory )}
                value ={history.client?.cep || ""}
            >
            {(inputProps) => (
            <TextField
                id="cep"
                variant="outlined"
                fullWidth
                margin="normal"
                label="CEP"
            />
            )}
            </InputMask>          
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Rua" name="street" onChange={handleChange} error={!!errors.street} helperText={errors.street} required value ={history.client?.street || ""} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Número" name="number" onChange={handleChange} error={!!errors.number} helperText={errors.number} required value ={history.client?.number || ""} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Bairro" name="neighborhood" onChange={handleChange} error={!!errors.neighborhood} helperText={errors.neighborhood} required  value ={history.client?.neighborhood || ""}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Cidade" name="city" onChange={handleChange} error={!!errors.city} helperText={errors.city} required value ={history.client?.city || ""} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.state}>
            <InputLabel>Estado</InputLabel>
            <Select name="state" value={history.client?.state || ""} onChange={handleChange}>
              {stateOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Button variant="contained" color="primary" sx={{ mt: 4 }} fullWidth onClick={handleNext}>
        Enviar proposta ao dono do imóvel
      </Button>
    </Box>
  );
}

export default ClientInfoStep;
