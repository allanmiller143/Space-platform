/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {Box, Button } from '@mui/material';
import LocalidadeFilter from './LocalidadeFilter';
import CaracteristicasFilter from './CaracteristicasFilter';
import TipoFilter from './TipoFilter';
import '../../../src/App.css';
import PriceRangeSelector from './PrecoFilter';

const FilterVitrine = ({formData, setFormData}) => {

    const limparFiltros = () => {
        setFormData({propertyType: '', city: '', state: '', opcoesRapidas: {}}); 
    }

    return (
        <Box sx={{ p: 2, backgroundColor: 'white', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <LocalidadeFilter {...{ formData, setFormData }}  />
                <TipoFilter  {...{ formData, setFormData }} />
                <CaracteristicasFilter  {...{ formData, setFormData }} />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent : 'space-between', alignItems : 'end', mt : 0 }}>
                <PriceRangeSelector {...{ formData, setFormData }}/>
                <Button sx={{ height : '44px', marginBottom : '8px'}} onClick={limparFiltros} >Limpar Filtros</Button>
            </Box>

        </Box>
    );
};

export default FilterVitrine;

