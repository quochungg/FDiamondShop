import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'


const ProductList = ({ productList, category }) => {
    // console.log('ProductList renders')
    const hover = 'cursor-pointer hover:border-blue-950 hover:border-[1px] hover:duration-150';

    return (
        <>
            <div className="w-full flex items-center justify-center">
                <div className="grid grid-cols-4 gap-x-3 gap-y-5">
                    {productList.map(product => (
                        <div key={product.productId} className={`w-[350px] h-[400px] border-[1px] ${hover} `}>
                            <Link to={`/product/product-details/${product.productId}`} className="flex flex-col justify-start h-full w-full">
                                <div className="w-[348px] h-[278px]">
                                    <img
                                        className="object-cover w-full h-full"
                                        src={product.productImages[0].imageUrl}
                                    />
                                </div>

                                <div className="flex flex-col justify-start mt-3">
                                    <div className='px-5 flex-1'>
                                        <LinesEllipsis
                                            className="font-lora text-[16px] font-[600]"
                                            text={product.productName}
                                            maxLine='2'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters'
                                        />
                                    </div>
                                    <p className="p-5 flex-1 content-center font-gantari text-2sm leading-5">
                                        ${product.basePrice.toLocaleString()} {category === 'engagement ring' && '(Setting Price)'}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}






                </div>
            </div>
        </>
    );
};

export default ProductList;