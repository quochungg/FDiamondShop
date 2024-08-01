import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts, getCategory } from "../api/APIs";
import {
    CategoryHero, Pagination, ProductList,
    SelectionBar, DiamondFilter, RingFilter, NecklaceFilter, EarringFilter,
    NoProductsFoundByFilter, SortProductList,
} from 'src/features/Products/components/index'
import AppLayout from "src/layout/AppLayout";
import { LoadingSpinner } from "src/components";
import resetFilterSvg from 'src/features/Products/assets/resetFilterSvg.svg';


const SearchResultPage = ({ category }) => {

    // console.log('SearchResultPage renders');

    const navigate = useNavigate();


    const [searchParams, setSearchParams] = useSearchParams({
        pageNumber: 1,
    });


    const [isLoading, setIsLoading] = useState(true);
    const [productList, setProductList] = useState(null);
    const [categoryInfo, setCategoryInfo] = useState({});
    const [totalPage, setTotalPage] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null); // used to calculate total products for filters results

    const [resetSelectionBar, setResetSelectionBar] = useState(false);
    const [resetFilter, setResetFilter] = useState(false);


    // This function will be called to update search params in the url
    const handleSearchParams = (props) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev); // Clone the old one

            Object.entries(props).forEach(([key, value]) => { // Iterate over the new values
                newParams.set(key, value); // Override the old value or Create a new one
            });

            return newParams;
        });
    };


    const handleResetFilter = () => {
        setSearchParams(() => ({
            pageNumber: 1,
        }))
        setResetFilter(!resetFilter);
    }


    const isValidCategory = () => {
        const categoryParams = ['diamond', 'engagement ring', 'necklace', 'earring'];
        const validCategory = categoryParams.find((categoryName) => (
            category.toLowerCase() === categoryName
        ))
        return validCategory;
    }

    const validatePageNumber = () => {
        const selectedPage = Number(searchParams.get("pageNumber"));
        if (selectedPage <= 0
            || isNaN(selectedPage)
            || (totalPage !== null && selectedPage > totalPage)) {
            setSearchParams((prev => ({
                ...prev,
                pageNumber: 1
            })))
        }
    }

    useEffect(() => {
        if (!isValidCategory()) {
            navigate('/no-products-found');
            return;
        }

        // category API
        getCategory(category)
            .then((response) => {
                setCategoryInfo(response.data.result);
            })
    }, [category]);


    useEffect(() => {

        // products API
        setProductList(null);
        setTotalProducts(null);
        getProducts(category, searchParams).
            then((response) => {
                if (response.data.result) {
                    setProductList(response.data.result.items);
                    setTotalPage(response.data.result.totalPages);
                    setTotalProducts(response.data.result.totalProducts);
                } else {
                    setProductList([]);
                }
            });
        setIsLoading(false);
    }, [searchParams])


    if (isLoading) {
        validatePageNumber();
        return <LoadingSpinner />
    }


    const appendableCategory = ['Diamond', 'Engagement Ring']

    return (
        <>

            {validatePageNumber()}
            <AppLayout>

                {/* Category Hero */}
                <CategoryHero categoryInfo={categoryInfo} />



                {/* Sort And Filter Section */}
                <div className="mt-14 mx-14 border-y-[1px] bg-blue-950 px-12">


                    <div className="flex flex-row justify-between items-center mb-12 mt-24">

                        {/* Filter */}
                        <div className="flex flex-row justify-center items-start space-x-4">

                            {category === 'diamond' &&
                                <DiamondFilter
                                    key={resetFilter}
                                    searchParams={searchParams}
                                    handleSearchParams={handleSearchParams}
                                    handleResetFilter={handleResetFilter}
                                />
                            }

                            {category === 'engagement ring' &&
                                <RingFilter
                                    key={resetFilter}
                                    searchParams={searchParams}
                                    handleSearchParams={handleSearchParams}
                                    handleResetFilter={handleResetFilter}
                                />
                            }


                            {category === 'earring' &&
                                <EarringFilter
                                    key={resetFilter}
                                    searchParams={searchParams}
                                    handleSearchParams={handleSearchParams}
                                    handleResetFilter={handleResetFilter}
                                />
                            }


                            {category === 'necklace' &&
                                <NecklaceFilter
                                    key={resetFilter}
                                    searchParams={searchParams}
                                    handleSearchParams={handleSearchParams}
                                    handleResetFilter={handleResetFilter}
                                />
                            }

                            <div className="mt-6">
                                <button
                                    className='bg-gray-100 hover:bg-gray-200 transition-colors duration-200 font-gantari font-[600] rounded-full 
                                     px-6 py-4 flex flex-row justify-center items-center space-x-3'
                                    onClick={() => handleResetFilter()}
                                >
                                    <img src={resetFilterSvg} />
                                    <p>Reset Filters</p>
                                </button>
                            </div>
                        </div>


                        {/* Sort By Price */}
                        <div className="self-end">
                            <SortProductList
                                key={resetFilter}
                                handleSearchParams={handleSearchParams}
                            />
                        </div>

                    </div>


                    {/* Total Products */}
                    <div className="text-right mb-5">
                        <p className="text-white tracking-wide font-gantari font-[350]"
                        >
                            {totalProducts ? totalProducts : 0} Results Found
                        </p>
                    </div>



                </div>


                {/* Selection Bar */}
                {appendableCategory.includes(categoryInfo.categoryName) &&
                    <SelectionBar
                        key={resetSelectionBar}
                        setResetSelectionBar={setResetSelectionBar}
                    />
                }


                {productList ?
                    (productList.length > 0 ?
                        (
                            <div className="h-auto flex flex-col justify-start mt-12">
                                <ProductList
                                    productList={productList}
                                    category={category}
                                />
                                <div className="my-3">
                                    <Pagination
                                        key={category}
                                        totalPage={totalPage}
                                        handlePageClick={handleSearchParams}
                                        currentPage={Number(searchParams.get('pageNumber'))}
                                    />
                                </div>

                            </div>
                        ) : (
                            <NoProductsFoundByFilter
                                handleResetFilter={handleResetFilter}
                            />
                        )
                    ) : (
                        <LoadingSpinner />
                    )
                }


            </AppLayout>
        </>
    );
};

export default SearchResultPage;

