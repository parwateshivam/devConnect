import axios from "axios";

const host = import.meta.env.VITE_API_URL;

// const host = import.meta.env.VITE_API_URL_DEV;

export const registerUser = async (endpoint, data) => {
    try {
        const resp = await axios.post(`${host}/user/${endpoint}`, data);
        return resp;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (endpoint, data) => {
    try {
        const resp = await axios.post(`${host}/user/${endpoint}`, data);
        return resp;
    } catch (error) {
        throw error;
    }
};

export const uploadProfileImg = async (endpoint, data, token) => {
    try {
        const resp = await axios.post(
            `${host}/user/${endpoint}`,
            data
            , {
                headers: {
                    Authorization: `${token}`
                }
            }
        );
        return resp;
    } catch (error) {
        throw error;
    }
};

export const createPost = async (endpoint, data, token) => {
    try {
        const resp = await axios.post(
            `${host}/post/${endpoint}`,
            data
            , {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return resp;
    } catch (error) {
        throw error;
    }
}