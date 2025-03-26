import React, { useContext } from 'react';
import { Box, Typography, Divider, Grid, Paper, Stack, Chip } from '@mui/material';
import { Home, Apartment, Bathtub, Hotel, DirectionsCar, MonetizationOn, LocationOn, CheckCircle } from '@mui/icons-material';
import TextModel from '../../../Utils/TextModel';
import ContractContext from '../../../ContractContext/ContractContext';

const PropertyDetails = () => {
  const { property } = useContext(ContractContext);

  // Formatação de valores
  const formatPrice = (value) => 
    value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'Não informado';

  // Dados básicos organizados
  const basicInfo = [
    { icon: <Home />, title: "Tipo", value: property?.propertyType === 'apartment' ? 'Apartamento' : 'Casa' },
    { icon: <Apartment />, title: "Andar", value: property?.floor || '--' },
    { icon: <Hotel />, title: "Quartos", value: `${property?.bedrooms || 0} (${property?.suites || 0} suítes)` },
    { icon: <Bathtub />, title: "Banheiros", value: property?.bathrooms || 0 },
    { icon: <DirectionsCar />, title: "Vagas", value: property?.parkingSpaces || 0 },
  ];

  // Características do imóvel
  const features = [
    { name: "Mobiliado", active: property?.furnished === 'yes' },
    { name: "Piscina", active: property?.commodities?.pool },
    { name: "Academia", active: property?.commodities?.gym },
    { name: "Varanda", active: property?.commodities?.balcony },
    { name: "Energia Solar", active: property?.commodities?.solarEnergy },
  ];

  return (
    <Grid item xs={6}>
        <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #eee', borderRadius: 2 }}>
        {/* Seção: Informações Básicas */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Home color="primary" />
            Informações do Imóvel
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
            {basicInfo.map((item, index) => (
            <Grid item xs={6} md={4} key={index}>
                <TextModel 
                title={item.title} 
                label={item.value} 
                icon={item.icon}
                />
            </Grid>
            ))}
        </Grid>

        {/* Seção: Preços e Valores */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MonetizationOn color="primary" />
            Valores
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
            <TextModel 
                title={property?.announcementType === 'rent' ? 'Aluguel Mensal' : 'Preço de Venda'} 
                label={formatPrice(
                property?.prices?.[property.announcementType === 'rent' ? 'rentPrice' : 'sellPrice']
                )}
            />
            </Grid>
            
            <Grid item xs={12} md={6}>
            <TextModel
                title="Depósito" 
                label={
                property?.prices?.deposit ? 
                `${formatPrice(property.prices.deposit)} (${property.prices.timesDeposit || 1}x)` 
                : 'Não requerido'
                }
            />
            </Grid>
            
            <Grid item xs={6} md={3}>
            <TextModel title="IPTU" label={formatPrice(property?.prices?.iptu)} />
            </Grid>
            
            <Grid item xs={6} md={3}>
            <TextModel title="Taxas" label={formatPrice(property?.prices?.aditionalFees)} />
            </Grid>
            
            <Grid item xs={6} md={3}>
            <TextModel title="Financiável" label={property?.financiable ? 'Sim' : 'Não'} />
            </Grid>
            
            <Grid item xs={6} md={3}>
            <TextModel title="Negociável" label={property?.negotiable ? 'Sim' : 'Não'} />
            </Grid>
        </Grid>

        {/* Seção: Características */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle color="primary" />
            Características
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {features.map((feature, index) => (
            feature.active && (
                <Chip 
                key={index}
                label={feature.name}
                color="primary"
                size="small"
                variant="outlined"
                />
            )
            ))}
        </Stack>

        {/* Seção: Endereço */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn color="primary" />
            Localização
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {property?.address && (
            <Box>
            <TextModel 
                title="Endereço" 
                label={`${property.address.street}, ${property.address.number}`} 
            />
            <TextModel 
                title="Bairro" 
                label={property.address.neighborhood} 
            />
            <TextModel 
                title="Cidade/Estado" 
                label={`${property.address.city}/${property.address.state}`} 
            />
            <TextModel 
                title="CEP" 
                label={property.address.cep} 
            />
            </Box>
        )}
        </Paper>
    </Grid>
  );
};

export default PropertyDetails;