import axios from "axios";
import { useLogout } from "./useLogout";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();

    const setAuth = (token) => {
        axios.defaults.headers.common["Authorization"] = token
            ? "Bearer " + token
            : "";
        axios.interceptors.response.use(undefined, (error) => {
            if (error && error.response && error.response.status == 401) {
                navigate("/login");
            }
            return Promise.reject(error);
        });
    };

    return { setAuth };
};
