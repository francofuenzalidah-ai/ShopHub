import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'

export default function AuthPage() {
    const { type } = useParams();
    const navigate = useNavigate();
    //const [mode, setMode] = useState("signup");
    const [error, setError] = useState(null);
    const { signUp, login } = useAuth();

    let currentType;
    if (type === "signup") {
        currentType = "signup";
    }
    else if (type === "login") {
        currentType = "login";
    }


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function onSubmit(data) {
        setError(null);
        let result;
        if (currentType === "signup") {
            result = signUp(data.email, data.password);
        }
        else if (currentType === "login") {
            result = login(data.email, data.password);
        }
        if (result.success) {
            navigate("/");
        }
        else {
            setError(result.error);
        }
    }

    function navigateLogin() {
        navigate("/auth/login");
    }

    function navigateSignup() {
        navigate("/auth/signup");
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">
                        {currentType === "signup" ? "Sign Up" : "Login"}
                    </h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form-input"
                                type="email"
                                id="email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email &&
                                (<span className="form-error">{errors.email.message}</span>)}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="form-input"
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Password must be at most 12 characters long"
                                    }
                                })}
                            />
                            {errors.password &&
                                (<span className="form-error">{errors.password.message}</span>)}
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            {currentType === "signup" ? "Sign Up" : "Login"}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {currentType === "signup" ?
                            <p>
                                Already have an account?{" "}<span className="auth-link" onClick={navigateLogin}>Login</span>
                            </p>
                            :
                            <p>
                                Don't have an account?{" "}<span className="auth-link" onClick={navigateSignup}>Sign Up</span>
                            </p>}
                    </div>
                </div>
            </div>
        </div>
    )
}