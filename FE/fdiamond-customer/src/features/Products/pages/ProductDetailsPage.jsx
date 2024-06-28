import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ImageCarousel, SelectionBar, DetailSection } from '../components/index';
import { getProductByID } from '../api/APIs'
import AppLayout from "src/layout/AppLayout";
import { LoadingSpinner } from 'src/components';

const ProductDetailsPage = () => {
    // console.log('ProductDetails renders')
    const navigate = useNavigate();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const appendableCategories = ['Diamond', 'Engagement Ring'];
    const [isAppendable, setIsAppendable] = useState(null);

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

    useEffect(() => {
        if (product) {
            setIsAppendable(appendableCategories.includes(product.categoryName));
        }
    }, [product])


    if (!product) {
        return <LoadingSpinner />
    }

    if (product && !product.isVisible) {
        return <Navigate to='/product-not-found' />;
    }

    const appendableLayout = "grid grid-cols-2 gap-10 px-28 mb-10 py-6";
    const notAppendableLayout = "grid grid-cols-2 gap-10 px-28 mb-10 py-16";

    return (
        <>
            {product &&
                <AppLayout>
                    {isAppendable && <SelectionBar />}
                    <div className={isAppendable ? appendableLayout : notAppendableLayout}>
                        <ImageCarousel product={product} />
                        <DetailSection product={product} isAppendable={isAppendable} />
                    </div>
                    {/* <SimilarItems/> */}
                </AppLayout>
            }
        </>
    )
};

export default ProductDetailsPage;
