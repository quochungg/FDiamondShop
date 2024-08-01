import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { registerAPI } from "../api/APIs";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { TailSpin } from 'react-loader-spinner'
import { IoHome } from "react-icons/io5";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "src/context/AuthProvider";

const RegisterPage = () => {
    const { loginWithGoogle } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);

    const [existingEmail, setExistingEmail] = useState(null);
    const [errors, setErrors] = useState({});

    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const labelTags = "text-base absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform"
        + " cursor-text select-none bg-white px-2 text-gray-400 duration-300 peer-placeholder-shown:top-1/2"
        + " peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 "
        + " peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"

    const inputTags = "border-1 peer block w-full appearance-none"
        + " rounded-sm border border-gray-400 bg-transparent"
        + " p-4 text-base text-gray-900"
        + " focus:border-blue-600 focus:outline-none focus:ring-0"

    const errorTags = "text-red-600 text-[14px] w-full mb-4 rounded-sm"

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

    // Handle register form
    const handleRegisterForm = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        setErrors({})

        const formData = new FormData(e.target);
        const address = formData.get('address');
        const role = formData.get('role');
        let validationErrors = {};

        // Username Validation
        const userName = formData.get('username');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:(?!.*\.\.|.*\._)[a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/
        if (!emailRegex.test(userName)) {
            validationErrors.userName = `Email 
            must be in the format 'example@domain.com' 
            and should not contain spaces.`;
        }
        // Password Validation
        const password = formData.get('password');
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{6,}$/
        if (!passwordRegex.test(password)) {
            validationErrors.password = `Password
            must be at least 6 characters long,
            include at least one uppercase letter, one digit, and one special character,
            and must not contain spaces.`;
        }

        // PhoneNumber Validation
        const phoneNumber = formData.get('phoneNumber')
        const phoneNumberRegex = /^0\d{9}$/
        if (!phoneNumberRegex.test(phoneNumber)) {
            validationErrors.phoneNumber = `Phone number 
            must be 10 digits long, start with 0, 
            and contain no spaces.`;
        }

        // FirstName Validation
        const nameRegex = /^[A-Za-z\s]+$/
        const firstName = formData.get('firstName').trim().replace(/\s+/g, ' ');
        if (!nameRegex.test(firstName)) {
            validationErrors.name = "Name can only contain alphabetic characters.";
        }

        // LastName Validation
        const lastName = formData.get('lastName').trim().replace(/\s+/g, ' ');
        if (!nameRegex.test(lastName)) {
            validationErrors.name = "Name can only contain alphabetic characters.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false)
        } else {
            const newAccount = {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                address: address,
                password: password,
                role: role,
                phoneNumber: phoneNumber
            }
            await registerAPI(newAccount)
                .then(response => {
                    if (response.status === 201) {
                        navigate('/confirm-email-link', { state: { previousUrl: location.state.previousUrl } });
                    } else if (response.status === 409) {
                        setExistingEmail('This email is already registered!')
                    }
                })
            setIsLoading(false)
        }
    }

    //Handle sign in link
    const handleSignInClick = () => {
        navigate('/login', { state: { previousUrl: location.state.previousUrl } })
    }


    const loginGoogle = useGoogleLogin({
        onSuccess: async googleResponse => {
            loginWithGoogle(googleResponse.access_token)
        },
    });



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


                            <div className="text-center w-[55%] text-lg font-thin border-t-[1px] border-b-[1px] border-white border-dashed py-4 ">
                                {/* <p>Where Every Diamond Tells a Story</p> */}
                                Discover the finest diamonds and jewelry, crafted to celebrate your moments. Join us and let your journey to sparkle begin.
                                {/* <p className="text-xl font-san">Crafting Dreams into Reality</p> */}

                            </div>

                        </div>


                    </div>
                </div>
                {/*BEGIN RIGHT SECTION*/}


                {/*BEGIN LEFT SECTION*/}
                <div className="flex justify-center items-start py-14">
                    <div className="flex flex-col items-center justify-center w-[31vw]">

                        {/* BEGIN FORM */}
                        <div className="w-full">

                            <p className="font-gantari uppercase text-center text-5xl font-[600] tracking-wide mb-5">
                                SIGN UP
                            </p>

                            {/* Error: Email already existed */}
                            {existingEmail &&
                                <div className="px-4 py-3 border-[1px] border-red-600 bg-red-100 mb-5">
                                    <p className="text-red-500 text-sm w-full rounded-sm">
                                        {existingEmail}
                                    </p>
                                </div>
                            }

                            {/* Form */}
                            <form className="w-full" onSubmit={handleRegisterForm}>

                                <div className="flex flex-row gap-2">
                                    {/* first name */}
                                    <div className="flex-1">
                                        <div className="relative w-full mb-3 font-gantari">
                                            <input
                                                className={inputTags}
                                                placeholder=" "
                                                type="text"
                                                id="firstName"
                                                name='firstName'
                                                required
                                            />
                                            <label
                                                htmlFor="firstName"
                                                className={labelTags}
                                            >
                                                First Name
                                            </label>
                                        </div>
                                    </div>

                                    {/* last name */}
                                    <div className="flex-1">
                                        <div className="relative w-full mb-3 font-gantari">
                                            <input
                                                className={inputTags}
                                                placeholder=" "
                                                type="text"
                                                id="lastName"
                                                name='lastName'
                                                required
                                            />
                                            <label
                                                htmlFor="lastName"
                                                className={labelTags}
                                            >
                                                Last Name
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {errors.name &&
                                    <div className={errorTags}>
                                        {errors.name}
                                    </div>
                                }


                                {/* address */}
                                <div className="relative w-full mb-3 font-gantari">
                                    <input
                                        className={inputTags}
                                        placeholder=" "
                                        type="text"
                                        id="address"
                                        name='address'
                                        required
                                    />
                                    <label
                                        htmlFor="address"
                                        className={labelTags}
                                    >
                                        Home Address
                                    </label>
                                </div>


                                {/* phone number */}
                                <div className="relative w-full mb-3 font-gantari">
                                    <input
                                        className={inputTags}
                                        placeholder=" "
                                        type="text"
                                        id="phoneNumber"
                                        name='phoneNumber'
                                        required
                                    />
                                    <label
                                        htmlFor="phoneNumber"
                                        className={labelTags}
                                    >
                                        Phone Number
                                    </label>
                                </div>
                                {errors.phoneNumber &&
                                    <div className={errorTags}>
                                        {errors.phoneNumber}
                                    </div>
                                }


                                {/* username */}
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
                                {errors.userName &&
                                    <div className={errorTags}>
                                        {errors.userName}
                                    </div>
                                }


                                {/* password */}
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
                                {errors.password &&
                                    <div className={errorTags}>
                                        {errors.password}
                                    </div>
                                }


                                {/* role */}
                                <input type="hidden" name="role" value="customer" />


                                {/* register button */}
                                {isLoading
                                    ? (
                                        <button
                                            type='submit'
                                            className="w-full text-center text-2xl rounded-sm p-4 
                                            bg-[#26265c] text-white transition duration-300 ease-in-out"
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
                                            className="w-full text-white font-[600] text-center text-2xl rounded-sm p-4
                                            hover:bg-[#26265c] bg-[#000035] transition duration-300 ease-in-out "
                                        >
                                            Register
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
                                    bg-[#449cce] border-[#449bce6f] border-[1px] hover:bg-[#449bced6] rounded-sm p-3
                                    transition duration-300 ease-in-out flex items-center justify-center gap-x-4"
                                    onClick={loginGoogle}
                                >
                                    <span className="p-1 bg-white rounded-full"><FcGoogle size={31} /></span>
                                    Sign up with Google
                                </button>
                            </div>

                        </div>
                        {/* END FORM */}


                        {/* BEGIN SIGN-IN-LINK */}
                        <div className="font-gantari text-center mt-5 text-[18px] text-gray-600">
                            <p>Already have an account?{' '}

                                <button
                                    className="text-blue-800 no-underline hover:underline hover:underline-offset-4 font-[500]"
                                    onClick={handleSignInClick}
                                >
                                    Sign In
                                </button>

                            </p>
                        </div>
                        {/* END SIGN-IN-LINK */}

                    </div>
                </div>


                {/*END LEFT SECTION */}

            </div>

        </>
    )
};

export default RegisterPage;
