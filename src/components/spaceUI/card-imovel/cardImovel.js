/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import Gallery from 'src/components/lightbox/lightbox';

const CardImovel = ({ data }) => {
    const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);

    function formatPrice(price) {
        if (price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        return '';
    }

    return (
        <Card 
            sx={{ 
                maxWidth: 345, 
                mb: 1, 
                borderRadius: 1, 
                border: '1px solid #e0e0e0', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                height: '100%', // Definido para preencher toda a altura
            }}
        >
            <Box
                component="div"
                onClick={() => setIsGalleryOpen(true)}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 200,
                    backgroundImage: `url(${ data.pictures.length > 0 && data.pictures[0].url || ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                }}
            >
                <Typography variant="body2" color="white" sx={{ position: 'absolute', bottom: 10, left: 10 }}>
                    Ver Galeria
                </Typography>
                <Box sx={{ position: 'absolute', top: 3, left: 5 }}>
                    <Chip label="Anúncio novo" sx={{ color: 'white' }} color="default"/>
                </Box>
            </Box>

            {isGalleryOpen && <Gallery onClose={() => setIsGalleryOpen(false)} pictures={data.pictures} />}

            <CardContent sx={{ padding: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="body2" component="div" sx={{ mb: 1, mt : 1 }}>
                        {data.propertyType === 'apartment' ? 'Apartamento' : data.propertyType === 'house' ? 'Casa' : data.propertyType === 'land' ? 'Terreno' : 'Fazenda/Chácara'}
                    </Typography>
                    {(data.announcementType === 'both' || data.announcementType === 'sell') && (
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                            R$ {formatPrice(data.prices.sellPrice)}
                        </Typography>
                    )}
                    {(data.announcementType === 'both' || data.announcementType === 'rent') && (
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                            R$ {formatPrice(data.prices.rentPrice)} / mês
                        </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {data.size} m² · {data.bedrooms} quarto · {data.parkingSpaces} vaga
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {data.address.street} - {data.address.number}, {data.address.city} - {data.address.state}
                    </Typography>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="outlined" fullWidth>
                        Ver Anúncio
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardImovel;
