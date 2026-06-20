import { useState } from "react";
import CommonInput from "../components/CommonInput";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import Loader from "../components/Loader";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function validate() {
        if (!form.email.includes("@")) return "Enter valid email";
        if (form.password.length < 6) return "Password must be at least 6 characters";
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(true);

        try {
            const res = await loginUser("login", form);
            localStorage.setItem("token", res.data.token);
            dispatch(setUser(res.data.user));
            toast.success("Login successful ✅");
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.error || "Login failed ❌");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form
                className="card p-4 shadow w-100"
                style={{ maxWidth: "400px" }}
                onSubmit={handleSubmit}
            >
                <h2 className="mb-3 text-center">Login</h2>

                <div className="mb-3">
                    <CommonInput
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <CommonInput
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    className="btn btn-primary w-100"
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading && (
                            <Loader />
                        )
                    }
                    {
                        loading ? "Logging in..." : "Login"
                    }
                </button>

                <div className="mt-3 text-center">
                    <p className="mb-1">
                        Don't have an account?{" "}
                        <Link to="/signup" className="fw-bold text-decoration-none">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;