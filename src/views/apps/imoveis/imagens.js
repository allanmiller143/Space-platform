/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Box, Typography, Grid, IconButton, Menu, MenuItem, Card, CardMedia, CardContent } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// eslint-disable-next-line react/prop-types
const Imagens = ({ formData, setFormData }) => {
  const [files, setFiles] = useState(formData.otherImages || []);
  const [coverImage, setCoverImage] = useState(formData.coverImage || null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const open = Boolean(anchorEl);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleOpenMenu = (event, file) => {
    setAnchorEl(event.currentTarget);
    setSelectedImage(file);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedImage(null);
  };

  const handleSetCover = () => {
    setCoverImage(selectedImage);
    handleCloseMenu();
  };

  const handleRemove = () => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== selectedImage.name));
    if (selectedImage && selectedImage.name === coverImage?.name) {
      setCoverImage(null); // Remove cover image if it was the one deleted
    }
    handleCloseMenu();
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [movedFile] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, movedFile);

    setFiles(reorderedFiles);
  };

  // Define a primeira imagem como capa por padrão se não houver uma capa definida
  useEffect(() => {
    if (files.length > 0 && !coverImage) {
      setCoverImage(files[0]);
    }
  }, [files, coverImage]);

  // Atualiza o formData com a coverImage e otherImages
  useEffect(() => {
    const otherImages = files.filter(file => file.name !== coverImage?.name);
    setFormData({
      ...formData,
      coverImage: coverImage, // Imagem de capa
      otherImages: otherImages // Outras imagens que não são de capa
    });
  }, [files, coverImage, setFormData, formData]);

  return (
    <Box mt={4}>
      <Typography variant="h5" >Imagens do Imóvel</Typography>
      <Typography variant="body2" mb={2}> Insira entre 5 e 10 imagens</Typography>

      {/* Área para a foto de capa */}
      {coverImage && (
        <Box mb={4}>
          <Typography variant="h6">Foto de Capa</Typography>
          <Card sx={{ maxWidth: 300, margin: '0 auto', border: '2px solid green', position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={coverImage.preview}
              alt="Foto de capa"
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1">{coverImage.name}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Área de dropzone */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box {...getRootProps({ className: 'dropzone' })} sx={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <Typography>Arraste e solte as imagens aqui, ou clique para selecionar</Typography>
          </Box>
        </Grid>

        {/* Área de visualização de imagens */}
        <Grid item xs={12}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="files" direction="horizontal">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {files.map((file, index) => (
                    <Draggable key={file.name} draggableId={file.name} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ display: 'inline-block', margin: '10px', position: 'relative' }}
                        >
                          <Box sx={{ width: 120, height: 120, border: '1px solid #ccc', position: 'relative' }}>
                            <img
                              src={file.preview}
                              alt={file.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
                            />
                            <IconButton
                              sx={{ position: 'absolute', top: 0, right: 0 }}
                              onClick={(e) => handleOpenMenu(e, file)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>

      {/* Menu para excluir ou tornar capa */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleSetCover}>Tornar Foto de Capa</MenuItem>
        <MenuItem onClick={handleRemove}>Excluir Foto</MenuItem>
      </Menu>
    </Box>
  );
};

export default Imagens;
