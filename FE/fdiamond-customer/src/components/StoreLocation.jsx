import { Link } from "react-router-dom";

const StoreLocation = () => {
    return (
        <>
            <div className="flex flex-col mx-12 h-auto bg-gray-100 mb-20">



                <div className="h-[550px] px-12 pt-12">
                    <img
                        src='https://3dzip.org/wp-content/uploads/2022/03/12096.-Free-3D-Diamond-Store-Interior-Model-Download-By-Vu-Huy-Hien-7.jpg'
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                <div className="h-auto font-gantari py-12 text-start px-12">
                    <p className="font-lora text-3xl mb-7">We're Here For You</p>

                    <p className="mb-8">Meet our personal jewelers, explore bestselling styles, pick up an online order, arrange to preview something from our online collection and so much more.</p>

                    <div className="flex flex-row space-x-5 text-center">
                        <Link to='/no-content'>
                            <p className="text-white bg-[#000035] py-4 w-56 font-semibold tracking-wide font-gantari rounded-sm
                                hover:bg-[#26265c] transition-colors duration-300 inline-block">
                                Visit Our Showroom
                            </p>

                        </Link>

                        <Link to='/no-content'>
                            <p className="text-white bg-[#000035] py-4 w-56 font-semibold tracking-wide font-gantari rounded-sm
                                hover:bg-[#26265c] transition-colors duration-300 inline-block">
                                Contact us
                            </p>

                        </Link>
                    </div>
                </div>


            </div>
        </>
    )
};

export default StoreLocation;
