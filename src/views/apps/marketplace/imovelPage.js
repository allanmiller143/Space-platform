import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Button, Card, CardMedia, CardContent, Table, TableBody, TableCell, TableRow, Modal } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon, CameraAlt as CameraAltIcon, Videocam as VideocamIcon, Room as RoomIcon, Fullscreen as FullscreenIcon, Verified as VerifiedIcon } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Gallery from 'src/components/lightbox/lightbox';

const ImovelPage = () => {
    const [openGallery, setOpenGallery] = useState(false);
    const [openMapModal, setOpenMapModal] = useState(false);
    const pictures = [
        { url: '/mobiliado/imagem-12.jpg', name: 'Imagem 12', width: 800, height: 600 },
        { url: '/mobiliado/imagem-13.jpg', name: 'Imagem 13', width: 800, height: 600 },
        { url: '/mobiliado/imagem-14.jpg', name: 'Imagem 14', width: 800, height: 600 },
        { url: '/mobiliado/imagem-1.jpg', name: 'Imagem 1', width: 800, height: 600 },
        { url: '/mobiliado/imagem-2.jpg', name: 'Imagem 2', width: 800, height: 600 },
        { url: '/mobiliado/imagem-3.jpg', name: 'Imagem 3', width: 800, height: 600 },
        { url: '/mobiliado/imagem-4.jpg', name: 'Imagem 4', width: 800, height: 600 },
        { url: '/mobiliado/imagem-5.jpg', name: 'Imagem 5', width: 800, height: 600 },
        { url: '/mobiliado/imagem-6.jpg', name: 'Imagem 6', width: 800, height: 600 },
        { url: '/mobiliado/imagem-7.jpg', name: 'Imagem 7', width: 800, height: 600 },
        { url: '/mobiliado/imagem-8.jpg', name: 'Imagem 8', width: 800, height: 600 },
        { url: '/mobiliado/imagem-9.jpg', name: 'Imagem 9', width: 800, height: 600 },
        { url: '/mobiliado/imagem-10.jpg', name: 'Imagem 10', width: 800, height: 600 },
        { url: '/mobiliado/imagem-11.jpg', name: 'Imagem 11', width: 800, height: 600 },
    ];

    return (
        <Container sx={{ my: 5 }} fullWidth>
            <Grid container spacing={3}>
                <Grid item lg={8}>
                  
                    <Box
                        sx={{ backgroundImage: `url(${pictures[0].url})`, backgroundSize: 'cover', height: 400, mb: 3 }}
                        onClick={() => setOpenGallery(true)}
                    ></Box>
                    {openGallery && <Gallery onClose={() => setOpenGallery(false)} pictures={pictures} />}

                    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', opacity: 0.7, mt: 2 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.600' }}>
                            <CameraAltIcon fontSize="small" sx={{ mr: 0.5, color: 'grey.600' }} /> 44 Fotos
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.600' }}>
                            <VideocamIcon fontSize="small" sx={{ mr: 0.5, color: 'grey.600' }} /> Vídeo
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.600' }}>
                            <RoomIcon fontSize="small" sx={{ mr: 0.5, color: 'grey.600' }} /> Mapa
                        </Typography>
                    </Box>

                      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>Studio para alugar com 21m², 1 quarto e sem vaga</Typography>
                    <Typography variant="h3" component="p" sx={{ mb: 3 }}>Total R$ 3.151<br />Aluguel R$ 2.500</Typography>
                    <Typography variant="body1"><strong>21 m²</strong> · 1 quarto · 1 banheiro · Sem mobília · Metrô próx.</Typography>


                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                        Imóvel aconchegante para alugar com 1 quarto e 1 banheiro no total. O condomínio fica localizado em Rua Vergueiro no bairro Vila Firmiano Pinto em São Paulo. Está bem localizado, próximo a pontos de interesse de Vila Firmiano Pinto, tais como Estação Santos-Imigrantes, SESC Ipiranga, Universidade São Judas e Instituto de Medicina Física e Reabilitação.
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Itens disponíveis</Typography>
                        <Table>
                            <TableBody>
                                {['Box', 'Armários nos banheiros', 'Armários na cozinha', 'Chuveiro a gás', 'Cozinha americana'].map(item => (
                                    <TableRow key={item}>
                                        <TableCell><CheckCircleIcon /></TableCell>
                                        <TableCell>{item}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Itens indisponíveis</Typography>
                        <Table>
                            <TableBody>
                                {['Banheira de hidromassagem', 'Ar-condicionado', 'Lavanderia no prédio', 'Vaga de garagem'].map(item => (
                                    <TableRow key={item}>
                                        <TableCell><CancelIcon /></TableCell>
                                        <TableCell>{item}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Condomínio</Typography>
                        <Table>
                            <TableBody>
                                {['Academia', 'Portaria 24h', 'Elevador'].map(item => (
                                    <TableRow key={item}>
                                        <TableCell><CheckCircleIcon /></TableCell>
                                        <TableCell>{item}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3, my: 4 }}>
                        <Button variant="contained" color="primary">Agendar visita</Button>
                        <Button variant="outlined" color="primary">Fazer proposta</Button>
                    </Box>
                </Grid>

                <Grid item lg={4}>
                    <Box sx={{
                        p: 0,
                        borderColor: '#e2e2e2',
                        boxShadow: '0px 2px 4px #0000002b',
                        overflow: 'hidden',
                        pt: '13px',
                        mb: 3
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="h6" component="h4" sx={{ pl: '10px', pr: '10px' }}>
                                    Rua Vergueiro
                                </Typography>
                                <Typography variant="body1" sx={{ pl: '10px', pr: '10px', mb: '10px' }}>
                                    Vila Firmiano Pinto, São Paulo
                                </Typography>
                            </Box>
                            <Button sx={{ left: '-8px', top: '-8px' }} onClick={() => setOpenMapModal(true)}>
                                <FullscreenIcon />
                            </Button>
                        </Box>
                        <Modal
                            open={openMapModal}
                            onClose={() => setOpenMapModal(false)}
                            aria-labelledby="map-modal-title"
                            aria-describedby="map-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%',
                                height: '80%',
                                bgcolor: 'background.paper',
                                boxShadow: 30,
                                p: 0,
                                overflow: 'hidden',
                                borderRadius: '15px',
                            }}>
                                <MapContainer center={[-23.589616, -46.634797]} zoom={15} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[-23.589616, -46.634797]}>
                                        <Popup>
                                            Rua Vergueiro, Vila Firmiano Pinto, São Paulo
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Box>
                        </Modal>
                        <MapContainer center={[-23.589616, -46.634797]} zoom={7} style={{ height: 214, position: 'relative' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[-23.589616, -46.634797]}>
                                <Popup>
                                    Rua Vergueiro, Vila Firmiano Pinto, São Paulo
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                    <Box sx={{
                        p: 0,
                        borderColor: '#e2e2e2',
                        boxShadow: '0px 2px 4px #0000002b',
                        overflow: 'hidden',
                        pt: '13px',
                        mb: 3,
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '16px',
                            width: '100%'
                        }}>
                            <Box sx={{
                                position: 'relative',
                                width: '100%',
                                height: 120,
                                backgroundColor: '#d0d0d0'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: -30,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'red',
                                    height: 60,
                                    width: 60,
                                    borderRadius: '50%',
                                    zIndex: 4,
                                    marginBottom: '16px'
                                }}></Box>
                            </Box>
                            <Typography variant="h6" component="h4" fontWeight="bold" sx={{ mt: 2 }}>
                                <VerifiedIcon sx={{
                                    mr: 1,
                                    width: 14,
                                    height: 14,
                                    bottom: -1,
                                    position: 'relative',
                                    color: 'blue'
                                }} />
                                Nome do anunciante
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: '16px',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="body1" sx={{ marginRight: '8px', color: '#757575' }}>@username</Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e0e0e0',
                                borderRadius: '12px',
                                padding: '4px 4px',
                                color: '#757575',
                                fontSize: '12px'
                            }}>
                                Corretor
                            </Box>
                        </Box>
                        <Button variant="contained" color="secondary" fullWidth sx={{
                            backgroundColor: '#f50057',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#c51162'
                            }
                        }}>Ver perfil</Button>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ my: 5 }}>
                <Typography variant="h5">Compare com imóveis da região</Typography>
                <Grid container spacing={3}>
                    <Grid item md={3}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image="comp1.jpg"
                                alt="Imóvel similar"
                            />
                            <CardContent>
                                <Typography variant="h6">R$ 992</Typography>
                                <Typography variant="body2">21m² · 1 quarto</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ my: 5 }}>
                <Typography variant="h5">Similares na mesma região</Typography>
                <Grid container spacing={3}>
                    <Grid item md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image="similar1.jpg"
                                alt="Imóvel similar"
                            />
                            <CardContent>
                                <Typography variant="h6">R$ 2.917 total</Typography>
                                <Typography variant="body2">22 m² · 1 quarto<br />Rua Vergueiro, Cursino</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ my: 5 }}>
                <Box sx={{ border: 1, p: 3, backgroundColor: 'subtleprimary', borderColor: 'primary' }}>
                    <Typography variant="h6">Código do imóvel: 994399</Typography>
                    <Typography variant="body1">Você também pode comprar este imóvel. Valor de compra: <strong>R$ 299.000</strong></Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ImovelPage;

