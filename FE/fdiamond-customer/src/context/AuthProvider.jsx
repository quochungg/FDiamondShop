import { useContext, createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAPI, loginGoogleAPI } from "src/features/Authentication/api/APIs";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const navigate = useNavigate();
    const location = useLocation();

    const login = async (loginCredentials) => {
        await loginAPI(loginCredentials)
            .then(response => {
                const account = response.data.result;

                if (account) { //if account exists, account must belong to a customer
                    setToken(account.token);
                    localStorage.setItem('accessToken', account.token);
                    localStorage.setItem('user', JSON.stringify({
                        userName: account.user.userName,
                        firstName: account.user.firstName,
                        lastName: account.user.lastName,
                        userId: account.userId
                    }));

                    navigate(
                        location?.state?.previousUrl
                            ? location.state.previousUrl
                            : '/'
                        , { replace: true }   //replace current entry with previousUrl entry => prevent going back to login screen when clicking back button
                    )
                } else {
                    let statusCode = response.status;
                    const errorCode = { errorCode: statusCode }
                    navigate('/login', { state: { ...location.state, ...errorCode } });
                }
            })
    }

    const loginWithGoogle = async (accessToken) => {
        const response = await loginGoogleAPI(accessToken);
        const account = response.data.result;


        if (account) {
            setToken(account.token);
            localStorage.setItem('accessToken', account.token);
            localStorage.setItem('user', JSON.stringify({
                userName: account.user.userName,
                firstName: account.user.firstName,
                lastName: account.user.lastName,
                userId: account.userId
            }));

            navigate(
                location?.state?.previousUrl
                    ? location.state.previousUrl
                    : '/'
                , { replace: true }     //replace current entry with previousUrl entry => prevent going back to login screen when clicking back button
            )
        } else {
            console.log(response)
        }
    }

    const logout = () => {
        setToken("");
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
    }

    return (
        <AuthContext.Provider value={{ token, login, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>)
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}