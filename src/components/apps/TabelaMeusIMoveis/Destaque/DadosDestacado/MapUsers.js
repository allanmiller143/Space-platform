import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Grid, Typography } from "@mui/material";
import BlankCard from "../../../../shared/BlankCard";
import { Box } from "@mui/system";

// Usando o ícone padrão do Leaflet
const userIcon = new Icon.Default();

const users = [
  { id: 1, name: "João", address: { lat: -23.55052, lng: -46.633308 } },
  { id: 2, name: "Maria", address: { lat: -22.908333, lng: -43.196388 } },
  { id: 3, name: "José", address: { lat: -27.595377, lng: -48.548045 } },
];

const MapUsers = () => {
  return (
    <Box sx={{ p: 2 }}>
      <BlankCard>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" mb={2}>
            Disposição de usuários que curtiram ou visualizaram seu imóvel
          </Typography>

          <MapContainer center={[-23.55052, -46.633308]} zoom={3} style={{ height: "350px", borderRadius: "10px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {users.map((user) => (
              <Marker
                key={user.id}
                position={[user.address.lat, user.address.lng]}
                icon={userIcon} // Usando o ícone padrão do Leaflet
              >
                <Popup>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="subtitle2">{`Lat: ${user.address.lat}, Long: ${user.address.lng}`}</Typography>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </BlankCard>
    </Box>
  );
};

export default MapUsers;
