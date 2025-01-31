/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {  Box, Typography, Button, Modal } from '@mui/material';
import { IconMaximize } from '@tabler/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const Map = ({ property }) => {
    const [openMapModal, setOpenMapModal] = useState(false);
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');

    useEffect(() => {
        if (property) {
            setStreet(`${property.address.street}, ${property.address.number} - ${property.address.neighborhood}`);
            setAddress(`${property.address.city}, ${property.address.state}`);
        }
    }, [property]);

    const hasCoordinates = property && property.address.latitude && property.address.longitude;

    return (
        <>
            {property && (
                <>
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
                                    {street}
                                </Typography>
                                <Typography variant="body1" sx={{ pl: '10px', pr: '10px', mb: '10px' }}>
                                    {address}
                                </Typography>
                            </Box>
                            {hasCoordinates && (
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
                                height: '80%',
                                bgcolor: 'background.paper',
                                boxShadow: 30,
                                p: 0,
                                overflow: 'hidden',
                                borderRadius: '15px',
                            }}>
                                {hasCoordinates ? (
                                    <MapContainer center={[property.address.latitude, property.address.longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <Marker position={[property.address.latitude, property.address.longitude]}>
                                            <Popup>{street}</Popup>
                                        </Marker>
                                    </MapContainer>
                                ) : (
                                    <Typography variant="h6" sx={{ textAlign: 'center', padding: 2 }}>
                                        Localização não disponível para este imóvel.
                                    </Typography>
                                )}
                            </Box>
                        </Modal>

                        {/* Small map or message if no coordinates */}
                        {hasCoordinates ? (
                            <MapContainer center={[property.address.latitude, property.address.longitude]} zoom={12} style={{ height: 214, position: 'relative' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[property.address.latitude, property.address.longitude]}>
                                    <Popup>{street}</Popup>
                                </Marker>
                            </MapContainer>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', padding: 2 }}>
                                Localização não disponível.
                            </Typography>
                        )}
                    </Box>
                </>
            )}
        </>
    );
};

export default Map;
