import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useDropzone } from 'react-dropzone';

const Imagens = () => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <Box mt={4}>
      <Typography variant="h5">Imagens do Imóvel</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box {...getRootProps({ className: 'dropzone' })} sx={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <Typography>Arraste e solte as imagens aqui, ou clique para selecionar</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            {files.map((file) => (
              <Box key={file.name} sx={{ display: 'inline-block', margin: '10px' }}>
                <img src={file.preview} alt={file.name} width={100} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Imagens;
