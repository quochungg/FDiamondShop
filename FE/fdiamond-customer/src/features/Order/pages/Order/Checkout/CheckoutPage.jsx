import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getAllCartLines, checkValidAllCartLines, makeOrder, getPromoCode } from "src/features/Order/api/APIs";
import { getUser } from "src/features/Authentication/api/APIs";
import { SlArrowLeft } from "react-icons/sl";
import { CheckoutLeftSection, CheckoutRightSection, ErrorModal } from 'src/features/Order/components/index';
import { LoadingSpinner } from 'src/components';


const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [accessible, setAccessible] = useState(false);
    const [cartLineArr, setCartLineArr] = useState(null);
    const [shippingDetails, setShippingDetails] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        note: ''
    });
    const [shippingDetailsErrors, setShippingDetailsErrors] = useState({});

    const [isHandlingPayment, setIsHandlingPayment] = useState(false);


    //This page must be accessed from clicking 'Checkout' from Cart Page
    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state === null || location.state.directFromCartPage === null) {
            navigate('/cart');
        } else {
            setAccessible(true);
        }
    }, []);


    // Call API to get all cart lines & account details if page is accessible
    useEffect(() => {
        if (accessible) {
            getCartLines();
            getAccountDetails();
        }
    }, [accessible])


    // Call API to get all cart lines
    const getCartLines = async () => {
        const response = await getAllCartLines();
        const cartLines = response.data.result;
        if (cartLines) {
            setCartLineArr(cartLines);
        } else {    //if cartLines = null => cart is empty
            setCartLineArr([]);
        }
    }

    const getAccountDetails = async () => {
        const response = await getUser();
        const user = response.data.result;
        if (user) {
            const shippingDetails = {
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber ? user.phoneNumber : '',  //null if this is a google account
                address: user.address ? user.address : '', //null if this is a google account
                note: ''
            };
            setShippingDetails(shippingDetails);
        }
    }


    const handleLogoClick = () => {
        const result = window.confirm(`Are you sure you want to leave this page? Information you've entered may not be saved.`);
        if (result) navigate('/')
    }


    const [checkoutErrors, setCheckoutErrors] = useState({});

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        navigate('/cart', { replace: true });
    };


    //This function is only called if promo code is applied
    const checkPromoCode = async () => {
        let isExpired;
        const response = await getPromoCode(location.state.promoCode.discountCodeName);
        isExpired = response.data.result.isExpried;
        return isExpired;
    }


    const validateShippingAddress = () => {
        const { firstName, lastName, phoneNumber, address } = shippingDetails;
        const errors = {};
        let isValidAll = true;

        // Check if all fields are filled
        if (firstName === '' || lastName === '' || phoneNumber === '' || address === '') {
            isValidAll = false;
            if (firstName === '') errors.firstName = 'First Name & Last Name are both required';
            if (lastName === '') errors.lastName = 'First Name & Last Name are both required';
            if (phoneNumber === '') errors.phoneNumber = 'Phone Number is required';
            if (address === '') errors.address = 'Address is required';
        }

        // Validate if name starts with a letter and contains at least two characters
        const nameRegex = /^[^\d][\w\W]{1,}$/;
        const phoneRegex = /^0\d{9}$/;
        if (firstName && !nameRegex.test(firstName)) {
            isValidAll = false;
            errors.firstName = 'First Name & Last Name must start with a character and contain at least two characters';
        }
        if (lastName && !nameRegex.test(lastName)) {
            isValidAll = false;
            errors.lastName = 'First Name & Last Name must start with a letter and contain at least two letters';
        }
        // Validate if phone number contains only numbers, starts with 0 and has exactly 10 digits
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            isValidAll = false;
            errors.phoneNumber = 'Phone Number must start with 0 and contain exactly 10 digits';
        }

        setShippingDetailsErrors(errors);

        return isValidAll;
    }


    // Handle payment when user clicks 'Make Payment' button
    const handleMakePayment = async () => {
        setIsHandlingPayment(true);

        // Validate shipping details
        if (!validateShippingAddress()) {
            setIsHandlingPayment(false);
            return;
        }

        // Assume all are valid
        let isValidAll = true;

        let error = {};

        // CHECK EXPIRED PROMO CODE FIRST -> CHECK UNAVAILABLE CART LINES -> CHECK OUT OF QUANTITY PRODUCTS
        let isExpired;

        // Call API to check if all cart lines
        const response = await checkValidAllCartLines();
        const areAllCartLinesValid = response.data.result.isValid;


        // If PROMO CODE is applied, recheck to make sure it is not expired
        if (location.state.promoCode) {
            isExpired = await checkPromoCode();
            if (isExpired) {
                isValidAll = false;
                const errorMsg = [];
                errorMsg.push('Promo Code has expired');
                errorMsg.push('We are sorry to inform you that the promo code you entered has expired.' +
                    ' Please try again with another promo code. Or contact Customer Service for assistance.');
                error.errorMsg = errorMsg;
            }
        }
        else if (!areAllCartLinesValid) {   // Check if all CART LINES are available/visible 
            isValidAll = false;

            const unavailableCartLines = response.data.result.invisibleCartLine;
            const outOfStockCartLines = response.data.result.outOfStockCartLines;

            const errorMsg = [];
            let outOfQuantityProducts = [];

            if (unavailableCartLines.length > 0) {
                errorMsg.push('One or more items in your shopping cart has become unavailable.');
                errorMsg.push('Please go back to your cart and replace all unavailable items, or contact Customer Service for assistance.');
            }
            else if (outOfStockCartLines.length > 0) {

                const errorProductIds = [];

                for (let i = 0; i < outOfStockCartLines.length; i++) {

                    // handle out of quantity products
                    if (!errorProductIds.includes(outOfStockCartLines[i].productId)) {

                        errorProductIds.push(outOfStockCartLines[i].productId);

                        const errorProduct = {
                            productId: outOfStockCartLines[i].productId,
                            currentQuantity: outOfStockCartLines[i].currentQuantity
                        }
                        outOfQuantityProducts.push(errorProduct);
                    }

                }
                errorMsg.push('One or more items exceed the available quantity in store.');
                errorMsg.push('Please reduce the quantity of those items and continue, or contact Customer Service for assistance');
            }

            error.errorMsg = errorMsg;
            error.outOfQuantityProducts = outOfQuantityProducts;
        }


        // If all cart lines are valid, proceed to make payment. Else, show error modal
        if (isValidAll) {
            const response = await makeOrder(location.state.promoCode, shippingDetails);

            const result = response.data.result;

            if (result) {
                const paymentUrl = response.data.result.paymentUrl;
                navigate('/proceed-to-paypal', { state: { paymentUrl: paymentUrl }, replace: true })
            } else { //in case two users click Making Purchase at the same time => diamond/products quantity is not enough
                const errorMsg = [];
                let outOfQuantityProducts = [];

                //quick fix for two users click Making Purchase at the same time
                errorMsg.push('We are sorry to inform you that the product you are trying to purchase is unavailable/not enough.');
                errorMsg.push('Please go back to your cart and replace all unavailable items, or contact Customer Service for assistance.');
                error.errorMsg = errorMsg;
                error.outOfQuantityProducts = outOfQuantityProducts;
                setCheckoutErrors(error);
                openModal();
            }
        }
        else {
            setCheckoutErrors(error);
            openModal();
        }
        setIsHandlingPayment(false);
    }


    if (isHandlingPayment) {
        return <LoadingSpinner />
    }


    return (
        <>
            {accessible && cartLineArr &&
                <>
                    {/* ERROR MODAL */}
                    {showModal &&
                        <ErrorModal
                            checkoutErrors={checkoutErrors}
                            closeModal={closeModal}
                        />
                    }


                    <div className='w-auto h-auto font-gantari bg-gray-50'>

                        {/* BEGIN HEADER */}
                        <header>
                            <div className='w-full shadow-sm border-[1px] py-5'>
                                <div className='w-[75%] mx-auto'>
                                    <p
                                        onClick={handleLogoClick}
                                        className="text-[2.5rem] font-[700] tracking-wide font-playfair text-[#000035] cursor-pointer"
                                    >
                                        FDIAMOND
                                    </p>

                                </div>
                            </div>
                        </header>
                        {/* END HEADER */}


                        {/* BEGIN BODY SECTION */}
                        <div className='w-[75%] mx-auto'>


                            {/* BEGIN MAIN */}
                            <main>
                                <div className='grid grid-cols-[1fr_36.69%] gap-x-10 mb-10'>

                                    <div className='col-span-full mb-4'>
                                        <p className='uppercase text-center text-[2.5rem] font-[700] font-gantari text-[#151541] py-9'
                                        >
                                            Checkout
                                        </p>

                                        <Link to='/cart'>
                                            <div className='flex items-center space-x-1'>
                                                <span><SlArrowLeft size={12} color='#0C1636' /></span>
                                                <p className='uppercase text-sm underline underline-offset-2 hover:text-[#17203e]'>Back to cart</p>
                                            </div>

                                        </Link>
                                    </div>



                                    {/* CHECKOUT LEFT SECTION */}
                                    <CheckoutLeftSection
                                        shippingDetails={shippingDetails}
                                        setShippingDetails={setShippingDetails}
                                        shippingDetailsErrors={shippingDetailsErrors}
                                    />


                                    {/* CHECKOUT RIGHT SECTION */}
                                    <CheckoutRightSection
                                        promoCode={location.state.promoCode}
                                        cartLineArr={cartLineArr}
                                        onMakePayment={handleMakePayment}
                                    />

                                </div>
                            </main>
                            {/* END MAIN */}




                            {/* BEGIN FOOTER */}
                            <footer>
                                <div className='py-5 border-t-[2px]'>
                                    <p className='text-xs'>© 2024 FDIAMOND. All Rights Reserved.</p>
                                </div>
                            </footer>
                            {/* END FOOTER  */}



                        </div>
                        {/* END BODY SECTION */}

                    </div>


                </>

            }
        </>
    );
};

export default CheckoutPage;