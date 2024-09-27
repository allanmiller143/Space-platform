/* eslint-disable react/prop-types */
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = ({ onClose,pictures }) => {


    const slides = pictures.map(image => ({
        src: image.url,
        alt: image.name,
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
