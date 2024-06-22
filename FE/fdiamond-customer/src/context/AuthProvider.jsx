import { useContext, createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAPI } from "src/features/Authentication/api/APIs";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const navigate = useNavigate();
    const location = useLocation();

    const login = async (loginCredentials) => {
        await loginAPI(loginCredentials)
            .then(response => {
                const account = response.data.result;
                if (account && account.role === 'customer') { //if account exists, account must belong to a customer
                    setToken(account.token);
                    localStorage.setItem('accessToken', account.token)
                    localStorage.setItem('user', JSON.stringify({
                        firstName: account.user.firstName,
                        lastName: account.user.lastName
                    }))
                    navigate(
                        location?.state?.previousUrl
                            ? location.state.previousUrl
                            : '/'
                        , { replace: true }   //replace current entry with previousUrl entry => prevent going back to login screen when clicking back button
                    )
                } else {
                    let statusCode = response.status;
                    if (account) {
                        if (account.role === 'admin' || account.role === 'manager') {
                            statusCode = 401;   //temporarily acceptable for users without permissions to access customer site
                        }
                    }
                    const errorCode = { errorCode: statusCode }
                    navigate('/login', { state: { ...location.state, ...errorCode } });
                }
            })
    }

    const logout = () => {
        setToken("");
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>)
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}