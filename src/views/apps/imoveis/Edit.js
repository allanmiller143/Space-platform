import React from 'react';
import { Card, CardContent, Typography, Box, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Input } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const EditImovel = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Editar Imóvel',
    },
  ];

  const [tipoImovel, setTipoImovel] = React.useState('');
  const [finalidade, setFinalidade] = React.useState('');
  const [posicaoSolar, setPosicaoSolar] = React.useState('');
  const [mobiliado, setMobiliado] = React.useState('');
  const [permiteAnimais, setPermiteAnimais] = React.useState('');
  const [condominioIncluso, setCondominioIncluso] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [disponibilidade, setDisponibilidade] = React.useState('');

  const handleTipoImovelChange = (event) => {
    setTipoImovel(event.target.value);
  };

  const handleFinalidadeChange = (event) => {
    setFinalidade(event.target.value);
  };

  const handlePosicaoSolarChange = (event) => {
    setPosicaoSolar(event.target.value);
  };

  const handleMobiliadoChange = (event) => {
    setMobiliado(event.target.value);
  };

  const handlePermiteAnimaisChange = (event) => {
    setPermiteAnimais(event.target.value);
  };

  const handleCondominioInclusoChange = (event) => {
    setCondominioIncluso(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleDisponibilidadeChange = (event) => {
    setDisponibilidade(event.target.value);
  };

  return (
    <PageContainer title="Editar Imóvel" description="Formulário para editar informações do imóvel">
      <Breadcrumb title="Editar Imóvel" items={BCrumb} />
      <Card>
        <CardContent>
          <Box>
            <Typography variant="h4">Informações Gerais do Imóvel</Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Título do Imóvel"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Descrição"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required margin="normal">
                    <InputLabel>Tipo de Imóvel</InputLabel>
                    <Select
                      value={tipoImovel}
                      onChange={handleTipoImovelChange}
                      label="Tipo de Imóvel"
                    >
                      <MenuItem value="Apartamento">Apartamento</MenuItem>
                      <MenuItem value="Casa">Casa</MenuItem>
                      <MenuItem value="Terreno">Terreno</MenuItem>
                      <MenuItem value="Sala Comercial">Sala Comercial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required margin="normal">
                    <InputLabel>Finalidade</InputLabel>
                    <Select
                      value={finalidade}
                      onChange={handleFinalidadeChange}
                      label="Finalidade"
                    >
                      <MenuItem value="Venda">Venda</MenuItem>
                      <MenuItem value="Aluguel">Aluguel</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Preço"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Área Total (m²)"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Área Construída (m²)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Número de Quartos"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Número de Banheiros"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Número de Suítes"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Vagas de Garagem"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="number"
                  />
                </Grid>
              </Grid>
              <Box mt={4}>
                <Typography variant="h4">Localização</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Endereço Completo"
                      variant="outlined"
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Cidade"
                      variant="outlined"
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Estado"
                      variant="outlined"
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="CEP"
                      variant="outlined"
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Bairro"
                      variant="outlined"
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Latitude"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Longitude"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box mt={4}>
                <Typography variant="h4">Características</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Ano de Construção"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Andares no Prédio"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Posição Solar</InputLabel>
                      <Select
                        value={posicaoSolar}
                        onChange={handlePosicaoSolarChange}
                        label="Posição Solar"
                      >
                        <MenuItem value="Norte">Norte</MenuItem>
                        <MenuItem value="Sul">Sul</MenuItem>
                        <MenuItem value="Leste">Leste</MenuItem>
                        <MenuItem value="Oeste">Oeste</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Mobiliado</InputLabel>
                      <Select
                        value={mobiliado}
                        onChange={handleMobiliadoChange}
                        label="Mobiliado"
                      >
                        <MenuItem value="Sim">Sim</MenuItem>
                        <MenuItem value="Não">Não</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Permite Animais</InputLabel>
                      <Select
                        value={permiteAnimais}
                        onChange={handlePermiteAnimaisChange}
                        label="Permite Animais"
                      >
                        <MenuItem value="Sim">Sim</MenuItem>
                        <MenuItem value="Não">Não</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Condomínio Incluso</InputLabel>
                      <Select
                        value={condominioIncluso}
                        onChange={handleCondominioInclusoChange}
                        label="Condomínio Incluso"
                      >
                        <MenuItem value="Sim">Sim</MenuItem>
                        <MenuItem value="Não">Não</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Valor do Condomínio"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box mt={4}>
                <Typography variant="h4">Imagens</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel htmlFor="fotos-imovel">Fotos do Imóvel</InputLabel>
                      <Input
                        id="fotos-imovel"
                        type="file"
                        inputProps={{
                          multiple: true,
                          accept: 'image/*'
                        }}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="fotos-imovel">
                        <Button variant="contained" component="span">
                          Selecionar Fotos
                        </Button>
                      </label>
                      {selectedFiles.length > 0 && (
                        <Typography variant="body2" mt={2}>
                          {selectedFiles.length} arquivo(s) selecionado(s)
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={4}>
                <Typography variant="h4">Outros Detalhes</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Código do Imóvel"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Disponibilidade</InputLabel>
                      <Select
                        value={disponibilidade}
                        onChange={handleDisponibilidadeChange}
                        label="Disponibilidade"
                      >
                        <MenuItem value="Disponível">Disponível</MenuItem>
                        <MenuItem value="Indisponível">Indisponível</MenuItem>
                        <MenuItem value="Alugado">Alugado</MenuItem>
                        <MenuItem value="Vendido">Vendido</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Data de Cadastro"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={new Date().toISOString().split('T')[0]}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box mt={4}>
                <Typography variant="h4">Informações do Proprietário/Imobiliária</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Nome do Proprietário/Imobiliária"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Contato"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Botão de submissão do formulário */}
              <Box mt={4}>
                <Button variant="contained" color="primary" type="submit">
                  Salvar Alterações
                </Button>
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditImovel;