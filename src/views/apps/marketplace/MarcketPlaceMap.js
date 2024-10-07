/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Button, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";


const MarketplaceMaps = ({ properties }) => {
    const [userLocation, setUserLocation] = useState([0, 0]);
    const [isLocationLoaded, setIsLocationLoaded] = useState(false);
    const navigate = useNavigate();

    const GetPropertyType = (type) => {
        switch (type) {
            case 'apartment':
                return 'Apartmento';
            case 'house':
                return 'Casa';
            case 'land':
                return 'Terreno';
            case 'farm':
                return 'Fazenda/Chácara';
            default:
                return 'Other';
        }
    };

    // Função para pegar a localização do usuário e salvar no localStorage
    const requestUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = [latitude, longitude];
                    const savedLocation = localStorage.getItem('userLocation');
                    
                    if (savedLocation) {
                        const [savedLat, savedLon] = JSON.parse(savedLocation);
                        // Verificar se a nova localização difere significativamente da salva
                        const tolerance = 0.01; // Tolerância de 0.01 graus (~1.1 km)
                        if (Math.abs(savedLat - latitude) > tolerance || Math.abs(savedLon - longitude) > tolerance) {
                            // Atualiza apenas se a diferença for maior que a tolerância
                            setUserLocation(location);
                            localStorage.setItem('userLocation', JSON.stringify(location));
                        }
                    } else {
                        // Se não houver localização salva, armazenar a nova
                        setUserLocation(location);
                        localStorage.setItem('userLocation', JSON.stringify(location));
                    }
                    setIsLocationLoaded(true); // Marcar como carregado
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setIsLocationLoaded(true); // Marcar como carregado mesmo com erro
                }
            );
        }
    };

    // Usar o useEffect para carregar a localização do localStorage ou pedir permissão
    useEffect(() => {
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation) {
            setUserLocation(JSON.parse(savedLocation)); // Carregar localização salva
            setIsLocationLoaded(true); // Marcar como carregado
        }
        // Pedir a localização sempre que o componente for montado
        requestUserLocation();
    }, []);

    // Função para navegar para a página do imóvel
    const handleOpenProperty = (propertyId) => {
        navigate(`/property/${propertyId}`); // Redireciona para a página do imóvel com o ID correspondente
    };

    return (
        <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '0px' }}>
                {!isLocationLoaded ? (
                    <CircularProgress /> // Spinner de loading
                ) : (
                    <MapContainer center={userLocation} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '0px' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={userLocation} draggable onDragend={() => requestUserLocation()} sx ={{ cursor: 'pointer', zIndex: 100, color : 'red' }} >
                            <Popup sx={{ padding: '10px' }}>
                                <strong style={{ fontWeight: 'bold', paddingRight: '10px' }}>Você está aqui</strong>
                            </Popup>
                        </Marker>
                        {properties.map((property, index) => (
                            <Marker
                                key={index}
                                position={[
                                    property.address.latitude ? property.address.latitude : '',
                                    property.address.longitude ? property.address.longitude : ''
                                ]}
                            >
                                <Popup sx={{ maxWidth: '300px' }} >
                                    <div>
                                        <strong>{GetPropertyType(property.propertyType)}</strong><br />
                                        {property.description}
                                        <br/>
                                        <Button
                                            sx={{mt: 2, ml: 9}}
                                            variant="text"
                                            size="small"
                                            color="primary"
                                            onClick={() => handleOpenProperty(property.id)}
                                        >
                                            Ver Detalhes
                                        </Button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                )}
            </Box>
        </Grid>
    );
};

export default MarketplaceMaps;
