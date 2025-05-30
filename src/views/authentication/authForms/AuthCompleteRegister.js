/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import StepOne from './completeRegisterComponentes/StepOne';
import StepTwo from './completeRegisterComponentes/StepTwo';
import StepThree from './completeRegisterComponentes/StepThree';
import StepFour from './completeRegisterComponentes/StepFour';
import { toast } from 'sonner';
import { postData, postFormData, putFormData } from '../../../Services/Api';
import Loading from '../../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
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
const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Valida os dois primeiros dígitos verificadores
  const validateCNPJDigits = (cnpj, length) => {
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += cnpj[length - i] * pos--;
      if (pos < 2) pos = 9;
    }

    const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result == cnpj[length];
  };

  // Verifica os dois dígitos verificadores
  const firstVerifierValid = validateCNPJDigits(cnpj, 12);
  const secondVerifierValid = validateCNPJDigits(cnpj, 13);

  return firstVerifierValid && secondVerifierValid;
};
const validatePassword = (password, confirmPassword) => {
  const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
  if (confirmPassword && password !== confirmPassword) {
    return [false, 'As senhas devem ser iguais.'];
  } else if (password !== '' && confirmPassword === '') {
    return [false, 'As senhas devem ser iguais.'];
  } else if (!password.match(passwordRequirements)) {
    return [false, 'Sua senha não possui as seguintes condições: 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.'];
  } else {
    return [true, ''];
  }
};

const isValidPhone = (phone) => /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?[\d-.\s]{7,13}$/.test(phone);

const isValidCRECI = (creci) =>
  /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO) (J)?\d{2,6}$/.test(creci);

const AuthCompleteRegister = ({ title, subtitle, subtext }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [canGoNext, setCanGoNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
    rg: '',
    cpf: '',
    creci: '',
    cnpj: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    profilePhoto: '',
    bio: '',
    password: '',
    confirmPassword: '',
    profilePhotoFile: null,
    creciType: '',
    creciNumber: '',
    uf :''
  });
  const [ dropdownLocaleValue,setDropdownLocaleValue] = useState('');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');
  const Navigate = useNavigate();

  const isStepTwoValid = () => {
    const { name, email, phone, cpf, rg, creci, cnpj } = formData;

    console.log(formData);
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
          toast.warning("Para 'Corretor', CRECI deve estar no formato: XX 12345.");
          return false;
        }
        toast.warning("Para 'Corretor', CPF deve ter 11 dígitos e CRECI deve estar no formato: XX 12345.");
        return false;
      }
    } else if (selectedType === 'Proprietário') {
      if (!cpf || !rg || !isValidCPF(cpf)) {
        if(!isValidCPF(cpf) ){
          toast.warning("Para 'Proprietário', CPF deve ter 11 dígitos e RG deve ser fornecido.");
          return false;
        }
        toast.warning("Para 'Proprietário', CPF deve ter 11 dígitos e RG deve ser fornecido.");
        return false;
      }
    } else if (selectedType === 'Imobiliária') {
      if (selectedType === 'Imobiliária') {
        if (!cnpj || !creci || !isValidCRECI(creci) || !isValidCNPJ(cnpj)) {
          if(!isValidCRECI(creci)){
            toast.warning("Para 'Imobiliária', CRECI deve estar no formato: XX J12345.");
            return false;
          }else if(!isValidCNPJ(cnpj)){
            toast.warning("Para 'Imobiliária', CNPJ deve ter 14 dígitos válidos.");
            return false;
          }
          toast.warning("Para 'Imobiliária', CNPJ deve ter 14 dígitos e CRECI deve estar no formato: XX 12345.");
          return false;
        }
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

    const [isValid, message] = validatePassword(formData.password, formData.confirmPassword);
    if (!isValid) {
      toast.warning(message);
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if( activeStep === 1){
      setFormData({ ...formData, creci: '', creciNumber: '', uf: '' });
    }
    
  };

  const handleFinish = async () => {
    let postDataExample = {};
    let userRoute = '';
    if(selectedType === 'Corretor'){
      postDataExample = {
        'name':formData.name,
        'email':formData.email,
        'password':formData.password,
        'phone':formData.phone,
        'rg':formData.rg.replace(/[^\d]+/g, ''),
        'creci':formData.creci,
        'cep':formData.cep,
        'cpf':formData.cpf.replace(/[^\d]+/g, ''),
        'street':formData.street,
        'number':formData.number,
        'city':formData.city,
        'neighborhood':formData.neighborhood,
        'state':formData.state,
        'bio': formData.bio,
        'socials': [
          {type : 'facebook', url : '.'},
          {type : 'whatsapp', url : formData.phone},
          {type : 'instagram', url :  '.'},
        ]
      };
      userRoute = 'realtor';
    }else if(selectedType === 'Proprietário'){
      postDataExample = { 
        'name':formData.name,
        'email':formData.email,
        'password':formData.password,
        'phone':formData.phone,
        'rg':formData.rg.replace(/[^\d]+/g, ''),
        'cep':formData.cep,
        'cpf':formData.cpf.replace(/[^\d]+/g, ''),
        'street':formData.street,
        'number':formData.number,
        'city':formData.city,
        'neighborhood':formData.neighborhood,
        'state':formData.state,
        'socials': [
          {type : 'facebook', url : '.'},
          {type : 'whatsapp', url : formData.phone},
          {type : 'instagram', url :  '.'},
        ]
      };
      userRoute = 'owner';
    }else{
      postDataExample = {
        'name':formData.name,
        'email':formData.email,
        'password':formData.password,
        'phone':formData.phone,
        'cep':formData.cep,
        'street':formData.street,
        'number':formData.number,      
        'city':formData.city,
        'neighborhood':formData.neighborhood,
        'creci':formData.creci,
        'cnpj':formData.cnpj.replace(/[^\d]+/g, ''),
        'state':formData.state,
        'bio': formData.bio,
        'socials': [
          {type : 'facebook', url : '.'},
          {type : 'whatsapp', url : formData.phone},
          {type : 'instagram', url :  '.'},
        ]
      };
      userRoute = 'realstate';
    }

    postDataExample.socials

    try {
        setLoading(true);
        const form = new FormData();  
        form.append('profile', formData.profilePhotoFile);
        form.append('data', JSON.stringify(postDataExample)); 
        let elevateTypeResponse;
        if(currentUserls ){
          elevateTypeResponse = await putFormData(`${userRoute}/elevate/${currentUserls.email}`, form, token);
        }else{
          elevateTypeResponse = await postFormData(userRoute, form);
        }

        if(elevateTypeResponse.status == 200 || elevateTypeResponse.status == 201){
          const data = {'email': postDataExample.email, 'password': postDataExample.password };
          const loginResponse = await postData('login', data);
          if (loginResponse.status === 200 || loginResponse.status === 201) {
            const token = loginResponse.data.accessToken;
            const user = loginResponse.data.user;
            console.log(loginResponse)
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify(user));
            Navigate('/apps/imoveis/edit');
            toast.success('Agora você pode anunciar imóveis');
          } else {
            toast.error(` erro no login ${userRoute}`); 
          }
        }else{
          toast.error(`${elevateTypeResponse.message}`);
        }
      } 
       catch (error) {
        toast.error('Ocorreu um erro ao criar a conta. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
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
      label: 'Endereço e Senha',
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
      {loading && <Loading data = {{open:loading}}/>}

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
