import { SearchResultPage } from '../index'
import { useParams } from "react-router-dom";

const CategoryWrapper = () => {
    // console.log('CategoryWrapper renders')
    const { category, subcategory } = useParams();


    return (
        <>
            <SearchResultPage key={`${category}-${subcategory}`} category={category} subcategory={subcategory} />
        </>
    )
};

export default CategoryWrapper;
