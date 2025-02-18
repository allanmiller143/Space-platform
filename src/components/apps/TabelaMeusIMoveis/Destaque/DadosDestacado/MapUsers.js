import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Grid, Typography } from "@mui/material";
import BlankCard from "../../../../shared/BlankCard";
import { Box } from "@mui/system";
import { getData } from "../../../../../Services/Api";

// Usando o ícone padrão do Leaflet
const userIcon = new Icon.Default();

const MapUsers = ({property}) => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    loadData();
  }, []);


  async function loadData(){
    try{
      const response = await getData(`properties/times-seen/${property.fullImovel.id}`);
      console.log(response);
      if(response.status === 200 || response.status === 201){
        setUsers(response.userInfo.visualizations);
      }
    }catch(e){
      console.log(e);
    }
  }


  return (
    <Box sx={{ p: 2 }}>
      <BlankCard>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" mb={2}>
            Disposição de usuários que curtiram ou visualizaram seu imóvel
          </Typography>

          <MapContainer center={[-23.55052, -46.633308]} zoom={3} style={{ height: "350px", borderRadius: "10px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {users.map((user) => {
              if (user.userLatitude === null || user.userLongitude === null) return null;
              return (
                <Marker
                  key={user.id}
                  position={[user.userLatitude, user.userLongitude]}
                  icon={userIcon}
                >
                  <Popup>
                    <Typography variant="subtitle2">
                      {`Lat: ${user.userLatitude}, Long: ${user.userLongitude}`}
                    </Typography>
                  </Popup>
                </Marker>
              );
            })}

          </MapContainer>
          <Typography variant="body2" mt={2}>
            <span style={{ fontWeight: "bold" }}> Obs:</span> Apenas usuários que deram permissão de localização são exibidos no mapa
          </Typography>
        </Box>
      </BlankCard>
    </Box>
  );
};

export default MapUsers;
