import React, { useState } from 'react'
import CommonInput from '../components/CommonInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { verifyEmail } from '../api/api'

const EmailVerification = () => {
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await verifyEmail("verify-email", formData);
            toast.success("Email verified successfully ✅");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.error || "Invalid OTP ❌");
        }
    };

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

                <div className="mb-3">
                    <CommonInput
                        placeholder="Enter OTP"
                        name="otp"
                        value={formData.otp}
                        type="text"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-success w-100" type="submit">
                    Verify Email
                </button>
            </form>
        </div>
    )
}

export default EmailVerification