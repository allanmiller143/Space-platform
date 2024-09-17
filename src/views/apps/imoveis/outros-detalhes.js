/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, FormControl, MenuItem, Select } from "@mui/material";
import CheckboxesGroup from './CheckBoxGroup/CheckBoxGroup';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const CustomSelect = styled((props) => <Select {...props} />)(({}) => ({}));



const OutrosDetalhes = ({ formData, setFormData }) => {
  const mobiliadoChange = (event) => {
    setFormData({ ...formData, mobiliado: event.target.value });
  };
  const aceitaFinanciamentoChange = (event) => {
    setFormData({ ...formData, aceitaFinanciamento: event.target.value });
  };

  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ mb: 2 }}>Outros Detalhes</Typography>
      <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
          <CustomFormLabel htmlFor="complemento">Descrição</CustomFormLabel>
          <CustomTextField
            id="descricao"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            value={formData.descricao}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="Mobiliado">Mobiliado</CustomFormLabel>
            <CustomSelect
              value={formData.mobiliado}
              onChange={mobiliadoChange}
              label="Mobiliado"
              id="Mobiliado"
            >
              <MenuItem value="Mobilizado">Mobiliado</MenuItem>
              <MenuItem value="Semi-mobiliado">Semi-mobiliado</MenuItem>
              <MenuItem value="Não-mobiliado">Não-mobiliado</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="Aceita financiamento">Aceita financiamento</CustomFormLabel>
            <CustomSelect
              value={formData.aceitaFinanciamento}
              onChange={aceitaFinanciamentoChange}
              label="Aceita financiamento"
              id="Aceita financiamento"
            >
              <MenuItem value={true}>sim</MenuItem>
              <MenuItem value={false}>Não</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
      </Grid>
      {formData.tipoDeImovel !== 'Terreno'  && (

      <Grid item xs={12} md={12}>
          <CustomFormLabel htmlFor="lado-imovel" sx ={{ fontSize: 25 }}>Comodidades (opcional)</CustomFormLabel>
          <CheckboxesGroup  formData = {formData} setFormData={setFormData}
          data = {{label: '', 
            itens: [
              {value: 'Piscina', label: 'Piscina',checked: formData.piscina},
              {value: 'Churrasqueira', label: 'Churrasqueira',checked: formData.Churrasqueira},
              {value: 'Ar_Condicionado', label: 'Ar Condicionado',checked: formData.Ar_Condicionado},
              {value: 'Playground', label: 'Playground',checked: formData.Playground},
              {value: 'Sala_de_eventos', label: 'Sala de eventos',checked: formData.Sala_de_eventos},
              {value: 'Academia', label: 'Academia',checked: formData.Academia},
              {value: 'Varanda', label: 'Varanda',checked: formData.Varanda},
              {value: 'Energia_solar', label: 'Energia solar',checked: formData.Energia_solar},
              {value: 'Portaria_24h', label: 'Portaria 24h',checked: formData.Portaria_24h},
              {value: 'Quintal', label: 'Quintal',checked: formData.Quintal},
              {value: 'Area_Gourmet', label: 'Área Gourmet',checked: formData.Area_Gourmet},
              {value: 'Sacada', label: 'Sacada',checked: formData.Sacada},
              {value: 'Laje', label: 'Laje',checked: formData.Laje},
              {value: 'Condominio_fechado', label: 'Condomínio fechado',checked: formData.Condominio_fechado},
              {value: 'Jardin', label: 'Jardin',checked: formData.Jardin},

            ]}}/>
        </Grid>
      )}
    </Box>
  );
};

export default OutrosDetalhes;
