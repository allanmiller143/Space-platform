/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {Box } from '@mui/material';
import {FormControl, MenuItem } from '@mui/material';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../forms/theme-elements/CustomSelect';

const TipoFilter = ( {formData, setFormData}) => {
    const handleTipoImovelChange = (event) => {
        setFormData({ ...formData, propertyType: event.target.value });
      };


    return (
        <Box>
            <FormControl fullWidth margin="none"> {/* Remove margem */}
                <CustomFormLabel htmlFor="tipo-imovel">Tipo de Imóvel</CustomFormLabel>
                <CustomSelect
                    value={formData.propertyType}
                    onChange={handleTipoImovelChange}
                    id="tipo-imovel"
                >
                    <MenuItem value="apartment">Apartamento</MenuItem>
                    <MenuItem value="house">Casa</MenuItem>
                    <MenuItem value="land">Terreno</MenuItem>
                    <MenuItem value="farm">Fazenda/chácaras</MenuItem>
                </CustomSelect>
            </FormControl>
        </Box>
    );
};

export default TipoFilter;

