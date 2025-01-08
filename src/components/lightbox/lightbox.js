/* eslint-disable react/prop-types */
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = ({ onClose, pictures, initialPic }) => {
    // Converte as imagens para o formato que o Lightbox espera
    const slides = pictures.map(image => ({
        src: image.url,
        alt: image.name,
        width: image.width,
        height: image.height
    }));

    // Define o índice inicial: se 'initialPic' não for passado, a primeira imagem será exibida.
    const initialIndex = initialPic !== undefined ? initialPic : 0;

    return (
        <Lightbox
            open={true}
            close={onClose}
            slides={slides}
            index={initialIndex} // Define o índice inicial
        />
    );
};

export default Gallery;
