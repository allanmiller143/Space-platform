/* eslint-disable react/prop-types */
import { Typography, Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
  };

  const [address, setAddress] = useState("");

  useEffect(() => {
    if (property) {
      setAddress(
        `${property.address.street}, ${property.address.number} - ${property.address.neighborhood}, ${property.address.city}, ${property.address.state}`
      );
    }
  }, [property]);

  const prices = () => {
    if (property.announcementType === "both") {
      return (
        <Typography variant="body1" color="text.secondary">
          {`Preço de compra: R$ ${formatPrice(property.prices.sellPrice)}`} <br />
          {`Aluguel: R$ ${formatPrice(property.prices.rentPrice)}`}
        </Typography>
      );
    } else if (property.announcementType === "rent") {
      return (
        <Typography variant="body1" color="text.secondary">
          {`Aluguel: R$ ${formatPrice(property.prices.rentPrice)}`}
        </Typography>
      );
    } else {
      return (
        <Typography variant="body1" color="text.secondary">
          {`Preço de venda: R$ ${formatPrice(property.prices.sellPrice)}`}
        </Typography>
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
        p: 2,
        maxWidth: "600px",
      }}
    >
      {/* Image */}
      <Avatar
        src={property.pictures[0]?.url || ""}
        alt="Imagem do imóvel"
        sx={{
          height: 96,
          width: 96,
        }}
      />

      {/* Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        <Typography variant="h6" color="text.primary" noWrap>
          {property.propertyType === "house"
            ? "Casa"
            : property.propertyType === "apartment"
            ? "Apartamento"
            : property.propertyType === "land"
            ? "Terreno"
            : "Fazenda/Chácara"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${property.bedrooms} Quartos, ${property.bathrooms} Banheiros, ${property.suites} Suítes, ${property.parkingSpaces} Vagas`}
        </Typography>
        {prices()}
      </Box>
    </Box>
  );
};

export default PropertyCard;