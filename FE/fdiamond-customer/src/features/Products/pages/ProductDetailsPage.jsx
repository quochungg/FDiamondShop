import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ImageCarousel, SelectionBar, DetailSection } from '../components/index';
import { getProductByID } from '../api/APIs'
import AppLayout from "src/layout/AppLayout";
import { LoadingSpinner } from 'src/components';
import { checkExistingDiamondInCart } from 'src/features/Order/api/APIs';


const ProductDetailsPage = ({ productId }) => {
    // console.log('ProductDetails renders')

    const navigate = useNavigate();

    // const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const appendableCategories = ['Diamond', 'Engagement Ring'];
    const [isAppendable, setIsAppendable] = useState(null);
    const [isDiamondInCart, setIsDiamondInCart] = useState(false);

    const [resetSelectionBar, setResetSelectionBar] = useState(false);


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


    if (!product) {
        return <LoadingSpinner />
    }

    if (product && !product.isVisible) {
        return <Navigate to='/product-not-found' replace={true} />;
    }

    const appendableLayout = "grid grid-cols-2 gap-10 px-28 mb-10 py-14";
    const notAppendableLayout = "grid grid-cols-2 gap-10 px-28 mb-10 py-16";

    return (
        <>
            {product &&
                <AppLayout>
                    {isAppendable &&
                        <SelectionBar
                            key={resetSelectionBar}
                            setResetSelectionBar={setResetSelectionBar}
                        />
                    }
                    <div className={isAppendable ? appendableLayout : notAppendableLayout}>
                        <ImageCarousel product={product} />
                        <DetailSection
                            product={product}
                            isAppendable={isAppendable}
                            isDiamondInCart={isDiamondInCart}
                            setResetSelectionBar={setResetSelectionBar}
                        />



                    </div>
                </AppLayout>
            }
        </>
    )
};

export default ProductDetailsPage;
