/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Modal, Grid } from '@mui/material';
import { IconMaximize } from '@tabler/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { getData } from '../../../../Services/Api';
import { toast } from 'sonner';

const Map = () => {
    const [openMapModal, setOpenMapModal] = useState(false);
    const [loadingProperties, setLoadingProperties] = useState(false);
    const [properties, setProperties] = useState([]); // Lista de imóveis
    const cuString = localStorage.getItem('currentUser');
    const currentUserls = JSON.parse(cuString);
    const token = localStorage.getItem('token');  

    const getUserProperties = async () => {
        setLoadingProperties(true);
        try {
            const route = `properties/seller/${currentUserls.email}?limit=200`;
            const response = await getData(route, token);
            if (response.status === 200 || response.status === 201) {
                const validProperties = response.userInfo.properties.filter(
                    (property) => property.address.latitude && property.address.longitude
                );
                setProperties(validProperties);
            } else {
                toast.error('Erro ao buscar propriedades');
                console.log(response);  
            }
        } catch (error) {
            toast.error('Erro inesperado ao buscar propriedades');
        } finally {
            setLoadingProperties(false);
        }
    };

    useEffect(() => {
        getUserProperties();
    }, []);

    return (
        <Grid item xs={7} sx={{ height: '450px', mt: '30px' }}> {/* Definindo altura para o Grid */}
            <Box sx={{
                borderColor: '#e1e1e1',
                boxShadow: '0px 2px 4px #0000002b',
                overflow: 'hidden',
                pt: '13px',
                backgroundColor: 'white',
                border: '1px solid #e1e1e1'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h6" component="h4" sx={{ pl: '10px', pr: '10px' }}>
                            Imóveis Cadastrados
                        </Typography>
                        <Typography variant="body1" sx={{ pl: '10px', pr: '10px', mb: '10px' }}>
                            Veja aqui a distribuição dos seus imóveis no mapa
                        </Typography>
                    </Box>
                    {properties.length > 0 && (
                        <Button sx={{ left: '-8px', top: '-8px' }} onClick={() => setOpenMapModal(true)}>
                            <IconMaximize />
                        </Button>
                    )}
                </Box>

                {/* Modal for the large map */}
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
                        height: '90%',
                        bgcolor: 'background.paper',
                        boxShadow: 30,
                        p: 0,
                        overflow: 'hidden',
                        borderRadius: '15px',
                    }}>
                        <MapContainer center={[-14.235004, -51.92528]} zoom={3} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {properties.map((property) => (
                                <Marker
                                    key={property.id}
                                    position={[property.address.latitude, property.address.longitude]}
                                >
                                    <Popup>
                                        <Typography variant="body2">{property.name}</Typography>
                                        <Typography variant="body2">{property.address.street}</Typography>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </Box>
                </Modal>

                {/* Small map */}
                <MapContainer center={[-14.235004, -51.92528]} zoom={4} style={{ height: '340px', width: '100%' }}> {/* Definindo altura para o mapa pequeno */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {properties.map((property) => (
                        <Marker
                            key={property.id}
                            position={[property.address.latitude, property.address.longitude]}
                        >
                            <Popup>
                                <Typography variant="body2">{property.name}</Typography>
                                <Typography variant="body2">{property.address.street}</Typography>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Box>
        </Grid>
    );
};

export default Map;
