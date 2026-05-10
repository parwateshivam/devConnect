import CommonInput from "../components/CommonInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function validate() {
        if (!formData.name) return "Name is required";
        if (!formData.email.includes("@")) return "Invalid email";
        if (formData.password.length < 6) return "Password must be at least 6 characters";
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
            await registerUser("register", formData);
            toast.success("Signup successful ✅");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.error || "Signup failed ❌");
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
                <h2 className="mb-3 text-center">Signup</h2>

                <div className="mb-3">
                    <CommonInput
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <CommonInput
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <CommonInput
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    className="btn btn-primary w-100"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "SignUp"}
                </button>

                <div className="mt-3 text-center">
                    <p className="mb-1">
                        Already have an account?{" "}
                        <Link to="/" className="fw-bold text-decoration-none">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;