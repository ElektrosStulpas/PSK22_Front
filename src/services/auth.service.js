import axios from 'axios';
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Users/';

// const { user, login_context, logout_context } = useContext(UserContext);

const register = (username, email, password) => {
    return axios.post(API_URL + "register", {
        username,
        email,
        password,
    });
}

const login = (username, password, context_func) => {
    return axios.post(API_URL + "login", {
        username,
        password,
    })
        .then((response) => {
            if (response.data) { //maybe should alter response to where it would return token with accessToken as key
                localStorage.setItem("user", response.data)
                context_func(response.data); //does login in global context
            }
            return response.data
        });
}

const logout = (context_func) => {
    localStorage.removeItem("user");
    context_func(); //does logout in global context
}

const getCurrentUser = () => {
    return localStorage.getItem("user");
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;