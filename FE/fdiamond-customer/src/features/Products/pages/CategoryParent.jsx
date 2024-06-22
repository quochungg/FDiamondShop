import { SearchResultPage } from '../index'
import { useParams } from "react-router-dom";

const CategoryParent = () => {
    // console.log('CategoryParent renders')
    const { category } = useParams();

    return (
        <>
            <SearchResultPage key={category} category={category} />
        </>
    )
};

export default CategoryParent;
