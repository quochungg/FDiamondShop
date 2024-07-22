import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ImageCarousel, SelectionBar, DetailSection, RecommendedProducts, EmptyRecommendedProducts } from '../components/index';
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
            navigate('/product-not-available', { replace: true });
            return;
        }

        getProductByID(productId)
            .then(response => {
                if (response.data.result) {
                    setProduct(response.data.result)
                    window.scrollTo(0, 0)
                } else {
                    navigate('/product-not-available', { replace: true });
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
        return <Navigate to='/product-not-available' replace={true} />;
    }

    const appendableLayout = "grid grid-cols-2 px-28 mb-5 py-14";
    const notAppendableLayout = "grid grid-cols-2 px-28 mb-5 py-16";

    return (
        <>
            <div>
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


                        <div className='px-16'>

                            <div className="pt-8 pb-16">

                                <div className="px-2 mb-7">
                                    <p className="font-lora text-[1.9rem] font-[450] tracking-wide "
                                    >
                                        Similar Items
                                    </p>
                                </div>

                                {product.recommendProducts.length > 0 ?
                                    (
                                        <RecommendedProducts product={product} />
                                    ) : (
                                        <EmptyRecommendedProducts />
                                    )
                                }
                            </div>

                        </div>



                    </AppLayout>
                }
            </div>

        </>
    )
};

export default ProductDetailsPage;
