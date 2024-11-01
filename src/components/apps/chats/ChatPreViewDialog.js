/* eslint-disable react/prop-types */
import  { useContext, useState } from 'react';
import { Typography, IconButton, Box, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { Delete as DeleteIcon, Cancel } from '@mui/icons-material'; // Ícones
import ChatContext from './ChatContext/ChatContext';

const ChatPreViewDialog = ({ previewOpen, setPreviewOpen, previewFiles, setPreviewFiles, socket }) => {
  const { setMessages } = useContext(ChatContext);
  const chatId = localStorage.getItem('chatId');
  const currentUserls = JSON.parse(localStorage.getItem('currentUser'));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Índice da imagem selecionada

  const handleSendFiles = () => {
    previewFiles.forEach((file) => {
      if(file.type.includes('image')){
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];  
          const data = {
            'email': currentUserls.email,
            'chatId': chatId,
            'file': base64String,
            'text': 'teste',
            'type': 'image',
            'fileName': file.name,
            'contentType': file.type,
          };
  
          console.log(data);
    
          setMessages(prevMessages => [
            ...prevMessages,
            { ...data, isLoading: true, id: 1, senderEmail: currentUserls.email, createdAt: '2024-07-20T00:00:00.394Z' },
          ]);
    
          socket.emit('upload', data, (error) => {
            console.log(error);
          });
        };
    
        reader.readAsDataURL(file); // Converte o arquivo em Base64
      }
      else if (file.type.includes('pdf') ||file.type.includes('doc') ||file.type.includes('docx') ||file.type.includes('txt') ||file.type.includes('odt') ||file.type.includes('text')) {
        const data = {
          'email': currentUserls.email,
          'chatId': chatId,
          'file': file,
          'text': 'teste',
          'type': 'file',
          'fileName': file.name,
          'contentType': file.type
        };
    
        setMessages(prevMessages => [
          ...prevMessages,
          { ...data, isLoading: true, id: 1, senderEmail: currentUserls.email, createdAt: '2024-07-20T00:00:00.394Z' },
        ]);
        socket.emit('upload', data);
      } 
      else if (file.type.includes('audio') ||file.type.includes('mp3') ||file.type.includes('mp4') ||file.type.includes('wav') ||file.type.includes('ogg')){
        console.log('audio');
      }
      else {
        console.log('unknown');
      }
    });

    setPreviewOpen(false); // Fecha o diálogo após o envio
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const handleDeleteImage = (indexToDelete) => {
    setPreviewFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, index) => index !== indexToDelete);
      if (selectedImageIndex >= updatedFiles.length) {
        setSelectedImageIndex(Math.max(updatedFiles.length - 1, 0));
      }
      return updatedFiles;
    });
  };

  const handleSelectImage = (index) => {
    setSelectedImageIndex(index); // Atualiza a imagem selecionada
  };

  return (
    <Dialog
      open={previewOpen}
      onClose={handleClosePreview}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo levemente transparente
          backdropFilter: 'blur(10px)', // Efeito de desfoque no fundo
          borderRadius: '16px',
          padding: '16px',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
            Pré-visualização
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClosePreview} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <Box p={2}>
        <Box mb={2} display="flex" justifyContent="center">
          {previewFiles.length > 0 && previewFiles[selectedImageIndex].type.includes('image') ? (
            <img
              src={URL.createObjectURL(previewFiles[selectedImageIndex])}
              alt="Preview"
              width="250px"
              style={{
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                maxWidth: '250px',
                maxHeight: '250px',
              }}
            />
          ) : (
            <Typography>Nenhuma imagem selecionada</Typography>
          )}
        </Box>

        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {/* Miniaturas das imagens */}
          {previewFiles.map((file, index) => (
            <Box key={index} position="relative" mx={1} style={{ marginBottom: '8px' }}>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                width="80"
                height="80"
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: selectedImageIndex === index ? '2px solid #3f51b5' : '2px solid transparent',
                  transition: 'border 0.3s ease-in-out',
                }}
                onClick={() => handleSelectImage(index)}
                onMouseOver={(e) => (e.target.style.border = '2px solid #3f51b5')}
                onMouseOut={(e) =>
                  selectedImageIndex !== index
                    ? (e.target.style.border = '2px solid transparent')
                    : (e.target.style.border = '2px solid #3f51b5')
                }
              />
              {/* Botão para deletar a imagem */}
              <IconButton
                onClick={() => handleDeleteImage(index)}
                size="small"
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                }}
              >
                <DeleteIcon style={{ fontSize: '16px' }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      <DialogActions>
        <Button
          onClick={handleClosePreview}
          color="secondary"
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            backgroundColor: '#f50057',
            color: 'white',
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSendFiles}
          color="primary"
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
          }}
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatPreViewDialog;
