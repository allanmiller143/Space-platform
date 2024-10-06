/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, FormControl, FormControlLabel, Checkbox, Grid } from '@mui/material';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';

const CaracteristicasFilter = ({ formData, setFormData }) => {

    // Inicialize o selected com as chaves que estão com valor `true` em `formData`
    const [selected, setSelected] = useState(
        Object.keys(formData.opcoesRapidas).filter((key) => formData.opcoesRapidas[key])
    );

    // Mapeamento entre valores em inglês e rótulos em português
    const labelMapping = {
        pool: 'Piscina',
        grill: 'Churrasqueira',
        airConditioning: 'Ar Condicionado',
        playground: 'Playground',
        eventArea: 'Sala de eventos',
        gym: 'Academia',
        porch: 'Varanda',
        solarEnergy: 'Energia solar',
        concierge: 'Portaria 24h',
        yard: 'Quintal',
        gourmetArea: 'Área Gourmet',
        balcony: 'Sacada',
        slab: 'Laje',
        gatedCommunity: 'Condomínio fechado',
        garden: 'Jardin'
    };

    // Função que lida com a mudança de seleção
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        // Atualiza o estado do `selected`
        setSelected((prevSelected) =>
            checked ? [...prevSelected, name] : prevSelected.filter((key) => key !== name)
        );

        // Atualiza o estado do `formData` para refletir as mudanças
        setFormData((prevFormData) => ({
            ...prevFormData,
            opcoesRapidas: {
                ...prevFormData.opcoesRapidas,
                [name]: checked
            }
        }));
    };

    return (
        <Box>
            <FormControl fullWidth margin="none">
                <CustomFormLabel htmlFor="caracteristicas">Características</CustomFormLabel>
                <Grid container spacing={2}>
                    {Object.keys(labelMapping).map((key) => (
                        <Grid item xs={6} key={key}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selected.includes(key)}
                                        onChange={handleCheckboxChange}
                                        name={key}
                                    />
                                }
                                label={labelMapping[key]}
                            />
                        </Grid>
                    ))}
                </Grid>
            </FormControl>
        </Box>
    );
};

export default CaracteristicasFilter;
