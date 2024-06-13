import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams, Outlet, useRoutes } from "react-router-dom";
import { getProducts, getCategory } from "../api/APIs";
import { Header, Footer } from '../../../components/index'
import { CategoryHero, Pagination, ProductList } from '../components/index'
import NotMatchResultPage from './NotMatchResultPage'
import ProductDetailsPage from "./ProductDetailsPage";

export const Category = () => {
    console.log('Category renders')
    const { category } = useParams();

    return (
        <>
            <SearchResultPage key={category} category={category} />
        </>
    )
}

const SearchResultPage = ({ category }) => {
    console.log('SearchResultPage renders');

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams({
        pageNumber: 1,
    });

    console.log(searchParams);

    // console.log('pageNumber: ', Number(searchParams.get('pageNumber')))


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

    const isValidPageNumber = () => {
        let isValid = true;
        const selectedPage = Number(searchParams.get("pageNumber"));
        if (selectedPage <= 0) {
            setSearchParams((prev => ({
                ...prev,
                pageNumber: 1
            })))
        }
        else if (isNaN(selectedPage)) {
            isValid = false;
        }
        else if (totalPage !== null && selectedPage > totalPage) {
            isValid = false;
        }

        return isValid;
        // return selectedPage > 0 && selectedPage <= totalPage;
    }

    const handleSearchParams = (props) => {
        setSearchParams(prev => ({
            ...prev,
            [props.name]: props.value
        }));
    }

    useEffect(() => {

        if (!isValidCategory()) {
            navigate('/');
        }

        // category API
        getCategory({ category }).then((response) => {
            setCategoryInfo(response.data.result);
        });

    }, [category]);

    useEffect(() => {

        //if page number is alphabetic => is NaN => don't fetch
        if (isValidPageNumber()) {
            // products API
            getProducts({ category, searchParams }).then((response) => {
                setProductList(response.data.result.items);
                setTotalPage(response.data.result.totalPages);
                setIsLoading(false);
                window.scrollTo(0, 0);
            });
        } else {
            setIsLoading(false)
        }

    }, [searchParams])

    // console.log(productList);

    // console.log('totalpages: ', totalPage);

    return (
        <>
            {!isLoading && (
                <>
                    {isValidPageNumber() ? (
                        <>
                            <Header />
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
                            <Footer />
                        </>
                    )
                        : (
                            <>
                                <NotMatchResultPage />
                            </>
                        )}
                </>
            )}
        </>
    );
};

export default SearchResultPage;
