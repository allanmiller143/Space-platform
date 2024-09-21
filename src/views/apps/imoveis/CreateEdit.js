/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState,useEffect } from 'react';
import { Grid, Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import ParentCard from '../../../components/shared/ParentCard';
import DadosGerais from './partials/dados-gerais';
import Localizacao from './partials/localizacao';
import Imagens from './partials/imagens';
import OutrosDetalhes from './partials/outros-detalhes';
import {toast} from 'sonner';
import {useNavigate} from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { postFormData, putFormData } from '../../../Services/Api';
import { useLocation } from 'react-router-dom';
import ImagensEdit from './partials/imgensEdit';
import ConfimarCadastroDialog from './partials/confimarCadastroDialog';

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
  const location = useLocation();
  const { mode, imovel } = location.state || {}; // Desestruturando o estado
  const [openAdviceDialog, setOpenAdviceDialog] = useState(false);

  const [formData, setFormData] = useState({
    tipoDeAnuncio: 'rent',
    tipoDeImovel : 'house',
    descricao : 'asds',
    andar : '1',
    precoDeVenda: '100000',
    precoDeAluguel: '500',
    negociavel: false,
    iptu: '',
    taxasExtras: '',
    quartos: '1',
    banheiros: '2',
    vaga: '1',
    suites : '1',
    mobiliado : 'yes',
    cep : '50100000',
    rua: 'Sergio Emerson da Silva Carlos',
    numero: '2',
    cidade: 's',
    estado: 'PE',
    bairro: 'sd',
    complemento: 'sd',
    opcoesRapidas : {},
    area: '23',
    aceitaFinanciamento : true,
  });

  useEffect(() => {
    if (mode === 'edit' && imovel) {
      console.log(imovel)
      setFormData({
        ...formData,
        tipoDeAnuncio: imovel.announcementType,
        tipoDeImovel: imovel.propertyType,
        descricao: imovel.description,
        precoDeVenda: imovel.prices.sellPrice || '',
        precoDeAluguel: imovel.prices.rentPrice || '',
        negociavel: imovel.negotiable,
        area: imovel.size,
        aceitaFinanciamento: imovel.financiable,
        andar: imovel.floor || '',
        iptu: imovel.iptu,
        taxasExtras: imovel.additional_fees,
        quartos: imovel.bedrooms,
        banheiros: imovel.bathrooms,
        vaga: imovel.parkingSpaces,
        suites: imovel.suites,

        cep: imovel.address.cep,
        rua: imovel.address.city,
        numero: imovel.address.number,
        bairro: imovel.address.neighborhood,
        complemento: imovel.address.complement,
        estado: imovel.address.state,
        cidade : imovel.address.city,
        id : imovel.id,
        mobiliado: imovel.furnished,

        opcoesRapidas: {
          Piscina: imovel.pool,
          Churrasqueira : imovel.grill,
          Ar_Condicionado : imovel.air_conditioning,
          Playground : imovel.playground,
          Sala_de_eventos :  imovel.event_area,
          Academia :imovel.gym,
          Varanda : imovel.porch,
          Energia_solar : imovel.solar_energy,
          Portaria_24h : imovel.concierge,
          Quintal : imovel.yard,
          Area_Gourmet : imovel.gourmet_area,
          Sacada : imovel.balcony,
          Laje : imovel.slab,
          Condominio_fechado : imovel.gated_community,
          Jardin : imovel.garden,
        },
        otherImages: imovel.pictures,
      });
    }
  }, []);
  const validateStep0 = () => {
    const { tipoDeAnuncio, tipoDeImovel, precoDeVenda, precoDeAluguel, quartos, banheiros, vaga, suites, andar,area } = formData;
    if(!tipoDeImovel ){
      toast.warning('Por favor, preencha o tipo de imóvel!');
      return false;
    }  
    if (tipoDeImovel === 'apartment' && !andar) {
      toast.warning('Por favor, preencha o andar do apartamento!');
      return false;
    }

    if (!tipoDeAnuncio) {
      toast.warning('Por favor, selecione o tipo de anuncio!');
      return false;
    }

    if ((tipoDeAnuncio === 'rent'|| tipoDeAnuncio === 'both') && !precoDeAluguel) {
      toast.warning('Por favor, insira o preço de aluguel!');
      return false;
    }

    if ((tipoDeAnuncio === 'sell' || tipoDeAnuncio === 'both') && !precoDeVenda) {
      toast.warning('Por favor, insira o preço de venda!');
      return false;
    }

    if (tipoDeImovel !== 'land' && (!quartos || !banheiros || !vaga || !suites)) {
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
    const { cep,cidade,rua,estado,numero,bairro,tipoDeImovel } = formData;
    if(!cep ){
      toast.warning('Por favor, preencha o CEP!'); return false;
    }  
    if (!cidade) {
      toast.warning('Por favor, preencha o compo cidade!'); return false;
    }
    if (!rua) {
      toast.warning('Por favor, preencha o compo rua!'); return false;
    }
    if (!estado) {
      toast.warning('Por favor, preencha o compo estado!'); return false;
    }
    if (tipoDeImovel !== 'land' && !numero) {
      toast.warning('Por favor, preencha o campo número!');
      toast.warning(tipoDeImovel);
       return false;
    }
    if (!bairro) {
      toast.warning('Por favor, preencha o compo bairro!'); return false;
    }
    return true;
  };
  const validateStep2 = () => {
    const {otherImages } = formData;
    if ( mode !== 'edit' && (otherImages.length + 1 < 5 || otherImages.length + 1 > 10)) {
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
      toast.warning('Por favor, preencha o campo aceita Financiamento!');
      return false;
    }
    return true;
  };
  const handleFormSubmit = async () => {
    const formJson = {
      'announcementType': formData.tipoDeAnuncio,
      'propertyType': formData.tipoDeImovel,
      'street': formData.rua,
      'city': formData.cidade,
      'neighborhood': formData.bairro,
      'state': formData.estado,
      'cep': formData.cep,
      'complement': formData.complemento,
      'size': formData.area,
      'description': formData.descricao,
      'contact': currentUserls.info.phone,
      'sellerEmail': currentUserls.email,
      'sellerType': currentUserls.type,
      'aditionalFees': '',
      'isHighlight': false,
      'isPublished': true,
      'negotiable': formData.negociavel,
      'financiable' : formData.aceitaFinanciamento || false,
    };

    if(formData.tipoDeImovel === 'apartment'){
      formJson.floor = formData.andar;
    }
    if(formData.tipoDeAnuncio === 'rent'){
      formJson.rentPrice = formData.precoDeAluguel;
    }else if( formData.tipoDeAnuncio === 'sell'){
      formJson.sellPrice = formData.precoDeVenda;
    }else{
      formJson.rentPrice = formData.precoDeAluguel;
      formJson.sellPrice = formData.precoDeVenda;
    }

    if(formData.tipoDeImovel !== 'land'){
      formJson.number = formData.numero;
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
      formJson.furnished = formData.mobiliado;
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
      const other = formData.otherImages.filter(file => file.name !== formData.coverImage?.name);

      other.forEach((image) => {
        form.append('photo', image); // Envia as imagens adicionais
      });
      
      form.append('cover', formData.coverImage);
      form.append('data', JSON.stringify(formJson));
      console.log(formJson)
      try{
        const response = await postFormData('properties' , form, token);
        if(response.status === 201 || response.status === 200){
          setOpenAdviceDialog(true);
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
  const handleFormSubmitEdit = async () => {
    const formJson = {
      'announcementType': formData.tipoDeAnuncio,
      'propertyType': formData.tipoDeImovel,
      'street': formData.rua,
      'city': formData.cidade,
      'neighborhood': formData.bairro,
      'state': formData.estado,
      'cep': formData.cep,
      'complement': formData.complemento,
      'size': formData.area,
      'description': formData.descricao,
      'contact': currentUserls.phone,
      'sellerEmail': currentUserls.email,
      'sellerType': currentUserls.type,
      'aditionalFees': '',
      'isHighlight': false,
      'isPublished': true,
      'negotiable': formData.negociavel,
      'financiable' : formData.aceitaFinanciamento,      
    };

    if(formData.tipoDeImovel === 'apartment'){
      formJson.floor = formData.andar;
    }

    if(formData.tipoDeAnuncio === 'rent'){
      formJson.rentPrice = formData.precoDeAluguel;
    }else if( formData.tipoDeAnuncio === 'sell'){
      formJson.sellPrice = formData.precoDeVenda;
    }else{
      formJson.rentPrice = formData.precoDeAluguel;
      formJson.sellPrice = formData.precoDeVenda;
    }

    if(formData.tipoDeImovel !== 'land'){
      formJson.number = formData.numero;
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
      formJson.furnished = formData.mobiliado;

    }
    if(formData.coverImage === null){
      toast.warning('Por favor, insira uma imagem de capa!');
    }else if(formData.otherImages.length + formData.newImages.length < 5 || formData.otherImages.length + formData.newImages.length  >10){
      toast.warning('Por favor, insira entre 5 e 10 imagens adicionais!'); 
    }else if(formData.tipoDeAnuncio === 'both' && (formData.precoDeAluguel === null || formData.precoDeVenda === ''|| formData.precoDeVenda === '' || formData.precoDeVenda === null)){
      toast.warning('Por favor, insira o valor de aluguel e venda!');
    }else{
      const form = new FormData();
      if(formData.coverImage.url ){
        formJson.newCover = formData.coverImage.url;
      }else{
        form.append('cover', formData.coverImage);
      }
      formData.newImages.forEach((image) => {
        if(image !== formData.coverImage){
          form.append('photo', image);
        }
      });
      let oldPhotos = [];
      formData.otherImages.forEach((image) => {
        if(image !== formData.coverImage){
          oldPhotos.push(image.url);
        }
      });
      formJson.oldPhotos = oldPhotos;
      setLoading(true);
      form.append('data', JSON.stringify(formJson));
      console.log(token);
      try{
        const response = await putFormData(`properties/${formData.id}`, form, token);
        if(response.status === 201 || response.status === 200){
          toast.success('Anúncio atualizado com sucesso!');
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
    else if (activeStep === 3 && validateStep3() && mode !== 'edit') {
      handleFormSubmit();
    } else if (activeStep === 3 && validateStep3() && mode === 'edit'){
      handleFormSubmitEdit();
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
        if(mode === 'edit'){
          return <ImagensEdit {...{ formData, setFormData }}/>;
        }else{
          return <Imagens {...{ formData, setFormData }}/>;
        }
      case 3:
        return <OutrosDetalhes {...{ formData, setFormData }} />;
      default:
        return <Typography>Etapa não encontrada</Typography>;
    }
  };

  return (
    <PageContainer title="Criar Imóvel" description="Página para editar informações do imóvel">
      {loading && <Loading data = {{open:loading}}/>}
      <ParentCard title="Criar Imóvel">
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
      {openAdviceDialog &&(<ConfimarCadastroDialog open={openAdviceDialog} handleClose={()=> {setOpenAdviceDialog(false);Navigate('/apps/imoveis/list');}}/>)}
    </PageContainer>

  );
};

export default EditImovel;
