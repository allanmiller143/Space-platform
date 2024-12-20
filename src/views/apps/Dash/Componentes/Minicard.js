/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import Gallery from 'src/components/lightbox/lightbox';

const Minicard = ({ data, index }) => {
    const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);

    return (
        <Box sx = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%',gap : 1}}>
            <Typography variant="h6">top  {index + 1} </Typography>
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
                        height: 150,
                        backgroundImage: `url(${ data.pictures.length > 0 && data.pictures[0].url || ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                    }}
                >
                </Box>

                {isGalleryOpen && <Gallery onClose={() => setIsGalleryOpen(false)} pictures={data.pictures} />}

                <CardContent sx={{ padding: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="body2" component="div" sx={{ mb: 1, mt : 1 }}>
                            {data.propertyType === 'apartment' ? 'Apartamento' : data.propertyType === 'house' ? 'Casa' : data.propertyType === 'land' ? 'Terreno' : 'Fazenda/Chácara'}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {data.address.street} - {data.address.number}, {data.address.city} - {data.address.state}
                        </Typography>
                    </div>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Button variant="outlined" fullWidth href={`/marketplace/imovel/${data.id}`}>
                            Ver Anúncio
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Minicard;

