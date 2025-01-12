/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Cancel,Pool,Balcony,LocalParking,KingBed,Bathtub,CheckCircle,OutdoorGrill,AcUnit,Toys,Event,Restaurant,Roofing,FitnessCenter,Grass,Deck,Person,Forest,Home,Elevator,WbSunny} from "@mui/icons-material";
import {Dialog,DialogTitle,DialogContent,DialogActions,Typography,Button,Box,IconButton,Divider,Chip,Stack, Slide,} from "@mui/material";
import GalleryPhotos from "../../../views/apps/marketplace/Componentes/GalleryPhotos";
import React, { useState } from "react";
import AceitarNegarImovelDialog from "./AceitarNegarImovelDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NovosImoveisDialog = ({ open, onClose, imovel,imoveis,setImoveis }) => {
  if (!imovel) return null;
  const {description,propertyType,bedrooms,suites,bathrooms,parkingSpaces,size,address,commodities,financiable,negotiable, } = imovel;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accepted, setAccepted] = useState();
  
  
  // Função para mapear comodidades disponíveis
  const renderCommodities = () => {
    const commodityIcons = {
      pool: <Pool />,
      grill: <OutdoorGrill />,
      airConditioning: <AcUnit />,
      playground: <Toys />,
      eventArea: <Event />,
      gourmetArea: <Restaurant />,
      garden: <Grass />,
      porch: <Deck />,
      slab: <Roofing />,
      gatedCommunity: <Home />,
      gym: <FitnessCenter />,
      balcony: <Balcony />,
      solarEnergy: <WbSunny />,
      concierge: <Person />,
      yard: <Forest />,
      elevator: <Elevator />,
    };
  
    const commodityLabels = {
      pool: "Piscina",
      grill: "Churrasqueira",
      airConditioning: "Ar Condicionado",
      playground: "Playground",
      eventArea: "Área de Eventos",
      gourmetArea: "Espaço Gourmet",
      garden: "Jardim",
      porch: "Varanda",
      slab: "Laje",
      gatedCommunity: "Condomínio Fechado",
      gym: "Academia",
      balcony: "Sacada",
      solarEnergy: "Energia Solar",
      concierge: "Portaria",
      yard: "Quintal",
      elevator: "Elevador",
    };
  
    return Object.entries(commodities)
      .filter(([key, value]) => value === true)
      .map(([key]) => (
        <Chip
          key={key}
          icon={commodityIcons[key] || <CheckCircle />}
          label={commodityLabels[key] || key}
          color="primary"
          variant="outlined"
        />
      ));
  };
  

  const type = (type) => {
    if(type === 'house'){
        return 'Casa'
    }else if(type === 'apartment'){
        return 'Apartamento'    
    }else if(type === 'farm'){
        return 'Fazenda/Chácaras'
    }else if(type === 'land'){
        return 'Terreno'
    }
  }  

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
  };

  const prices = () => {
    if (imovel.announcementType === 'both') {
      return (
        <Typography variant="h6" component="p" sx={{ mb: 1 }}>
          {`Preço de compra R$ ${formatPrice(imovel.prices.sellPrice)}`}<br />
          {`Aluguel R$ ${formatPrice(imovel.prices.rentPrice)}`}
        </Typography>
      );
    } else if (imovel.announcementType === 'rent') {
      return (
        <Typography variant="h6" component="p" sx={{ mb: 1 }}>
          {`Aluguel R$ ${formatPrice(imovel.prices.rentPrice)}`}
        </Typography>
      );
    } else {
      return (
        <Typography variant="h6" component="p" sx={{ mb: 1 }}>
          {`Preço de venda R$ ${formatPrice(imovel.prices.sellPrice)}`}
        </Typography>
      );
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" TransitionComponent={Transition}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
            Detalhes do Imóvel
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Galeria de Fotos */}
        <GalleryPhotos property={imovel} />

        <Box mt={3}>
          {/* Informações Básicas */}
          <Typography variant="h6" gutterBottom>
            {type(propertyType)} - {address.neighborhood}
          </Typography>
          <Typography color="textSecondary">
            {`${address.street}, ${address.number} - ${address.city}, ${address.state}`}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {address.complement}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Caracteristicas
          </Typography>

          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mt={1}>
            <Typography variant="body1" display="flex" alignItems="center" gap={0.5}>
              <KingBed fontSize="small" /> {`${bedrooms} Quartos`}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" gap={0.5}>
              <Bathtub fontSize="small" /> {`${bathrooms} Banheiros`}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" gap={0.5}>
              <Balcony fontSize="small" /> {`${suites} Suíte`}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" gap={0.5}>
              <LocalParking fontSize="small" /> {`${parkingSpaces} Vaga`}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" gap={0.5}>
              <Balcony fontSize="small" /> {`${size} m²`}
            </Typography>
          </Box>


          <Divider sx={{ my: 2 }} />

          {/* Comodidades */}
          <Typography variant="h6" gutterBottom>
            Comodidades
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {renderCommodities()}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Descrição */}
          <Typography variant="h6" gutterBottom>
            Descrição
          </Typography>
          <Typography>{description}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Preço e Condições */}
          <Typography variant="h6" gutterBottom>
            Preço e Condições
          </Typography>
          {prices()}
          <Typography color="textSecondary">
            {financiable ? "Financiável" : "Não Financiável"} |{" "}
            {negotiable ? "Negociável" : "Não Negociável"}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={
          () => {
            setAccepted(false);
            setDialogOpen(true);
          }
        } variant="outlined">
          Negar 
        </Button>
        <Button onClick={
          () => {
            setAccepted(true);
            setDialogOpen(true);
          }
        } variant="contained" color="primary">
          Aceitar
        </Button>
      </DialogActions>
      <AceitarNegarImovelDialog imovel={imovel} open={dialogOpen} onClose={() => setDialogOpen(false)} accepted={accepted} imoveis={imoveis} setImoveis={setImoveis} onCloseFist={onClose} />
    </Dialog>
  );
};

export default NovosImoveisDialog;

