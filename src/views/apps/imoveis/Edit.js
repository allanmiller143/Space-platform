/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import ParentCard from '../../../components/shared/ParentCard';
import DadosGerais from './dados-gerais';
import Localizacao from './localizacao';
import Imagens from './imagens';
import OutrosDetalhes from './outros-detalhes';
import {toast} from 'sonner';
import {useNavigate} from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { postFormData } from '../../../Services/Api';

const steps = [
  'Informações Gerais do Imóvel',
  'Localização',
  'Imagens',
  'Outros Detalhes',
];

const EditImovel = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const token = localStorage.getItem('token');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);

  const [formData, setFormData] = useState({tipoDeAnuncio: '',tipoDeImovel : '',descricao : '',andar : '',precoDeVenda: '',precoDeAluguel: '',negociavel: false,iptu: '',taxasExtras: '',quartos: '',banheiros: '',vaga: '',suites : '',mobiliado : '',cep : '',rua: '',numero: '',cidade: '',estado: '',bairro: '',complemento: '',opcoesRapidas : [],area: '',aceitaFinanciamento : '',});

  const validateStep0 = () => {
    const { tipoDeAnuncio, tipoDeImovel, precoDeVenda, precoDeAluguel, quartos, banheiros, vaga, suites, andar,area } = formData;
    
    if(!tipoDeImovel ){
      toast.warning('Por favor, preencha o tipo de imóvel!');
      return false;
    }  
    if (tipoDeImovel === 'Apartamento' && !andar) {
      toast.warning('Por favor, preencha o andar do apartamento!');
      return false;
    }

    if (!tipoDeAnuncio) {
      toast.warning('Por favor, selecione o tipo de anuncio!');
      return false;
    }

    if ((tipoDeAnuncio === 'Aluguel'|| tipoDeAnuncio === 'Ambos') && !precoDeAluguel) {
      toast.warning('Por favor, insira o preço de aluguel!');
      return false;
    }

    if ((tipoDeAnuncio === 'Venda' || tipoDeAnuncio === 'Ambos') && !precoDeVenda) {
      toast.warning('Por favor, insira o preço de venda!');
      return false;
    }

    if (tipoDeImovel !== 'Terreno' && (!quartos || !banheiros || !vaga || !suites)) {
      toast.warning('Por favor, preencha todos os detalhes do imóvel, como quartos, banheiros, vaga e suítes!');
      return false;
    }

    if(!area ){
      toast.warning('Por favor, insira o tamanho do imóvel!');
      return false;
    }
    return true;
  };

  const validateStep1 = () => {
    const { cep,cidade,rua,estado,numero,bairro } = formData;
    if(!cep ){
      toast.warning('Por favor, preencha o CEP!');
      return false;
    }  
    if (!cidade) {
      toast.warning('Por favor, preencha o compo cidade!');
      return false;
    }

    if (!rua) {
      toast.warning('Por favor, preencha o compo rua!');
      return false;
    }
    if (!estado) {
      toast.warning('Por favor, preencha o compo estado!');
      return false;
    }

    if (!numero) {
      toast.warning('Por favor, preencha o compo numero!');
      return false;
    }

    if (!bairro) {
      toast.warning('Por favor, preencha o compo bairro!');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const {otherImages } = formData;
    if (otherImages.length < 5 || otherImages.length > 10) {
      toast.warning('Por favor, selecione entre 5 e 10 imagens!');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const {descricao,mobiliado,aceitaFinanciamento } = formData;
    if (!descricao) {
      toast.warning('Por favor, preencha a descricão do imóvel!');
      return false;
    }

    if (!mobiliado) {
      toast.warning('Por favor, preencha o campo mobiliado!');
      return false;
    }

    if (!aceitaFinanciamento) {
      toast.warning('Por favor, preencha o campo aceitaFinanciamento!');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async () => {
    const formJson = {
      'announcementType': formData.tipoDeAnuncio,
      'propertyType': formData.tipoDeImovel,
      'address': formData.rua,
      'city': formData.cidade,
      'district': formData.bairro,
      'state': formData.estado,
      'cep': formData.cep,
      'complement': formData.complemento,
      'size': formData.area,
      'description': formData.descricao,
      'contact': currentUserls.phone,
      'sellerEmail': currentUserls.email,
      'sellerType': currentUserls.type,
      'aditionalFees': '',
      'isHighlighted': false,
      'isPublished': true,
      'negotiable': formData.negociavel,
      'financiable' : formData.aceitaFinanciamento,
      
    };

    if(formData.tipoDeImovel === 'Apartamento'){
      formJson.floor = formData.andar;
    }

    if(formData.tipoDeAnuncio === 'Aluguel'){
      formJson.rentPrice = formData.precoDeAluguel;
    }else if( formData.tipoDeAnuncio === 'Venda'){
      formJson.sellPrice = formData.precoDeVenda;
    }else{
      formJson.rentPrice = formData.precoDeAluguel;
      formJson.sellPrice = formData.precoDeVenda;
    }

    if(formData.tipoDeImovel !== 'Terreno'){

      formJson.houseNumber = formData.numero;
      formJson.bathrooms = formData.banheiros;
      formJson.bedrooms = formData.quartos;
      formJson.parkingSpaces = formData.vaga;
      formJson.suites = formData.suites;

      formJson.playground = formData.opcoesRapidas.Playground;
      formJson.pool = formData.opcoesRapidas.Piscina;
      formJson.grill = formData.opcoesRapidas.Churrasqueira;
      formJson.airConditioning = formData.opcoesRapidas.Ar_Condicionado;
      formJson.eventArea = formData.opcoesRapidas.Sala_de_eventos;
      formJson.yard = formData.opcoesRapidas.Quintal;
      formJson.gym = formData.opcoesRapidas.Academia;
      formJson.solarEnergy = formData.opcoesRapidas.Energia_solar;
      formJson.concierge = formData.opcoesRapidas.Portaria_24h;
      formJson.balcony = formData.opcoesRapidas.Varanda;
      formJson.gourmetArea = formData.opcoesRapidas.Area_Gourmet;
      formJson.porch = formData.opcoesRapidas.Sacada;
      formJson.slab = formData.opcoesRapidas.Laje;
      formJson.gatedCommunity = formData.opcoesRapidas.Condominio_fechado; 
      formJson.garden = formData.opcoesRapidas.Jardin;
    }

    if(formData.mobiliado === 'Mobiliado'){
      formJson.furnished = 'furnished';
    }else if(formData.mobiliado === 'Semi-mobiliado'){
      formJson.furnished = 'semi-furnished';
    }else{
      formJson.furnished = 'not-furnished';
    }

    if(formData.coverImage === null){
      toast.warning('Por favor, insira uma imagem de capa!');
    }else if(formData.otherImages.length < 5 || formData.otherImages.length >10){
      toast.warning('Por favor, insira entre 5 e 10 imagens adicionais!'); 
    }else if(formData.tipoDeAnuncio === 'Ambas' && (formData.precoDeAluguel === null || formData.precoDeVenda === ''|| formData.precoDeVenda === '' || formData.precoDeVenda === null)){
      toast.warning('Por favor, insira o valor de aluguel e venda!');
    }else{
      setLoading(true);
      const form = new FormData();
      formData.otherImages.forEach((image) => {
        form.append('photo', image); // Envia as imagens adicionais
      });
      
      form.append('cover', FormData.coverImage);
      form.append('data', JSON.stringify(formJson));
      try{
        const response = await postFormData('properties' , form, token);
        if(response.status === 201 || response.status === 200){
          toast.success('Anúncio inserido com sucesso!');
          Navigate('/apps/imoveis/list');
        }
        else{
          toast.error(response.message);
        }
      }catch(error){
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    }
    
  };
  const handleNext = () => {
    if (activeStep === 0) {
      if (validateStep0()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }else if(activeStep === 1){
      if (validateStep1()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }  
    else if (activeStep === 2) {
      if (validateStep2()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    else if (activeStep === 3 && validateStep3()) {
      handleFormSubmit();
    } 
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <DadosGerais {...{ formData, setFormData }}/>;
      case 1:
        return <Localizacao {...{ formData, setFormData }}/>;
      case 2:
        return <Imagens {...{ formData, setFormData }}/>;
      case 3:
        return <OutrosDetalhes {...{ formData, setFormData }} />;
      default:
        return <Typography>Etapa não encontrada</Typography>;
    }
  };

  return (
    <PageContainer title="Editar Imóvel" description="Página para editar informações do imóvel">
      {loading && <Loading data = {{open:loading}}/>}
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
