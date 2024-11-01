/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

const ImageDialog = ({ open, onClose, imageUrl, fileName }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName || 'image'; // Usa o fileName ou 'image' como fallback
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="download"
          onClick={handleDownload}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#f5f5f5',
            '&:hover': { backgroundColor: '#e0e0e0' },
            zIndex: 10,
          }}
        >
          <GetAppIcon />
        </IconButton>

        <img
          src={imageUrl}
          alt="Preview"
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        />
      </Box>
    </Modal>
  );
};

export default ImageDialog;
