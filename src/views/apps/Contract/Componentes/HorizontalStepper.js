import React, { useContext, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import ContractContext from '../ContractContext/ContractContext';
import { getStepContent, handleBack } from '../Utils/StepsFunctions';

const HorizontalStepper = () => {
  // Definir os passos do stepper
  const steps = ['Passo 1', 'Passo 2', 'Passo 3', 'Passo 4','Passo 5'];
  
  // Labels dinâmicos para cada passo
  const stepLabels = [
    'Início do Processo',
    'Preenchimento de Dados',
    'Revisão do Contrato',
    'Finalização',
    'Contrato'
  ];

  const { currentStep, setCurrentStep,history } = useContext(ContractContext);

  useEffect(() => {
    if( history.negociation){
      if(history.negociation && (history.negociation.buyer === "pending" && history.negociation.seller === "pending")){
        setCurrentStep(2);
      }else if(history.negociation && (history.negociation.buyer === "pending" && history.negociation.seller === "accepted")){
        setCurrentStep(3);
      }else if(history.negociation && history.negociation.buyer === "accepted" && history.negociation.seller === "accepted"){
        setCurrentStep(4);
      }
    }
  }, [setCurrentStep]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            {/* Muda o label com base no currentStep */}
            <StepLabel>{stepLabels[index]}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {getStepContent(currentStep)}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        {/* Botão Voltar */}
        <Button
          color="inherit"
          onClick={() => handleBack(currentStep, setCurrentStep)}
          disabled={currentStep === 0}
        >
          Voltar
        </Button>
      </Box>
    </Box>
  );
};

export default HorizontalStepper;
