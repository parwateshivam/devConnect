import axios from "axios";

const host = "http://localhost:3001/api/user/";

export const registerUser = async (endpoint, data) => {
    try {
        const resp = await axios.post(`${host}${endpoint}`, data);
        return resp;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (endpoint, data) => {
    try {
        const resp = await axios.post(`${host}${endpoint}`, data);
        return resp;
    } catch (error) {
        throw error;
    }
};