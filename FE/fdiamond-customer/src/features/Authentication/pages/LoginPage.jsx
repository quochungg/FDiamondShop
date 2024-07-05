import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "src/context/AuthProvider";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { TailSpin } from 'react-loader-spinner'
import { IoHome } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";


const LoginPage = () => {
    const { login, loginWithGoogle } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);


    // Handle password visibility
    const handleTogglePasword = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    // Reset location state when reloading the page
    useEffect(() => {
        window.onbeforeunload = () => {
            navigate('/login', {
                state: { ...location.state, errorCode: null },
                replace: true // Replace the current entry in the history stack with this one
            });
        }
        // Cleanup
        return () => {
            window.onbeforeunload = null;
        };
    }, []);


    //Checking error code
    useEffect(() => {
        // 400: Account not found
        // 403: Email has not verified
        if (location?.state?.errorCode === 400) {
            setErrorMessage('Invalid username or password.')
        }
        else if (location?.state?.errorCode === 403) {
            if (location)
                setErrorMessage('Email has not been verified. Please verify your email.')
        }
    }, [location]);


    // Handle login submit form
    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userName = formData.get('username');
        const password = formData.get('password');

        const loginCredentials = {
            userName: userName,
            password: password
        }
        setIsLoading(true);
        await login(loginCredentials)
        setIsLoading(false);
    }


    const handleRegisterClick = () => {
        navigate('/register', { state: { previousUrl: location.state.previousUrl } });
    }

    const loginGoogle = useGoogleLogin({
        onSuccess: async googleResponse => {
            console.log(googleResponse);
            loginWithGoogle(googleResponse.access_token)
        },
    });




    const labelTags = "text-[16px] absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform"
        + " cursor-text select-none bg-white px-2 text-gray-400 duration-300 peer-placeholder-shown:top-1/2"
        + " peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 "
        + " peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"

    const inputTags = "border-1 peer block w-full appearance-none"
        + " rounded-sm border border-gray-400 bg-transparent"
        + " p-4 text-[16px] text-gray-900"
        + " focus:border-blue-600 focus:outline-none focus:ring-0"


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
                        <div className="h-full w-full flex flex-col items-center justify-start mt-9">

                            <div className="w-64 h-64 font-playfair text-[#000035] text-[10rem] font-[650] 
                            rounded-full bg-white ring ring-inset ring-[#000035] outline outline-4 outline-white outline-offset-[0.4rem] border-2 border-solid border-white
                            flex justify-center items-center mb-5">
                                F
                            </div>

                            <div className="text-center font-playfair text-[3rem] font-[500] tracking-widest mt-1 mb-5">
                                FDIAMOND
                            </div>

                            <p className="text-center text-lg font-thin border-dashed border-t-[1px] border-b-[1px] border-white py-4 w-[55%]">
                                Discover the finest diamonds and jewelry, crafted to celebrate your moments. Join us and let your journey to sparkle begin.
                                {/* Where Every Diamond Tells a Story */}
                            </p>

                        </div>


                    </div>
                </div>
                {/*BEGIN RIGHT SECTION*/}


                {/* BEGIN LEFT SECTION */}
                <div className="flex justify-center items-start mt-44">
                    <div className="flex flex-col items-center justify-center w-[29vw]">

                        {/* BEGIN FORM */}
                        <div className="w-full">

                            <p className="font-gantari uppercase text-center text-5xl font-[600] tracking-wide mb-5">
                                SIGN IN
                            </p>

                            <form className="w-full" onSubmit={handleLogin}>

                                {/* Username */}
                                <div className="relative w-full mb-3 font-gantari">
                                    <input
                                        className={inputTags}
                                        placeholder=" "
                                        type="text"
                                        id="username"
                                        name='username'
                                        maxLength={256}
                                        required
                                    />
                                    <label
                                        htmlFor="username"
                                        className={labelTags}
                                    >
                                        Email Address
                                    </label>
                                </div>


                                {/* Password */}
                                <div className="relative">
                                    <div className="relative w-full mb-3 font-gantari">
                                        <input
                                            className={inputTags}
                                            placeholder=" "
                                            id="username"
                                            value={password}
                                            type={type}
                                            name='password'
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label
                                            htmlFor="password"
                                            className={labelTags}
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <span onClick={handleTogglePasword}>
                                        <Icon class="absolute top-4 right-7 cursor-pointer"
                                            icon={icon}
                                            size={24}
                                        />
                                    </span>
                                </div>

                                {/* Error message */}
                                {errorMessage &&
                                    <div className="text-red-600 text-[17px] w-full mb-4 rounded-sm">

                                        <p>
                                            {errorMessage}
                                        </p>
                                    </div>
                                }

                                {/* Login button */}
                                {isLoading
                                    ? (
                                        <button
                                            type='submit'
                                            className="w-full p-4 text-white text-center text-2xl rounded-sm
                                            transition duration-300 ease-in-out bg-[#26265c]"
                                            disabled
                                        >
                                            <TailSpin
                                                visible={true}
                                                height="30"
                                                color="#f8fafc"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperClass="flex flex-row justify-center"
                                            />
                                        </button>
                                    )
                                    : (
                                        <button
                                            type='submit'
                                            className="w-full p-4 text-white font-[600] text-center text-2xl rounded-sm
                                            transition duration-300 ease-in-out hover:bg-[#26265c] bg-[#000035]"
                                        >
                                            Login
                                        </button>
                                    )
                                }

                            </form>


                            <div className="relative flex py-1 items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink mx-2 text-gray-600 text-md">Or</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            {/* Google button */}
                            <div>
                                <button
                                    className=" relative w-full text-center font-[600] tracking-tight text-xl text-white capitalize
                                    bg-[#449cce] border-[#449cce] border-[1px] hover:bg-[#449bced6] rounded-sm p-3
                                    transition duration-300 ease-in-out flex items-center justify-center gap-x-4"
                                    onClick={loginGoogle}
                                >
                                    <span className="p-1 bg-white rounded-full"><FcGoogle size={31} /></span>
                                    Continue with google
                                </button>
                            </div>

                        </div>
                        {/* END FORM */}


                        {/* BEGIN SIGN-UP-LINK */}
                        <div className="font-gantari text-center mt-5 text-[18px] text-gray-600">
                            <p>Don't have an account?{' '}

                                <button
                                    className="text-blue-800 no-underline hover:underline hover:underline-offset-4 font-[500]"
                                    onClick={handleRegisterClick}
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                        {/* END SIGN-UP-LINK */}

                    </div>

                </div>
                {/* END LEFT SECTION */}

            </div>

        </>
    )
};

export default LoginPage;
