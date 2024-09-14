import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = ({ onClose }) => {
    const images = [
        {
            src: "/vazio/imagem-1.jpg",
            alt: "Imagem 1",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-2.jpg",
            alt: "Imagem 2",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-3.jpg",
            alt: "Imagem 3",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-4.jpg",
            alt: "Imagem 4",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-5.jpg",
            alt: "Imagem 5",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-6.jpg",
            alt: "Imagem 6",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-7.jpg",
            alt: "Imagem 7",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-8.jpg",
            alt: "Imagem 8",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-9.jpg",
            alt: "Imagem 9",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-10.jpg",
            alt: "Imagem 10",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-11.jpg",
            alt: "Imagem 11",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-12.jpg",
            alt: "Imagem 12",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-13.jpg",
            alt: "Imagem 13",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-14.jpg",
            alt: "Imagem 14",
            width: 1600,
            height: 900
        },
        {
            src: "/vazio/imagem-15.jpg",
            alt: "Imagem 15",
            width: 1600,
            height: 900
        }
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
