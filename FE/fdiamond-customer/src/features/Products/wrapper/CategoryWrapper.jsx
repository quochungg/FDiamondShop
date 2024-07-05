import { SearchResultPage } from '../index'
import { useParams } from "react-router-dom";

const CategoryWrapper = () => {
    // console.log('CategoryWrapper renders')
    const { category } = useParams();

    return (
        <>
            <SearchResultPage key={category} category={category} />
        </>
    )
};

export default CategoryWrapper;
