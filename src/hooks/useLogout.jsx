import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
    const { dispatch } = useContext(AuthContext);
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("user");
        setAuth(null);
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return { logout };
};
