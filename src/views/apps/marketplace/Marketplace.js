import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Header from '../../../layouts/full/horizontal/header/Header';
import CardImovel from '../../../components/spaceUI/card-imovel/cardImovel';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Checkbox, FormControl, InputLabel, MenuItem, Select, ListItemText } from '@mui/material';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import FilterVitrine from 'src/components/marketplace/Filter';

const Marketplace = () => {
    const position = [51.505, -0.09];
    const [selected, setSelected] = useState([]);

    const handleSelectChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <FilterVitrine />

                <Grid container sx={{ height: 'calc(100vh - 147px)', overflow: 'hidden' }}>

                    <Grid item xs={12} md={7} pt="0px !important">

                        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 147px)', overflow: 'scroll' }}>

                            <Grid container spacing={2}>
                                {[...Array(20)].map((_, index) => (

                                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CardImovel
                                            title="Casa Moderna em Condomínio"
                                            description="Rua das Flores, 123 - Jardim Primavera"
                                            imgsrc="/mobiliado/imagem-1.jpg"
                                        />
                                    </Grid>

                                ))}

                            </Grid>

                        </Box>

                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '0px'  }}>
                            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '0px' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </PageContainer>
    );
};

export default Marketplace;
