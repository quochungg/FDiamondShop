import { useEffect } from 'react'; // Import useEffect
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //This page must be accessed from clicking 'Checkout' from Cart Page
    useEffect(() => {
        if (location.state === null || location.state.directFromCartPage === null) {
            navigate('/cart');
        }
    }, []);

    return (
        <>
            <h1>Checkout Page</h1>
        </>
    );
};

export default CheckoutPage;