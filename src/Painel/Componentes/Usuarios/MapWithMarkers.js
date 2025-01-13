import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Box, Typography, Grid } from "@mui/material";
import "leaflet/dist/leaflet.css";

// Color mapping for user types
const types = {
  owner: { color: "blue", label: "Proprietário" },
  realtor: { color: "green", label: "Corretor" },
  client: { color: "orange", label: "Cliente" },
  realstate: { color: "red", label: "Imobiliária" },

};

const MapWithMarkers = () => {
  // Simulated API response
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: "User 1", type: "owner", lat: -8.0522, lng: -34.9286 },
        { id: 2, name: "User 2", type: "realtor", lat: -7.1187, lng: -34.884 },
        { id: 3, name: "User 3", type: "realstate", lat: -9.616, lng: -35.7122 },
        { id: 4, name: "User 4", type: "client", lat: -3.7172, lng: -38.5433 },
        { id: 5, name: "User 5", type: "owner", lat: -12.9714, lng: -38.5014 },
      ]);
    }, 2000); // Simulating 2-second delay
  }, []);

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: 1,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        px={2}
        pt={2}
        pb={1}
      >
        Distribuição de Usuários
      </Typography>

      {/* Responsive Legend */}
      <Box sx={{ px: 2, pb: 1 }}>
        <Grid container spacing={1}>
          {Object.entries(types).map(([key, { color, label }]) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={key}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: color,
                  borderRadius: "50%",
                  marginRight: 1,
                }}
              />
              <Typography variant="body2">{label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          height: "360px",
          borderRadius: "0 0 12px 12px ",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <MapContainer
          center={[-15.0522, -50.9286]} // Initial coordinates
          zoom={4}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {users.map((user) => (
            <CircleMarker
              key={user.id}
              center={[user.lat, user.lng]}
              pathOptions={{ color: types[user.type]?.color || "gray", fillOpacity: 0.8 }}
              radius={10}
            >
              <Popup>
                <strong>{user.name}</strong>
                <br />
                Tipo: {types[user.type]?.label || "Desconhecido"}
                <br />
                Localização: {user.lat.toFixed(2)}, {user.lng.toFixed(2)}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapWithMarkers;
