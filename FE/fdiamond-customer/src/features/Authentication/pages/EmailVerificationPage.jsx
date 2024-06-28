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
            <div className="h-screen grid grid-cols-2">

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

                            {/* <div className="w-64 h-64 font-playfair text-white text-[10rem] font-[650] 
                            rounded-full  outline outline-4 outline-white outline-offset-8 border-2 border-solid border-white
                            flex justify-center items-center mb-5"> */}
                            <div className="w-64 h-64 font-playfair text-[#000035] text-[10rem] font-[650] 
                            rounded-full bg-white ring ring-inset ring-[#000035] outline outline-4 outline-white outline-offset-[0.4rem] border-2 border-solid border-white
                            flex justify-center items-center mb-5">
                                {/* <div className="w-64 h-64 font-playfair text-[#000035] text-[10rem] font-[650] 
                            rounded-full bg-white outline outline-4 outline-white outline-offset-8 border-2 border-solid border-white
                            flex justify-center items-center mb-5"> */}
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

                <div className="flex justify-center items-start ">

                    <div className="font-lora flex flex-col items-center justify-center mt-44">
                        {/* 
                        <span>
                            <TfiEmail size={100} />
                        </span> */}



                        {/* <span className="w-64 h-64 rounded-full bg-[#0884D8] flex justify-center items-center
                          outline outline-4 outline-[#0884D8] outline-offset-[0.2rem] 
                          border-2 border-solid border-[#0884D8]"
                        >
                            <SiMinutemailer size={170} color="white" />
                        </span> */}

                        <span className="w-44 h-44 rounded-full bg-[#0884D8] flex justify-center items-center
                          outline outline-4 outline-[#0884D8] outline-offset-[0.2rem] 
                          border-2 border-solid border-[#0884D8]"
                        >
                            <SiMinutemailer size={95} color="white" />
                        </span>

                        {/* <p className="text-4xl font-serif font-[550] mt-7 ">Verify your email</p> */}
                        <div className="flex flex-col text-center mt-12 gap-y-7 text-xl font-[500]">
                            <p>Verify your email</p>
                            <p>Thank you for signing up with FDIAMOND!</p>
                            <p>Please confirm your email address to complete your registration.</p>

                        </div>
                        <button
                            className="bg-[#0884D8] text-white w-auto mt-10 px-10 py-5 rounded-sm text-xl font-[600]"
                            onClick={handleLogin}
                        >
                            Continue to Login
                        </button>




                    </div>



                </div>
                {/* END LEFT SECTION */}


            </div>

        </>
    )

};



export default EmailVerificationPage;
