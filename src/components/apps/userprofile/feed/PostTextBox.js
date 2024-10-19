/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Stack, Fab, TextField, Button, Box, Grid, IconButton } from '@mui/material';
import { IconPhoto, IconTrash } from '@tabler/icons';
import ChildCard from 'src/components/shared/ChildCard';
import { toast } from 'sonner';
import { postFormData, postFormLoadingData } from '../../../../Services/Api';

export const PostTextBox = ({ loading, setLoading, setProgress, myPost, setMyPost, userData }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [postText, setPostText] = useState('');
  const token = localStorage.getItem('token');

  // Função para lidar com a seleção de imagens
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages((prevImages) => [...prevImages, ...files]); // Guarda os arquivos de imagem reais
    }
    console.log(selectedImages);
  };
  

  // Função para remover uma imagem selecionada
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Simula o envio para a API com validação e progresso
  const handleSubmit = async () => {
    if (!postText && selectedImages.length === 0) {
      toast.warning('Por favor, adicione texto ou imagens para publicar.');
      return;
    }
  
    if (selectedImages.length > 4) {
      toast.warning('Você pode selecionar no máximo 4 imagens.');
      return;
    }
  
    setLoading(true);
    setProgress(0);
  
    const formData = {
      text: postText,
    };
  
    const form = new FormData();
    form.append('data', JSON.stringify(formData));
  
    // Adiciona os arquivos de imagem ao form
    selectedImages.forEach((image) => {
      form.append('photos', image); // 'photos' deve ser o nome do campo esperado pelo backend
    });
  
    try {
      const response = await postFormLoadingData('posts', form, token, setLoading, setProgress);
      if (response.status === 200 || response.status === 201) {
        toast.success('Post publicado com sucesso!');
        setMyPost([response.data ,...myPost ]);
        setPostText('');
        setSelectedImages([]);
        console.log(response);
      } else {
        console.log(response);
        toast.error('Erro ao publicar o post.');
      }
    } catch (error) {
      toast.error('Erro ao publicar o post. Tente novamente mais tarde.');
    }
  };

  return (
    <ChildCard>
      <TextField
        id="outlined-multiline-static"
        placeholder="Compartilhe seus pensamentos"
        multiline
        fullWidth
        rows={4}
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        disabled={loading} // Desativa o campo enquanto estiver enviando
      />

      <Stack direction="row" gap={1} mt={2} alignItems="center">
        <Fab size="small" color="primary" disabled={loading}>
          <IconPhoto size="16" />
        </Fab>
        <Button variant="text" color="inherit" component="label" disabled={loading}>
          <input hidden accept="image/*" multiple type="file" onChange={handleImageChange} />
          Foto / Vídeo
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 'auto' }}
          onClick={handleSubmit}
          disabled={loading} // Desativa o botão durante o envio
        >
          Publicar
        </Button>
      </Stack>

      {/* Exibir pré-visualizações das imagens */}
      {selectedImages.length > 0 && (
        <Box mt={2}>
          <Grid container spacing={2}>
            {selectedImages.map((image, index) => (
              <Grid item xs={4} sm={3} md={2} key={index}>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`selected-img-${index}`}
                    style={{
                      width: '100px', // largura fixa
                      height: '100px', // altura fixa
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    sx={{ position: 'absolute', top: '5px', right: '5px' }}
                    onClick={() => handleRemoveImage(index)}
                    disabled={loading} // Desativa o botão durante o envio
                  >
                    <IconTrash size="18" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </ChildCard>
  );
};
