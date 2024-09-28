/* eslint-disable react/prop-types */
import { Box, TextField } from '@mui/material';
import { useEffect } from 'react';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';

const PriceRangeSelector = ({ formData, setFormData }) => {
    useEffect(() => {
        // Você pode adicionar qualquer lógica que precisar ao alterar o formData
    }, [formData]);

    const formatPrice = (value) => {
        if (!value) return '';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(value);
    };

    const handleChangePrice = (fieldName) => (event) => {
        const inputValue = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        const numericValue = parseFloat(inputValue) / 100; // Converte para float
        // Atualiza o formData com o valor numérico sem formatação
        setFormData({ ...formData, [fieldName]: numericValue });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box>
                    <CustomFormLabel htmlFor="preco-minimo">Preço Mínimo</CustomFormLabel>
                    <TextField
                        id="preco-minimo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className="custom-text-field" // Classe CSS personalizada
                        value={formatPrice(formData.precoMinimo)} // Formata o valor para exibição
                        onChange={handleChangePrice('precoMinimo')} // Atualiza o formData com o valor bruto
                    />
                </Box>
                <Box>
                    <CustomFormLabel htmlFor="preco-maximo">Preço Máximo</CustomFormLabel>
                    <TextField
                        id="preco-maximo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className="custom-text-field" // Classe CSS personalizada
                        value={formatPrice(formData.precoMaximo)} // Formata o valor para exibição
                        onChange={handleChangePrice('precoMaximo')} // Atualiza o formData com o valor bruto
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PriceRangeSelector;
