/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Modal, Tooltip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Header from '../../../layouts/full/horizontal/header/Header';
import Gallery from 'src/components/lightbox/lightbox';
import { IconCamera, IconVideo, IconMapPin, IconMaximize, IconArrowLeft, IconShare, IconHeart, IconCheck } from '@tabler/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';


const ImovelPage = () => {
    const [openGallery, setOpenGallery] = useState(false);
    const [openMapModal, setOpenMapModal] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);
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

    const formData = {
        propertyType: 'Apartamento',
        announcementType: 'Venda',
        maxPrice: 'R$ 500.000',
        minPrice: 'R$ 450.000',
        numQuartos: 3,
        numBanheiros: 2,
        numSuites: 1,
        vagasGaragem: 2,
        areaTotal: 120,
        cep: '12345-678',
        city: 'São Paulo',
        state: 'SP',
        bairro: 'Vila Mariana',
        enderecoCompleto: 'Rua Exemplo, 123',
        numero: '123',
        complemento: 'Apto 45',
        descricao: 'Apartamento bem localizado, próximo ao metrô.',
        opcoesRapidas: {
            'Piscina': true,
            'Academia': false,
            'Playground': true,
            'Salão de Festas': true,
        }
    };

    return (
        <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
            <Header />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container sx={{ height: 'calc(100vh - 107px )', overflow: 'hidden' }}>
                    <Grid item xs={12} md={8} sx={{ borderRight: '1px solid #d4d4d4', padding: '50px !important', overflow: 'scroll', height: '100%', boxShadow: '1px 0px 4px #2121211f', zIndex: 9 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                            <Button variant="outlined" sx={{ color: '#6c757d', borderColor: '#e1e1e1', backgroundColor: '#fff', '&:hover': { color: 'black', backgroundColor: '#e2e6ea', borderColor: '#dae0e5' } }}>
                                <IconArrowLeft sx={{ mr: 1 }} /> Voltar
                            </Button>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Tooltip title="Compartilhar">
                                    <Button
                                        variant="outlined"
                                        sx={{ color: '#6c757d', borderColor: '#e1e1e1', backgroundColor: '#fff', '&:hover': { color: 'black', backgroundColor: '#e2e6ea', borderColor: '#dae0e5' } }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast.success('Link da página compartilhado para área de transferência!');
                                        }}
                                    >
                                        <IconShare />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Salvar">
                                    <Button
                                        variant="outlined"
                                        sx={{ color: '#6c757d', borderColor: '#e1e1e1', backgroundColor: '#fff', '&:hover': { color: 'black', backgroundColor: '#e2e6ea', borderColor: '#dae0e5' } }}
                                        onClick={() => toast.success('Adicionado à lista de favoritos!')}
                                    >
                                        <IconHeart />
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>


                        <Box
                            sx={{
                                position: 'relative',
                                transition: 'opacity 0.3s ease-in-out',
                                cursor: 'pointer',
                                '&:hover::before': {
                                    content: '"🔍 Ver Galeria"',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'light',
                                    zIndex: 1,
                                    opacity: 1,
                                    transition: 'opacity 0.3s ease-in-out',
                                },
                            }}
                            onClick={() => setOpenGallery(true)}
                        >
                            <Box
                                sx={{
                                    backgroundImage: `url(${pictures[0].url})`,
                                    backgroundSize: 'cover',
                                    height: 400,
                                }}
                            ></Box>
                        </Box>
                        {openGallery && <Gallery onClose={() => setOpenGallery(false)} pictures={pictures} />}

                        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', opacity: 0.7, mt: 2 }}>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.600' }}>
                                <IconCamera fontSize="small" sx={{ mr: 0.5, color: 'grey.600' }} /> 44 Fotos
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ display: 'flex', alignItems: 'center', color: 'grey.600', cursor: 'pointer' }}
                                onClick={() => setOpenVideoModal(true)}
                            >
                                <IconVideo fontSize="small" sx={{ mr: 0.5, color: 'grey.600' }} /> Vídeo
                            </Typography>
                            <Modal
                                open={openVideoModal}
                                onClose={() => setOpenVideoModal(false)}
                                aria-labelledby="video-modal-title"
                                aria-describedby="video-modal-description"
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
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/VIDEO_ID"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </Box>
                            </Modal>
                        </Box>

                        <Typography variant="h2" component="h1" sx={{ mb: 3 }}>Tipo de imóvel com X Quartos e X vagas próximo do Bairro, Cidade</Typography>
                        <Typography variant="h3" component="p" sx={{ mb: 3 }}>Total R$ 3.151<br />Aluguel R$ 2.500</Typography>
                                



                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>Dados Gerais do Imóvel</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Tipo de Imóvel</TableCell>
                                            <TableCell>{formData.propertyType}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Tipo de anúncio</TableCell>
                                            <TableCell>{formData.announcementType}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Preço de Venda</TableCell>
                                            <TableCell>{formData.maxPrice}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Preço Negociável</TableCell>
                                            <TableCell>{formData.minPrice}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Número de Quartos</TableCell>
                                            <TableCell>{formData.numQuartos}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Número de Banheiros</TableCell>
                                            <TableCell>{formData.numBanheiros}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Número de Suítes</TableCell>
                                            <TableCell>{formData.numSuites}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Vagas de Garagem</TableCell>
                                            <TableCell>{formData.vagasGaragem}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Área Total (m²)</TableCell>
                                            <TableCell>{formData.areaTotal}</TableCell>
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
                                            <TableCell>{formData.cep}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Cidade</TableCell>
                                            <TableCell>{formData.city}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>{formData.state}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Bairro</TableCell>
                                            <TableCell>{formData.bairro}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Endereço Completo</TableCell>
                                            <TableCell>{formData.enderecoCompleto}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Número</TableCell>
                                            <TableCell>{formData.numero}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Complemento</TableCell>
                                            <TableCell>{formData.complemento}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell>{formData.descricao}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>Comodidades (opcional)</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        {Object.keys(formData.opcoesRapidas).map((key) => (
                                            <TableRow key={key}>
                                                <TableCell>{key}</TableCell>
                                                <TableCell>{formData.opcoesRapidas[key] ? 'Sim' : 'Não'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>












                    </Grid>

                    <Grid item md={4} sx={{ padding: 5, backgroundColor: '#fafafa' }}>

                        <Box sx={{ display: 'flex', gap: 3, my: 4 }}>
                            <Button variant="contained" color="primary">Agendar visita</Button>
                            <Button variant="outlined" color="primary">Fazer proposta</Button>
                        </Box>


                        <Box sx={{
                            p: 0,
                            borderColor: '#e1e1e1',
                            boxShadow: '0px 2px 4px #0000002b',
                            overflow: 'hidden',
                            pt: '13px',
                            mb: 3,
                            backgroundColor: 'white',
                            border: '1px solid #e1e1e1'
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
                                    <IconMaximize />
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
                            borderColor: '#e1e1e1',
                            boxShadow: '0px 2px 4px #60606069',
                            overflow: 'hidden',
                            pt: '13px',
                            mb: 3,
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '1px solid #e1e1e1'
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
                                    backgroundColor: '#d0d0d0',
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0
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
                                    <IconCheck sx={{
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
            </Box>
        </PageContainer>
    );
};

export default ImovelPage;
