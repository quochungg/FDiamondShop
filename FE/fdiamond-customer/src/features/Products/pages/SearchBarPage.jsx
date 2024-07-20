import { useEffect, useState } from "react";
import AppLayout from "src/layout/AppLayout";
import { SearchBar, ResultList, EmptyResult } from "src/features/Products/components/index";
import { searchProductByName } from "src/features/Products/api/APIs"
import { ThreeDots } from "react-loader-spinner";



const SearchBarPage = () => {
    const [keyword, setKeyword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalItems, setTotalItems] = useState(0);


    // Initial fetch
    const initialFetch = async () => {
        setIsLoading(true);
        const response = await searchProductByName(keyword, 1);
        const result = response.data.result;
        if (result) {
            setItems(result.items);

            setTotalItems(result.totalProducts);

            setHasMore(result.hasNextPage);

            if (result.hasNextPage) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        } else {
            setItems(null);
        }
        setIsLoading(false);
    }


    // Fetch more items when scrolling to the bottom of the page
    const fetchMoreItems = async () => {
        setIsLoading(true);
        const response = await searchProductByName(keyword, pageNumber);
        const result = response.data.result;

        if (result) {

            const newItems = result.items;

            setItems((prevItems) => [...prevItems, ...newItems]);

            setHasMore(result.hasNextPage)

            if (result.hasNextPage) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }

        } else {
            setItems(null);
        }
        setIsLoading(false);
    }



    useEffect(() => {
        if (keyword && keyword.trim()) {
            setPageNumber(1); // reset page number when keyword changes
            initialFetch(); // fetch initial items
        } else {
            setItems([]);
        }
    }, [keyword]);


    const LoadingDots = () => {
        return (
            <ThreeDots
                visible={true}
                height="50"
                width="50"
                color="#bababa"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperClass=""
            />
        )
    }


    return (
        <>
            <div>
                <AppLayout>

                    <div className="w-[55%] ml-24 my-20 font-gantari">

                        <div className="mb-7">
                            <p className="text-3xl font-lora font-[600] tracking-wide">Search</p>
                        </div>

                        <div className="flex flex-col space-y-8">

                            <SearchBar
                                keyword={keyword}
                                setKeyword={setKeyword}
                            />

                            {keyword && keyword.trim() ? (
                                isLoading ? (
                                    <LoadingDots />
                                ) : (
                                    items && items.length > 0 ? (
                                        <div>
                                            <p className="text-lg text-gray-600"
                                            >
                                                <span className="font-[700] text-lg">PRODUCTS </span>
                                                ({totalItems} Results)
                                            </p>

                                        </div>
                                    ) : (
                                        <EmptyResult
                                            keyword={keyword}
                                        />
                                    )
                                )
                            ) : (
                                <div className="h-56">
                                    {isLoading ? (
                                        <LoadingDots />
                                    ) : (
                                        <p className="text-xl text-gray-500"
                                        >
                                            Please enter a keyword to search for products.
                                        </p>
                                    )}
                                </div>
                            )
                            }

                            <div>
                                <ResultList
                                    items={items}
                                    fetchMoreItems={fetchMoreItems}
                                    hasMore={hasMore}
                                    LoadingDots={LoadingDots}
                                />
                            </div>

                        </div>

                    </div>

                </AppLayout>
            </div>
        </>
    )
};

export default SearchBarPage;
