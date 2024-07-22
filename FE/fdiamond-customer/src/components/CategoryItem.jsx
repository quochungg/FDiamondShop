import { Link } from 'react-router-dom';

const CategoryItem = ({ type, imageUrl }) => {
    return (
        <>
            <>
                <Link
                    // to={`/product/diamond/${type.toLowerCase()}`}
                    className="flex flex-col no-underline items-center w-[100px] font-gantari space-y-3 hover:text-blue-900 transition-colors duration-200">
                    <div className="h-[70px] w-[70px] flex justify-center">
                        <img
                            src='https://image.brilliantearth.com/cdn-cgi/image/width=297,height=344,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fadbea43b4bb548f9ae67e569633d3db8'
                            className="w-full h-full object-cover" />
                    </div>

                    <p>
                        Natural Diamond
                    </p>
                </Link>
            </>
        </>
    )
};

export default CategoryItem;
