import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAPI } from "../api/APIs";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { TailSpin } from 'react-loader-spinner'
// import { GoogleLogin } from '@react-oauth/google';


const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [existingEmail, setExistingEmail] = useState(null);
    const [errors, setErrors] = useState({});
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

    // Handle register form
    const handleRegisterForm = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        setErrors({})

        const formData = new FormData(e.target);
        console.log(formData)
        const address = formData.get('address');
        const role = formData.get('role');
        let validationErrors = {};
        // Username Validation
        const userName = formData.get('username');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:(?!.*\.\.|.*\._)[a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/
        if (!emailRegex.test(userName)) {
            validationErrors.userName = "Email must be in the format 'example@domain.com' and should not contain spaces.";
        }
        // Password Validation
        const password = formData.get('password');
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{6,}$/
        if (!passwordRegex.test(password)) {
            validationErrors.password = "Password must be at least 6 characters long, include at least one uppercase letter, one digit, and one special character, and must not contain spaces.";
        }

        // PhoneNumber Validation
        const phoneNumber = formData.get('phoneNumber')
        const phoneNumberRegex = /^0\d{9}$/
        if (!phoneNumberRegex.test(phoneNumber)) {
            validationErrors.phoneNumber = "Phone number must be at least 10 digits long, start with 0,and contain no spaces.";
            validationErrors.phoneNumber = "Phone number must be 10 digits long, start with 0,and contain no spaces.";
        }

        // FirstName Validation
        const nameRegex = /^[A-Za-z\s]+$/
        const firstName = formData.get('firstName').trim().replace(/\s+/g, ' ');
        if (!nameRegex.test(firstName)) {
            validationErrors.firstName = "First name can only contain alphabetic characters.";
            validationErrors.name = "Name can only contain alphabetic characters.";
        }

        // LastName Validation
        const lastName = formData.get('lastName').trim().replace(/\s+/g, ' ');
        if (!nameRegex.test(lastName)) {
            validationErrors.lastName = "Last name can only contain alphabetic characters.";
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
            console.log(newAccount)
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


    const handleSignInClick = () => {
        navigate('/login', { state: { previousUrl: location.state.previousUrl } })
    }


    const labelTags = "text-[16px] absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform"
        + " cursor-text select-none bg-white px-2 text-gray-400 duration-300 peer-placeholder-shown:top-1/2"
        + " peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 "
        + " peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"

    const inputTags = "border-1 peer block w-full appearance-none"
        + " rounded-sm border border-gray-400 bg-transparent"
        + " p-4 text-[16px] text-gray-900"
        + " focus:border-blue-600 focus:outline-none focus:ring-0"

    const errorTags = "text-red-600 text-[14px] w-full mb-4 rounded-sm"

    return (
        <>

            <div className="h-screen grid grid-cols-2">
                <div className=" bg-[#000035] text-white">
                    abc
                </div>

                <div className="flex justify-center items-start mt-20">
                    <div className="flex flex-col">
                        <div className="w-[470px]">

                            <p className="font-gantari uppercase text-center text-5xl font-[600] tracking-wide mb-8">SIGN UP</p>

                            {existingEmail &&
                                <div className="px-4 py-3 border-[1px] border-red-600 bg-red-200 mb-4">
                                    <p className="text-red-500 text-[14px] w-full rounded-sm">
                                        {existingEmail}
                                    </p>
                                </div>
                            }

                            <form className="w-full" onSubmit={handleRegisterForm}>

                                <div className="flex flex-row gap-2">
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
                                        <Icon class="absolute top-4 right-7 cursor-pointer" icon={icon} size={24} />
                                    </span>
                                </div>
                                {errors.password &&
                                    <div className={errorTags}>
                                        {errors.password}
                                    </div>
                                }

                                <input type="hidden" name="role" value="customer" />

                                {isLoading
                                    ? (
                                        <button
                                            type='submit'
                                            className="p-4 transition duration-300 ease-in-out bg-[#26265c] text-white w-full text-center text-2xl rounded-sm"
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
                                            className="p-4 transition duration-300 ease-in-out hover:bg-[#26265c] bg-[#000035] text-white w-full text-center text-2xl rounded-sm mb-2"
                                        >
                                            Register
                                        </button>
                                    )
                                }
                            </form>
                        </div>

                        <div className="font-gantari text-center mt-5 mb-10 text-[18px] text-gray-600">
                            <p>Already have an account?{' '}

                                <button
                                    className="text-blue-800 no-underline hover:underline hover:underline-offset-4 font-[500]"
                                    onClick={handleSignInClick}
                                >
                                    Sign In
                                </button>

                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};

export default RegisterPage;