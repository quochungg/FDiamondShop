import { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getProducts, getCategory } from "../api/APIs";
import { Header, Footer } from '../../../components/index'
import { CategoryHero, Pagination, ProductList } from '../components/index'

export const Category = () => {
    const { category } = useParams();
    return <SearchResultPage key={category} category={category} />
}

const SearchResultPage = ({ category }) => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams({
        pageNumber: 1,
    });

    console.log(typeof searchParams.get('pageNumber'))

    console.log('pageNumber: ', searchParams.get('pageNumber'))

    const [isLoading, setIsLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState({});
    const [totalPage, setTotalPage] = useState(null);

    const validateCategoryParam = () => {
        const categoryParams = ['diamond', 'engagement ring', 'necklace', 'earring'];
        const isValidCategory = categoryParams.find((categoryName) => (
            category === categoryName
        ))
        return isValidCategory;
    }

    const handleSearchParams = (props) => {
        setSearchParams(prev => ({
            ...prev,
            [props.name]: props.value
        }));
    }

    useEffect(() => {
        // console.log('rerender')

        const isValidCategory = validateCategoryParam();
        if (!isValidCategory) {
            navigate('/');
        }

        // category API
        getCategory({ category }).then((response) => {
            setCategoryInfo(response.data.result);
        });

    }, [category]);

    useEffect(() => {
        // products API
        getProducts({ category, searchParams }).then((response) => {
            setProductList(response.data.result.items);
            setTotalPage(response.data.result.totalPages);
            setIsLoading(false);
        });
    }, [searchParams])

    console.log(productList);

    console.log('totalpages: ', totalPage);

    return (
        <>
            {!isLoading && (
                <>
                    <Header />
                    <CategoryHero categoryInfo={categoryInfo} />
                    {/* <Filter /> */}
                    <ProductList productList={productList} />
                    <Pagination
                        key={category}
                        totalPage={totalPage}
                        handlePageClick={handleSearchParams}
                        currentPage={Number(searchParams.get('pageNumber'))}
                    />
                    <Footer />
                </>
            )}
        </>
    );
};

export default SearchResultPage;
