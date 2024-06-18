import { Link } from 'react-router-dom'

const PageNotFound = () => {

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center text-5xl">
                PAGE NOT FOUND
                <Link className='p-5 bg-slate-400' to='/'>Back to Homepage</Link>
            </div>

        </>
    )
};

export default PageNotFound;
