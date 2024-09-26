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

    const generateRandomPosition = (center, radius) => {
        const y0 = center[0];
        const x0 = center[1];
        const rd = radius / 111300; // about 111300 meters in one degree

        const u = Math.random();
        const v = Math.random();

        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);

        const newLat = y + y0;
        const newLon = x + x0;

        return [newLat, newLon];
    };

    const markers = [
        "Casa Moderna em Condomínio. <br /> Rua das Flores, 123 - Jardim Primavera.",
        "Apartamento Luxuoso. <br /> Avenida Beira Mar, 456 - Meireles.",
        "Casa com Piscina. <br /> Rua das Palmeiras, 789 - Aldeota.",
        "Cobertura Duplex. <br /> Rua dos Coqueiros, 101 - Praia de Iracema.",
        "Casa de Praia. <br /> Rua do Sol, 202 - Praia do Futuro.",
        "Apartamento Moderno. <br /> Rua das Ondas, 303 - Praia do Futuro.",
        "Casa com Jardim. <br /> Rua das Árvores, 404 - Parque Manibura.",
        "Apartamento Familiar. <br /> Rua das Crianças, 505 - Parque Manibura.",
        "Casa de Campo. <br /> Rua do Campo, 606 - Parque Manibura.",
        "Apartamento Estúdio. <br /> Rua do Estúdio, 707 - Aldeota.",
        "Casa com Varanda. <br /> Rua da Varanda, 808 - Aldeota.",
        "Apartamento Compacto. <br /> Rua Compacta, 909 - Aldeota.",
        "Casa de Luxo. <br /> Rua do Luxo, 1010 - Meireles.",
        "Apartamento com Vista. <br /> Rua da Vista, 1111 - Meireles.",
        "Casa Aconchegante. <br /> Rua Aconchego, 1212 - Meireles.",
        "Apartamento Amplo. <br /> Rua Ampla, 1313 - Meireles.",
        "Casa com Quintal. <br /> Rua do Quintal, 1414 - Meireles.",
        "Apartamento de Luxo. <br /> Rua do Luxo, 1515 - Meireles.",
        "Casa Moderna. <br /> Rua Moderna, 1616 - Meireles.",
        "Apartamento Novo. <br /> Rua Nova, 1717 - Meireles."
    ];

    return (
        <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <FilterVitrine />

                <Grid container sx={{ height: 'calc(100vh - 147px)', overflow: 'hidden' }}>

                    <Grid item xs={12} md={7} pt="0px !important">

                        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 147px)', overflow: 'scroll' }}>

                            <Grid container spacing={3} sx={{ p: 3 }}>
                                {[...Array(20)].map((_, index) => (

                                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CardImovel
                                            title="Casa Moderna em Condomínio"
                                            description="Rua das Flores, 123 - Jardim Primavera"
                                            imgsrc="/mobiliado/imagem-7.jpg"
                                        />
                                    </Grid>

                                ))}

                            </Grid>

                        </Box>

                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '0px'  }}>
                            <MapContainer center={[-3.71722, -38.5434]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '0px' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {markers.map((description, index) => {
                                    const position = generateRandomPosition([-3.71722, -38.5434], 4000);
                                    return (
                                        <Marker key={index} position={position}>
                                            <Popup>{description}</Popup>
                                        </Marker>
                                    );
                                })}
                            </MapContainer>
                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </PageContainer>
    );
};

export default Marketplace;
