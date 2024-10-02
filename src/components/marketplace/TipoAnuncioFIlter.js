/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {Box } from '@mui/material';
import {FormControl, MenuItem } from '@mui/material';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../forms/theme-elements/CustomSelect';

const TipoAnuncioFilter = ( {formData, setFormData}) => {
    const handleTipoAnuncioChange = (event) => {
        setFormData({ ...formData, announcementType: event.target.value });
      };
    return (
        <Box sx={{ flex: '1 1 200px' }}>
            <FormControl fullWidth margin="none"> {/* Remove margem */}
                <CustomFormLabel htmlFor="tipo-imovel">Tipo de anúncio</CustomFormLabel>
                <CustomSelect
                    value={formData.announcementType}
                    onChange={handleTipoAnuncioChange}
                    id="tipo-imovel"
                >
                    <MenuItem value="rent">Aluguel</MenuItem>
                    <MenuItem value="sell">Venda</MenuItem>
                    <MenuItem value="both">Ambos</MenuItem>
                </CustomSelect>
            </FormControl>
        </Box>
    );
};

export default TipoAnuncioFilter;

