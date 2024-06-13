import { useParams } from 'react-router-dom';


const ProductDetailsPage = () => {
    console.log('redner in productDetails')
    const { id } = useParams();

    return (
        <>
            <h1>Product Details Page</h1>
            <p>Product ID: {id}</p>
        </>
    )
};

export default ProductDetailsPage;
