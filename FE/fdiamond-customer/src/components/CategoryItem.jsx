import { Link } from 'react-router-dom';

const CategoryItem = ({ type, imageUrl, linkTo }) => {


    return (
        <>
            <>
                <Link
                    to={linkTo}
                    className="flex flex-col no-underline items-center w-full font-gantari space-y-6 hover:text-blue-950 transition-colors duration-200">
                    <div className="h-[400px] w-full flex justify-center">
                        <img
                            src={imageUrl}
                            className="w-full h-full object-cover" />
                    </div>

                    <p className='text-[1.3rem] font-gantari'>
                        {type}
                    </p>
                </Link>
            </>
        </>
    )
};

export default CategoryItem;
