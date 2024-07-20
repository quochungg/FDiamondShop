import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

const ImageModal = ({ open, onClose, imageUrl }) => {
    return (

        <Lightbox
            open={open}
            close={onClose}
            plugins={[Fullscreen]}
            slides={[
                { src: imageUrl },
            ]}
        />

    );

};

export default ImageModal;
