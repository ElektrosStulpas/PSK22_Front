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

const login = (username, password) => {
    return axios.post(API_URL + "login", {
        username,
        password,
    })
        .then((response) => {
            if (response.data) { //maybe should alter response to where it would return token with accessToken as key
                localStorage.setItem("user", response.data)
            }
            return response.data
        });
}

const logout = () => {
    localStorage.removeItem("user");
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