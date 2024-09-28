/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { Box, TextField, CircularProgress, FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';

const LocalidadeFilter = ({ formData, setFormData }) => {
    const [localidades, setLocalidades] = useState([]); // Localidades retornadas pela API
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [inputValue, setInputValue] = useState(''); // Valor digitado pelo usuário
    const [searchValue, setSearchValue] = useState(''); // Valor enviado para busca

    // Função que busca localidades na API
    const fetchLocalidades = useCallback(async (searchTerm) => {
        setLoading(true); // Inicia o carregamento
        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios?nome=${searchTerm}`);
            const localidadesFormatadas = response.data.map((municipio) => `${municipio.nome}, ${municipio.microrregiao.mesorregiao.UF.sigla}`);
            setLocalidades(localidadesFormatadas);
        } catch (error) {
            console.error('Erro ao buscar localidades:', error);
            setLocalidades([]); // Limpa as localidades se houver erro
        }
        setLoading(false); // Termina o carregamento
    }, []);

    // UseEffect para debounce na busca
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchLocalidades(searchValue);
        }, 500); // Delay de 500ms para evitar muitas chamadas à API
        return () => clearTimeout(debounceTimer); // Limpa o timeout
    }, [searchValue, fetchLocalidades]);

    // Atualiza o valor de busca sem interferir na digitação
    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue); // Atualiza o inputValue imediatamente

        // Se o novo valor do input for vazio, limpa o formData
        if (newInputValue === '') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                city: '',  // Limpa o valor da cidade
                state: ''  // Limpa o valor do estado
            }));
            setLocalidades([]); // Limpa os resultados de localidades
        } else if (newInputValue.length >= 3) {
            setSearchValue(newInputValue); // Atualiza o valor para busca apenas com 3 ou mais caracteres
        } else {
            setLocalidades([]); // Limpa os resultados se o valor for menor que 3 caracteres
        }
    };

    // Função que lida com a seleção de uma localidade
    const handleSelectChange = (event, newValue) => {
        if (newValue) {
            // Divide o valor selecionado em "cidade" e "estado"
            const [city, state] = newValue.split(', '); 
            
            // Atualiza o formData com cidade e estado
            setFormData((prevFormData) => ({
                ...prevFormData,
                city: city || '', // Salva a cidade
                state: state || '' // Salva o estado
            }));
        }
    };

    return (
        <Box sx={{ flex: '1 1 200px' }}>
            <FormControl fullWidth margin="none">
                <CustomFormLabel htmlFor="Localidade">Localidade</CustomFormLabel>
                <Autocomplete
                    freeSolo
                    options={localidades} // Usa as localidades buscadas da API
                    loading={loading} // Mostra o ícone de carregamento
                    inputValue={inputValue} // Mostra o valor atual do input
                    onInputChange={handleInputChange} // Função de mudança de valor sem travar a digitação
                    onChange={handleSelectChange} // Captura a mudança de seleção
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                sx: {
                                    marginBottom: '-1px',
                                    height: '44px', // Controla a altura do input
                                    fontSize: '0.875rem', // Diminui o tamanho da fonte (opcional)
                                    display: 'flex', // Certifica que o conteúdo será flexível
                                    alignItems: 'center', // Centraliza o conteúdo verticalmente
                                    textAlign: 'center', // Centraliza o texto horizontalmente
                                },
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </FormControl>  
        </Box>
    );
};

export default LocalidadeFilter;
