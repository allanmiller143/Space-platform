import React from 'react';
import { Card, CardContent, Typography , Box } from '@mui/material';
import Gallery from 'src/components/lightbox/lightbox';
import Button from '@mui/material/Button';



const CardImovel = ({ title, description, imgsrc }) => {
    const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);

    return (
        <Card sx={{ maxWidth: 345, mb: 1, padding: 2}}>
            
            <Box
                component="div"
                onClick={() => setIsGalleryOpen(true)}
                sx={{
                    width: '100%',
                    height: 200,
                    backgroundImage: `url(${imgsrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <Typography variant="body2" color="white">
                    Ver Galeria
                </Typography>
            </Box>

            {isGalleryOpen && <Gallery onClose={() => setIsGalleryOpen(false)} />}

            <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="secondary">
                        Casa
                    </Typography>
                </Box>

                <Typography variant="h6" component="div">
                   Total R$ 5.183 total
                </Typography>

                <Typography variant="h6" component="div">
                    Aluguel R$ 4.300 aluguel
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        55 m² / 2 quartos / 1 vaga
                    </Typography>
                </Box>

                <Typography variant="body2" color="textSecondary">
                    Rua Muniz de Sousa, Aclimação · São Paulo
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" fullWidth color="primary">
                        Ver Anúncio
                    </Button>
                </Box>

            </CardContent>
        </Card>
    );
};


export default CardImovel;
