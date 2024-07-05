import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProductByID } from 'src/features/Products/api/APIs';
import diamondSelectionSvg from 'src/features/Products/assets/diamondSelectionSvg.svg';
import ringSelectionSvg from 'src/features/Products/assets/ringSelectionSvg.svg';
import { checkExistingAttachmentInCart } from 'src/features/Order/api/APIs';


const SelectionBar = ({ setResetSelectionBar }) => {
    const navigate = useNavigate();

    const selectionBar = JSON.parse(localStorage.getItem('selectionBar') || '{}');

    const [diamond, setDiamond] = useState(null);
    const [engagementRing, setEngagementRing] = useState(null);

    const [totalPrice, setTotalPrice] = useState(0);

    const [showGoToCartBtn, setShowGoToCartBtn] = useState(false);



    useEffect(() => {
        getSelectionItems();
    })


    useEffect(() => {
        if (diamond && engagementRing) {
            handleShowGoToCart();
            calculateTotalPrice();
        }
    }, [diamond, engagementRing])


    //Get selection items when Selection bar is mounted
    const getSelectionItems = async () => {
        if (selectionBar.diamond && !selectionBar.engagementRing) {
            const response = await getProductByID(selectionBar.diamond.productId);
            setDiamond(response.data.result);
        }
        else if (selectionBar.engagementRing && !selectionBar.diamond) {
            const response = await getProductByID(selectionBar.engagementRing.productId);
            setEngagementRing(response.data.result);
        }
        else if (selectionBar.diamond && selectionBar.engagementRing) { //have both
            const diamondRes = await getProductByID(selectionBar.diamond.productId);
            const ringRes = await getProductByID(selectionBar.engagementRing.productId);
            setDiamond(diamondRes.data.result);
            setEngagementRing(ringRes.data.result);
        } else {
            setDiamond(null);
            setEngagementRing(null);
        }
    }


    // Check if attachment items are already existing in cart. If yes, show Go To Cart btn
    const handleShowGoToCart = async () => {
        const attachmentItemsArr = [
            {
                productId: engagementRing.productId,
                ringSize: 0
            },
            {
                productId: diamond.productId,
                ringSize: 0
            }
        ]

        const response = await checkExistingAttachmentInCart(attachmentItemsArr);

        if (response.data.result) {
            setShowGoToCartBtn(true);
        } else {
            setShowGoToCartBtn(false);
        }
    }


    // Handle save local storage items to cart
    const handleAddToCart = async () => {

        const addedAttachmentItems = [
            {
                productId: engagementRing.productId,
                ringSize: selectionBar.engagementRing.size
            },
            {
                productId: diamond.productId,
                ringSize: 0
            }
        ]



        navigate('/cart', {
            state: {
                ...location.state,
                previousUrl: location.pathname,
                addedAttachmentItems: addedAttachmentItems
            }
        });
    }


    // Handle remove item(s) from selection bar
    const handleRemoveItem = (itemType) => {

        if (itemType === 'diamond') {
            delete selectionBar.diamond;
        } else {
            delete selectionBar.engagementRing;
        }

        localStorage.setItem('selectionBar', JSON.stringify(selectionBar));

        setResetSelectionBar(prev => !prev);
    }

    const calculateTotalPrice = () => {
        setTotalPrice(diamond.basePrice + engagementRing.basePrice);
    }


    return (
        <>
            <div className="flex flex-row content-center pt-12 px-16 w-full ">
                <div className="grid grid-cols-3 border-[1px] border-black w-full h-[90px] rounded-full
                font-gantari text-lg capitalize">

                    {/* START DIAMOND PART */}
                    {diamond ? (
                        <>
                            {/* Diamond is present in Selection Bar */}
                            <div className={diamond.isVisible ?
                                ('border-black border-r-[1px] flex items-center justify-between w-full px-6 rounded-l-full')
                                :
                                ('border-black border-r-[1px] flex items-center justify-between w-full px-6 rounded-l-full bg-[#fcf9f2]')
                            }
                            >

                                <div className='flex w-[80%] '>
                                    {/* Check icon */}
                                    <div className='w-[10%] flex items-center justify-center'>
                                        <img
                                            src='https://ecommo--ion.bluenile.com/static-dyo-bn/funnelItemChecked.52d67.svg'
                                            className='w-5'
                                        />
                                    </div>


                                    <div className='w-[90%] text-base px-3'>

                                        {/* Product title */}
                                        <Link to={diamond.isVisible ?
                                            `/product/product-details/${diamond.productId}` : '#'}
                                            className={!diamond.isVisible && 'pointer-events-none'}
                                        >
                                            <p
                                                className='capitalize whitespace-nowrap overflow-hidden text-ellipsis w-full font-[650]'
                                            >
                                                {diamond.productName}
                                            </p>
                                        </Link>

                                        {/* Product price && Remove btn*/}
                                        <div className='flex'>
                                            {diamond.isVisible ? (
                                                <p className='font-[650]'>${diamond.basePrice.toLocaleString()}</p>
                                            ) : (
                                                <p className='font-[600] text-red-700'>Not Available</p>
                                            )}

                                            <button
                                                onClick={() => handleRemoveItem('diamond')}
                                                className='text-sm text-gray-400 font-[500] hover:text-blue-950 transition-colors duration-200
                                                    underline underline-offset-2 ml-5'
                                            >
                                                Remove
                                            </button>
                                        </div>

                                    </div>
                                </div>


                                <div className='w-[20%] flex items-center justify-center'>
                                    {/* Product img */}
                                    <div className='border-[1px] border-black w-16 h-14'>
                                        <img
                                            src={diamond.productImages[0].imageUrl}
                                            className='object-cover w-full h-full'
                                        />
                                    </div>
                                </div>

                            </div>
                        </>
                    ) : (
                        <>
                            {/* No Diamond is selected in Selection Bar*/}
                            <div className='border-black border-r-[1px] flex items-center justify-between w-full px-6 rounded-l-full'>

                                <div className="flex items-center space-x-6 ml-5">
                                    <p className='text-[2.6rem] font-lora'>
                                        1
                                    </p>
                                    <p className='font-[550] text-[1.125rem]'>
                                        Choose a Diamond
                                    </p>
                                </div>
                                <div className='w-6 flex justify-center mr-2'>
                                    <img
                                        src={diamondSelectionSvg}
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                            </div>

                        </>
                    )}
                    {/* END DIAMOND PART */}



                    {/* START ENGAGEMENT RING PART */}
                    {engagementRing ? (
                        <>
                            <div className={engagementRing.isVisible ?
                                ('border-black border-r-[1px] flex items-center justify-between w-full px-6 rounded-l-full')
                                :
                                ('border-black border-r-[1px] flex items-center justify-between w-full px-6 bg-[#fcf9f2]')
                            }
                            >
                                <div className='flex w-[80%]'>
                                    <div className='w-[10%] flex items-center justify-center'>
                                        <img
                                            src='https://ecommo--ion.bluenile.com/static-dyo-bn/funnelItemChecked.52d67.svg'
                                            className='w-5'
                                        />
                                    </div>

                                    <div className='w-[90%] text-base px-3'>
                                        {/* Product title */}
                                        <Link to={engagementRing.isVisible ?
                                            `/product/product-details/${engagementRing.productId}` : '#'}
                                            className={!engagementRing.isVisible && 'pointer-events-none'}
                                        >
                                            <p
                                                className='capitalize whitespace-nowrap overflow-hidden text-ellipsis w-full font-[650]'
                                            >
                                                {engagementRing.productName}
                                            </p>
                                        </Link>

                                        {/* Product price && Remove btn*/}
                                        <div className='flex'>
                                            {engagementRing.isVisible ? (
                                                <p className='font-[650]'>${engagementRing.basePrice.toLocaleString()}</p>
                                            ) : (
                                                <p className='font-[600] text-red-700'>Not Available</p>
                                            )}

                                            <button
                                                onClick={handleRemoveItem}
                                                className='text-sm text-gray-400 font-[500] hover:text-blue-950 transition-colors duration-200
                                                underline underline-offset-2 ml-5'
                                            >
                                                Remove
                                            </button>
                                        </div>

                                    </div>
                                </div>

                                <div className='w-[20%] flex items-center justify-center'>
                                    {/* Product img */}
                                    <div className='border-[1px] border-black w-16 h-14'>
                                        <img
                                            src={engagementRing.productImages[0].imageUrl}
                                            className='object-cover w-full h-full'
                                        />
                                    </div>

                                </div>

                            </div>
                        </>
                    ) : (
                        <>
                            {/* No Ring is selected in Selection Bar */}
                            <div className='border-black border-r-[1px] flex items-center justify-between w-full px-6 rounded-l-full'>

                                <div className="flex items-center space-x-6 ml-5">
                                    <p className='text-[2.6rem] font-lora'>
                                        2
                                    </p>
                                    <p className='font-[550] text-[1.125rem]'>
                                        Choose a Ring
                                    </p>
                                </div>

                                <div className='w-6 flex justify-center mr-2'>
                                    <img
                                        src={ringSelectionSvg}
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                            </div>
                        </>
                    )
                    }
                    {/* END ENGAGEMENT RING PART */}




                    {/* START COMPLETE SELECTION PART */}
                    <div className='border-black flex items-center justify-between w-full px-8'>
                        {
                            (diamond && engagementRing) ?
                                (
                                    (diamond.isVisible && engagementRing.isVisible) ?
                                        (
                                            <>
                                                <div className='flex items-center justify-center space-x-5'>

                                                    <div className='flex items-center justify-center'>
                                                        <img
                                                            src='https://ecommo--ion.bluenile.com/static-dyo-bn/funnelItemChecked.52d67.svg'
                                                            className='w-5'
                                                        />
                                                    </div>

                                                    <div className='flex flex-col'>
                                                        <div>
                                                            <p className='font-[650] text-[1rem]'>
                                                                Complete Selection
                                                            </p>

                                                        </div>

                                                        <div>
                                                            <p className='text-[1rem] font-[650]'>
                                                                ${totalPrice.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        ) : (
                                            <div className="flex items-center space-x-6">

                                                <p className='text-[2.6rem] font-lora'>
                                                    3
                                                </p>

                                                <p className='font-[550] text-[1.125rem]'>
                                                    Complete Selection
                                                </p>

                                            </div>
                                        )
                                )
                                :
                                (
                                    <div className="flex items-center space-x-6">

                                        <p className='text-[2.6rem] font-lora'>
                                            3
                                        </p>

                                        <p className='font-[550] text-[1.125rem]'>
                                            Complete Selection
                                        </p>

                                    </div>
                                )
                        }


                        {diamond && engagementRing && diamond.isVisible && engagementRing.isVisible &&
                            (showGoToCartBtn ? (
                                <>
                                    <button
                                        className='font-gantari rounded-full px-5 py-3
                                        bg-slate-300 hover:bg-slate-400 uppercase font-[650] text-sm transition-colors duration-300'
                                        onClick={() => navigate('/cart')}
                                    >
                                        Existing In Cart
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className='font-gantari rounded-full px-5 py-3
                                        bg-slate-300 hover:bg-slate-400 uppercase font-[650] text-sm transition-colors duration-300'
                                        onClick={handleAddToCart}
                                    >
                                        Add To Cart
                                    </button>
                                </>
                            )
                            )
                        }

                    </div>
                    {/* END COMPLETE SELECTION PART */}

                </div>
            </div>
        </>
    )
};

export default SelectionBar;

