import { useState } from "react";
// import { Link } from "react-router-dom"

const ImageCarousel = ({ product }) => {
    const [activeImage, setActiveImage] = useState(product.productImages[0].imageUrl)

    const handleClick = (image) => {
        // console.log(image)
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

                            <div
                                className=
                                {
                                    isActive(image.imageUrl) ?
                                        ('h-full w-full border-[1px] border-black')
                                        :
                                        ('h-full w-full border-[1px] hover:border-gray-400')
                                }
                                key={index}>
                                <img
                                    className="object-cover h-[80px] p-2"
                                    src={image.imageUrl}
                                    onClick={() => handleClick(image)}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={activeImage}
                        className="object-cover rounded-sm"
                    />
                </div>


            </div>
        </>
    )
};

export default ImageCarousel;

// !image.isGia &&

