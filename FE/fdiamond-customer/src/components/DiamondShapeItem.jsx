import { Link } from 'react-router-dom';

const DiamondShapeItem = ({ type, imageUrl }) => {
    return (
        <>
            <Link
                to={`/product/diamond?SubcategoryName=${type.toLowerCase()}`}
                className="flex flex-col no-underline items-center w-[100px] font-gantari space-y-3 hover:text-blue-900 transition-colors duration-200">
                <div className="h-[70px] w-[70px] flex justify-center">
                    <img src={imageUrl} alt={type}
                        className="w-full h-full object-cover" />
                </div>

                <p>
                    {type}
                </p>
            </Link>
        </>
    )
};

export default DiamondShapeItem;
