import React, { useState } from 'react'
import CommonInput from '../components/CommonInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { requestEmailOtp } from '../api/api'

const RequestEmailVerification = () => {
    const [formData, setFormData] = useState({
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function validate() {
        if (!formData.email.includes("@")) return "Enter valid email";
        return null;
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const error = validate();
        if (error) {
            toast.error(error);
            setLoading(false);
            return;
        }
        try {
            const resp = await requestEmailOtp("request-email-otp", formData);
            toast.success("Email sent successfully ✅");
            navigate("/verify-email");
        } catch (err) {
            toast.error(err?.response?.data?.error || "Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="card p-4 shadow w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
                <h2 className="mb-3 text-center">Verify Email</h2>

                <div className="mb-3">
                    <CommonInput
                        placeholder="Enter your Email..."
                        name="email"
                        value={formData.email}
                        type="email"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-success w-100" type="submit">
                    {loading ? "Sending..." : "Send OTP"}
                </button>
            </form>
        </div>
    )
}

export default RequestEmailVerification;