import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
}

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email!
            </div>
        );
    }
}

const validUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
}

const validPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
}

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    var initialState = {
        username: "",
        email: "",
        password: "",
        successful: false,
        message: "",
    }

    const [state, setState] = useState(initialState);

    var updateState = (name, value) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        updateState("message", "");
        updateState("successful", false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(state.username, state.email, state.password).then(
                (response) => {
                    console.log(response);
                    // updateState("message", response.data.message); //only created user is returned right now
                    updateState("message", "Successfully registered");
                    updateState("successful", true);
                },
                (error) => { //currently no errors are produced from register
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    updateState("message", resMessage);
                    updateState("successful", false);
                }
            );
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleRegister} ref={form}>
                    {!state.successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={state.username}
                                    onChange={(e) => updateState(e.target.name, e.target.value)}
                                    validations={[required, validUsername]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={state.email}
                                    onChange={(e) => updateState(e.target.name, e.target.value)}
                                    validations={[required, validEmail]}
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
                                    validations={[required, validPassword]}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}
                    {state.message && (
                        <div className="form-group">
                            <div
                                className={state.successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {state.message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
}

export default Register;