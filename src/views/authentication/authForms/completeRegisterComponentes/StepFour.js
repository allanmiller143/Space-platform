/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// completeRegisterComponentes/StepFour.js

import React from 'react';
import { Box, Typography, Avatar, TextField, Button, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const StepFour = ({ formData, setFormData }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          profilePhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handleBioChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      bio: event.target.value,
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Adicione uma Foto e Biografia
      </Typography>

      {/* Área de upload de imagem */}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          mt: 3,
          backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
          '&:hover': {
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" color="textSecondary">
          {isDragActive
            ? 'Solte o arquivo aqui...'
            : 'Arraste uma foto ou clique aqui para selecionar um arquivo'}
        </Typography>
      </Box>

      {/* Exibir a foto selecionada */}
      {formData.profilePhoto && (
        <Box mt={3}>
          <Avatar
            src={formData.profilePhoto}
            alt="Foto do Perfil"
            sx={{ width: 150, height: 150, mx: 'auto' }}
          />
        </Box>
      )}

      <TextField
        id="bio"
        label="Biografia"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={formData.bio}
        onChange={handleBioChange}
        sx={{ mt: 3  }}
      />

      {/* Botão opcional para remover a foto */}
      {formData.profilePhoto && (
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              setFormData((prevState) => ({ ...prevState, profilePhoto: null }))
            }
          >
            Remover Foto
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default StepFour;
