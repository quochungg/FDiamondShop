import { useNavigate, useLocation, Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { IoHome } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";


const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const handleLogin = () => {
        navigate('/login', {
            state: {
                previousUrl:
                    location?.state?.previousUrl
                        ? location.state.previousUrl
                        : '/'
            }
        });
    }

    return (
        <>
            <div className="h-screen grid grid-cols-2 bg-gray-50">

                {/*BEGIN RIGHT SECTION*/}
                <div className="bg-[#000035] text-white w-full">
                    <div className="fixed h-full w-[50%] flex flex-col">

                        {/* Homepage icon */}
                        <div className="p-5">
                            <Link to='/'
                                title="Home"
                                className="w-14 h-12 bg-white hover:bg-[#ffffffd8] transition-colors duration-200 rounded-md 
                                flex justify-center items-center">
                                <IoHome
                                    size={25}
                                    color="#000035"
                                />
                            </Link>
                        </div>

                        {/* FDIAMOND logo */}
                        <div className="h-full w-full flex flex-col items-center justify-start mt-8">

                            <div className="w-64 h-64 font-playfair text-[#000035] text-[10rem] font-[650] 
                            rounded-full bg-white ring ring-inset ring-[#000035] outline outline-4 outline-white outline-offset-[0.4rem] border-2 border-solid border-white
                            flex justify-center items-center mb-5">
                                F
                            </div>

                            <div className="text-center font-playfair text-[3rem] font-[500] tracking-widest mt-1 mb-5">
                                FDIAMOND
                            </div>

                            <p className="text-center text-lg font-thin border-dashed border-t-[1px] border-b-[1px] border-white py-4 w-[55%]">
                                Discover the finest diamonds and jewelry, crafted to celebrate your moments.
                                Join us and let your journey to sparkle begin.
                            </p>

                        </div>

                    </div>
                </div>
                {/*BEGIN RIGHT SECTION*/}


                {/* BEGIN LEFT SECTION */}
                <div className="w-full mt-28 flex flex-col items-center">

                    {/*BEGIN CONTAINER */}
                    <div className="mx-auto shadow-cartline w-[80%] h-auto flex flex-col items-center justify-start pt-5 pb-10 rounded-md bg-slate-50">

                        {/* Icon */}
                        <span className="p-5 rounded-full bg-[white] shadow-cartline">
                            <SiMinutemailer size={130} color="#000035" />
                        </span>

                        {/* Text */}
                        <div className="mt-6 flex flex-col text-center font-gantari space-y-5">
                            <p className="capitalize text-[1.8rem] font-[550]">Verify your email</p>

                            <div className="text-lg font-[300] flex flex-col space-y-5">
                                <p>Thank you for signing up with FDIAMOND!</p>
                                <p>Please confirm your email address to complete your registration.</p>
                            </div>
                        </div>

                        {/* Continue to Login button */}
                        <div className="mt-8">
                            <button
                                className="bg-[#000035] hover:bg-[#26265c] transition-colors duration-200 text-white font-gantari font-[450] text-xl px-10 py-4 rounded-sm"
                                onClick={handleLogin}
                            >
                                Continue To Login
                            </button>
                        </div>

                    </div>
                    {/*END CONTAINER */}

                </div>
                {/* END LEFT SECTION */}


            </div>

        </>
    )

};



export default EmailVerificationPage;
