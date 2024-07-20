import { Link } from "react-router-dom";
import LinesEllipsis from 'react-lines-ellipsis'
import InfiniteScroll from "react-infinite-scroll-component";



const ResultList = ({ items, hasMore, fetchMoreItems, LoadingDots }) => {
    return (
        <>
            {items && items.length > 0 && (

                <div>

                    <ul className="flex flex-col space-y-7">

                        <InfiniteScroll
                            dataLength={items.length}
                            next={fetchMoreItems}
                            hasMore={hasMore}
                            loader={<div><LoadingDots /></div>}
                        >
                            {
                                items.map((product) => (
                                    <>
                                        <li key={product.productId}> {/* Use product.productId as key */}
                                            <Link
                                                to={`/product/product-details/${product.productId}`}
                                            >
                                                <div className="flex flex-row hover:bg-gray-100 rounded-md h-44 mb-6">

                                                    <div className="w-[23%] h-full">
                                                        <img
                                                            src={product.productImages[0].imageUrl}
                                                            className="rounded-md w-full object-cover h-full"
                                                        />
                                                    </div>

                                                    <div className="w-[77%] flex flex-col space-y-3 pl-6 pr-10 py-3 h-full">
                                                        <p className="truncate text-xl font-[480]">
                                                            {product.productName}
                                                        </p>

                                                        <LinesEllipsis
                                                            className="font-[380]"
                                                            text={product.description}
                                                            maxLine='2'
                                                            ellipsis='...'
                                                            trimRight
                                                            basedOn='letters'
                                                        />

                                                        <div className="flex space-x-8">
                                                            <p className="uppercase text-gray-400 tracking-wide">PID {product.productId}</p>
                                                            <p>${product.basePrice.toLocaleString()} </p>
                                                        </div>
                                                    </div>
                                                </div>


                                            </Link>
                                        </li>
                                    </>
                                ))
                            }
                        </InfiniteScroll>



                    </ul>

                </div>

            )}


        </>
    )
};

export default ResultList;
