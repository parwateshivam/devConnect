import axios from "axios";

const host = import.meta.env.VITE_API_URL;

export const registerUser = async (endpoint, data) => {
    try {
        const resp = await axios.post(`${host}/${endpoint}`, data);
        return resp;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (endpoint, data) => {
    try {
        const resp = await axios.post(`${host}/${endpoint}`, data);
        return resp;
    } catch (error) {
        throw error;
    }
};

export const verifyEmail = async (endpoint, data) => {
    try {
        const resp = await axios.post(`${host}/${endpoint}`, data);
        return resp;
    } catch (error) {
        throw error;
    }
};

export const requestEmailOtp = async (endpoint, data) => {
    try {
        const resp = await axios.post(`${host}/${endpoint}`, data);
        return resp;
    } catch (error) {
        throw error;
    }
};