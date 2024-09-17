/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import ParentCard from '../../../components/shared/ParentCard';
import DadosGerais from './dados-gerais';
import Localizacao from './localizacao';
import Caracteristicas from './caracteristicas';
import Imagens from './imagens';
import OutrosDetalhes from './outros-detalhes';

const steps = [
  'Informações Gerais do Imóvel',
  'Localização',
  'Características',
  'Imagens',
  'Outros Detalhes',
];

const EditImovel = () => {
  const [activeStep, setActiveStep] = React.useState(1);

  const [formData, setFormData] = useState({
    tipoDeAnuncio: '',
    tipoDeImovel : '',
    descricao : '',
    andar : '',
    precoDeVenda: '',
    precoDeAluguel: '',
    negociavel: '',
    iptu: '',
    taxasExtras: '',
    quartos: '',
    banheiros: '',
    vaga: '',
    suites : '',
    mobiliado : '',
    cep : '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
    opcoesRapidas : [],
    area: '',
    aceitaFinanciamento : '',

  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <DadosGerais />;
      case 1:
        return <Localizacao {...{ formData, setFormData }}/>;
      case 2:
        return <Caracteristicas />;
      case 3:
        return <Imagens />;
      case 4:
        return <OutrosDetalhes />;
      default:
        return <Typography>Etapa não encontrada</Typography>;
    }
  };

  return (
    <PageContainer title="Editar Imóvel" description="Página para editar informações do imóvel">
      <ParentCard title="Editar Imóvel">
        <Box>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3, pb: 4, borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2, mb: 2 }}>
            {renderStepContent(activeStep)}
          </Box>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Voltar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default EditImovel;
