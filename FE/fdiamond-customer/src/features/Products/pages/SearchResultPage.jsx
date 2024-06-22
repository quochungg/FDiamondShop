import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts, getCategory } from "../api/APIs";
import { CategoryHero, Pagination, ProductList } from '../components/index'
import AppLayout from "src/layout/AppLayout";


const SearchResultPage = ({ category }) => {
    // console.log('SearchResultPage renders');

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams({
        pageNumber: 1,
    });

    // console.log(searchParams);

    const [isLoading, setIsLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState({});
    const [totalPage, setTotalPage] = useState(null);

    const isValidCategory = () => {
        const categoryParams = ['diamond', 'engagement ring', 'necklace', 'earring'];
        const validCategory = categoryParams.find((categoryName) => (
            category === categoryName
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

    const handleSearchParams = (props) => {
        setSearchParams(prev => ({
            ...prev,
            [props.name]: props.value
        }));
    }

    useEffect(() => {
        // console.log('useEffect Category')
        if (!isValidCategory()) {
            navigate('*');
        }

        // category API
        getCategory(category)
            .then((response) => {
                setCategoryInfo(response.data.result);
            })
    }, [category]);


    useEffect(() => {
        // products API
        getProducts(category, searchParams).
            then((response) => {
                setProductList(response.data.result.items);
                setTotalPage(response.data.result.totalPages);
                setIsLoading(false);
                window.scrollTo(0, 0);
            });
    }, [searchParams])


    if (isLoading) {
        validatePageNumber();
        return <div>Loading...</div>;
    }

    return (
        <>
            {validatePageNumber()}
            <AppLayout>
                <CategoryHero categoryInfo={categoryInfo} />

                {/* <Filter /> */}

                <div className="h-auto flex flex-col justify-start my-10">
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
            </AppLayout>
        </>
    );
};

export default SearchResultPage;

