/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Pool,Balcony,LocalParking,KingBed,Bathtub,CheckCircle,OutdoorGrill,AcUnit,Toys,Event,Restaurant,Roofing,FitnessCenter,Grass,Deck,Person,Forest,Home,Elevator,WbSunny,} from "@mui/icons-material";
import {DialogTitle,DialogContent,DialogActions,Typography,Button,Box,IconButton,Divider,Chip,Stack,Slide,Grid,} from "@mui/material";
import GalleryPhotos from "./GalleryPhotos";
  
  const PropertyInfo = ({ imovel , all }) => {
    if (!imovel) return null;
    const {description,propertyType,bedrooms,suites,bathrooms,parkingSpaces,size,address,commodities,financiable,negotiable,} = imovel;
  
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
            sx={{ p: 1,   }}
          />
        ));
    };
  
    const type = (type) => {
      switch (type) {
        case "house":
          return "Casa";
        case "apartment":
          return "Apartamento";
        case "farm":
          return "Fazenda/Chácaras";
        case "land":
          return "Terreno";
        default:
          return "";
      }
    };
  
    const formatPrice = (price) => {
      return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
    };
  
    const prices = () => {
      if (imovel.announcementType === "both") {
        return (
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            {`Preço de compra R$ ${formatPrice(imovel.prices.sellPrice)}`}<br />
            {`Aluguel R$ ${formatPrice(imovel.prices.rentPrice)}`}
          </Typography>
        );
      } else if (imovel.announcementType === "rent") {
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
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Informações do imóvel
        </Typography>

        <Box>
          {/* Galeria de Fotos */}
          <GalleryPhotos property={imovel} />

          <Box mt={3}>
            <Typography variant="h6" gutterBottom mt={2}>
              Tipo de imóvel
            </Typography>
            <Typography variant="body1" gutterBottom>
              {type(imovel.propertyType)}
            </Typography>
          </Box>
  
          {/* Endereço */}
          <Box mt={3}>
            <Typography variant="h6" gutterBottom mt={2}>
              Endereço
            </Typography>
            <Typography variant="body1" gutterBottom>
              {imovel.address.street}, {imovel.address.number} - {imovel.address.neighborhood}, {imovel.address.city}, {imovel.address.state}
            </Typography>
          </Box>
  
  
          {/* Características */}
          <Box>
            <Typography variant="h6" gutterBottom mt={2}>
              Características
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                <KingBed fontSize="small" /> {`${bedrooms} Quartos`}
              </Typography>
              <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                <Bathtub fontSize="small" /> {`${bathrooms} Banheiros`}
              </Typography>
              <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                <Balcony fontSize="small" /> {`${suites} Suíte`}
              </Typography>
              <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                <LocalParking fontSize="small" /> {`${parkingSpaces} Vaga`}
              </Typography>
              <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                <Balcony fontSize="small" /> {`${size} m²`}
              </Typography>
            </Box>
          </Box>



          <>
            {
                all ? 
                    <> 
                        <Box mt={3}>
                            <Typography variant="h6" gutterBottom>
                            Comodidades
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" >
                              {renderCommodities()}
                            </Stack>
                        </Box>                
                        <Box mt={3}>
                            <Typography variant="h6" gutterBottom>
                            Descrição
                            </Typography>
                            <Typography>{description}</Typography>
                        </Box>
                
                        <Divider sx={{ my: 2 }} />
                
                        <Box>
                            <Typography variant="h6" gutterBottom>
                            Preço e Condições
                            </Typography>
                            {prices()}
                            <Typography color="textSecondary">
                            {financiable ? "Financiável" : "Não Financiável"} | {negotiable ? "Negociável" : "Não Negociável"}
                            </Typography>
                        </Box>
                    
                    </> 
                : 
                    null
            }
          
          
          </>  
          
        </Box>
      </Box>
    );
  };
  
  export default PropertyInfo;