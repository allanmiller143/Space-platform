/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { use } from 'i18next';
import { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Ícone de check verde
import CancelIcon from '@mui/icons-material/Cancel'; // Ícone de X vermelho
import Map from './Map';
const DadosGerais = ({property}) => {

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

                <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>Localização do Imóvel</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>CEP</TableCell>
                                <TableCell>{property.address.cep}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Cidade</TableCell>
                                <TableCell>{property.address.city}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Estado</TableCell>
                                <TableCell>{property.address.state}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bairro</TableCell>
                                <TableCell>{property.address.neighborhood}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Endereço Completo</TableCell>
                                <TableCell>{property.address.street}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Número</TableCell>
                                <TableCell>{property.address.number}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Complemento</TableCell>
                                <TableCell>{property.address.complement}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell>{property.description}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx ={{ my: 2, display : {md: 'none', xs: 'block'} }}>
                    <Map property={property} />
                </Box>

                

                <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>Comodidades (opcional)</Typography>
                <TableContainer component={Paper}>
                    <Table>
                    <TableBody>
                                   {
                                    Object.keys(opcoesRapidas).map((key) => (
                                        <TableRow key={key}>
                                            <TableCell>{key.replace(/_/g, ' ')}</TableCell>
                                            <TableCell>{getIcon(opcoesRapidas[key])}</TableCell>
                                        </TableRow>
                                    ))
                                   } 
                                </TableBody>

                    </Table>
                </TableContainer>
            </Box>     

            </>
          )}
    </Box>
  );
};

export default DadosGerais;
