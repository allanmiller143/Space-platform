/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import StepOne from './completeRegisterComponentes/StepOne';
import StepTwo from './completeRegisterComponentes/StepTwo';
import StepThree from './completeRegisterComponentes/StepThree';
import StepFour from './completeRegisterComponentes/StepFour';

const AuthCompleteRegister = ({ title, subtitle, subtext }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
    rg: '',
    cpf: '',
    creci: '',
    cnpj: '',
    socialLinks: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    CEP : '',
    profilePhoto: '', 
    bio: ''           
  });
  const [dropdownLocaleValue, setDropdownLocaleValue] = useState(''); 
  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleFinish = () => {
    console.log(formData);
  };

  const steps = [
    {
      label: 'Perfil',
      content: (<StepOne {...{ selectedType, setSelectedType, formData, setFormData }} />),
    },
    {
      label: 'Informações Pessoais',
      content: (<StepTwo {...{ selectedType, formData, setFormData }} />)
    },
    {
      label: 'Endereço',
      content: (<StepThree {...{ formData, setFormData, setDropdownLocaleValue, selectedType }} />)
    },
    {
      label: 'Foto e Biografia',
      content: (<StepFour {...{ formData, setFormData }} />)
    },
  ];
  

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {subtext}
      </Typography>
      <Box mt={3}>
        {steps[activeStep].content}
      </Box>
      <Box mt={2} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
          disabled={!selectedType && activeStep === 0} // Bloquear se não houver tipo selecionado no primeiro passo
        >
          {activeStep === steps.length - 1 ? 'Finalizar Cadastro' : 'Próximo'}
        </Button>
      </Box>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
        {steps.map((step,) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {subtitle}
    </>
  );
};

export default AuthCompleteRegister;
