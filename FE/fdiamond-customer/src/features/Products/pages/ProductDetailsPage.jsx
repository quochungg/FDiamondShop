import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ImageCarousel, SelectionBar, DetailSection } from '../components/index';
import { getProductByID } from '../api/APIs'
import AppLayout from "src/layout/AppLayout";

const ProductDetailsPage = () => {
    console.log('ProductDetails renders')
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //productId is not a number
        if (isNaN(Number.parseInt(productId))) {
            navigate('/product-not-found')
            return;
        }

        getProductByID(productId)
            .then(response => {
                if (response.data.result) {
                    setProduct(response.data.result)
                    window.scrollTo(0, 0)
                } else {
                    navigate('/product-not-found')
                    return;
                }
            })
    }, [productId])

    if (product && !product.isVisible) {
        return <Navigate to='/product-not-found' />;
    }

    return (
        <>
            {product &&
                <AppLayout>
                    <SelectionBar />
                    <div className="grid grid-cols-2 gap-10 px-28 mb-10 mt-8">
                        <ImageCarousel product={product} />
                        <DetailSection product={product} />
                    </div>
                    {/* <SimilarItems/> */}
                </AppLayout>
            }
        </>
    )
};

export default ProductDetailsPage;
