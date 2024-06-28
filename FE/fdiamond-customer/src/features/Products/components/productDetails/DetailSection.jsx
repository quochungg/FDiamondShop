import { useNavigate, useLocation } from "react-router-dom"
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import chevron from "../../../../assets/chevron.svg";
import { useState } from "react";


const DetailSection = ({ product, isAppendable }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedSize, setSelectedSize] = useState(0);

    const handleAddToCart = async () => {
        const addedItemArr = [
            {
                productId: product.productId,
                ringSize: selectedSize
            },
        ]

        navigate('/cart', {
            state: {
                ...location.state,
                previousUrl: location.pathname,
                addedItemArr: addedItemArr
            }
        });
    }

    const AccordionItem = ({ header, ...rest }) => (
        <Item
            {...rest}
            header={({ state: { isEnter } }) => (
                <>
                    {header}
                    <img
                        className={`ml-auto transition-transform duration-500 ease-out ${isEnter && "rotate-180"
                            }`}
                        src={chevron}
                        alt="Chevron"
                    />
                </>
            )}
            buttonProps={{
                className: ({ isEnter }) =>
                    `flex w-full ${isEnter && ""
                    }`
            }}
            contentProps={{
                className: "transition-height duration-500 ease-out"
            }}
            panelProps={{ className: "" }}
        />
    );


    return (
        <>
            <div className="px-10 py-6 bg-gray-100 rounded-sm">
                <div className="h-auto">
                    <div className="flex flex-col gap-y-6">

                        {/* PRODUCT NAME */}
                        <p className="font-lora text-[26px]">
                            {product.productName}
                        </p>

                        {/* PRODUCT DESCRIPTION */}
                        <p className=" w-auto font-gantari text-[16px] bg-gray-200 px-3 py-3 rounded-sm leading-7">
                            {product.description}
                        </p>

                        {/* PRODUCT VARIANTS */}
                        <div className="h-auto flex flex-row flex-wrap gap-x-3 gap-y-3 w-[100%]">
                            <p className="w-auto font-gantari text-[14px] bg-gray-200 px-3 py-2 rounded-sm tracking-wide">
                                {product.subCategoryName}
                            </p>
                            {product.productVariantValues.map((variant) => {
                                return (variant.value !== 'None') &&
                                    <p
                                        key={variant.variantId}
                                        className="w-auto font-gantari text-[14px] bg-gray-200 px-3 py-2 rounded-sm tracking-wide"
                                    >
                                        {variant.value}
                                    </p>
                            })}
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="font-gantari">
                            <Accordion transition>
                                <AccordionItem
                                    header="Product Details"
                                    className={'font-[500] text-[18px] hover:duration-150'}
                                >
                                    <div className="w-[100%] h-auto bg-gray-200 rounded-sm mt-4 pt-2 pb-6">

                                        <div
                                            className="w-[100%] border-b-[0px] border-gray-400 px-8 py-3">
                                            <div className="flex flex-row justify-between">
                                                <p className="text-[16px] font-[500]">Type</p>
                                                <p className="font-[400] text-[16px]">{product.subCategoryName}</p>
                                            </div>
                                        </div>

                                        {product.productVariantValues.map((variant) => (
                                            <div
                                                key={variant.variantId}
                                                className="w-[100%] border-b-[0px] border-gray-400 px-8 py-3">
                                                <div className="flex flex-row justify-between">
                                                    <p className="text-[16px] font-[500]">{variant.variantName}</p>
                                                    <p className="font-[400] text-[16px]">{variant.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        </div>

                    </div>
                </div>

                {/* RING SIZE */}
                <div className="font-gantari mt-4 border-t-[1px] border-blue-950 py-5 flex flex-col gap-8">
                    {product.categoryName === 'Engagement Ring' &&
                        <div className="flex flex-row gap-5">
                            <label htmlFor="size" className="text-[19px] cursor-pointer">Select ring size</label>
                            <select
                                name="size"
                                id="size"
                                className="cursor-pointer block text-center text-sm bg-transparent  border-b-2 border-gray-200 text-gray-600 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                <option value="Ring size">Ring size</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                    }

                    {/* PRICE */}
                    <p className="font-gantari text-[14px]">
                        <span className="text-[20px] font-[600]">${product.basePrice.toLocaleString()} </span>
                        {product.categoryName === 'Engagement Ring' ? '(Setting Price)' : '(Diamond Price)'}
                    </p>

                    {/* ADD TO CART BUTTON*/}
                    {/* APPEND BUTTON*/}
                    <div className="flex flex-row gap-3 font-gantari">
                        <button onClick={handleAddToCart} className="flex-1" to="/cart">
                            <p className="bg-blue-950 text-white text-center py-4 text-[18px] hover:bg-[#34427b] hover:duration-200 rounded-sm">
                                ADD TO CARD
                            </p>
                        </button>

                        {isAppendable &&
                            <button className="flex-1" to="">
                                <p className="bg-blue-950 text-white text-center py-4 text-[18px] hover:bg-[#34427b] hover:duration-200 rounded-sm">
                                    APPEND
                                </p>
                            </button>
                        }

                    </div>

                </div>
            </div>
        </>
    )
};

export default DetailSection;
