import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/context/AuthProvider";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'


const LoginPage = () => {
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    // const [isLoading, setIsLoading] = useState(false);

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
        // 401: Account is admin
        // 403: Email has not verified
        if (location?.state?.errorCode === 400 || location?.state?.errorCode === 401) {
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
        // setIsLoading(true);
        await login(loginCredentials)
        // setIsLoading(false);
    }


    const handleRegisterClick = () => {
        navigate('/register', { state: { previousUrl: location.state.previousUrl } });
    }

    return (
        <>
            <div className="h-screen flex flex-row ">
                <div className="w-[45%] bg-[#000035]">
                    <h1>decor</h1>
                </div>


                <div className="w-[55%] flex justify-center items-center">

                    <div className="h-auto flex flex-col">
                        <div className="w-96">

                            <p className="font-gantari uppercase text-center text-5xl font-[600] tracking-wide mb-8">Login</p>

                            <form className="w-full" onSubmit={handleLogin}>
                                <input
                                    className='text-[16px] border-[1px] border-gray-400 w-full p-4 mb-5 rounded-sm'
                                    placeholder="Email Address"
                                    type='email'
                                    name='username'
                                    required
                                    maxLength={256}
                                />

                                <div className="relative">
                                    <input
                                        className='text-[16px] border-[1px] border-gray-400 w-full p-4 mb-5 rounded-sm'
                                        placeholder="Password"
                                        value={password}
                                        type={type}
                                        name='password'
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span onClick={handleTogglePasword}>
                                        <Icon class="absolute top-4 right-7 cursor-pointer" icon={icon} size={24} />
                                    </span>
                                </div>

                                {errorMessage &&
                                    <div className="text-red-600 text-[17px] w-full mb-4 rounded-sm">

                                        <p>
                                            {errorMessage}
                                        </p>
                                    </div>
                                }

                                <button
                                    type='submit'
                                    className="p-4 transition duration-300 ease-in-out hover:bg-[#26265c] bg-[#000035] text-white w-full text-center text-2xl rounded-sm"
                                >
                                    Login
                                </button>


                            </form>
                        </div>
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
                    </div>

                </div>

            </div>

        </>
    )
};

export default LoginPage;
