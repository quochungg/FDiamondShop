import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAPI } from "../api/APIs";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'


const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [existingEmail, setExistingEmail] = useState(null);
    const [errors, setErrors] = useState({});

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

        setErrors({})

        const formData = new FormData(e.target);
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
        const phoneNumberRegex = /^0\d{9,}$/
        if (!phoneNumberRegex.test(phoneNumber)) {
            validationErrors.phoneNumber = "Phone number must be at least 10 digits long, start with 0,and contain no spaces.";
        }

        // FirstName Validation
        const nameRegex = /^[A-Za-z\s]+$/
        const firstName = formData.get('firstName').trim().replace(/\s+/g, ' '); //cat khoang trang 2 dau, chi co 1 khoang trang giua 2 chu
        if (!nameRegex.test(firstName)) {
            validationErrors.firstName = "First name can only contain alphabetic characters.";
        }

        // LastName Validation
        const lastName = formData.get('lastName').trim().replace(/\s+/g, ' ');
        if (!nameRegex.test(lastName)) {
            validationErrors.lastName = "Last name can only contain alphabetic characters.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
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
        }
    }

    const handleSignInButton = () => {
        navigate('/login', { state: { previousUrl: location.state.previousUrl } })
    }


    return (
        <>


            {existingEmail && <h1>{existingEmail}</h1>}
            <h1>Register</h1>
            <div>
                <form className="p-5" onSubmit={handleRegisterForm}>
                    First Name
                    <input
                        className="w-56 h-10 ml-10 border-blue-950 border-2 mb-5"
                        placeholder="Enter your email address"
                        type='text'
                        name='firstName'
                        required
                    />
                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                    <br />

                    Last Name
                    <input
                        className="w-56 h-10 ml-10 border-blue-950 border-2 mb-5"
                        placeholder=""
                        type='text'
                        name='lastName'
                        required

                    />
                    {errors.lastName && <div className="error">{errors.lastName}</div>}
                    <br />

                    Address
                    <input
                        className="w-56 h-10 ml-10 border-blue-950 border-2 mb-5"
                        placeholder=""
                        type='text'
                        name='address'
                        required
                    />  <br />

                    Phone Number
                    <input
                        className="w-56 h-10 ml-10 border-blue-950 border-2 mb-5"
                        placeholder=""
                        type='text'
                        name='phoneNumber'
                        required
                    />
                    {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}

                    <br />

                    Username
                    <input
                        className="w-56 h-10 ml-10 border-blue-950 border-2 mb-5"
                        placeholder="username"
                        type='text'
                        name='username'
                        required
                        maxLength={256}
                    />
                    {errors.userName && <div className="error">{errors.userName}</div>}
                    <br />

                    Password
                    <input
                        className="w-56 h-10 ml-10 border-blue-950 border-2 mb-5"
                        type={type}
                        placeholder="password"
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="flex justify-around items-center" onClick={handleTogglePasword}>
                        <Icon class="absolute mr-10" icon={icon} size={25} />
                    </span>
                    {errors.password && <div className="error">{errors.password}</div>}
                    <br />

                    <input type='hidden' name='role' value='customer' />
                    <button type='submit' className="p-3 bg-slate-500">Sign Up</button>
                </form>
            </div>
            <div>
                <p>Already have an account?</p>
                <button onClick={handleSignInButton}>Sign In</button>
            </div>
        </>
    )
};

export default RegisterPage;
