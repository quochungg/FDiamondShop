import { Link } from 'react-router-dom';

const CategoryItem = ({ type, imageUrl }) => {
    return (
        <>
            <>
                <Link
                    // to={`/product/diamond/${type.toLowerCase()}`}
                    className="flex flex-col no-underline items-center w-full h-[400px] font-gantari space-y-3 hover:text-blue-900 transition-colors duration-200">
                    <div className="h-full w-full flex justify-center">
                        <img
                            // src={imageUrl}
                            src='https://image.brilliantearth.com/cdn-cgi/image/width=735,height=556,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F74d345b581d1441d90f4a8a734add393'
                            className="w-full h-full object-cover" />
                    </div>

                    <p>
                        {type}
                    </p>
                </Link>
            </>
        </>
    )
};

export default CategoryItem;
