import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { UserContext } from "../services/UserContext";
import axios from "axios";
import authHeader from "../services/auth-header";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
}

const Login = () => {
    const { userGlobalState, login } = useContext(UserContext);
    var navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    var initialState = {
        username: "",
        password: "",
    }

    const [state, setState] = useState(initialState);
    //same as register, rerender variables need their own state to avoid async troubles
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    var updateState = (name, value) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            //saving jwt token to local storage
            AuthService.login(state.username, state.password).then(
                () => {
                    axios.get('https://gariunaicloud.azurewebsites.net/api/Users/me', { headers: authHeader() })
                        .then((response) => {
                            login(response.data) // user context login
                        })
                    navigate("/");//for now navigating to home, but could navigate to profile
                },
                (error) => { //currently system doesn't produce errors
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }
    }

    return (
        userGlobalState ? <div>Hello context</div> :
            <div className="col_md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Form onSubmit={handleLogin} ref={form}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={state.username}
                                onChange={(e) => updateState(e.target.name, e.target.value)}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={state.password}
                                onChange={(e) => updateState(e.target.name, e.target.value)}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" disabled={state.loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
    )
}

export default Login;