/* eslint-disable react/prop-types */
import { LocationOn } from "@mui/icons-material";
import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

const PropertyCard = ({ property }) => {
    const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
    };
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (property) {
            setAddress(`${property.address.street}, ${property.address.number} - ${property.address.neighborhood},${property.address.city}, ${property.address.state}`);
        }
    }, [property]);

    const prices = () => {
        if (property.announcementType === 'both') {
          return (
            <Typography variant="h4" component="p" sx={{ mb: 3 }}>
              {`Preço de compra R$ ${formatPrice(property.prices.sellPrice)}`}<br />
              {`Aluguel R$ ${formatPrice(property.prices.rentPrice)}`}
            </Typography>
          );
        } else if (property.announcementType === 'rent') {
          return (
            <Typography variant="h4" component="p" sx={{ mb: 3 }}>
              {`Aluguel R$ ${formatPrice(property.prices.rentPrice)}`}
            </Typography>
          );
        } else {
          return (
            <Typography variant="h4" component="p" sx={{ mb: 3 }}>
              {`Preço de venda R$ ${formatPrice(property.prices.sellPrice)}`}
            </Typography>
          );
        }
      };

  return (
      <Card
        sx={{
          height: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={property.pictures[0].url}
          alt={property.pictures[0].url}
          sx={{ height:250, objectFit: "cover" }}
        />

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1, pt: '10px'}}>
            <Typography variant="h5" sx={{ pr: '10px', mb: '5px',    textAlign: 'justify',  }}>
                <span> <LocationOn/> </span>{address}
            </Typography>
            <Typography variant="body1" component="h1" sx={{ mb: 1 }}>
                {`${property.propbertyType === 'house' ? 'Casa' : property.propertyType === 'apartment' ? 'Apartamento' : property.propertyType === 'land' ? 'Terreno' : 'Fazenda/Chácara'} com
                ${property.bedrooms} Quartos e ${property.bathrooms} Banheiros, ${property.suites} suítes, com ${property.parkingSpaces} vagas próximo do ${property.address.neighborhood}, ${property.address.city}`}
          </Typography>
            {prices()}
        </Box>
          <Button variant="contained" color="primary" size="small" sx ={{width: '130px', alignSelf: 'end'}} href={`/marketplace/imovel/${property.id}`}>
            Ver Mais
          </Button>
      </Card>
  );
};

export default PropertyCard;
