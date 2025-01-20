/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Button, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet'; // Importar o Leaflet para criar o ícone
import Pino from '../../../assets/images/svgs/pino-de-localizacao.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// Criar um ícone personalizado para o usuário
const userIcon = new L.Icon({
    iconUrl: Pino,
    iconSize: [38, 38], // Tamanho do ícone
    iconAnchor: [19, 38], // Ponto de ancoragem do ícone (base)
    popupAnchor: [0, -38], // Ponto de ancoragem do popup
});

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MarcketPlaceMap = ({ properties, formData }) => {
    const [userLocation, setUserLocation] = useState([0, 0]);
    const [isLocationLoaded, setIsLocationLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    }, [formData.city, formData.state]);

    const GetPropertyType = (type) => {
        switch (type) {
            case 'apartment':
                return 'Apartamento';
            case 'house':
                return 'Casa';
            case 'land':
                return 'Terreno';
            case 'farm':
                return 'Fazenda/Chácara';
            default:
                return 'Outro';
        }
    };

    const requestUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = [latitude, longitude];
                    const savedLocation = localStorage.getItem('userLocation');

                    if (savedLocation) {
                        const [savedLat, savedLon] = JSON.parse(savedLocation);
                        const tolerance = 0.01;
                        if (Math.abs(savedLat - latitude) > tolerance || Math.abs(savedLon - longitude) > tolerance) {
                            setUserLocation(location);
                            localStorage.setItem('userLocation', JSON.stringify(location));
                        }
                    } else {
                        setUserLocation(location);
                        localStorage.setItem('userLocation', JSON.stringify(location));
                    }
                    setIsLocationLoaded(true);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setIsLocationLoaded(true);
                }
            );
        }
    };

    useEffect(() => {
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation) {
            setUserLocation(JSON.parse(savedLocation));
            setIsLocationLoaded(true);
        }
        requestUserLocation();
    }, []);

    const handleOpenProperty = (propertyId) => {
        navigate(`/marketplace/imovel/${propertyId}`);
    };

    return (
        <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '0px' }}>
                {!isLocationLoaded ? (
                    <CircularProgress />
                ) : (
                    <MapContainer center={userLocation} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '0px' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Marcador para a localização do usuário com ícone personalizado */}
                        <Marker position={userLocation} icon={userIcon} draggable>
                            <Popup>
                                <strong>Você está aqui</strong>
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
                                <Popup>
                                    <div>
                                        <strong>{GetPropertyType(property.propertyType)}</strong><br />
                                        {property.description}
                                        <br/>
                                        <Button
                                            sx={{ mt: 2, ml: 9 }}
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

export default MarcketPlaceMap;
