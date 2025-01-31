/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {Drawer, Typography, Divider, Box, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio, Slider, Button,} from "@mui/material";
import Logo from "../../../layouts/full/shared/logo/Logo";

const Filter = ({ openDrawer, setOpenDrawer,propertyTypes, setPropertyTypes,announcementType, setAnnouncementType}) => {


  // Manipuladores de mudança
  const handlePropertyTypeChange = (event) => {
    setPropertyTypes({
      ...propertyTypes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAnnouncementTypeChange = (event) => {
    setAnnouncementType(event.target.value);
  };

  return (
    <Drawer
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      variant="temporary"
      sx={{ width: "300px" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", p: 2, width: "300px" }}>
        <Box alignSelf={"center"}>
          <Logo />
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Filtros
        </Typography>
        <Divider sx={{ my: 2 }} />


        <FormControl component="fieldset" sx={{ mb: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyTypes.apartment}
                  onChange={handlePropertyTypeChange}
                  name="apartment"
                />
              }
              label="Apartamento"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyTypes.house}
                  onChange={handlePropertyTypeChange}
                  name="house"
                />
              }
              label="Casa"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyTypes.land}
                  onChange={handlePropertyTypeChange}
                  name="land"
                />
              }
              label="Terreno"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyTypes.farm}
                  onChange={handlePropertyTypeChange}
                  name="farm"
                />
              }
              label="Fazenda/Chácara"
            />
          </FormGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* Filtro por Tipo de Anúncio */}
        <FormControl component="fieldset" sx={{ mb: 1 }}>
          <RadioGroup
            value={announcementType}
            onChange={handleAnnouncementTypeChange}
          >
            <FormControlLabel value="" control={<Radio />} label="Ambos" />
            <FormControlLabel value="sell" control={<Radio />} label="Venda" />
            <FormControlLabel value="rent" control={<Radio />} label="Aluguel" />
          </RadioGroup>
        </FormControl>
        <Divider sx={{ my: 2 }} />

        <Button variant="contained" onClick={() => {setOpenDrawer(false); setPropertyTypes({apartment: false, house: false, land: false, farm: false}); setAnnouncementType("")}}>Limpar Filtros</Button>
      </Box>
    </Drawer>
  );
};

export default Filter;