import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts, getCategory } from "../api/APIs";
import { CategoryHero, Pagination, ProductList, SelectionBar, DiamondFilter, NoProductsFoundByFilter } from 'src/features/Products/components/index'
import AppLayout from "src/layout/AppLayout";
import { LoadingSpinner } from "src/components";


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

    console.log('searchParams', searchParams);


    const handleResetFilter = () => {
        setSearchParams(() => ({
            pageNumber: 1
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

                <CategoryHero categoryInfo={categoryInfo} />

                {appendableCategory.includes(categoryInfo.categoryName) &&
                    <SelectionBar
                        key={resetSelectionBar}
                        setResetSelectionBar={setResetSelectionBar}
                    />
                }


                {/* Filter */}
                <div>
                    <div>
                        <p>{totalProducts ? totalProducts : 0} Result</p>
                    </div>


                    {category === 'diamond' &&
                        <DiamondFilter
                            key={resetFilter}
                            category={category}
                            searchParams={searchParams}
                            handleSearchParams={handleSearchParams}
                            handleResetFilter={handleResetFilter}
                        />
                    }
                </div>



                {productList ?
                    (productList.length > 0 ?
                        (
                            <div className="h-auto flex flex-col justify-start mt-12">
                                <ProductList
                                    productList={productList}
                                    category={category}
                                />
                                <Pagination
                                    key={category}
                                    totalPage={totalPage}
                                    handlePageClick={handleSearchParams}
                                    currentPage={Number(searchParams.get('pageNumber'))}
                                />
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

