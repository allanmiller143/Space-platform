/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, FormControl, MenuItem, Select } from "@mui/material";
import CheckboxesGroup from '../CheckBoxGroup/CheckBoxGroup';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import { useEffect, useState } from 'react';

const CustomSelect = styled((props) => <Select {...props} />)(({}) => ({}));

const OutrosDetalhes = ({ formData, setFormData }) => {
  const [descricao, setDescricao] = useState(formData.descricao || '');

  const mobiliadoChange = (event) => {
    setFormData({ ...formData, mobiliado: event.target.value });
  };
  const aceitaFinanciamentoChange = (event) => {
    setFormData({ ...formData, aceitaFinanciamento: event.target.value });
  };

  const handleDescricaoChange = (event) => {
    const value = event.target.value;
    if (value.length <= 1500) {
      setDescricao(value);
      setFormData(prevState => ({
        ...prevState,
        descricao: value
      }));
    }
  };

  useEffect(() => {
    console.log(formData);
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ mb: 2 }}>Outros Detalhes</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <CustomFormLabel htmlFor="descricao">Descrição</CustomFormLabel>
          <CustomTextField
            id="descricao"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={8}
            inputProps={{ maxLength: 1500 }}
            onChange={handleDescricaoChange}
            value={descricao}
          />
          <Typography variant="body2" color="textSecondary" align="right">
            {descricao.length}/1500
          </Typography>
        </Grid>

        {(formData.tipoDeImovel !== 'land') && (
          <Grid item xs={12} md={6} >
            <CustomFormLabel htmlFor="Mobiliado">Mobiliado</CustomFormLabel>
            <CustomSelect
              value={formData.mobiliado}
              onChange={mobiliadoChange}
              label="Mobiliado"
              id="Mobiliado"
            >
              <MenuItem value="yes">Mobiliado</MenuItem>
              <MenuItem value="partial">Semi-mobiliado</MenuItem>
              <MenuItem value="no">Não-mobiliado</MenuItem>
            </CustomSelect>
          </Grid>
        )}

        {(formData.tipoDeAnuncio !== 'rent') && (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <CustomFormLabel htmlFor="Aceita financiamento">Aceita financiamento</CustomFormLabel>
              <CustomSelect
                value={formData.aceitaFinanciamento}
                onChange={aceitaFinanciamentoChange}
                label="Aceita financiamento"
                id="Aceita financiamento"
              >
                <MenuItem value={true}>Sim</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </CustomSelect>
            </FormControl>
          </Grid>
        )}

      </Grid>
      {formData.tipoDeImovel !== 'land' && (
        <Grid item xs={12} md={12}>
          <CustomFormLabel htmlFor="lado-imovel" sx={{ fontSize: 25 }}>Comodidades (opcional)</CustomFormLabel>
          <CheckboxesGroup
            formData={formData}
            setFormData={setFormData}
            data={{
              label: '',
              itens: [
                { value: 'Piscina', label: 'Piscina', checked: formData.opcoesRapidas.Piscina },
                { value: 'Churrasqueira', label: 'Churrasqueira', checked: formData.opcoesRapidas.Churrasqueira },
                { value: 'Ar_Condicionado', label: 'Ar Condicionado', checked: formData.opcoesRapidas.Ar_Condicionado },
                { value: 'Playground', label: 'Playground', checked: formData.opcoesRapidas.Playground },
                { value: 'Sala_de_eventos', label: 'Sala de eventos', checked: formData.opcoesRapidas.Sala_de_eventos },
                { value: 'Academia', label: 'Academia', checked: formData.opcoesRapidas.Academia },
                { value: 'Varanda', label: 'Varanda', checked: formData.opcoesRapidas.Varanda },
                { value: 'Energia_solar', label: 'Energia solar', checked: formData.opcoesRapidas.Energia_solar },
                { value: 'Portaria_24h', label: 'Portaria 24h', checked: formData.opcoesRapidas.Portaria_24h },
                { value: 'Quintal', label: 'Quintal', checked: formData.opcoesRapidas.Quintal },
                { value: 'Area_Gourmet', label: 'Área Gourmet', checked: formData.opcoesRapidas.Area_Gourmet },
                { value: 'Sacada', label: 'Sacada', checked: formData.opcoesRapidas.Sacada },
                { value: 'Laje', label: 'Laje', checked: formData.opcoesRapidas.Laje },
                { value: 'Condominio_fechado', label: 'Condomínio fechado', checked: formData.opcoesRapidas.Condominio_fechado },
                { value: 'Jardim', label: 'Jardim', checked: formData.opcoesRapidas.Jardim },
              ]
            }}
          />
        </Grid>
      )}
    </Box>
  );
};

export default OutrosDetalhes;

