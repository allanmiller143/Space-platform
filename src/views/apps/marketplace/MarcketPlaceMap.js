/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const MarketplaceMaps = ({ properties }) => {
    const [coordinates, setCoordinates] = useState([]);

    // Função para obter coordenadas de um endereço
    const getCoordinatesFromAddress = async (address) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                return { lat, lon };
            }
        } catch (error) {
            console.error("Erro ao buscar coordenadas:", error);
        }
        return null;
    };
    

    // Função para buscar coordenadas de todos os imóveis
    const fetchAllCoordinates = async () => {
        const coords = await Promise.all(
            properties.map(async (property) => {
                const address = `${property.address.street}, ${property.address.number}, ${property.address.neighborhood}, ${property.address.city}, ${property.address.state}, ${property.address.cep}, Brasil`;

                const coords = await getCoordinatesFromAddress(address);
    
                return {
                    ...property,
                    coords,
                };
            })
        );
        setCoordinates(coords.filter((item) => item.coords !== null));
    };
    

    useEffect(() => {
        fetchAllCoordinates();
    }, [properties]);

    return (
        <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '0px' }}>
                <MapContainer center={[-3.71722, -38.5434]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '0px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {coordinates.map((property, index) => (
                        <Marker key={index} position={[property.coords.lat, property.coords.lon]}>
                            <Popup>
                                <div>
                                    <strong>{property.title}</strong><br />
                                    {property.description}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Box>
        </Grid>
    );
};

export default MarketplaceMaps;
