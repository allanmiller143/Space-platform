import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import Step1 from './Step1/Step1';

const HorizontalStepper = () => {
  // Estado para o passo atual
  const [activeStep, setActiveStep] = useState(0);

  // Definir os passos do stepper
  const steps = ['Passo 1', 'Passo 2', 'Passo 3', 'Passo 4'];

  // Função para avançar para o próximo passo
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // Função para voltar para o passo anterior
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const showStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Step1  />;
      // case 1:
      //   return <Step2 />;
      // case 2:
      //   return <Step3 />;
      // case 3:
      //   return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {showStepContent()}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        {/* Botão Voltar */}
        <Button
          color="inherit"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Voltar
        </Button>
        
        {/* Botão Avançar */}
        <Button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Avançar
        </Button>
      </Box>
    </Box>
  );
};

export default HorizontalStepper;
