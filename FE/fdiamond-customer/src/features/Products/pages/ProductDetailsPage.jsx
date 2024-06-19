import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageCarousel, SelectionBar, DetailSection } from '../components/index';
import { getProductByID } from '../api/APIs'
import AppLayout from "src/layout/AppLayout";

const ProductDetailsPage = () => {
    console.log('ProductDetails renders')
    const { productId } = useParams();
    const [product, setProduct] = useState(null);


    useEffect(() => {

        getProductByID(productId)
            .then(response => setProduct(response.data.result))

        window.scrollTo(0, 0)

    }, [productId])

    console.log(product)

    return (
        <>
            {product &&
                <AppLayout>
                    <SelectionBar />
                    <div className="grid grid-cols-2 px-28 mb-10 mt-8">
                        <ImageCarousel product={product} />
                        <DetailSection product={product} />
                    </div>

                    {/* <div className="bg-gray-300 text-5xl h-[300px] w-full flex justify-center items-center">Decoration</div> */}
                    {/* <OtherInformation /> */}
                </AppLayout>
            }
        </>
    )
};

export default ProductDetailsPage;
