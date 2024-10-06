import React, { useEffect, useState } from 'react';
import React from 'react';
import { Container, Grid, Box, Typography, Button, Card, CardMedia, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideocamIcon from '@mui/icons-material/Videocam';
import RoomIcon from '@mui/icons-material/Room';

const ImovelPage = () => {
    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={3}>
                {/* Coluna principal com título, preço e botões */}
                <Grid item lg={8}>
                    <Typography variant="h4" component="h1">Studio para alugar com 21m², 1 quarto e sem vaga</Typography>
                    <Typography variant="h5" component="p">Total R$ 3.151<br />Aluguel R$ 2.500</Typography>
                    <Box sx={{ display: 'flex', gap: 3, my: 4 }}>
                        <Button variant="contained" color="primary">Agendar visita</Button>
                        <Button variant="outlined" color="primary">Fazer proposta</Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Typography variant="body1"><CameraAltIcon /> 44 Fotos</Typography>
                        <Typography variant="body1"><VideocamIcon /> Vídeo</Typography>
                        <Typography variant="body1"><RoomIcon /> Mapa</Typography>
                    </Box>
                    <Box sx={{ backgroundColor: '#d0d0d0', height: 325 }}></Box>
                    {/* Descrição do imóvel */}
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Imóvel aconchegante para alugar com 1 quarto e 1 banheiro no total. O condomínio fica localizado em Rua Vergueiro no bairro Vila Firmiano Pinto em São Paulo. Está bem localizado, próximo a pontos de interesse de Vila Firmiano Pinto, tais como Estação Santos-Imigrantes, SESC Ipiranga, Universidade São Judas e Instituto de Medicina Física e Reabilitação.
                    </Typography>
                </Grid>
                {/* Coluna lateral com endereço, informações e itens */}
                <Grid item lg={4}>
                    <Box sx={{ border: 1, p: 3, mb: 3 }}>
                        <Typography variant="h6" component="h4" fontWeight="bold">Rua Vergueiro</Typography>
                        <Typography variant="body1">Vila Firmiano Pinto, São Paulo</Typography>
                        <Typography variant="body1"><strong>21 m²</strong> · 1 quarto · 1 banheiro · Sem mobília · Metrô próx.</Typography>
                        <Box sx={{ backgroundColor: '#d0d0d0', height: 144, mt: 2 }}></Box>
                    </Box>
                    <Box sx={{ border: 1, p: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ backgroundColor: '#d0d0d0', height: 60, width: 60, borderRadius: '50%' }}></Box>
                            <Typography variant="h6" component="h4" fontWeight="bold" sx={{ mt: 2 }}>Nome do anunciante</Typography>
                        </Box>
                        <Typography variant="body1">Tipo de conta</Typography>
                        <Button variant="contained" color="secondary" fullWidth>Ver perfil</Button>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Itens disponíveis</Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Box" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Armários nos banheiros" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Armários na cozinha" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Chuveiro a gás" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Cozinha americana" />
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Itens indisponíveis</Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon><CancelIcon /></ListItemIcon>
                                <ListItemText primary="Banheira de hidromassagem" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CancelIcon /></ListItemIcon>
                                <ListItemText primary="Ar-condicionado" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CancelIcon /></ListItemIcon>
                                <ListItemText primary="Lavanderia no prédio" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CancelIcon /></ListItemIcon>
                                <ListItemText primary="Vaga de garagem" />
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Condomínio</Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Academia" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Portaria 24h" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Elevador" />
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
            </Grid>
            {/* Comparativo de Imóveis na região */}
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
            {/* Imóveis Similares */}
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
            {/* Condições de aluguel e compra */}
            <Box sx={{ my: 5 }}>
                <Box sx={{ border: 1, p: 3 }}>
                    <Typography variant="h6">Código do imóvel: 994399</Typography>
                    <Typography variant="body1">Você também pode comprar este imóvel. Valor de compra: <strong>R$ 299.000</strong></Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ImovelPage;

