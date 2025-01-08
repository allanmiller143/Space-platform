/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { use } from 'i18next';
import { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Ícone de check verde
import CancelIcon from '@mui/icons-material/Cancel'; // Ícone de X vermelho
import Map from './Map';
import AdvertiserCard from './AdvertiserCard';
import PoolIcon from '@mui/icons-material/Pool';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EventIcon from '@mui/icons-material/Event';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeckIcon from '@mui/icons-material/Deck';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SecurityIcon from '@mui/icons-material/Security';
import YardIcon from '@mui/icons-material/Yard';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BalconyIcon from '@mui/icons-material/Balcony';
import FoundationIcon from '@mui/icons-material/Foundation';
import FenceIcon from '@mui/icons-material/Fence';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const DadosGerais = ({property,advertiser}) => {

    const [opcoesRapidas, setOpcoesRapidas] = useState({});
    useEffect(() => {
    if(property === null){
        return;
    }
    const temp =  {
        Piscina: property.commodities.pool,
        Churrasqueira : property.commodities.grill,
        Ar_Condicionado : property.commodities.airConditioning,
        Playground : property.commodities.playground,
        Sala_de_eventos :  property.commodities.eventArea,
        Academia :property.commodities.gym,
        Varanda : property.commodities.porch,
        Energia_solar : property.commodities.solarEnergy,
        Portaria_24h : property.commodities.concierge,
        Quintal : property.commodities.yard,
        Area_Gourmet : property.commodities.gourmetArea,
        Sacada : property.commodities.balcony,
        Laje : property.commodities.slab,
        Condominio_fechado : property.commodities.gatedCommunity,
        Jardin : property.commodities.garden,
    }     
        setOpcoesRapidas(temp)
    }, [property])

    const getSpecificIcon = (key) => {
        const icons = {
          Piscina: <PoolIcon />,
          Churrasqueira: <OutdoorGrillIcon />,
          Ar_Condicionado: <AcUnitIcon />,
          Playground: <SportsSoccerIcon />,
          Sala_de_eventos: <EventIcon />,
          Academia: <FitnessCenterIcon />,
          Varanda: <DeckIcon />,
          Energia_solar: <WbSunnyIcon />,
          Portaria_24h: <SecurityIcon />,
          Quintal: <YardIcon />,
          Area_Gourmet: <KitchenIcon />,
          Sacada: <BalconyIcon />,
          Laje: <FoundationIcon />,
          Condominio_fechado: <FenceIcon />,
          Jardin: <LocalFloristIcon />,
        };
      
        return icons[key] || <CheckCircleIcon style={{ color: 'green' }} />; // Ícone padrão caso não encontre
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

    const announceType = (type) => {
        if(type === 'both'){
        return 'Ambos'
        }else if(type === 'sell'){
        return 'Venda'    
        }else if(type === 'rent'){
        return 'Aluguel'
        }
    }  

    const negotiable = (type) => {
        if(type){
            return 'Sim'
        }else {
            return 'Não'
        }
    } 

    function formatPrice(price) {
        if(!price) {
            return;
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const getIcon = (value) => {
        return value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />;
    };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {property && ( <>
            <Box sx={{ mt: 4 }}>
            <Grid container sx={{ my: 1 }}>
                <Grid xs = {12}>
                    <Typography variant="h4" component="h2" sx={{ pb: 2, width: '100%' }}>
                        Principais comodidades
                    </Typography>
                </Grid>
                {Object.keys(opcoesRapidas)
                    .filter((key) => opcoesRapidas[key]) // Filtra apenas os itens disponíveis
                    .map((key) => (
                    <Grid
                        item
                        xs={6}
                        sm={3} 
                        lg={2}
                        key={key}
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                        }}
                    >
                        <Box sx={{ fontSize: '25px', color: '#4caf50' }}>
                            {getSpecificIcon(key)} {/* Ícone específico associado à comodidade */}
                        </Box>
                        <Typography variant="body1">
                            {key.replace(/_/g, ' ')}
                        </Typography>
                    </Grid>
                    ))}
                </Grid>

                <Box sx = {{ display: 'flex', gap : 2, mt: 5, flexDirection: { xs: 'column', sm: 'row' }}} >
                    <Grid iten xs = {12} sm={5} > 
                        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>Dados Gerais do Imóvel</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Tipo de Imóvel</TableCell>
                                        <TableCell>{type(property.propertyType)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tipo de anúncio</TableCell>
                                        <TableCell>{announceType(property.announcementType)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Preço de Venda</TableCell>
                                        <TableCell>R$ {formatPrice(property.prices.sellPrice)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Preço de Aluguel</TableCell>
                                        <TableCell>R$ {formatPrice(property.prices.rentPrice)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Preço Negociável</TableCell>
                                        <TableCell>{negotiable(property.negotiable)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Número de Quartos</TableCell>
                                        <TableCell>{property.bedrooms}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Número de Banheiros</TableCell>
                                        <TableCell>{property.bathrooms}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Número de Suítes</TableCell>
                                        <TableCell>{property.suites}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Vagas de Garagem</TableCell>
                                        <TableCell>{property.parkingSpaces}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Área Total (m²)</TableCell>
                                        <TableCell>{formatPrice(property.size)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid container>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                                    Localização do Imóvel
                                </Typography>
                                <Map property={property} />
                            </Grid>    
                        </Grid>  
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                                Descrição do imóvel
                            </Typography>
                            <Typography>
                                {property.description}
                            </Typography>
                        </Grid>  
                    </Grid>
                </Box>
            </Box>     

            </>
          )}
    </Box>
  );
};

export default DadosGerais;
