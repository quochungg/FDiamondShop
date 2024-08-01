import { useState } from "react";
import { ImageModal } from "../index";

const ImageCarousel = ({ product }) => {

    const [activeImage, setActiveImage] = useState(product.productImages[0].imageUrl)

    const [open, setOpen] = useState(false);

    // Close GIA modal
    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = (image) => {
        setActiveImage(image.imageUrl);
    }

    const isActive = (imageUrl) => {
        return activeImage === imageUrl;
    }


    return (
        <>


            <div className="flex flex-row items-start w-full">
                <div className="w-[80px] h-[auto] flex flex-col gap-y-2">
                    {product.productImages.map((image, index) => {
                        return (
                            <>
                                {image.isGia === false ? (
                                    // Normal Image
                                    <div
                                        key={index}
                                        className=
                                        {
                                            isActive(image.imageUrl) ?
                                                ('h-full w-full border-[1px] border-black cursor-pointer')
                                                :
                                                ('h-full w-full border-[1px] hover:border-gray-400 cursor-pointer')
                                        }
                                    >
                                        <img
                                            className="object-cover h-[80px] p-2"
                                            src={image.imageUrl}
                                            onClick={() => handleClick(image)}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {/* GIA Image */}
                                        <div
                                            key={index}
                                            className="group"
                                        >
                                            <img
                                                className="object-cover h-[80px] p-2 cursor-pointer hover:opacity-[0.6] hover:duration-150"
                                                src='https://jemmia.vn/wp-content/uploads/2022/07/gia-diamond-certification.png'
                                                onClick={() => setOpen(true)}
                                            />
                                            <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute text-[15px] font-[500] font-gantari">
                                                GIA Report
                                            </p>

                                        </div>

                                        {/* GIA Modal  */}
                                        {open && <ImageModal open={open} onClose={handleClose} imageUrl={image.imageUrl} />}
                                    </>
                                )
                                }
                            </>
                        )
                    })}
                </div>


                {/* Big, active image */}
                <div className="flex-1 w-full flex justify-center items-center">
                    <img
                        src={activeImage}
                        className="object-cover rounded-sm w-[90%]"
                    />
                </div>

            </div>
        </>
    )
};

export default ImageCarousel;

// !image.isGia &&

