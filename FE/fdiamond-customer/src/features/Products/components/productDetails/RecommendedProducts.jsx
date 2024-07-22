import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'


const RecommendedProducts = ({ product }) => {


    const hover = 'cursor-pointer hover:border-blue-950 hover:border-[1px] hover:duration-150';

    return (
        <>


            <div>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="w-auto"
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass="px-2"
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 4,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {product.recommendProducts.map((product) => (
                        <>
                            <div className="w-auto h-full">

                                <div key={product.productId} className={`w-full h-full border-[1px] rounded-sm ${hover}`}>
                                    <Link
                                        to={`/product/product-details/${product.productId}`}
                                        className="flex flex-col justify-start h-full w-full border-b-[1px]"
                                    >
                                        <div className="w-[334px] h-[267px]">
                                            <img
                                                className="object-cover w-full h-full"
                                                src={product.productImages[0].imageUrl}
                                            />
                                        </div>


                                        <div className="flex flex-col justify-start mt-3">

                                            <div className='px-5 flex-1'>
                                                <LinesEllipsis
                                                    className="font-lora text-[16px] font-[600]"
                                                    text={product.productName}
                                                    maxLine='2'
                                                    ellipsis='...'
                                                    trimRight
                                                    basedOn='letters'
                                                />
                                            </div>

                                            <p className="p-5 flex-1 content-center font-gantari text-2sm leading-5">
                                                ${product.basePrice.toLocaleString()} {product.categoryName === 'Engagement Ring' && '(Setting Price)'}
                                            </p>

                                        </div>
                                    </Link>


                                </div>
                            </div>
                        </>
                    ))}

                </Carousel>
            </div>

        </>
    )
};

export default RecommendedProducts;
