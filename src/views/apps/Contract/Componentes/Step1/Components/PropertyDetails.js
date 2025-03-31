import React, { useContext } from 'react';
import { Box, Typography, Divider, Grid, Paper, Chip } from '@mui/material';
import { Home, Apartment, Bathtub, Hotel, DirectionsCar, MonetizationOn, LocationOn, CheckCircle } from '@mui/icons-material';
import TextModel from '../../../Utils/TextModel';
import ContractContext from '../../../ContractContext/ContractContext';

const PropertyDetails = () => {
  const { property } = useContext(ContractContext);

  const formatPrice = (value) => 
    value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'Não informado';

  const basicInfo = [
    { icon: <Home />, title: "Tipo", value: property?.propertyType === 'apartment' ? 'Apartamento' : 'Casa' },
    { icon: <Apartment />, title: "Andar", value: property?.floor || '--' },
    { icon: <Hotel />, title: "Quartos", value: `${property?.bedrooms || 0} (${property?.suites || 0} suítes)` },
    { icon: <Bathtub />, title: "Banheiros", value: property?.bathrooms || 0 },
    { icon: <DirectionsCar />, title: "Vagas", value: property?.parkingSpaces || 0 },
  ];

  const features = [
    { name: "Mobiliado", active: property?.furnished === 'yes' },
    { name: "Piscina", active: property?.commodities?.pool },
    { name: "Academia", active: property?.commodities?.gym },
    { name: "Varanda", active: property?.commodities?.balcony },
    { name: "Energia Solar", active: property?.commodities?.solarEnergy },
  ].filter(f => f.active);

  return (
    <Grid item xs={12} md={5}>
      <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2 }}>
        
        {/* Informações Básicas */}
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Home color="primary" /> Informações do Imóvel
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {basicInfo.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <TextModel title={item.title} label={item.value} icon={item.icon} />
            </Grid>
          ))}
        </Grid>

        {/* Valores */}
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 1 }}>
          <MonetizationOn color="primary" /> Valores
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[
            { title: property?.announcementType === 'rent' ? 'Aluguel Mensal' : 'Preço de Venda', value: formatPrice(property?.prices?.[property.announcementType === 'rent' ? 'rentPrice' : 'sellPrice']) },
            { title: "Depósito", value: property?.prices?.deposit ? `${formatPrice(property.prices.deposit)} (${property.prices.timesDeposit || 1}x)` : 'Não requerido' },
            { title: "IPTU", value: formatPrice(property?.prices?.iptu) },
            { title: "Taxas", value: formatPrice(property?.prices?.aditionalFees) },
            { title: "Financiável", value: property?.financiable ? 'Sim' : 'Não' },
            { title: "Negociável", value: property?.negotiable ? 'Sim' : 'Não' },
          ].map((item, index) => (
            <Grid item xs={6} md={4} key={index}>
              <TextModel title={item.title} label={item.value} />
            </Grid>
          ))}
        </Grid>

        {/* Características */}
        {features.length > 0 && (
          <>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 1 }}>
              <CheckCircle color="primary" /> Características
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={1}>
              {features.map((feature, index) => (
                <Grid item key={index}>
                  <Chip label={feature.name} color="primary" size="small" />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Endereço */}
        {property?.address && (
          <>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 1 }}>
              <LocationOn color="primary" /> Localização
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {[
                { title: "Endereço", value: `${property.address.street}, ${property.address.number}` },
                { title: "Bairro", value: property.address.neighborhood },
                { title: "Cidade/Estado", value: `${property.address.city}/${property.address.state}` },
                { title: "CEP", value: property.address.cep },
              ].map((item, index) => (
                <Grid item xs={6} key={index}>
                  <TextModel title={item.title} label={item.value} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default PropertyDetails;
