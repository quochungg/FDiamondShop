import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import chevron from "../../../../assets/chevron.svg";
import { ImageModal } from "../index";
import ring_size_chart from "src/features/Products/assets/ring_size_chart.png";




const DetailSection = ({ product, isAppendable, isDiamondInCart, setResetSelectionBar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [errorSize, setErrorSize] = useState(false)

    const [selectedSize, setSelectedSize] = useState(0);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddToCart = async () => {
        const addedSingleItem = [
            {
                productId: product.productId,
                ringSize: selectedSize
            },
        ]

        navigate('/cart', {
            state: {
                ...location.state,
                previousUrl: location.pathname,
                addedSingleItem: addedSingleItem
            }
        });
    }

    const handleAppend = async () => {

        //check if selectedSize != null if product is Ring
        if (product.categoryName === 'Engagement Ring') {
            if (selectedSize === 0 || isNaN(parseInt(selectedSize))) {
                setErrorSize(true);
                return;
            } else {
                setErrorSize(false);
            }
        }

        const selectionBar = JSON.parse(localStorage.getItem('selectionBar') || '{}');

        //save appended product to local storage
        if (product.categoryName === 'Engagement Ring') {
            const engagementRing = {
                productId: product.productId,
                size: selectedSize
            }
            selectionBar.engagementRing = engagementRing;
            localStorage.setItem('selectionBar', JSON.stringify(selectionBar))
        } else {
            const diamond = {
                productId: product.productId
            }
            selectionBar.diamond = diamond;
            localStorage.setItem('selectionBar', JSON.stringify(selectionBar))
        }

        //Direct to Diamond SRP or Ring SRP or None
        if (selectionBar.engagementRing && !selectionBar.diamond) {
            //direct to diamond
            navigate('/product/diamond')
        }
        else if (selectionBar.diamond && !selectionBar.engagementRing) {
            //direct to ring
            navigate('/product/engagement ring')
        }

        window.scrollTo(0, 0)

        setResetSelectionBar(prev => !prev);
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
            <div className="px-12 py-8 bg-gray-100 rounded-sm">
                <div className="h-auto">
                    <div className="flex flex-col gap-y-6">

                        {/* PRODUCT NAME */}
                        <p className="font-lora text-[26px]">
                            {product.productName}
                        </p>

                        {/* PRODUCT DESCRIPTION */}
                        <p className=" w-auto font-gantari text-[16px] bg-gray-200 px-4 py-3 rounded-sm leading-7">
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
                        <div className="flex flex-row gap-6">
                            <label htmlFor="size" className="text-[19px] font-[500] cursor-pointer">Select ring size</label>
                            <select
                                name="size"
                                id="size"
                                className="cursor-pointer block text-center text-sm bg-transparent  
                                border-b-2 border-gray-200 text-gray-600 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                            </select>

                            <div className="self-end">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="text-sm no-underline hover:underline hover:underline-offset-4"
                                >
                                    Size Guide
                                </button>
                                {open && <ImageModal open={open} onClose={handleClose} imageUrl={ring_size_chart} />}
                            </div>

                            {errorSize &&
                                <div className="self-end ml-4">
                                    <p className="text-red-700 text-base font-[550]">Please select a ring size</p>
                                </div>
                            }

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
                        {isDiamondInCart ?
                            (
                                <Link to='/cart' className="flex-1">
                                    <p className="bg-blue-950 text-white text-center py-4 text-[18px] hover:bg-[#34427b] hover:duration-200 rounded-sm">
                                        EXISTING IN CART
                                    </p>
                                </Link>
                            ) : (
                                product.categoryName !== 'Engagement Ring' && (
                                    <button onClick={handleAddToCart} className="flex-1" >
                                        <p className="bg-blue-950 text-white text-center py-4 text-[18px] hover:bg-[#34427b] hover:duration-200 rounded-sm">
                                            ADD TO CART
                                        </p>
                                    </button>
                                )
                            )
                        }

                        {isAppendable &&
                            <div className="flex-1">
                                <button
                                    onClick={handleAppend}
                                    className="w-full bg-blue-950 text-white text-center py-4 text-[18px] hover:bg-[#34427b] hover:duration-200 rounded-sm">
                                    {product.categoryName === 'Diamond' ? 'APPEND TO RING' : 'APPEND TO DIAMOND'}
                                </button>
                            </div>
                        }

                    </div>

                </div>
            </div>
        </>
    )
};

export default DetailSection;
