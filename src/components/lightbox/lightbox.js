import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = ({ onClose }) => {
    const images = [
        {
            src: "/assets/images/posters/imagem-1.jpg",
            alt: "Imagem 1",
            width: 1600,
            height: 900
        },
        {
            src: "/assets/images/posters/imagem-1.jpg",
            alt: "Imagem 2",
            width: 1600,
            height: 900
        },
        {
            src: "/assets/images/posters/imagem-1.jpg",
            alt: "Imagem 3",
            width: 1600,
            height: 900
        },
        // Adicione mais imagens conforme necessário
    ];

    const slides = images.map(image => ({
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height
    }));

    return (
        <Lightbox
            open={true}
            close={onClose}
            slides={slides}
        />
    );
};

export default Gallery;
