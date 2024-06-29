import { useNavigate } from "react-router-dom";

const ProductNotFound = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/');
    }
    return (
        <>
            <h1>Product Not Found</h1>
            <button
                className="bg-blue-950 hover:bg-[#34427b] text-white font-bold py-2 px-4 rounded-sm"
                onClick={handleClick}
            >
                Go back Home
            </button>
        </>
    )
};

export default ProductNotFound;
