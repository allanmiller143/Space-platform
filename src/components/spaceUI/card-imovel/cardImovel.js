import React from 'react';
import { Card, CardContent, Typography, Box, Badge, IconButton } from '@mui/material';
import Gallery from 'src/components/lightbox/lightbox';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const CardImovel = ({ title, description, imgsrc }) => {
    const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);

    return (
        <Card sx={{ maxWidth: 345, mb: 1, borderRadius: 1 , border: '1px solid #e0e0e0', shadow: false }}>
            <Box
                component="div"
                onClick={() => setIsGalleryOpen(true)}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 200,
                    backgroundImage: `url(${imgsrc})`,
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

            {isGalleryOpen && <Gallery onClose={() => setIsGalleryOpen(false)} />}

            <CardContent sx={{ padding: 0 , mt: 2 , pb: '0 !important' }}>
                <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Studio e kitnet
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    R$ 1.188 total
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    R$ 1.000 aluguel
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    80 m² · 1 quarto · 1 vaga
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Rua Agostinho Gomes, Ipiranga · São Paulo
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 0 }}>
                    <Button variant="outlined" fullWidth >
                        Ver Anúncio
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardImovel;