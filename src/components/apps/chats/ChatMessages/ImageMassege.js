/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import ImageDialog from './ImageDialog';
import { Box } from '@mui/system';



const ImageMessage = ({ message }) => {
const [open, setOpen] = useState(false);
const photoUrl = 'https://i.pinimg.com/564x/a2/c3/6c/a2c36c4016a04efc180e3ca318267f1d.jpg';

  return (    
    <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px' }}>
        <img src= {photoUrl} alt="anexo" width="150" height="150" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} />
        <ImageDialog open={open} onClose={() => setOpen(false)} imageUrl={photoUrl} fileName={'imagens'} />
    </Box>
  );
};

export default ImageMessage;
