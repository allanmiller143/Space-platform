import { useContext, useState, useEffect } from "react";
import {Autocomplete,Box,TextField,Select,MenuItem,CircularProgress,IconButton,} from "@mui/material";
import axios from "axios";
import marketplaceContext from "../../../apps/marketplace/MarketplaceContext/MarketplaceContext";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const [options, setOptions] = useState([]); // Opções de cidades e estados
  const [selectedPlace, setSelectedPlace] = useState(null); // Cidade e estado selecionados
  const [searchloading, setSearchLoading] = useState(false); // Estado de loading para busca
  const { navigate, formData, setFormData } = useContext(marketplaceContext);

  const defaultOptions = [
    { label: "São Paulo - SP", value: 1, state: "SP", city: "São Paulo" },
    { label: "Rio de Janeiro - RJ", value: 2, state: "RJ", city: "Rio de Janeiro" },
    { label: "Belo Horizonte - MG", value: 3, state: "MG", city: "Belo Horizonte" },
    { label: "Brasília - DF", value: 4, state: "DF", city: "Brasília" },
    { label: "Curitiba - PR", value: 5, state: "PR", city: "Curitiba" },
  ];


  useEffect(() => {
    setOptions(defaultOptions);
  }, []);

  const fetchCities = async (query) => {
    if (query.length < 3) {
      setOptions(defaultOptions);
      return;
    }

    setSearchLoading(true); // 

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
      setOptions(defaultOptions); 
    } finally {
      setSearchLoading(false); 
    }
  };

  const handleSearch = () => {
    setFormData({
      ...formData,
      city: selectedPlace ? selectedPlace.city : "",
      state: selectedPlace ? selectedPlace.state : "",
    });
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
        px: { xs: 1, sm: 2 },
      }}
    >

      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label} 
        isOptionEqualToValue={(option, value) => option.value === value.value} 
        sx={{ padding: -7, flex: 1, '& .css-17qlio7-MuiAutocomplete-root' : {padding: '4px'}, '& .MuiOutlinedInput-root': { padding: '4px' } }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filtre por cidade"
            variant="outlined"
            onChange={(e) => fetchCities(e.target.value)} 
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
        noOptionsText="Nenhuma cidade encontrada" 
      />

      <Select
        value={formData.propertyType}
        onChange={handleTipoImovelChange}
        id="tipo-imovel"
        displayEmpty
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <MenuItem value="">Tipo de imóvel</MenuItem>
        <MenuItem value="apartment">Apartamento</MenuItem>
        <MenuItem value="house">Casa</MenuItem>
        <MenuItem value="land">Terreno</MenuItem>
        <MenuItem value="farm">Fazenda/chácaras</MenuItem>
      </Select>

      <Select
        value={formData.announcementType}
        onChange={handleTipoAnuncioChange}
        id="tipo-imovel"
        displayEmpty
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <MenuItem value="">Tipo de anúncio</MenuItem>
        <MenuItem value="rent">Aluguel</MenuItem>
        <MenuItem value="sell">Venda</MenuItem>
        <MenuItem value="both">Ambos</MenuItem>
      </Select>

      <IconButton
        color="primary"
        onClick={handleSearch}
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      >
        <IoMdSearch size={20} color="white" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;