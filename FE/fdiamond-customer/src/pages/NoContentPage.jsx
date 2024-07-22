import { useNavigate } from "react-router-dom";
import smile from 'src/assets/no-content-smile.svg'

const NoContentPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-center items-center flex-col h-screen font-gantari">


                <div className="w-48 mt-3">
                    <img src={smile} />
                </div>

                <p className="text-4xl font-bold mt-7">Oops, No Content !</p>


                <p className="text-xl mt-6">This page is for decorative purpose only.</p>
                <p className="text-xl mt-6">Our team has yet to develop UI/UX for this page.</p>

                <button
                    onClick={() => navigate('/')}
                    className="mt-8"
                >
                    <p className="text-white bg-blue-950 py-5 px-14 text-xl font-semibold rounded-md capitalize
                    hover:bg-[#25367b] transition-colors duration-300"
                    >
                        Go to homepage
                    </p>
                </button>

            </div>
        </>
    )
};

export default NoContentPage;
