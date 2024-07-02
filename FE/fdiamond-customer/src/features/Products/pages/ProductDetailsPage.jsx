import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { ImageCarousel, SelectionBar, DetailSection } from '../components/index';
import { getProductByID } from '../api/APIs'
import AppLayout from "src/layout/AppLayout";
import { LoadingSpinner } from 'src/components';
import { checkExistingDiamondInCart } from 'src/features/Order/api/APIs';

const ProductDetailsPage = () => {
    // console.log('ProductDetails renders')
    const navigate = useNavigate();
    const location = useLocation();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const appendableCategories = ['Diamond', 'Engagement Ring'];
    const [isAppendable, setIsAppendable] = useState(null);
    const [isDiamondInCart, setIsDiamondInCart] = useState(false);

    const [showAddToCart, setShowAddToCart] = useState(null);
    const [hasHandleAppend, setHasHandleAppend] = useState(false);

    useEffect(() => {
        //productId is not a number
        if (isNaN(Number.parseInt(productId))) {
            navigate('/product-not-found', { replace: true });
            return;
        }

        getProductByID(productId)
            .then(response => {
                if (response.data.result) {
                    setProduct(response.data.result)
                    window.scrollTo(0, 0)
                } else {
                    navigate('/product-not-found', { replace: true });
                    return;
                }
            })

    }, [productId])

    useEffect(() => {
        if (product) {
            setIsAppendable(appendableCategories.includes(product.categoryName));
        }

        if (product && product.categoryName === 'Diamond') {
            checkExistingDiamondInCart(product.productId)
                .then(response => {
                    setIsDiamondInCart(response.data.result);
                })
        }

    }, [product])


    useEffect(() => {
        const handleShowAddToCart = () => {
            const selectionBar = JSON.parse(localStorage.getItem('selectionBar') || '{}');
            const numOfItems = Object.keys(selectionBar).length;
            if (numOfItems === 2) {
                setShowAddToCart(true);
            } else {
                setShowAddToCart(false);
            }
        }

        handleShowAddToCart();

    }, [hasHandleAppend])



    if (!product) {
        return <LoadingSpinner />
    }

    if (product && !product.isVisible) {
        return <Navigate to='/product-not-found' replace={true} />;
    }

    const appendableLayout = "grid grid-cols-2 gap-10 px-28 mb-10 py-6";
    const notAppendableLayout = "grid grid-cols-2 gap-10 px-28 mb-10 py-16";

    return (
        <>
            {product &&
                <AppLayout>
                    {isAppendable &&
                        <SelectionBar
                            showAddToCart={showAddToCart}
                        />
                    }
                    <div className={isAppendable ? appendableLayout : notAppendableLayout}>
                        <ImageCarousel product={product} />
                        <DetailSection
                            product={product}
                            isAppendable={isAppendable}
                            isDiamondInCart={isDiamondInCart}
                            setHasHandleAppend={setHasHandleAppend}
                        />
                    </div>
                    {/* <SimilarItems/> */}
                </AppLayout>
            }
        </>
    )
};

export default ProductDetailsPage;
