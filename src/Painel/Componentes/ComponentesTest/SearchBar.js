import { useContext, useState } from "react";
import { Autocomplete, Box, TextField, Select, MenuItem, CircularProgress, IconButton } from "@mui/material";
import axios from "axios";
import marketplaceContext from "../../../views/apps/marketplace/MarketplaceContext/MarketplaceContext";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const [options, setOptions] = useState([]); // Opções de cidades e estados
  const [selectedPlace, setSelectedPlace] = useState(null); // Cidade e estado selecionados
  const [searchloading, setSearchLoading] = useState(false); // Estado de loading para busca
  const { 
    navigate, formData, setFormData,
  } = useContext(marketplaceContext);


  // Função para buscar cidades e estados da API do IBGE
  const fetchCities = async (query) => {
    if (query.length < 3) {
      setOptions([]); // Limpa as opções para consultas muito curtas
      return;
    }

    setSearchLoading(true); // Inicia o loading

    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/municipios`
      );

      // Filtra os municípios com base no texto digitado
      const filteredCities = response.data
        .filter((city) => city.nome.toLowerCase().includes(query.toLowerCase()))
        .map((city) => ({
          label: `${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}`, // Cidade e estado
          value: city.id,
          state: city.microrregiao.mesorregiao.UF.sigla,
          city: city.nome,
        }));

      setOptions(filteredCities);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      setOptions([]);
    } finally {
        setSearchLoading(false); // Finaliza o loading
    }
  };

  const handleSearch = () => {
    setFormData({ ...formData, city: selectedPlace ? selectedPlace.city : '', state: selectedPlace ? selectedPlace.state : ''});
    navigate("/marketplace");

  };

  const handleTipoAnuncioChange = (event) => {
    setFormData({ ...formData, announcementType: event.target.value });
  };
  const handleTipoImovelChange = (event) => {
    setFormData({ ...formData, propertyType: event.target.value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: "8px",
        backgroundColor: "#fff",
        maxWidth: "lg",
        margin: "0 auto",
        marginTop: "20px",
        px : {xs : 1, sm: 2},
        
      }}
    >
      {/* Autocomplete para o lugar */}
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label} // Exibe cidade e estado
        isOptionEqualToValue={(option, value) => option.value === value.value} // Comparação de seleção
        sx = {{padding:-7}}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filtre por cidade"
            variant="outlined"
            onChange={(e) => fetchCities(e.target.value)} // Busca cidades enquanto digita
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {searchloading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        value={selectedPlace}
        onChange={(event, newValue) => setSelectedPlace(newValue)}
        sx={{ flex: 1 }}
      />

      <Select
            value={formData.propertyType}
            onChange={handleTipoImovelChange}
            id="tipo-imovel"
            displayEmpty
            sx={{ display: { xs: "none", sm: "block" } }}
        >
            <MenuItem value="">Tipo de  anúncio</MenuItem>
            <MenuItem value="apartment">Apartamento</MenuItem>
            <MenuItem value="house">Casa</MenuItem>
            <MenuItem value="land">Terreno</MenuItem>
            <MenuItem value="farm">Fazenda/chácaras</MenuItem>
        </Select>

      {/* Select para o tipo de anúncio */}
        <Select
            value={formData.announcementType}
            onChange={handleTipoAnuncioChange}
            id="tipo-imovel"
            displayEmpty
            sx={{ display: { xs: "none", sm: "block" } }}
        >
        <MenuItem value="">Tipo de imóvel</MenuItem>
        <MenuItem value="rent">Aluguel</MenuItem>
        <MenuItem value="sell">Venda</MenuItem>
        <MenuItem value="both">Ambos</MenuItem>
    </Select   >
      {/* Botão de pesquisa */}
      <IconButton
        color="primary"
        onClick={handleSearch}
        sx={{
            backgroundColor: "primary.main",
            borderRadius: "50%",  // Faz o botão redondo
            width: 40,  // Ajuste para um valor maior se necessário, mantendo proporcionalidade
            height: 40,  // Deve ser igual ao width para o botão ser circular
            display: "flex",  // Usado para alinhar o conteúdo dentro do botão
            justifyContent: "center",  // Alinha o conteúdo horizontalmente
            alignItems: "center",  // Alinha o conteúdo verticalmente
            "&:hover": { backgroundColor: "primary.dark" },  // Efeito de hover
        }}
        >
        <IoMdSearch size={20} color="white" />  {/* Ícone com cor branca para visibilidade */}
        </IconButton>

    </Box>
  );
};

export default SearchBar;
