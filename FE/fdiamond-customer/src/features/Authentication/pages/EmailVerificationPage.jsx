import { useNavigate, useLocation } from "react-router-dom";

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const handleLogin = () => {
        navigate('/login', { state: { previousUrl: location.state.previousUrl } });
    }

    return (
        <>
            <h1>Please confirm your email</h1>
            <button onClick={handleLogin}>Login</button>
        </>
    )
};

export default EmailVerificationPage;
