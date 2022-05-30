import axios from 'axios';
const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Users/';


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

const isAuthenticated = () => {
    return localStorage.getItem("user") != null
}

const getCurrentUser = () => {
    return localStorage.getItem("user");
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
};

export default AuthService;