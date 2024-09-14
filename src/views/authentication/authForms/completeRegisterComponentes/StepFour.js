/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// completeRegisterComponentes/StepFour.js

import React from 'react';
import { Box, TextField, Typography, Avatar } from '@mui/material';

const StepFour = ({ formData, setFormData }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          profilePhoto: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      bio: event.target.value
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Adicione uma Foto e Biografia
      </Typography>
      <Box mt={2}>
        <input
          accept="image/*"
          type="file"
          id="profilePhoto"
          onChange={handleFileChange}
          style={{ marginBottom: '16px' }}
        />
        
        {/* Exibir a foto selecionada */}
        {formData.profilePhoto && (
          <Box mt={2} display="flex" justifyContent="center">
            <Avatar
              src={formData.profilePhoto}
              alt="Foto do Perfil"
              sx={{ width: 100, height: 100 }}
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
          sx={{ mt: 3 }}
        />
      </Box>
    </Box>
  );
};

export default StepFour;
