/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import StepOne from './completeRegisterComponentes/StepOne';
import StepTwo from './completeRegisterComponentes/StepTwo';
import StepThree from './completeRegisterComponentes/StepThree';
import StepFour from './completeRegisterComponentes/StepFour';
import { toast } from 'sonner';

// Função para validar email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Função para validar CPF
const isValidCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11) return false;

  // Elimina CPFs inválidos conhecidos
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Valida CPF
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[10])) return false;

  return true;
};

// Função para validar CNPJ
const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Valida CNPJ
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 12; i++) sum += parseInt(cnpj[i - 1]) * (13 - i);
  remainder = (sum % 11);
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  if (remainder !== parseInt(cnpj[12])) return false;

  sum = 0;
  for (let i = 1; i <= 13; i++) sum += parseInt(cnpj[i - 1]) * (14 - i);
  remainder = (sum % 11);
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  if (remainder !== parseInt(cnpj[13])) return false;

  return true;
};

// Função para validar telefone
const isValidPhone = (phone) => /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?[\d-.\s]{7,13}$/.test(phone);

// Função para validar CRECI
const isValidCRECI = (creci) => /^CRECI-[A-Z]{2} \d{5}$/.test(creci);

const AuthCompleteRegister = ({ title, subtitle, subtext }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [canGoNext, setCanGoNext] = useState(true);
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
    cep: '',
    profilePhoto: '',
    bio: ''
  });
  const [ setDropdownLocaleValue] = useState('');

  const isStepTwoValid = () => {
    const { name, email, phone, cpf, rg, creci, cnpj } = formData;

    if (!name || !email || !phone) {
      toast.warning("Por favor, preencha todos os campos obrigatórios antes de prosseguir.");
      return false;
    }

    if (!isValidEmail(email)) {
      toast.warning("O e-mail deve ter o formato: exemplo@dominio.com.");
      return false;
    }

    if (!isValidPhone(phone)) {
      toast.warning("O telefone deve ter o formato: +55 (11) 98765-4321 ou 98765-4321.");
      return false;
    }

    if (selectedType === 'Corretor') {
      if (!cpf || !rg || !creci || !isValidCPF(cpf) || !isValidCRECI(creci)) {
        if(!isValidCPF(cpf) ){
          toast.warning("Para 'Corretor', CPF deve ter 11 dígitos e RG deve ser fornecido.");
          return false;
        }else if(!isValidCRECI(creci)){
          toast.warning("Para 'Corretor', CRECI deve estar no formato: CRECI-XX 12345.");
          return false;
        }
        toast.warning("Para 'Corretor', CPF deve ter 11 dígitos e CRECI deve estar no formato: CRECI-XX 12345.");
        return false;
      }
    } else if (selectedType === 'Vendedor') {
      if (!cpf || !rg || !isValidCPF(cpf)) {
        if(!isValidCPF(cpf) ){
          toast.warning("Para 'Vendedor', CPF deve ter 11 dígitos e RG deve ser fornecido.");
          return false;
        }
        toast.warning("Para 'Vendedor', CPF deve ter 11 dígitos e RG deve ser fornecido.");
        return false;
      }
    } else if (selectedType === 'Imobiliária') {
      if (!cnpj || !creci || !isValidCNPJ(cnpj) || !isValidCRECI(creci)) {
        if(!isValidCNPJ(cnpj) ){
          toast.warning("Para 'Imobiliária', CNPJ deve ter 14 dígitos e CRECI deve estar no formato: CRECI-XX 12345.");
          return false;
        }
        else if(!isValidCRECI(creci)){
          toast.warning("Para 'Imobiliária', CRECI deve estar no formato: CRECI-XX 12345.");
          return false;
        }
        toast.warning("Para 'Imobiliária', CNPJ deve ter 14 dígitos e CRECI deve estar no formato: CRECI-XX 12345.");
        return false;
      }
    }

    return true;
  };

  const isStepThreeValid = () => {
    const { street, number, neighborhood, city, state, cep } = formData;

    if (!street || !number || !neighborhood || !city || !state || !cep) {
      toast.warning("Por favor, preencha todos os campos de endereço: Rua, Número, Bairro, Cidade, Estado e CEP.");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (activeStep === 1 && !isStepTwoValid()) {
      return; // Validação falhou, não prossiga
    }

    if (activeStep === 2 && !isStepThreeValid()) {
      return; // Validação falhou, não prossiga
    }

    if (canGoNext) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleFinish = () => {
    console.log(formData);
    toast.success("Cadastro finalizado com sucesso!");
  };

  const steps = [
    {
      label: 'Perfil',
      content: (
        <StepOne {...{ selectedType, setSelectedType, formData, setFormData }} />
      ),
    },
    {
      label: 'Informações Pessoais',
      content: (
        <StepTwo {...{ selectedType, formData, setFormData, canGoNext, setCanGoNext }} />
      ),
    },
    {
      label: 'Endereço',
      content: (
        <StepThree {...{ formData, setFormData, setDropdownLocaleValue, selectedType }} />
      ),
    },
    {
      label: 'Foto e Biografia',
      content: (
        <StepFour {...{ formData, setFormData }} />
      ),
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
          disabled={(!selectedType && activeStep === 0) || !canGoNext}
        >
          {activeStep === steps.length - 1 ? 'Finalizar Cadastro' : 'Próximo'}
        </Button>
      </Box>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
        {steps.map((step) => (
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
