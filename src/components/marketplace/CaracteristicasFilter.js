/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, FormControl, MenuItem, Checkbox, ListItemText } from '@mui/material';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../forms/theme-elements/CustomSelect';

const CaracteristicasFilter = ({formData, setFormData} ) => {

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
    const handleSelectChange = (event) => {
        const value = event.target.value;

        // Atualiza o estado do `selected`
        setSelected(value);

        // Atualiza o estado do `formData` para refletir as mudanças
        setFormData((prevFormData) => ({
            ...prevFormData,
            opcoesRapidas: {
                ...prevFormData.opcoesRapidas,
                // Definir os valores selecionados como true, e o restante como false
                ...Object.keys(prevFormData.opcoesRapidas).reduce((acc, key) => {
                    acc[key] = value.includes(key); // Marca como true se estiver selecionado
                    return acc;
                }, {})
            }
        }));
    };

    return (
        <Box sx={{ flex: '1 1 200px' }}>
            <FormControl fullWidth margin="none">
                <CustomFormLabel htmlFor="caracteristicas">Características</CustomFormLabel>
                <CustomSelect
                    id="caracteristicas"
                    multiple
                    value={selected}
                    onChange={handleSelectChange}
                    renderValue={(selected) =>
                        // Renderiza os rótulos em português baseados nas chaves selecionadas
                        selected.map((key) => labelMapping[key]).join(', ')
                    }
                >
                    {/* Renderize os itens dinamicamente usando o array de chaves e labels */}
                    {Object.keys(labelMapping).map((key) => (
                        <MenuItem key={key} value={key}>
                            <Checkbox checked={selected.includes(key)} />
                            <ListItemText primary={labelMapping[key]} />
                        </MenuItem>
                    ))}
                </CustomSelect>
            </FormControl>
        </Box>
    );
};

export default CaracteristicasFilter;
