import { useParams } from 'react-router-dom';
import { ProductDetailsPage } from '../index';

const ProductDetailsWrapper = () => {
    const { productId } = useParams(); // Extract productId from URL
    return <ProductDetailsPage key={productId} productId={productId} />;
};

export default ProductDetailsWrapper;