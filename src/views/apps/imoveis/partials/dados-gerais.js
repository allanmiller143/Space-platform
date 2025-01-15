/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Box, Typography, Grid, FormControl, MenuItem, Checkbox, FormControlLabel, Select, Tooltip, Divider, IconButton, Button } from "@mui/material";
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../../../components/forms/theme-elements/CustomSelect';
import RentDepositForm from './RentDepositForm';

const DadosGerais = ({ formData, setFormData }) => {

  const [open, setOpen] = React.useState(false);

  const handleTipoImovelChange = (event) => {
    setFormData({ ...formData, tipoDeImovel: event.target.value });
  };

  const handleFinalidadeChange = (event) => {
    if(event.target.value === 'both' || event.target.value === 'rent' ) {
      setOpen(true);
    }
    setFormData({ ...formData, tipoDeAnuncio: event.target.value });
  };

  const handleNegociavelChange = (event) => {
    setFormData({ ...formData, negociavel: event.target.checked });
  };

  const handleCaucaoChange = (event) => {
    setFormData({ ...formData, caucao: event.target.checked });

  };

  const handleAndarChange = (event) => {
    setFormData({ ...formData, andar: event.target.value });
  };

  // Função para formatar o valor como moeda (R$)
  const formatPrice = (value) => {
    if (value === undefined || value === null) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Atualiza o estado e o formData com o valor formatado
  const handleChangePrice = (fieldName) => (event) => {
    const inputValue = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    const numericValue = parseFloat(inputValue) / 100; // Converte para float
    // Atualiza o formData com o valor numérico sem formatação
    setFormData({ ...formData, [fieldName]: numericValue });
  };

  const handleRemoveCaucao = () => {
    setFormData({ ...formData, caucao: false });
  };

  return (
    <Box mt={4}>
      <RentDepositForm open={open} onClose={() => setOpen(false)} formData={formData} setFormData={setFormData} />
      <Typography variant="h2" sx={{ mb: 2 }}>Dados Gerais do Imóvel</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="tipo-imovel">Tipo de Imóvel</CustomFormLabel>
            <CustomSelect
              value={formData.tipoDeImovel}
              onChange={handleTipoImovelChange}
              label="Tipo de Imóvel"
              id="tipo-imovel"
            >
              <MenuItem value="apartment">Apartamento</MenuItem>
              <MenuItem value="house">Casa</MenuItem>
              <MenuItem value="land">Terreno</MenuItem>
              <MenuItem value="farm">Fazenda/chácaras</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>

        {formData.tipoDeImovel === 'apartment' && (
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="andar">Andar</CustomFormLabel>
            <CustomTextField
              id="andar"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.andar || ''}
              type="number"
              onChange={handleAndarChange}
            />
          </Grid>
        )}


        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <CustomFormLabel htmlFor="finalidade-imovel">Tipo de anúncio</CustomFormLabel>
            <CustomSelect
              value={formData.tipoDeAnuncio}
              onChange={handleFinalidadeChange}
              label="Finalidade"
              id="finalidade-imovel"
            >
              <MenuItem value="sell">Venda</MenuItem>
              <MenuItem value="rent">Aluguel</MenuItem>
              <MenuItem value="both">Ambos</MenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>

        {(formData.tipoDeAnuncio === 'sell' || formData.tipoDeAnuncio === 'both') && (
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="preco-venda">Preço de Venda</CustomFormLabel>
            <CustomTextField
              id="preco-venda"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formatPrice(formData.precoDeVenda)}
              onChange={handleChangePrice('precoDeVenda')}
            />
          </Grid>
        )}

        {(formData.tipoDeAnuncio === 'rent' || formData.tipoDeAnuncio === 'both') && (
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="preco-aluguel">Preço de Aluguel</CustomFormLabel>
            <CustomTextField
              id="preco-aluguel"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formatPrice(formData.precoDeAluguel)}
              onChange={handleChangePrice('precoDeAluguel')}
            />
          </Grid>
        )}

        <Grid container spacing={2} sx = {{mt: '-15px', mb: '-5px', ml: '1px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}> 
          {(formData.tipoDeAnuncio === 'sell' || formData.tipoDeAnuncio === 'rent' || formData.tipoDeAnuncio === 'both') && (
            <Grid item xs={12} >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.negociavel || false}
                    onChange={handleNegociavelChange}
                  />
                }
                label="Preço Negociável"
              />
            </Grid>
          )}

          {((formData.tipoDeAnuncio === 'rent' || formData.tipoDeAnuncio === 'both') && formData.caucao !== false) && (
              <Grid item xs={12} sm={12} sx = {{mb : '5px'}}>
              <Box
                p={2}
                border="1px solid #ddd"
                borderRadius="8px"
              >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h4">Detalhes da Caução</Typography>
                  <Box display="flex" gap={1}>
                    <Button onClick={handleRemoveCaucao} color="primary"> Remover caução</Button>
                    <Button onClick={() => setOpen(true)} color="primary"> Editar caução</Button>
                    
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1">
                    <strong>Valor da Caução:</strong> {formatPrice(formData.caucao?.valorTotal)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1">
                    <strong>Valor do Aluguel:</strong> {formatPrice(formData.caucao?.aluguel)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1">
                    <strong>Multiplicador:</strong> {formData.caucao?.multiplicador}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1">
                    <strong>Parcelas:</strong> {formData.caucao?.maximoParcelas}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

        </Grid>

        {(formData.tipoDeImovel === 'apartment' || formData.tipoDeImovel === 'house' || formData.tipoDeImovel === 'farm') && (
          <>
            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor="numero-quartos-imovel">Número de Quartos</CustomFormLabel>
              <CustomTextField
                id="numero-quartos-imovel"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                onChange={(e) => setFormData({ ...formData, quartos: e.target.value })}
                value={formData.quartos || ''}
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
                onChange={(e) => setFormData({ ...formData, banheiros: e.target.value })}
                value={formData.banheiros || ''}
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
                onChange={(e) => setFormData({ ...formData, suites: e.target.value })}
                value={formData.suites || ''}
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
                onChange={(e) => setFormData({ ...formData, vaga: e.target.value })}
                value={formData.vaga || ''}
              />
            </Grid>
          </>
        )}

  
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="area-total-imovel">Área Total (m²)</CustomFormLabel>
          <CustomTextField
            id="area-total-imovel"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            value={formData.area || ''}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DadosGerais;
