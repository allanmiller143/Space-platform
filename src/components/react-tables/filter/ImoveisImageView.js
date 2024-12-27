/* eslint-disable react/prop-types */
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Importar estilos da biblioteca
import { Avatar } from '@mui/material';
import './ImageViewer.css';

const ImageViewer = ({ src, alt, avatarSize = 65 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Avatar
        src={src}
        alt={alt}
        style={{ cursor: 'pointer', width: avatarSize, height: avatarSize }}
        onClick={handleOpen}
      />
      {isOpen && (
        <Lightbox
          mainSrc={src}
          onCloseRequest={handleClose}
          imageCaption={alt}
          wrapperClassName="react-image-lightbox" // Adicione esta classe
        />
      )}
    </>
  );
};

export default ImageViewer;
