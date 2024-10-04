/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Stack, Fab, TextField, Button, Box, Grid, IconButton, LinearProgress } from '@mui/material';
import { IconPhoto, IconTrash } from '@tabler/icons';
import ChildCard from 'src/components/shared/ChildCard';
import { toast } from 'sonner';

export const PostTextBox = ({ loading, setLoading, progress, setProgress }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [postText, setPostText] = useState('');

  // Função para lidar com a seleção de imagens
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  // Função para remover uma imagem selecionada
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Simula o envio para a API com validação e progresso
  const handleSubmit = () => {
    if (!postText && selectedImages.length === 0) {
      toast.warning('Por favor, adicione texto ou imagens para publicar.');
      return;
    }

    setLoading(true); // Inicia o loading
    setProgress(0); // Reseta o progresso

    const postData = {
      text: postText,
      images: selectedImages,
    };

    // Simulação de progresso de envio
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setLoading(false); // Finaliza o loading
          toast.success('Post publicado com sucesso!');
          
          // Limpar os campos após a publicação
          setPostText('');
          setSelectedImages([]);
        }
        return prevProgress + 20; // Incrementa o progresso em 20%
      });
    }, 500); // Atualiza a cada 500ms

    console.log('Enviando para API:', postData);
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
                    src={image}
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
