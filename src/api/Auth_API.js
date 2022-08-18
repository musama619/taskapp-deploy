import axios from "axios";
import { DEFAULT_URL, AUTH_URL } from "./Default";

export const Signup = async (data) => {
    return await axios.post(DEFAULT_URL + AUTH_URL + "signup", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const Login = async(data) => {
    return await axios.post(DEFAULT_URL + AUTH_URL + "login", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
