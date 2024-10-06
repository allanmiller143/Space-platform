/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import LocalidadeFilter from './LocalidadeFilter';
import CaracteristicasFilter from './CaracteristicasFilter';
import TipoFilter from './TipoFilter';
import '../../../src/App.css';
import PriceRangeSelector from './PrecoFilter';
import TipoAnuncioFIlter from './TipoAnuncioFIlter';

const FilterVitrine = ({ formData, setFormData }) => {

    const limparFiltros = () => {
        setFormData({ propertyType: '', city: '', state: '', opcoesRapidas: {} });
    }

    return (
        <Box>
            <Stack direction="column" >
                <LocalidadeFilter {...{ formData, setFormData }} />
                <TipoFilter  {...{ formData, setFormData }} />
                <TipoAnuncioFIlter {...{ formData, setFormData }} />
                <PriceRangeSelector {...{ formData, setFormData }} />
                <CaracteristicasFilter  {...{ formData, setFormData }} />
            </Stack>
            <Stack direction="column">
                <Button onClick={limparFiltros}>Limpar Filtros</Button>
            </Stack>
        </Box>
    );
};

export default FilterVitrine;

