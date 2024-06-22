import { useNavigate } from "react-router-dom";

const ProductNotFound = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/');
    }
    return (
        <>
            <h1>Product Not Found</h1>
            <button onClick={handleClick}>Go back Home</button>
        </>
    )
};

export default ProductNotFound;
